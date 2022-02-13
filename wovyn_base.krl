ruleset wovyn_base {
    meta {
        name "Wovyn Base"
        description << Ruleset for Wovyn Base >>
        author "Cameron Brown"
        use module twilio
            with
                account_sid = meta:rulesetConfig{"account_sid"}
                auth_token = meta:rulesetConfig{"auth_token"}
        use module sensor_profile
        provides get_current_threshold, get_phone_number
        shares lastResponse, get_current_threshold, get_phone_number
    }
    global {
        get_current_threshold = function() {
            ent:temperature_threshold.defaultsTo(sensor_profile:temperature_threshold);
        };
        lastResponse = function() {
            {}.put(ent:lastTimestamp, ent:lastResponse)
        };
        get_phone_number = function() {
            ent:toNumber.defaultsTo("+14352162134")
        }
    }
    rule process_heartbeat {
        select when wovyn heartbeat
        pre {
            log = event:attrs.klog("attrs")
            msg = "The current temperature is: ".klog()
        }
        if event:attrs{"genericThing"} then send_directive("wovyn heartbeat", {"body": msg});
        fired {
            raise wovyn event "new_temperature_reading" attributes {
                "temperature" : event:attrs{"genericThing"}{"data"}{"temperature"}[0]{"temperatureF"},
                "timestamp" : time:now()
            }
        }
    }

    rule find_high_temps {
        select when wovyn new_temperature_reading
        pre {
            temperature = event:attrs{"temperature"}
            timestamp = event:attrs{"timestamp"}
        }
        fired {
            raise wovyn event "threshold_violation" attributes {
                "temperature" : temperature,
                "timestamp" : timestamp
            } if temperature > ent:temperature_threshold
        }
    }

    rule update_threshold_and_number {
        select when sensor_profile update_threshold_and_number
        pre {
            threshold = event:attrs{"threshold"}
            phone_number = event:attrs{"number"}
        }
        always {
            ent:temperature_threshold := threshold
            ent:toNumber := phone_number
        }
    }
    rule threshold_notification {
        select when wovyn threshold_violation
        pre {
            to = ent:toNumber
            sender = "+19402907444"
            message = "It is too hot."
        }
        twilio:send_sms(to, sender, message) setting(response)

        fired {
            ent:lastResponse := response
            ent:lastTimestamp := time:now()
        }
    }
}
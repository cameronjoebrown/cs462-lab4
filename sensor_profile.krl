ruleset sensor_profile {
    meta {
        name "Sensor Profile Ruleset"
        description << Ruleset for Sensor Profile >>
        author "Cameron Brown"
        provides get_profile_info, temperature_threshold
        shares get_profile_info, temperature_threshold
    }
    global {
        default_threshold = 76;
        get_profile_info = function() {
            {
            "name": ent:sensor_name.defaultsTo(""),
            "location": ent:sensor_location.defaultsTo(""),
            "number": ent:phone_number.defaultsTo(""),
            "threshold": ent:temp_threshold.defaultsTo(default_threshold)
            }
        };
        temperature_threshold = function() {
            ent:temp_threshold.defaultsTo(default_threshold)
        };
    }
    rule update_profile {
        select when sensor update_profile
        pre {
            location = event:attrs{"location"}
            name = event:attrs{"name"}
            number = event:attrs{"number"}
            threshold = event:attrs{"threshold"}
        }
        always {
            ent:sensor_name := name
            ent:sensor_location := location
            ent:phone_number := number
            ent:temp_threshold := threshold

            raise sensor_profile event "update_threshold_and_number" attributes {
                "threshold": ent:temp_threshold,
                "number": ent:phone_number
            }
        }

    }
}
ruleset sensor_profile {
    meta {
        name "Sensor Profile Ruleset"
        description << Ruleset for Sensor Profile >>
        author "Cameron Brown"
        provides get_profile_info
        shares get_profile_info
    }
    global {
        get_profile_info = function() {
            {
            "name": ent:sensor_name.defaultsTo(""),
            "location": ent:sensor_location.defaultsTo(""),
            "number": ent:phone_number.defaultsTo(""),
            "threshold": ent:temp_threshold.defaultsTo("")
            }
        };
    }
    rule update_profile {
        select when sensor profile_updated
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
        }

    }
}
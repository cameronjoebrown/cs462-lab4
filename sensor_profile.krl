ruleset sensor_profile {
    meta {
        name "Sensor Profile Ruleset"
        description << Ruleset for Sensor Profile >>
        author "Cameron Brown"
    }
    rule update_profile {
        select when sensor profile_updated
        pre {
            sensor_location = event:attrs{"location"}
            sensor_name = event:attrs{"name"}
        }

    }
}
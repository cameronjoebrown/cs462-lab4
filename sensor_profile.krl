ruleset sensor_profile {
    meta {
        name "Sensor Profile"
        description << Ruleset for Sensor Profile >>
        author "Cameron Brown"
    }
    rule update_profile {
        select when sensor profile_updated
    }
}
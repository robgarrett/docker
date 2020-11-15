//import Config from "./config";
//import fetch from "node-fetch";

/*
enum SYSTEM_STATES {
    UNKNOWN = 0,
    DISARMED = 1,
    ARMED_STAY = 2,
    ARMED_AWAY = 3,
    ARMED_NIGHT = 4
}

enum REL_TYPES {
    CONFIGURATION = 'systems/configuration',
    PARTITION = 'devices/partition',
    SENSOR = 'devices/sensor',
    LIGHT = 'devices/light',
    LOCK = 'devices/lock',
    GARAGE_DOOR = 'devices/garage-door',
    CAMERA = 'video/camera',
    THERMOSTAT = 'devices/thermostat',
    GEO_DEVICE = 'geolocation/geo-device',
    GEO_FENCE = 'geolocation/fence',
    SCENE = 'automation/scene'
}
*/

/*
    Alarm.com service, based off:
    https://github.com/node-alarm-dot-com/node-alarm-dot-com/blob/master/index.js
*/
export default class AlarmDotComService {
    static ADCLOGIN_URL = "https://www.alarm.com/login";
    static ADCFORMLOGIN_URL = "https://www.alarm.com/web/Default.aspx";
    static IDENTITIES_URL = "https://www.alarm.com/web/api/identities";
    static HOME_URL = "https://www.alarm.com/web/system/home";
    static SYSTEM_URL = "https://www.alarm.com/web/api/systems/systems/";
    static PARTITIONS_URL = "https://www.alarm.com/web/api/devices/partitions/";
    static SENSORS_URL = "https://www.alarm.com/web/api/devices/sensors";
    static LIGHTS_URL = "https://www.alarm.com/web/api/devices/lights/";
    static GARAGE_URL = "https://www.alarm.com/web/api/devices/garageDoors/";
    static LOCKS_URL = "https://www.alarm.com/web/api/devices/locks/";
    static CT_JSON = "application/json;charset=UTF-8";

    private constructor()
    {
        // Static clas.
    }

    public static login(): boolean
    {
        // Login to Alarm.com service.
        return false;
    }
}

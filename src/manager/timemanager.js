
//GetServerTimeZone
import momentTimeZone from "moment-timezone";
import axios from "axios";
import Global from "../global/global";
import moment from "moment";


class TimeManager {
    static timeZone = null;
    static async UpdateServerTimeZone(){
        let response= await axios.get(Global.apiHost + "/api/v1/user/servertimezone");
        console.log(response.data);
        if (response.data.data.status == 0) {
            TimeManager.timeZone = response.data.data;
            momentTimeZone.tz.setDefault(TimeManager.timeZone);
            console.log(moment().format("YYYY-MM-DD HH:MM:SS"));
        }
    }
}

export default TimeManager;
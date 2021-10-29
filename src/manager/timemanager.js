/*
 * @Author: your name
 * @Date: 2020-11-23 16:10:59
 * @LastEditTime: 2021-10-29 18:08:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/manager/timemanager.js
 */

//GetServerTimeZone
import momentTimeZone from "moment-timezone";
import axios from "axios";
import Global from "../global/global";
import moment from "moment";


class TimeManager {
    static timeZone = "Atlantic/Reykjavik";
    //static timeZone =null;
    static async UpdateServerTimeZone(){
        momentTimeZone.tz.setDefault(TimeManager.timeZone);
        let response= await axios.get(Global.apiHost + "/api/v1/user/servertimezone");
        console.log(response.data);
        if (response.data.status == 0) {
            TimeManager.timeZone = response.data.data;
            momentTimeZone.tz.setDefault(TimeManager.timeZone);
            console.log(moment().format("YYYY-MM-DD HH:MM:SS"));
        }
    }
}

export default TimeManager;
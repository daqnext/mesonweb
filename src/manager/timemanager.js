/*
 * @Author: your name
 * @Date: 2020-11-23 16:10:59
 * @LastEditTime: 2020-12-02 15:49:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/manager/timemanager.js
 */

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
        if (response.data.status == 0) {
            TimeManager.timeZone = response.data.data;
            momentTimeZone.tz.setDefault(TimeManager.timeZone);
            console.log(moment().format("YYYY-MM-DD HH:MM:SS"));
        }
    }
}

export default TimeManager;
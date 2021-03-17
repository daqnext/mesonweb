/*
 * @Author: your name
 * @Date: 2020-11-10 07:22:35
 * @LastEditTime: 2021-03-17 12:30:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/global/global.js
 */
class Global {
    static apiHost = "https://mesondev.online";
    static coldCdnApiHost ="https://coldcdndev.online"

    //s3 acc url
    static s3BindDomain = Global.coldCdnApiHost+"/api/cdn/hx9216";
}

export default Global;
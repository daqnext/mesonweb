/*
 * @Author: your name
 * @Date: 2020-11-10 07:22:35
 * @LastEditTime: 2021-03-18 10:02:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/global/global.js
 */
class Global {
    static apiHost = "https://meson.network";
    static coldCdnApiHost ="https://coldcdn.com"

    //s3 acc url
    static s3BindDomain = Global.coldCdnApiHost+"/api/cdn/hx9216";
}

export default Global;
/*
 * @Author: your name
 * @Date: 2020-11-10 07:22:35
 * @LastEditTime: 2020-11-10 07:30:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/global/global.js
 */
export class Global{
    static apiHost = process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:9090";
}
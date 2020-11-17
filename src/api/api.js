/*
 * @Author: your name
 * @Date: 2020-11-10 07:28:23
 * @LastEditTime: 2020-11-10 08:22:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/api/api.js
 */

 import axios, { AxiosResponse } from "axios";
const { Global } = require("../global/global");

async function ajax(url, data = {}, type = "GET") {
    let promise = null;
    switch (type) {
        case "GET":
            promise = axios.get(url, { params: data });
            break;
        case "POST":
            promise = axios.post(url, data);
            break;
        case "PUT":
            promise = axios.put(url, data);
            break;
        case "DELETE":
            promise = axios.delete(url, data);
            break;
        default:
            break;
    }

    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("请求超时");
        }, 30000);
    });

    const requestPromise = new Promise((resolve, reject) => {
        promise
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
                //console.log(error);
                reject(error);
            });
    });

    try {
        const result = await Promise.race([requestPromise, timeout]);
        const resultData = result;
        if (resultData.status === 101) {
            console.log({ path: url, code: 101, reason: "not authorized" });
            return null;
        } else if (resultData.status === 999) {
            console.log({ path: url, code: 999, reason: "unknown error" });
            return null;
        }
        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const BASE = Global.apiHost;

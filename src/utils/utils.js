/*
 * @Author: your name
 * @Date: 2021-05-17 11:47:50
 * @LastEditTime: 2021-06-02 09:44:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/utils/utils.js
 */

export default class  Utils {
    static Random6Num(){
        var mm=Math.random();
            let six = 0;
            if(mm>0.1)
            {
               six=Math.round(mm*1000000);
            }else{
               mm += 0.1;
               six = Math.round(mm*1000000);
            }
            return six;
    }

    static GetUrlParam(name, str) {
        const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`);
        const r = str.substr(1).match(reg);
        if (r != null) return  decodeURIComponent(r[2]); return null;
   }
}
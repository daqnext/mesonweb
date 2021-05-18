/*
 * @Author: your name
 * @Date: 2021-05-17 11:47:50
 * @LastEditTime: 2021-05-17 11:49:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/utils/utils.js
 */

class  Utils {
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
}
/*
 * @Author: your name
 * @Date: 2021-05-17 11:47:50
 * @LastEditTime: 2021-10-27 16:58:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/utils/utils.js
 */

export default class Utils {
    static Random6Num() {
        var mm = Math.random();
        let six = 0;
        if (mm > 0.1) {
            six = Math.round(mm * 1000000);
        } else {
            mm += 0.1;
            six = Math.round(mm * 1000000);
        }
        return six;
    }

    static GetUrlParam(name, str) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = str.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    static ParseMesonTokenStringToNormal(str) {
        if (str == "0") {
            return "0";
        }

        // delete left 0
        str = str.replace(/\b(0+)/gi, "");

        let result = "";
        let leftPart="0"
        let rightPart="0"
        if (str.length <= 18) {
            rightPart = str.padStart(18, "0");
            //console.log(rightPart);
        } else {
            leftPart = str.substring(0, str.length - 18);
            rightPart = str.substring(str.length - 18);
        }

        rightPart = rightPart.replace(/(0+)\b/gi, "");
            while(rightPart.length < 5) {
                rightPart=rightPart+"0"
            }
            result = leftPart + "." + rightPart;

        //console.log(result);
        return result
    }

    static ParseNormalToMesonTokenString(numStr){
        if (numStr=="0") {
            return "0"
        }
        
        let a=numStr.split(".")
        //console.log(a);
        let left=""
        let right=""
        
        if (a[0]=="0") {
            left=""
        }else if (a[0]=="-0") {
            left="-"
        }else{
            left=a[0]
        }
        
        if (a.length<=1) {
            right="000000000000000000"
        }else{
            right=a[1].substr(0,18)
            right=right.padEnd(18, "0")
        }
        
        if (left==""||left=="-"){
            right = right.replace(/\b(0+)/gi, "");
        }
        
        return left+right
    }

    static ParseUSDStringToNormal(str) {
        if (str == "0") {
            return "0";
        }

        // delete left 0
        str = str.replace(/\b(0+)/gi, "");

        let result = "";
        let leftPart="0"
        let rightPart="0"
        if (str.length <= 6) {
            rightPart = str.padStart(6, "0");
            //console.log(rightPart);
        } else {
            leftPart = str.substring(0, str.length - 6);
            rightPart = str.substring(str.length - 6);
        }

        rightPart = rightPart.replace(/(0+)\b/gi, "");
            while(rightPart.length < 6) {
                rightPart=rightPart+"0"
            }
            result = leftPart + "." + rightPart;

        //console.log(result);
        return result
    }
}

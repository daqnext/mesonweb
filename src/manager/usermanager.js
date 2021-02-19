/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2021-02-19 14:57:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/manager/usermanager.js
 */
import axios from "axios";
import Global from "../global/global";

var userinfo=null;

class UserManager
{


    static userinfo=null;
    static usertoken=null;


    static UserAuth={
        admin:'admin',
        client:'client',
        terminal: 'terminal',
        blog:'blog',
    }

    static checkUserHasAuth(auth){
        if(UserManager.userinfo==null){
            return false;
        }
        return UserManager.userinfo.authority.includes(auth);
    }



    static SetUserToken(token){
        localStorage.setItem('coldcdnusertoken', token);
    }

    static UnSetUserToken(){
        localStorage.setItem('coldcdnusertoken', null);
    }

    static GetUserToken(){
        let result= localStorage.getItem('coldcdnusertoken');
        if(result=='null'||result===null){
            return null;
        }
        return result;
    }

    static   GetUserInfo(){
        return UserManager.userinfo;
    }

    static async UpdateUserInfo(){
            //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            let response=  await axios.get(Global.apiHost+"/api/v1/user/userinfo",{headers: {
                    Authorization: "Bearer "+UserManager.GetUserToken()
                }});

            if(response.data.status==0){
                UserManager.userinfo=response.data.data;
                return;
            }

            /////wrong user
            UserManager.UnSetUserToken();
            console.log(response.data);

    }


    static TokenCheckAndRedirectLogin(){
        if(UserManager.GetUserToken()===null){
            window.location.href="/login";
        }
    }

    static UnsetTokenAndRedirectHome(){
        UserManager.UnSetUserToken();
        window.location.href="/";
    }



}

export default UserManager;
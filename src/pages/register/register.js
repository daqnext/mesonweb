
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './register.css'
import SendCode from "../../components/sendcode/sendcode";
import axios from "axios";
import { withAlert } from "react-alert";
import UserTypeSelector from "../../components/usertypes/usertypeselector";
import UserManager from "../../manager/usermanager";
import Global from "../../global/global";




class RegisterPage extends React.Component {


       constructor(props) {
        super(props);
        this.phoneinput={};
        this.phoneinput.country='cn';
        this.phoneinput.number='';
        this.phoneinput.countrycode='86';
        this.passwd='';
        this.passwd2='';
        this.vcode='';
        this.usertype='';
        this.username='';

    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        if(UserManager.GetUserToken()!=null){
            window.location.href="/welcome";
        }
    }



    checkusername(){
        if(this.username==""){
            this.props.alert.error("please input correct  username");
            return false;
        }
        return true;
    }




    checkphonenumber(){
        if(this.phoneinput.number==""){
            this.props.alert.error("please input correct phone number");
            return false;
        }
        return true;
    }

    checkvcode(){
        if(this.vcode==""){
            this.props.alert.error("please input correct vcode");
            return false;
        }
        return true;
    }

    checkpasswd(){
        if(this.passwd!=this.passwd2){
            this.props.alert.error("please input the same password!");
            return false;
        }

        if(this.passwd.length<5){
            this.props.alert.error("password length should be longer then 5");
            return false;
        }

        return true;
    }


    checkusertype(){

        if(this.usertype.length==0){
            this.props.alert.error("please select usertype");
            return false;
        }
        return true;
    }



    clicksendvcode(){

        if(!this.checkphonenumber()){
            return;
        }
        axios.post(Global.apiHost+"/api/v1/user/getvcode",
            {phonecountrycode:'+'+this.phoneinput.countrycode,
                phonenumber:this.phoneinput.number}).then(  (response)=>{
                    console.log(response);

                    if(response.data.status==2003){
                        this.props.alert.error("sorry Phone is already registered!");
                        return;
                    }

                    if(response&&response.data.status==102){
                        this.props.alert.error("please wait 60 seconds before you send verify code again");
                    }
        });
    }



    createAccount(){

        if(!this.checkusername()){
            return;
        }


        if(!this.checkpasswd()){
            return;
        }

        if(!this.checkusertype()){
            return;
        }


        if(!this.checkphonenumber()){
            return;
        }

        if(!this.checkvcode()){
            return;
        }


        axios.post(Global.apiHost+"/api/v1/user/register",
            {
                username:this.username,
                phonecountrycode:'+'+this.phoneinput.countrycode,
                phonenumber:this.phoneinput.number,
                passwd:this.passwd,
                vcode:this.vcode,
                usertype:this.usertype,
            })
            .then(  (response)=>{

                if(response.data.status==2004){
                    this.props.alert.error("sorry verify code wrong!");
                    return;
                }

                if(response.data.status==0){
                    console.log(response);
                    UserManager.SetUserToken(response.data.data);
                    window.location.href="/welcome";
                    return;
                }

                //console.log(response);
                this.props.alert.error("some thing wrong,please contact us!");
        });

    }


    render() {

        return (
            <AdminLayout name="Register" description="Register page">
                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label
                                    className="small mb-1"
                                    htmlFor="inputFirstName"
                                >
                                    UserName
                                </label>
                                <input
                                    className="form-control py-3"
                                    type="text"
                                    placeholder="Enter UserName"
                                    onChange={(event) => {
                                        this.username = event.target.value.trim();
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    className="small mb-1"
                                    htmlFor="inputPassword"
                                >
                                    Password
                                </label>
                                <input
                                    className="form-control py-3"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(event) => {
                                        this.passwd = event.target.value.trim();
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    className="small mb-1"
                                    htmlFor="inputConfirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="form-control py-3"
                                    type="password"
                                    placeholder="Confirm password"
                                    onChange={(event) => {
                                        this.passwd2 = event.target.value.trim();
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    className="small mb-1"
                                    htmlFor="inputConfirmPassword"
                                >
                                    PhoneNumber
                                </label>
                                <div className="phoneinputwrapper">
                                    <PhoneInput
                                        onChange={(
                                            value,
                                            data,
                                            event,
                                            formattedValue
                                        ) => {
                                            this.phoneinput.countrycode =
                                                data.dialCode;
                                            this.phoneinput.number = value.slice(
                                                data.dialCode.length
                                            );
                                            this.phoneinput.countrycode = this.phoneinput.countrycode.trim();
                                            this.phoneinput.number = this.phoneinput.number.trim();
                                        }}
                                        country={this.phoneinput.country}
                                        defaultMask={"..............................."}
                                        alwaysDefaultMask
                                        autoFormat={true}
                                        countryCodeEditable={false}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="small mb-1">
                                    select your user type
                                </label>
                                <UserTypeSelector
                                    callback={(usertype) => {
                                        this.usertype = usertype;
                                    }}
                                ></UserTypeSelector>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="small mb-1">
                                            smscode
                                        </label>
                                        <input
                                            className="form-control py-3"
                                            type="text"
                                            placeholder="Enter phone code"
                                            onChange={(event) => {
                                                this.vcode = event.target.value.trim();
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="small mb-1">
                                            send smscode
                                        </label>
                                        <div>
                                            <SendCode
                                                checkphonecorrect={() => {
                                                    return this.checkphonenumber();
                                                }}
                                                click={() => {
                                                    this.clicksendvcode();
                                                }}
                                            ></SendCode>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mt-4 mb-0">
                                <div
                                    className="btn btn-primary btn-block"
                                    onClick={() => {
                                        this.createAccount();
                                    }}
                                    href="#"
                                >
                                    Create Account
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <div className="small">
                            <a href="auth-login-basic.html">
                                Have an account? Go to login
                            </a>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(RegisterPage)

//export  default  RegisterPage;

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import axios from "axios";
import UserManager from "../../manager/usermanager";
import { withAlert } from "react-alert";


class LoginPage extends React.Component {


    constructor(props) {
        super(props);

        this.user='';
        this.passwd='';
    }

    checkfields(){

        if(this.user==""){
            this.props.alert.error("please input correct UserName");
            return false;
        }

        if(this.passwd.length<5){
            this.props.alert.error("please input correct password");
            return false;
        }

        return true;
    }



    submitlogin(){

        if(!this.checkfields()){
            return;
        }

        axios.post("/api/v1/user/login",
            {
                user: this.user,
                password: this.passwd,
                type:'username',
            }).then(  (response)=>{


            if(response&&response.data.status==0){
                //this.props.alert.error("please wait 60 seconds before you send verify code again");
                UserManager.SetUserToken(response.data.data);
                window.location.href="/welcome";
                return;
            }

            if(response&&response.data.status==2004){
                this.props.alert.error("UserName/Password wrong");
                return
            }


            console.log(response);
            /*
            if(response&&response.data.status==102){
                this.props.alert.error("please wait 60 seconds before you send verify code again");
            }
             */
        });
    }


    render() {
        return (
            <AdminLayout
                name="Login"
                description="login page"
            >


                <div className="card-body">

                    <form>

                        <div className="form-group">
                            <label className="small mb-1"  >UserName</label>
                            <input className="form-control py-4"  type="UserName"
                                   onChange={(event)=>{
                                       this.user=event.target.value.trim();
                                   }}
                                   placeholder="Enter UserName"/>
                        </div>

                        <div className="form-group">
                            <label className="small mb-1" htmlFor="inputPassword">Password</label>
                            <input className="form-control py-4" id="inputPassword"
                                   type="password"
                                   onChange={(event)=>{
                                this.passwd=event.target.value.trim();
                            }}
                                   placeholder="Enter password"/>
                        </div>


                        <div className="form-group displaynone">
                            <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox"/>
                                <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember
                                    password</label>
                            </div>
                        </div>

                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="small" href="auth-password-basic.html">Forgot Password?</a>
                            <a className="btn btn-primary" href="#" onClick={()=>{this.submitlogin();}}>Login</a>
                        </div>

                    </form>
                </div>
                <div className="card-footer text-center ">
                    <div className="small"><a href="auth-register-basic.html">Need an account? Sign up!</a></div>
                </div>

            </AdminLayout>
        );
    }
}

export default withAlert()(LoginPage)
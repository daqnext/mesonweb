
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import axios from "axios";
import UserManager from "../../manager/usermanager";
import { withAlert } from "react-alert";
import Global from "../../global/global";


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

        axios.post(Global.apiHost+"/api/v1/user/login",
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

            if(response&&response.data.status==2101){
                this.props.alert.error("User Not exist");
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


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        if(UserManager.GetUserToken()!=null){
            window.location.href="/welcome";
        }
    }


    render() {
        return (
            <AdminLayout
                name="Login"
                description="login page"
            >

                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label >User Name</label>
                                <input type="UserName" className="form-control"
                                       onChange={(event)=>{
                                           this.user=event.target.value.trim();
                                       }}
                                       aria-describedby="emailHelp" placeholder="Enter UserName" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input  className="form-control"
                                        type="password"
                                        onChange={(event)=>{
                                            this.passwd=event.target.value.trim();}}
                                        placeholder="Password" />
                            </div>
                            <div   className="btn btn-primary" onClick={()=>{this.submitlogin();}}>Login</div>
                        </form>
                        <div className="card-footer text-center ">
                            <div className="small">
                                <a href="auth-register-basic.html">Need an account? Sign up!</a></div>
                        </div>


                    </div>
                </div>



            </AdminLayout>
        );
    }
}

export default withAlert()(LoginPage)
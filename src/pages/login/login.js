import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import axios from "axios";
import UserManager from "../../manager/usermanager";
import { withAlert } from "react-alert";
import Utils from "../../utils/utils"
import Global from "../../global/global";
import Captcha from "react-captcha-code";
import PhoneInput from "react-phone-input-2";
import { times } from "chartist";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.phoneinput = {};
    this.phoneinput.country = "us";
    this.phoneinput.number = "";
    this.phoneinput.countrycode = "1";

    this.user = "";
    this.email ="";
    this.passwd = "";

    this.captchaId = 0;
    this.inputCode = "";
    this.captchaRef = null;
    this.captchaCode = "";

    this.state={
      loginType:"username",//"username","email" or "phone"
      captchaBase64: "data:image/png;base64,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"
    }
  }

  checkphonenumber() {
    if (this.state.loginType!="phone") {
      return true
    }

    if (this.phoneinput.number.length<=6) {
      this.props.alert.error("please input correct phone number");
      return false;
    }

    let reg=/^[0-9]*$/
    let pattern = new RegExp(reg)

    if (!pattern.test(this.phoneinput.number)){
      this.props.alert.error("please input correct phone number");
      return false;
    }

    return true;
  }

  checkemail(){
    if (this.state.loginType!="email") {
      return true
    }

    if (this.email.length<=4) {
      this.props.alert.error("please input correct email address");
      return false;
    }

    let reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    let pattern = new RegExp(reg)

    if (!pattern.test(this.email)){
      this.props.alert.error("please input correct email address");
      return false;
    }

    return true;
  }



  checkfields() {
    // if (this.captchaCode != this.inputCode) {
    //   this.props.alert.error("please input correct captcha");
    //   return false;
    // }

    if (this.inputCode.length!=4) {
      this.props.alert.error("please input correct captcha");
      return false;
    }

    if (this.state.loginType=="username"&&this.user == "") {
      this.props.alert.error("please input correct UserName");
      return false;
    }

    if (!this.checkemail()) {
      return false;
    }

    if (!this.checkphonenumber()) {
      return false;
    }

    if (this.passwd.length < 5) {
      this.props.alert.error("please input correct password");
      return false;
    }

    return true;
  }

  submitlogin() {
    if (!this.checkfields()) {
      return;
    }

    this.GetCaptchaFromServer()

    // type loginJson struct {
    //   UserName  string   `json:"username"`
    //   Email     string   `json:"email"`
    //   PhoneCode string   `json:"phonecountrycode"`
    //   PhoneNum  string   `json:"phonenumber"`
    //   Password string `json:"password" binding:"required"`
    //   Type     string `json:"type" binding:"required"`
    // }

    axios
      .post(Global.apiHost + "/api/v1/user/login", {
        username: this.user,
        email:this.email,
        phonecountrycode: "+" + this.phoneinput.countrycode,
        phonenumber: this.phoneinput.number,
        password: this.passwd,
        type: this.state.loginType,
        captcha:this.inputCode,
        captchaId:this.captchaId,
      })
      .then((response) => {
        if (response && response.data.status == 0) {
          UserManager.SetUserToken(response.data.data);
          window.location.href = "/welcome";
          return;
        }

        if (response && response.data.status == 105) {
          this.props.alert.error("User forbidden");
          return;
        }

        if (response && response.data.status == 107) {
          this.props.alert.error("Captcha wrong");
          return;
        }

        if (response && response.data.status == 2004) {
          this.props.alert.error("Password wrong");
          return;
        }

        if (response && response.data.status == 2101) {
          this.props.alert.error("User Not exist");
          return;
        }

        if (response && response.data.status == 2102) {
          this.props.alert.error("Email Not exist");
          return;
        }

        if (response && response.data.status == 2103) {
          this.props.alert.error("Phone Not exist");
          return;
        }

        //console.log(response);
        /*
            if(response&&response.data.status==102){
                this.props.alert.error("please wait 60 seconds before you send verify code again");
            }
             */
      });
  }

  async GetCaptchaFromServer(){
    let url = "/api/v1/user/getcaptcha"
    axios
      .get(Global.apiHost + url)
      .then((response) => {
        if (response&&response.data.status == 108){
          this.props.alert.error("Please wait at least 2 seconds before refresh");
          return;
        }
        if (response&&response.data.status == 0){
          this.setState({
            captchaBase64:response.data.data.base64Code
          })
          this.captchaId=response.data.data.id
          return;
        }
      })
  }

  async componentDidMount() {
    if (UserManager.GetUserInfo() == null) {
      await UserManager.UpdateUserInfo();
    }
    if (UserManager.GetUserToken() != null) {
      window.location.href = "/welcome";
    }
    this.GetCaptchaFromServer()
  }

  render() {
    return (
      <AdminLayout name="Login" description="login page">
        <div className="card border-light shadow-sm">
          <div className="card-body" style={{ color: "#555e68" }}>
            <form style={{ marginBottom: "20px", textAlign: "left" }}>
              {this.state.loginType=="username"&&
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="UserName"
                  className="form-control"
                  onChange={(event) => {
                    this.user = event.target.value.trim();
                  }}
                  aria-describedby="emailHelp"
                  placeholder="Enter UserName"
                />
              </div>}

              {this.state.loginType=="phone"&&
              <div className="form-group">
              <label className="small mb-1" htmlFor="inputConfirmPassword">
                PhoneNumber
              </label>
              <div className="phoneinputwrapper">
                <PhoneInput
                  onChange={(value, data, event, formattedValue) => {
                    this.phoneinput.countrycode = data.dialCode;
                    this.phoneinput.number = value.slice(data.dialCode.length);
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
              </div>}

              {this.state.loginType=="email"&&
              <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(event) => {
                  this.email = event.target.value.trim();
                }}
                aria-describedby="emailHelp"
                placeholder="Enter Email"
              />
              </div>}

              <div className="form-group">
              <div className="form-row">
                <label>
                  <input name="loginType" type="radio" value="" checked={this.state.loginType=="username"} onClick={
                      ()=>{
                        this.setState({loginType:"username"})
                      }
                  }/>
                  &nbsp;Username&nbsp;&nbsp;
                </label>
                <label>
                  <input name="loginType" type="radio" value="" checked={this.state.loginType=="email"} onClick={
                      ()=>{
                        this.setState({loginType:"email"})
                      }
                  }/>
                  &nbsp;Email&nbsp;&nbsp;
                </label>
                <label>
                  <input name="loginType" type="radio" value="" checked={this.state.loginType=="phone"} onClick={
                      ()=>{
                        this.setState({loginType:"phone"})
                      }
                  }/>
                  &nbsp;Phone&nbsp;&nbsp;
                </label>
              </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  onChange={(event) => {
                    this.passwd = event.target.value.trim();
                  }}
                  placeholder="Password"
                />
              </div>

              <div className="form-row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label className="small mb-2">Captcha</label>
                    <input
                      className="form-control py-3"
                      type="text"
                      placeholder="Enter captcha"
                      onChange={(event) => {
                        this.inputCode = event.target.value.trim();
                      }}
                    ></input>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label className="small mb-2">click to refresh</label>
                    <div style={{ textAlign: "left" }}>
                      {/* <Captcha
                        onRef={(ref) => {
                          this.captchaRef = ref.current;
                        }}
                        charNum={4}
                        onChange={(captcha) => {
                          this.captchaCode = captcha;
                        }}
                      /> */}
                      <img src={this.state.captchaBase64} alt="click to refresh" onClick={()=>{
                        this.GetCaptchaFromServer()
                      }}/>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>

              <div
                className="btn btn-primary-rocket"
                onClick={() => {
                  this.submitlogin();
                }}
              >
                Login
              </div>
              <div className="small" style={{marginTop:"5px"}}>
                <a className="a-rocket" href="/resetpassword">
                  Forget password?
                </a>
              </div>
            </form>
            <div className="card-footer text-center ">
              <div className="small">
                <a className="a-rocket" href="https://dashboard.meson.network/login/">
                  We have upgraded new dashboard, go to Meson 3.0 
                </a>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default withAlert()(LoginPage);

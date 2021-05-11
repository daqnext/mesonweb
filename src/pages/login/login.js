import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import axios from "axios";
import UserManager from "../../manager/usermanager";
import { withAlert } from "react-alert";
import Global from "../../global/global";
import Captcha from "react-captcha-code";
import PhoneInput from "react-phone-input-2";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.phoneinput = {};
    this.phoneinput.country = "cn";
    this.phoneinput.number = "";
    this.phoneinput.countrycode = "86";

    this.user = "";
    this.passwd = "";

    this.inputCode = "";

    //
    this.captchaRef = null;
    this.captchaCode = "";

    this.state={
      loginType:"username"//"username","email" or "phone"
    }
  }

  checkfields() {
    if (this.captchaCode != this.inputCode) {
      this.props.alert.error("please input correct captcha");
      return false;
    }

    if (this.user == "") {
      this.props.alert.error("please input correct UserName");
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

    if (this.captchaRef) {
      this.captchaRef.click();
    }

    axios
      .post(Global.apiHost + "/api/v1/user/login", {
        user: this.user,
        password: this.passwd,
        type: "username",
      })
      .then((response) => {
        if (response && response.data.status == 0) {
          UserManager.SetUserToken(response.data.data);
          window.location.href = "/welcome";
          return;
        }

        if (response && response.data.status == 2004) {
          this.props.alert.error("UserName/Password wrong");
          return;
        }

        if (response && response.data.status == 2101) {
          this.props.alert.error("User Not exist");
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

  async componentDidMount() {
    if (UserManager.GetUserInfo() == null) {
      await UserManager.UpdateUserInfo();
    }
    if (UserManager.GetUserToken() != null) {
      window.location.href = "/welcome";
    }
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
                  this.user = event.target.value.trim();
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
                      <Captcha
                        onRef={(ref) => {
                          this.captchaRef = ref.current;
                        }}
                        charNum={4}
                        onChange={(captcha) => {
                          this.captchaCode = captcha;
                        }}
                      />
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
                <a className="a-rocket" href="/register">
                  Forget password?
                </a>
              </div>
            </form>
            <div className="card-footer text-center ">
              <div className="small">
                <a className="a-rocket" href="/register">
                  Need an account? Sign up!
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

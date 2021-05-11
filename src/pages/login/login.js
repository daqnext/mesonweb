import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import axios from "axios";
import UserManager from "../../manager/usermanager";
import { withAlert } from "react-alert";
import Global from "../../global/global";
import Captcha from "react-captcha-code";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.user = "";
    this.passwd = "";
    this.inputCode = "";

    this.captchaRef = null;
    this.captchaCode = "";
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
          //this.props.alert.error("please wait 60 seconds before you send verify code again");
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

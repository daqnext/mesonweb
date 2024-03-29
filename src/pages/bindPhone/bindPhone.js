/*
 * @Author: your name
 * @Date: 2021-06-29 10:10:48
 * @LastEditTime: 2021-08-16 21:58:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/bindPhone/bindPhone.js
 */
import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SendCode from "../../components/sendcode/sendcode";
import axios from "axios";
import { withAlert } from "react-alert";
import UserTypeSelector from "../../components/usertypes/usertypeselector";
import UserManager from "../../manager/usermanager";
import Global from "../../global/global";
import Captcha from "react-captcha-code";
import Utils from "../../utils/utils"
class BindPhone extends React.Component {
  constructor(props) {
    super(props);
    this.phoneinput = {};
    this.phoneinput.country = "us";
    this.phoneinput.number = "";
    this.phoneinput.countrycode = "1";
    this.vcode = "";

    this.captchaId = 0;
    this.inputCode = "";
    this.captchaRef = null;
    this.captchaCode = "";

    this.state={
      captchaBase64: "data:image/png;base64,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"
    }
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
    this.GetCaptchaFromServer()
  }

  checkCaptcha() {
    // if (this.captchaCode != this.inputCode) {
    //   this.props.alert.error("please input correct captcha");
    //   return false;
    // }
    if (this.inputCode.length!=4) {
      this.props.alert.error("please input correct captcha");
      return false;
    }
    return true;
  }

  checkusername() {
    if (this.username == "") {
      this.props.alert.error("please input correct username");
      return false;
    }
    return true;
  }

  checkphonenumber() {
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

  
  checkvcode() {
    if (this.vcode.length<4||this.vcode.length>6) {
      this.props.alert.error("please input correct vcode");
      return false;
    }
    return true;
  }

 
  clicksendvcode() {
    if(this.state.loginType=="phone"&&!this.checkphonenumber()){
      return
    }

    axios
      .post(Global.apiHost + "/api/v1/user/registergetvcode", {
        phonecountrycode: "+" + this.phoneinput.countrycode,
        phonenumber: this.phoneinput.number,
      })
      .then((response) => {
        //console.log(response);

        if (response.data.status == 2003) {
          this.props.alert.error("Phone already exist");
          return;
        }

        if (response && response.data.status == 102) {
          this.props.alert.error(
            "please wait 60 seconds before you send verify code again"
          );
          return
        }

        if (response && response.data.status == 0) {
          this.props.alert.success(
            "VCode send"
          );
          return
        }
      });
  }

  

  createAccount() {
    if (!this.checkCaptcha()) {
      return;
    }

    if (!this.checkphonenumber()) {
      return;
    }

    if (!this.checkvcode()) {
      return;
    }

    let userInfo=UserManager.GetUserInfo()
    let userName=userInfo?userInfo.username:""

    this.GetCaptchaFromServer()

    axios
      .post(Global.apiHost + "/api/v1/user/bindphone", {
        username: userName,
        phonecountrycode: "+" + this.phoneinput.countrycode,
        phonenumber: this.phoneinput.number,
        vcode: this.vcode,
        captcha:this.inputCode,
        captchaId:this.captchaId,
      })
      .then((response) => {
        switch (response.data.status) {
          case 107:
            this.props.alert.error("Captcha wrong");
            return;
          case 2001:
            this.props.alert.error("User already exist!");            
            return;
          case 2002:
            this.props.alert.error("Email already exist!");
            return;
          case 2003:
            this.props.alert.error("Phone already exist!");
            return;
          case 2004:
            this.props.alert.error("verify code wrong!");
            return;
          case 2005:
            this.props.alert.error("User type error!");
            return;
          default:
            break;
        }

        if (response.data.status == 0) {
            this.props.alert.success("Bind Success");
          return;
        }

        //console.log(response);
        this.props.alert.error("some thing wrong,please contact us!");
      });
  }

  render() {
    return (
      <AdminLayout name="User" description="Bind Phone">
        <div className="card border-light shadow-sm">
          <div className="card-body" style={{ color: "#555e68" }}>
            <form style={{ textAlign: "left" }}>
            
              <div className="form-group">
                <label className="small mb-1" htmlFor="inputConfirmPassword">
                  PhoneNumber
                </label>
                <div className="phoneinputwrapper">
                  <PhoneInput
                    onChange={(value, data, event, formattedValue) => {
                      this.phoneinput.countrycode = data.dialCode;
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
                        onRef={(ref) => {this.captchaRef= ref.current}}
                        charNum={4}
                        onChange={(captcha) => {
                          this.captchaCode = captcha;
                          //captcha send to server
                        }}
                      /> */}
                      <img src={this.state.captchaBase64} alt="click to refresh" onClick={()=>{
                        this.GetCaptchaFromServer()
                      }}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-2">
                  <div className="form-group">
                    <label className="small mb-2">smscode</label>
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
                <div className="col-md-2">
                  <div className="form-group">
                    <label className="small mb-2">send smscode</label>
                    <div style={{ textAlign: "left" }}>
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
                  className="btn btn-primary-rocket btn-block"
                  onClick={() => {
                    this.createAccount();
                  }}
                  href="#"
                >
                  Bind Phone
                </div>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default withAlert()(BindPhone);

//export  default  RegisterPage;

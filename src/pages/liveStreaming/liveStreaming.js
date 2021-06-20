import React from "react";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
//import './binddomain.css'
import axios from "axios";
import { withAlert } from "react-alert";
import GetAllStreams from "./getAllStreams";
import Global from "../../global/global";

class LiveStreaming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataready: false,
      inputName: "",
      // inputurlerror:false,
      // checkandadd:false, //false means you need to check
    };

    //this.randomhash=this.makeid(6);

    //this.coldcdnDomainPrefix="coldcdn.com/api/cdn/"+this.randomhash;
  }

  // makeid(length) {
  //     var result           = '';
  //     var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  //     var charactersLength = characters.length;
  //     for ( var i = 0; i < length; i++ ) {
  //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  // }

  async componentDidMount() {
    if (UserManager.GetUserInfo() == null) {
      await UserManager.UpdateUserInfo();
    }
    UserManager.TokenCheckAndRedirectLogin();
    this.setState({
      dataready: true,
      inputName: this.state.inputName,
      // inputurlerror:this.state.inputurlerror,
      // checkandadd:this.state.checkandadd,
    });
  }

  nameCheck(str) {
    var pattern = new RegExp(
      /^[a-zA-Z\d\-\_]{5,30}$/
    ); // fragment locator
    return !!pattern.test(str);
  }

  createStream() {
    if (!this.nameCheck(this.state.inputName)) {
      this.props.alert.error("please input the correct stream name");
      return;
    }

    axios
      .post(
        Global.apiHost + "/api/v1/livestreaming/createmesonstream",
        {
          streamName: this.state.inputName,
        },
        {
          headers: {
            Authorization: "Bearer " + UserManager.GetUserToken(),
          },
        }
      )
      .then((response) => {
        if (response.data.status == 2301) {
          this.props.alert.error("No Alive live server. Please try later");
          //window.location.href = "/streams";
          return;
        }

        if (response.data.status == 2302) {
          this.props.alert.error(
            "User error. Please try later"
          );
          return;
        }

        if (response.data.status == 0) {
          this.props.alert.success("add successfully");
          setTimeout(function () {
            window.location.href = "/streams";
          }, 2000);
          return;
        }

        this.props.alert.error("some thing wrong,please contact us!");
      });
  }

  renderContent() {
    if (
      !this.state.dataready ||
      !UserManager.checkUserHasAuth(UserManager.UserAuth.client)
    ) {
      return (
        <div className="alert alert-danger" role="alert">
          Auth Required
        </div>
      );
    }

    return (
      <div className="card border-light shadow-sm">
        <div className="card-body" style={{ padding: "10px 20px" }}>
          <form>
            <div className="form-group">
                <strong className="mr-auto ml-1" style={{ color: "#555e68" }}>
                  stream name
                </strong>
              <input
                className="form-control"
                //value={this.state.inputurl}
                onChange={(event) => {
                  this.setState({inputName:event.target.value.trim()})
                  event.target.value=event.target.value.trim()
                }}
                type="text"
                placeholder="input your stream name (5-30 letters, a-z, A-Z, 0-9, -, _ only)"
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-3">
                <button
                  onClick={() => {
                    if (!UserManager.checkUserHasAuth(UserManager.UserAuth.livestream)) {
                      this.props.alert.error("No Auth. Please apply in our Telegram");
                      return
                    }
                    
                    console.log("Create Stream click,",this.state.inputName);
                    this.createStream()
                  }}
                  className="btn btn-primary-rocket"
                  type="button"
                >
                  Create Stream
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const Content = this.renderContent();

    return (
      <AdminLayout name="Client" description="Livestreaming">
        <div
          className="card-body"
          style={{
            background: "#3a3a3a",
            marginBottom: "15px",
            borderRadius: "7px",
            minHeight: "120px",
            color: "white",
            padding: "25px 20px",
          }}
        >
          <div style={{marginBottom:"10px",color: '#FFD234'}}>Livestreaming is not open to the public. Please apply in our <a style={{color:'yellow'}} href="https://t.me/mesonnetwork">Telegram</a> if you want to try.</div>
          <div>#####Tutorial on how to start livestreaming in meson###########</div>
          <div>First of all you need install OBS on your computer</div>
          <div>https://obsproject.com/</div>
          <div style={{ color: "yellow" }}>
            1. Input stream name and click [Create Stream]
          </div>
          <div style={{ color: "yellow" }}>
            2. A new record will appear in the table and input 'steam key' and 'RTMP ingest URL' into your OBS
          </div>
          <div style={{ color: "yellow" }}>
            3. Share the 'Playback URL' to your audiences
          </div>
          <div>
            {" "}
            Your livestreaming video will use the global acceleration service from meson{" "}
          </div>
          <div style={{marginTop:"10px"}}>Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials</div>
        </div>

        {Content}

        <div
          className="card border-light shadow-sm"
          style={{ marginTop: "20px" }}
        >
          <div className="card-body">
            <div style={{ marginTop: "10px" }}>
              <GetAllStreams></GetAllStreams>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default withAlert()(LiveStreaming);

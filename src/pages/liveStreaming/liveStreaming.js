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
          <div>#####Tutorial on how to accelerate your file ###########</div>
          <div>for example you want a file to be accelerated : </div>
          <div>https://yourdomain.com/static/testfiles/t1.jpg</div>
          <div style={{ color: "yellow" }}>
            1.you can input yourdomain.com into [add your location] then click
            [Check input url]
          </div>
          <div style={{ color: "yellow" }}>
            2.if no error then click [Add Record]
          </div>
          <div>
            {" "}
            after step 2 you will have a new record [in bottom table] with a cdn
            url like 'coldcdn.com/api/cdn/r7JEqR'
          </div>
          <div style={{ color: "yellow" }}>
            3.now you can simply replace the old url and get a new url:{" "}
          </div>
          <div>
            {" "}
            https://coldcdn.com/api/cdn/r7JEqR/static/testfiles/t1.jpg{" "}
          </div>
          <div>
            {" "}
            now request this new url and meson needs some time to deploy the
            file on distributed terminals globally
          </div>
          <div>
            {" "}
            anyone can request the new url which is accelerated by meson.net
            globally
          </div>
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

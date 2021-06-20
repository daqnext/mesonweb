/*
 * @Author: your name
 * @Date: 2021-06-03 09:59:52
 * @LastEditTime: 2021-06-17 12:53:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/liveStreaming/getAllStreams.js
 */
import React from "react";
import Global from "../../global/global";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import { withAlert } from "react-alert";

// StreamKey          string `json:"streamKey"`
// 	StreamName              string `json:"title"`
// 	UserId             uint `json:"userId"`
// 	Status             string `json:"status"`
// 	OriginServerIp     string `json:"OriginServerIp"`
// 	OriginServerDomain string `json:"originServerDomain"`
// 	Secret             string `json:"secret"`
// 	StreamPlatformType string `json:"streamPlatformType"`

class GetallStreams extends React.Component {
    constructor(props) {
        super(props);
        this.fieldnames = {
            id: "id",
            streamName:"stream name",
            streamKey:"stream key",
            rtmpUrl: "RTMP ingest URL",
            playbackUrl: "Playback URL",
            action: "Action",
            // state: "state",
        };

        this.state = {
            dataready: false,
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });
    }

    // async updatetable(rowdata) {
    //     let response = await axios.post(
    //         Global.apiHost + "/api/v1/client/modifydomainstate",
    //         {
    //             Id: rowdata["id"],
    //             State: rowdata["state"],
    //             ActiveRegion: rowdata["active_region"],
    //             BindName: rowdata["bindname"],
    //         },
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + UserManager.GetUserToken(),
    //             },
    //         }
    //     );

    //     if (response.data.status != 0) {
    //         return false;
    //     }
    //     return true;
    // }

    async gettabledata() {
        let response = await axios.get(
            Global.apiHost + "/api/v1/livestreaming/getuserstreaminfo",
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        // console.log(response.data.data);
        return response.data.data;
    }

    // async gettableupdateconfig() {
    //     if (this.updatecoloumsconfig) {
    //         return this.updatecoloumsconfig;
    //     }
    //     let response_rp = await axios.get(
    //         Global.apiHost + "/api/v1/common/regionprice",
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + UserManager.GetUserToken(),
    //             },
    //         }
    //     );

    //     let allregions = response_rp.data.data.allregions;

    //     this.updatecoloumsconfig = {
    //         state: {
    //             type: "singlesel",
    //             data: ["ON", "OFF"],
    //         },
    //         active_region: {
    //             type: "mulsel",
    //             data: allregions,
    //         },
    //     };

    //     return this.updatecoloumsconfig;
    // }

    renderRowItem(data, key) {
        if (key == "rtmpUrl") {
            
                return (
                    <td>
                        <span>rtmp://{data["originServerDomain"]+"/"+data["userId"]}</span>
                    </td>
                );
           
        }
        if (key == "playbackUrl") {
            
            return (
                <td>
                    <span>https://coldcdn.com/api/v1/livestreaming/play/{data["id"]}</span>
                </td>
            );
       
    }
        if (key == "state") {
            if (data[key] == true) {
                return (
                    <td>
                        <span className="badge badge-success">ON</span>{" "}
                    </td>
                );
            } else {
                return (
                    <td>
                        <span className="badge badge-dark">OFF</span>
                    </td>
                );
            }
        }
        if (key == "state") {
            if (data[key] == true) {
                return (
                    <td>
                        <span className="badge badge-success">ON</span>{" "}
                    </td>
                );
            } else {
                return (
                    <td>
                        <span className="badge badge-dark">OFF</span>
                    </td>
                );
            }
        }
        if (key == "action") {
            return (
                <td>
                    <div
                        style={{ display: "block", marginTop: "5px" }}
                        className="btn btn-secondary-rocket btn-sm"
                        onClick={async () => {
                            let response = await axios.post(
                                Global.apiHost + "/api/v1/livestreaming/deletestream",
                                {
                                    id: data.id,
                                    streamKey:data.streamKey,
                                },
                                {
                                    headers: {
                                        Authorization:
                                            "Bearer " +
                                            UserManager.GetUserToken(),
                                    },
                                }
                            );

                            if (response.data.status == 1201) {
                                this.props.alert.error("BindDomain not exist");
                                return;
                            }

                            if (response.data.status == 103) {
                                this.props.alert.error("param error");
                                return;
                            }

                            if (response.data.status == 0) {
                                this.props.alert.success("Delete successfully");
                                setTimeout(function () {
                                    window.location.href = "/streams";
                                }, 1000);
                                return;
                            }

                            this.props.alert.error(
                                "some thing wrong,please contact us!"
                            );
                        }}
                    >
                        Delete
                    </div>
                </td>
            );
        }

        return <td>{data[key]}</td>;
    }

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <DataTable
                fieldnames={this.fieldnames}
                gettabledata={this.gettabledata}
                renderRowItem={this.renderRowItem}
                //gettableupdateconfig={this.gettableupdateconfig}
                //updatetable={this.updatetable}
            ></DataTable>
        );
    }
}

export default withAlert()(GetallStreams);

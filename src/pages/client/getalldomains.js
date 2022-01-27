import React from "react";
import Global from "../../global/global";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import { withAlert } from "react-alert";

class GetallDomains extends React.Component {
    constructor(props) {
        super(props);
        this.fieldnames = {
            id: "id",
            state: "state",
            active_region: "active region",
            originurl: "user url",
            cdnurl: "cdn url",
            action: "Action",
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

    async updatetable(rowdata) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/client/modifydomainstate",
            {
                Id: rowdata["id"],
                State: rowdata["state"],
                ActiveRegion: rowdata["active_region"],
                BindName: rowdata["bindname"],
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            return false;
        }
        return true;
    }

    async gettabledata() {
        // let response = await axios.get(
        //     Global.apiHost + "/api/v1/client/getdomains",
        //     {
        //         headers: {
        //             Authorization: "Bearer " + UserManager.GetUserToken(),
        //         },
        //     }
        // );

        // // console.log(response.data.data);
        // return response.data.data;

        try {
            let response = await axios.get(
                Global.apiHost + "/api/v1/client/getdomains",
                {
                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                }
            );
            
            //console.log(response.data);
            if (response.data.status!=0) {
                this.props.alert.error("get bind domain error");
                return []
            }

            let domainArray=response.data.data
            for (let i = 0; i < response.data.data.length; i++) {
                if (domainArray[i].originurl=="ipfs.coldcdn.com") {
                    domainArray.splice(i,1)
                    //console.log(this.state.userIpfsBindName);
                    break
                }
            }

            return domainArray
        } catch (error) {
            this.props.alert.error("get bind domain error");
            return [];
        }
    }

    async gettableupdateconfig() {
        if (this.updatecoloumsconfig) {
            return this.updatecoloumsconfig;
        }
        let response_rp = await axios.get(
            Global.apiHost + "/api/v1/common/regionprice",
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        let allregions = response_rp.data.data.allregions;

        this.updatecoloumsconfig = {
            state: {
                type: "singlesel",
                data: ["ON", "OFF"],
            },
            active_region: {
                type: "mulsel",
                data: allregions,
            },
        };

        return this.updatecoloumsconfig;
    }

    renderRowItem(data, key) {
        if (key == "active_region") {
            let item_ar = data[key].map((ag, idx) => {
                return (
                    <span
                        style={{ marginRight: "10px" }}
                        className="badge badge-light"
                    >
                        {ag}
                    </span>
                );
            });
            return <td style={{ width: "20%" }}>{item_ar}</td>;
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
                        style={{ display: "block" }}
                        className="btn btn-primary-rocket btn-sm"
                        onClick={async () => {
                            let response = await axios.post(
                                Global.apiHost + "/api/v1/client/refreshdomain",
                                {
                                    id: data.id,
                                    bindname: data.bindname,
                                },
                                {
                                    headers: {
                                        Authorization:
                                            "Bearer " +
                                            UserManager.GetUserToken(),
                                    },
                                }
                            );

                            if (response.data.status == 0) {
                                this.props.alert.success("Refresh successfully");                               
                                return;
                            }

                            this.props.alert.error(
                                "some thing wrong,please contact us!"
                            );
                        }}                       
                    >
                        Refresh
                    </div>
                    <div
                        style={{ display: "block", marginTop: "5px" }}
                        className="btn btn-secondary-rocket btn-sm"
                        onClick={async () => {
                            let response = await axios.post(
                                Global.apiHost + "/api/v1/client/deletedomain",
                                {
                                    id: data.id,
                                    bindname:data.bindname,
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
                                    window.location.href = "/binddomain";
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
                gettableupdateconfig={this.gettableupdateconfig}
                updatetable={this.updatetable}
            ></DataTable>
        );
    }
}

export default withAlert()(GetallDomains);

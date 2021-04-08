/*
 * @Author: your name
 * @Date: 2020-12-05 08:06:27
 * @LastEditTime: 2021-04-08 15:09:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/userBlogList/userBlogList.js
 */

 import React,{useCallback} from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";
import DataTable from "../../components/table/datatable";
import moment from 'moment'
import TimeManager from "../../manager/timemanager";

class UserBlogList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 80,
            },
            {
                name: "title",
                header: "Title",
                defaultFlex: 1,
            },
            {
                name: "publish_time",
                header: "Publish time",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{ moment(value*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                }
            },
            {
                name: "action",
                header: "Action",
                defaultWidth: 140,
                render: ({ data }) => {
                    return (
                        <div style={{display:'flex'}}>
                            <div
                                style={{ display: "block" }}
                                className="btn btn-primary-rocket btn-sm"
                                onClick={async () => {
                                    console.log("edit click", data);
                                    //to editpage
                                    window.location.href = "/blogeditor?blog="+data.id;
                                }}
                            >
                                Edit
                            </div>
                            <div
                                style={{ display: "block",marginLeft:'5px' }}
                                className="btn btn-secondary-rocket btn-sm"
                                onClick={async () => {
                                    console.log("delete click", data);
                                    this.DeleteBlog(data.id);
                                }}
                            >
                                Delete
                            </div>
                        </div>
                    );
                },
            },
        ];


        this.state = {
            dataready: false,
            tableData: [],
        };
    }

    async DeleteBlog(id) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/blog/deleteblog",
            {
                id: id,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            this.props.alert.error("Delete config error");
            return;
        }

        this.props.alert.success("Delete Success");
        this.loadData();
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        if (TimeManager.timeZone == null) {
            await TimeManager.UpdateServerTimeZone();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });

        this.loadData();
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/blog/queryblog",
                        {
                            limit: limit,
                            offset: skip,
                        },
                        {
                            headers: {
                                Authorization:
                                    "Bearer " + UserManager.GetUserToken(),
                            },
                        }
                    )
                    .then((response) => {
                        if (response.data.status != 0) {
                            return [];
                        }
                        let responseData = response.data.data;
                        console.log(responseData);

                        let blogs = responseData.blogs;
                        
                        
                        return {
                            data: blogs,
                            count: responseData.total,
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        return (
            <div>
                <div></div>
                <ReactDataGrid
                    idProperty="id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    pagination
                    defaultLimit={10}
                    style={{ minHeight: 485 }}
                ></ReactDataGrid>
            </div>
        );
    };

    renderContent() {
        if (
            !this.state.dataready ||
            !UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)
        ) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
        }

        return (
            <div className="card border-light shadow-sm">
                <div className="card-body">
                     <this.DataGrid></this.DataGrid>
                </div>
            </div>
        );
    }

    render() {
        const Content = this.renderContent();
        return (
            <AdminLayout name="Blog" description="BlogList">
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(UserBlogList);
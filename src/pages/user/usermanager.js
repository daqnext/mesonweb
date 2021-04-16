/*
 * @Author: your name
 * @Date: 2021-03-24 19:15:34
 * @LastEditTime: 2021-04-13 17:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/user/usermanager.js
 */

import React,{useCallback} from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";
import axios from "axios";
import AdminContent from "../../components/layout/adminContent";
import UserManager from "../../manager/usermanager";
import moment from 'moment';

class UserManagerPage extends React.Component {


    constructor(props) {
        super(props);
        
        this.columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 80,
            },
            {
                name: "UserName",
                header: "UserName",
                defaultFlex: 1,
            },
            {
                name: "UserEmail",
                header: "email",
                defaultFlex: 1,
            },
            {
                name: "PhoneCode",
                header: "PhoneCode",
                defaultFlex: 1,
            },
            {
                name: "PhoneNumber",
                header: "Phone",
                defaultFlex: 1,
            },
            {
                name: "Created",
                header: "Created",
                defaultFlex: 1,
                render: ({ value }) => {
                    return moment(value * 1000).format("YYYY-MM-DD");
                },
            },
            {
                name: "Balance",
                header: "Balance",
                defaultFlex: 1,
                render: ({ value }) => {
                    return (value/1e9).toFixed(5);
                },
            },
            {
                name: "Token",
                header: "Token",
                defaultFlex: 1,
                render: ({ value }) => {
                    return (value/1e9).toFixed(5);
                },
            },
        ]
        
        this.state={
            dataready:false,
            tableData: [],
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true
        });

        this.loadData()
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/admin/queryuser",
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

                        let userInfos = responseData.users;
                        let tableData = [];
                        for (
                            let index = 0;
                            index < userInfos.length;
                            index++
                        ) {
                            const userInfo = userInfos[index];
                            let tData = {
                                id: userInfo.ID,
                                PhoneCode:userInfo.PhoneCode,
                                PhoneNumber:userInfo.PhoneNumber,
                                UserEmail:userInfo.UserEmail,
                                Token:userInfo.Token,
                                Balance:userInfo.Balance,
                                UserName:userInfo.UserName,
                                UserType:userInfo.UserType,
                                Credit:userInfo.Credit,
                                Created:userInfo.Created,
                                Forbidden:userInfo.Forbidden,
                                info: userInfo,
                            };
                            tableData.push(tData);
                        }
                        return {
                            data: tableData,
                            count: parseInt(responseData.total),
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


    renderContent(){
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
            <div className="  border-light shadow-sm">
                <this.DataGrid></this.DataGrid>
            </div>
        );
    }

    render() {

        const Content=this.renderContent();

        return (
            <AdminLayout
                name="Admin"
                description="UserManager"
            >
                {Content}
            </AdminLayout>
        );
    }
}

export  default  UserManagerPage;
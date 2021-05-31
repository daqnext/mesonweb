/*
 * @Author: your name
 * @Date: 2020-11-24 08:20:25
 * @LastEditTime: 2021-05-11 22:08:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/adminMachine/adminTestSpeeder.js
 */

import React, { useCallback } from "react";
 import ReactDataGrid from "@inovua/reactdatagrid-community";
 import Global from "../../global/global";
 import axios from "axios";
 import UserManager from "../../manager/usermanager";
 export default class AdminSpeedTester extends React.Component {
     constructor(props) {
         super(props);

         this.columns = [
             {
                 name: "id",
                 header: "ID",
                 defaultWidth: 80,
             },
             {
                 name: "machine_mac",
                 header: "Mac Addr",
                 defaultFlex: 1,
             },
             {
                 name: "machine_ip",
                 header: "IP",
                 defaultFlex: 1,
             },
             {
                 name: "port",
                 header: "port",
                 defaultFlex: 1,
             },
             {
                 name: "continent",
                 header: "continent",
                 defaultFlex: 1,
             },
             {
                 name: "country",
                 header: "place",
                 defaultFlex: 1,
             },
             {
                 name: "city",
                 header: "city",
                 defaultFlex: 1,
             },
             {
                 name: "area",
                 header: "area",
                 defaultFlex: 1,
             },
             {
                 name: "disk_usage",
                 header: "disk_usage",
                 defaultFlex: 1,
                 render: ({ value }) => {
                     let percent = value;
                     let width2 = percent + "%";
                     //console.log(width2);

                     let className = "progress-bar bg-secondary";
                     if (percent < 60) {
                         className = "progress-bar bg-tertiary";
                     } else if (percent < 85) {
                         className = "progress-bar bg-primary";
                     }
                     return (
                         <div>
                             <div>{width2}</div>
                             <div className="progress mb-0">
                                 <div
                                     className={className}
                                     role="progressbar"
                                     aria-valuenow={'"' + percent + '"'}
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{ width: percent + "px" }}
                                 ></div>
                             </div>
                         </div>
                     );
                 },
             },
             {
                 name: "memory_usage",
                 header: "memory_usage",
                 defaultFlex: 1,
                 render: ({ value }) => {
                     let percent = value;
                     let className = "progress-bar bg-secondary";
                     if (percent < 60) {
                         className = "progress-bar bg-tertiary";
                     } else if (percent < 85) {
                         className = "progress-bar bg-primary";
                     }
                     return (
                         <div>
                             <div>{percent + "%"}</div>
                             <div className="progress mb-0">
                                 <div
                                     className={className}
                                     role="progressbar"
                                     aria-valuenow={'"' + percent + '"'}
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{ width: percent + "px" }}
                                 ></div>
                             </div>
                         </div>
                     );
                 },
             },
             {
                 name: "machine_status",
                 header: "status",
                 defaultFlex: 1,
                 render: ({ value }) => {
                     if (value === "up") {
                         return (
                             <td>
                                 <span className="status-on"></span> &nbsp;ON
                             </td>
                         );
                     } else {
                         return (
                             <td>
                                 <span className="status-down"></span>{" "}
                                 &nbsp;DOWN
                             </td>
                         );
                     }
                 },
             },
         ];

         this.state = {
             tableData: [],
         };
     }

     async componentDidMount() {
         this.loadData();
     }

     loadData = null;
     DataGrid = () => {
         const loadData = useCallback(() => {
             const data = ({ skip, limit, sortInfo }) => {
                 console.log(skip, limit);
                 return axios
                     .post(
                         Global.apiHost + "/api/v1/admin/allspeedtesters",
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

                         let terminalInfos = responseData.data;
                         if (terminalInfos==null) {
                            return [];
                        }
                         let tableData = [];
                         for (
                             let index = 0;
                             index < terminalInfos.length;
                             index++
                         ) {
                             const terminalInfo = terminalInfos[index];
                             let tData = {
                                 id: terminalInfo.id,
                                 machine_mac: terminalInfo.machine_mac,
                                 machine_ip: terminalInfo.machine_ip,
                                 port: terminalInfo.port,
                                 country: terminalInfo.country,
                                 continent: terminalInfo.continent,
                                 area: terminalInfo.area,
                                 city: terminalInfo.city,
                                 disk_usage: (
                                     ((terminalInfo.machine_total_disk -
                                         terminalInfo.machine_available_disk) /
                                         terminalInfo.machine_total_disk) *
                                     100
                                 ).toFixed(2),
                                 memory_usage: (
                                     ((terminalInfo.machine_total_memory -
                                         terminalInfo.machine_free_memory) /
                                         terminalInfo.machine_total_memory) *
                                     100
                                 ).toFixed(2),
                                 machine_status: terminalInfo.machine_status,
                                 info: terminalInfo,
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

     render() {
         return (
             <div className="  border-light shadow-sm">
                 <this.DataGrid></this.DataGrid>
             </div>
         );
     }
 }
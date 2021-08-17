/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2021-08-02 20:30:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminal/terminals.js
 */

import React, { useCallback } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import "./terminals.css";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";
import DataTable from "../../components/table/datatable";
import { Confirm } from "../../components/confirm/confirm";

const countryList = [
    ["AD", "Andorra"],
    ["AE", "United Arab Emirates"],
    ["AF", "Afghanistan"],
    ["AG", "Antigua and Barbuda"],
    ["AI", "Anguilla"],
    ["AL", "Albania"],
    ["AM", "Armenia"],
    ["AO", "Angola"],
    ["AQ", "Antarctica"],
    ["AR", "Argentina"],
    ["AS", "American Samoa"],
    ["AT", "Austria"],
    ["AU", "Australia"],
    ["AW", "Aruba"],
    ["AX", "Aland Islands"],
    ["AZ", "Azerbaijan"],
    ["BA", "Bosnia and Herzegovina"],
    ["BB", "Barbados"],
    ["BD", "Bangladesh"],
    ["BE", "Belgium"],
    ["BF", "Burkina Faso"],
    ["BG", "Bulgaria"],
    ["BH", "Bahrain"],
    ["BI", "Burundi"],
    ["BJ", "Benin"],
    ["BL", "Saint Barthelemy"],
    ["BM", "Bermuda"],
    ["BN", "Brunei Darussalam"],
    ["BO", "Bolivia (Plurinational State of)"],
    ["BQ", "Bonaire, Sint Eustatius and Saba"],
    ["BR", "Brazil"],
    ["BS", "Bahamas"],
    ["BT", "Bhutan"],
    ["BV", "Bouvet Island"],
    ["BW", "Botswana"],
    ["BY", "Belarus"],
    ["BZ", "Belize"],
    ["CA", "Canada"],
    ["CC", "Cocos (Keeling) Islands"],
    ["CD", "Congo (Democratic Republic of the)"],
    ["CF", "Central African Republic"],
    ["CG", "Congo"],
    ["CH", "Switzerland"],
    ["CI", "Cote d'Ivoire"],
    ["CK", "Cook Islands"],
    ["CL", "Chile"],
    ["CM", "Cameroon"],
    ["CN", "China"],
    ["CO", "Colombia"],
    ["CR", "Costa Rica"],
    ["CU", "Cuba"],
    ["CV", "Cabo Verde"],
    ["CW", "Curaçao"],
    ["CX", "Christmas Island"],
    ["CY", "Cyprus"],
    ["CZ", "Czechia"],
    ["DE", "Germany"],
    ["DJ", "Djibouti"],
    ["DK", "Denmark"],
    ["DM", "Dominica"],
    ["DO", "Dominican Republic"],
    ["DZ", "Algeria"],
    ["EC", "Ecuador"],
    ["EE", "Estonia"],
    ["EG", "Egypt"],
    ["EH", "Western Sahara"],
    ["ER", "Eritrea"],
    ["ES", "Spain"],
    ["ET", "Ethiopia"],
    ["FI", "Finland"],
    ["FJ", "Fiji"],
    ["FK", "Falkland Islands (Malvinas)"],
    ["FM", "Micronesia (Federated States of)"],
    ["FO", "Faroe Islands"],
    ["FR", "France"],
    ["GA", "Gabon"],
    ["GB", "United Kingdom of Great Britain and Northern Ireland"],
    ["GD", "Grenada"],
    ["GE", "Georgia"],
    ["GF", "French Guiana"],
    ["GG", "Guernsey"],
    ["GH", "Ghana"],
    ["GI", "Gibraltar"],
    ["GL", "Greenland"],
    ["GM", "Gambia"],
    ["GN", "Guinea"],
    ["GP", "Guadeloupe"],
    ["GQ", "Equatorial Guinea"],
    ["GR", "Greece"],
    ["GS", "South Georgia and the South Sandwich Islands"],
    ["GT", "Guatemala"],
    ["GU", "Guam"],
    ["GW", "Guinea-Bissau"],
    ["GY", "Guyana"],
    ["HK", "Hong Kong"],
    ["HM", "Heard Island and McDonald Islands"],
    ["HN", "Honduras"],
    ["HR", "Croatia"],
    ["HT", "Haiti"],
    ["HU", "Hungary"],
    ["ID", "Indonesia"],
    ["IE", "Ireland"],
    ["IL", "Israel"],
    ["IM", "Isle of Man"],
    ["IN", "India"],
    ["IO", "British Indian Ocean Territory"],
    ["IQ", "Iraq"],
    ["IR", "Iran (Islamic Republic of)"],
    ["IS", "Iceland"],
    ["IT", "Italy"],
    ["JE", "Jersey"],
    ["JM", "Jamaica"],
    ["JO", "Jordan"],
    ["JP", "Japan"],
    ["KE", "Kenya"],
    ["KG", "Kyrgyzstan"],
    ["KH", "Cambodia"],
    ["KI", "Kiribati"],
    ["KM", "Comoros"],
    ["KN", "Saint Kitts and Nevis"],
    ["KP", "Korea (Democratic People's Republic of)"],
    ["KR", "Korea (Republic of)"],
    ["KW", "Kuwait"],
    ["KY", "Cayman Islands"],
    ["KZ", "Kazakhstan"],
    ["LA", "Lao People's Democratic Republic"],
    ["LB", "Lebanon"],
    ["LC", "Saint Lucia"],
    ["LI", "Liechtenstein"],
    ["LK", "Sri Lanka"],
    ["LR", "Liberia"],
    ["LS", "Lesotho"],
    ["LT", "Lithuania"],
    ["LU", "Luxembourg"],
    ["LV", "Latvia"],
    ["LY", "Libya"],
    ["MA", "Morocco"],
    ["MC", "Monaco"],
    ["MD", "Moldova (Republic of)"],
    ["ME", "Montenegro"],
    ["MF", "Saint Martin (French Part)"],
    ["MG", "Madagascar"],
    ["MH", "Marshall Islands"],
    ["MK", "North Macedonia"],
    ["ML", "Mali"],
    ["MM", "Myanmar"],
    ["MN", "Mongolia"],
    ["MO", "Macao"],
    ["MP", "Northern Mariana Islands"],
    ["MQ", "Martinique"],
    ["MR", "Mauritania"],
    ["MS", "Montserrat"],
    ["MT", "Malta"],
    ["MU", "Mauritius"],
    ["MV", "Maldives"],
    ["MW", "Malawi"],
    ["MX", "Mexico"],
    ["MY", "Malaysia"],
    ["MZ", "Mozambique"],
    ["NA", "Namibia"],
    ["NC", "New Caledonia"],
    ["NE", "Niger"],
    ["NF", "Norfolk Island"],
    ["NG", "Nigeria"],
    ["NI", "Nicaragua"],
    ["NL", "Netherlands"],
    ["NO", "Norway"],
    ["NP", "Nepal"],
    ["NR", "Nauru"],
    ["NU", "Niue"],
    ["NZ", "New Zealand"],
    ["OM", "Oman"],
    ["PA", "Panama"],
    ["PE", "Peru"],
    ["PF", "French Polynesia"],
    ["PG", "Papua New Guinea"],
    ["PH", "Philippines"],
    ["PK", "Pakistan"],
    ["PL", "Poland"],
    ["PM", "Saint Pierre and Miquelon"],
    ["PN", "Pitcairn"],
    ["PR", "Puerto Rico"],
    ["PS", "Palestine, State of"],
    ["PT", "Portugal"],
    ["PW", "Palau"],
    ["PY", "Paraguay"],
    ["QA", "Qatar"],
    ["RE", "Reunion"],
    ["RO", "Romania"],
    ["RS", "Serbia"],
    ["RU", "Russian Federation"],
    ["RW", "Rwanda"],
    ["SA", "Saudi Arabia"],
    ["SB", "Solomon Islands"],
    ["SC", "Seychelles"],
    ["SD", "Sudan"],
    ["SE", "Sweden"],
    ["SG", "Singapore"],
    ["SH", "Saint Helena, Ascension and Tristan da Cunha"],
    ["SI", "Slovenia"],
    ["SJ", "Svalbard and Jan Mayen"],
    ["SK", "Slovakia"],
    ["SL", "Sierra Leone"],
    ["SM", "San Marino"],
    ["SN", "Senegal"],
    ["SO", "Somalia"],
    ["SR", "Suriname"],
    ["SS", "South Sudan"],
    ["ST", "Sao Tome and Principe"],
    ["SV", "El Salvador"],
    ["SX", "Sint Maarten (Dutch Part)"],
    ["SY", "Syrian Arab Republic"],
    ["SZ", "Eswatini"],
    ["TC", "Turks and Caicos Islands"],
    ["TD", "Chad"],
    ["TF", "French Southern Territories"],
    ["TG", "Togo"],
    ["TH", "Thailand"],
    ["TJ", "Tajikistan"],
    ["TK", "Tokelau"],
    ["TL", "Timor-Leste"],
    ["TM", "Turkmenistan"],
    ["TN", "Tunisia"],
    ["TO", "Tonga"],
    ["TR", "Turkey"],
    ["TT", "Trinidad and Tobago"],
    ["TV", "Tuvalu"],
    ["TW", "Taiwan (Province of China)"],
    ["TZ", "Tanzania, United Republic of"],
    ["UA", "Ukraine"],
    ["UG", "Uganda"],
    ["UM", "United States Minor Outlying Islands"],
    ["US", "United States of America"],
    ["UY", "Uruguay"],
    ["UZ", "Uzbekistan"],
    ["VA", "Holy See"],
    ["VC", "Saint Vincent and the Grenadines"],
    ["VE", "Venezuela (Bolivarian Republic of)"],
    ["VG", "Virgin Islands (British)"],
    ["VI", "Virgin Islands (U.S.)"],
    ["VN", "Viet Nam"],
    ["VU", "Vanuatu"],
    ["WF", "Wallis and Futuna"],
    ["WS", "Samoa"],
    ["YE", "Yemen"],
    ["YT", "Mayotte"],
    ["ZA", "South Africa"],
    ["ZM", "Zambia"],
    ["ZW", "Zimbabwe"],
];

class TerminalPage extends React.Component {
    constructor(props) {
        super(props);

        this.countryMap = {};
        for (let i = 0; i < countryList.length; i++) {
            this.countryMap[countryList[i][1]] = countryList[i][0];
        }
        console.log(this.countryMap);

        this.tableData = {
            data: [],
            count: 0,
        };

        this.columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 150,
                editable: false,
                render: ({ value }) => {
                    return <div>{"id-" + value}</div>;
                },
            },
            // {
            //     name: "machine_mac",
            //     header: "Mac Addr",
            //     defaultFlex: 1,
            // },
            {
                name: "machine_ip",
                header: "IP",
                defaultFlex: 0.8,
                editable: false,
            },
            {
                name: "port",
                header: "port",
                defaultFlex: 0.4,
                editable: false,
            },
            {
                name: "country",
                header: "place",
                defaultFlex: 1.5,
                shouldComponentUpdate: () => true,
                render: (value) => {
                    console.log(this.state.ipCountryMap[value.data.info.machine_ip]);
                    return (
                        <select
                            className="custom-select"
                            id="inlineFormCustomSelectMesages"
                            //value={this.state.ipCountryMap[value.data.info.machine_ip]}
                            defaultValue={this.state.ipCountryMap[value.data.info.machine_ip]}
                            onChange={(e) => {
                                console.log(value);
                                console.log(e.target.defaultValue);
                                console.log(e.target.value);

                                const recordInfo = value.data.info;
                                const newCountryCode = e.target.value;
                                console.log("ip:", recordInfo.machine_ip);
                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    "You will permanently change the location of your machine.",
                                    true,
                                    "warning",
                                    "primary",
                                    "Confirm",
                                    () => {
                                        //change state
                                        const ipCountryMap = { ...this.state.ipCountryMap };
                                        console.log(ipCountryMap);
                                        for (const key in ipCountryMap) {
                                            if (key == recordInfo.machine_ip) {
                                                ipCountryMap[recordInfo.machine_ip] = newCountryCode;
                                                break;
                                            }
                                        }
                                        console.log(ipCountryMap);
                                        this.setState({ ipCountryMap: ipCountryMap }, () => {
                                            console.log("state set");
                                            console.log(this.state.ipCountryMap);
                                            //this.reRenderTable();
                                        });

                                        // axios.post(
                                        //     Global.apiHost + "/api/v1/terminal/modifyiplocation",
                                        //     {
                                        //         Ip: recordInfo.machine_ip,
                                        //         CountryCode: newCountryCode,
                                        //         MachineTag:recordInfo.id
                                        //     },
                                        //     {
                                        //         headers: {
                                        //             Authorization: "Bearer " + UserManager.GetUserToken(),
                                        //         },
                                        //     }
                                        // );

                                        //this.loadData();
                                    }
                                );
                            }}
                        >
                            {countryList.map((value, index, array) => {
                                return (
                                    <option key={index} value={value[0]}>
                                        {value[1]}
                                    </option>
                                );
                            })}
                        </select>
                    );
                },
            },
            // {
            //     name: "city",
            //     header: "city",
            //     defaultFlex: 1,
            // },
            {
                name: "speed_mbs",
                header: "speed",
                defaultFlex: 0.6,
                editable: false,
                render: ({ value }) => {
                    return <div>{value.toFixed(2)} Mb/s</div>;
                },
            },
            {
                name: "cdn_space_usage",
                header: "cdn_space_usage",
                defaultFlex: 0.9,
                editable: false,
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
            // {
            //     name: "disk_usage",
            //     header: "disk_usage",
            //     defaultFlex: 1,
            //     render: ({ value }) => {
            //         let percent = value;
            //         let width2 =   percent + "%" ;
            //         //console.log(width2);

            //         let className = "progress-bar bg-secondary";
            //         if (percent < 60) {
            //             className = "progress-bar bg-tertiary";
            //         } else if (percent < 85) {
            //             className = "progress-bar bg-primary";
            //         }
            //         return (
            //             <div>
            //                 <div>{width2}</div>
            //                 <div className="progress mb-0">
            //                     <div className={className} role="progressbar"
            //                          aria-valuenow={'"'+percent+'"'}
            //                          aria-valuemin="0" aria-valuemax="100"
            //                          style={{width:percent+'px'}} ></div>
            //                 </div>
            //             </div>

            //         );
            //     },
            // },
            {
                name: "memory_usage",
                header: "memory_usage",
                defaultFlex: 0.8,
                editable: false,
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
                name: "version",
                header: "version",
                defaultFlex: 0.4,
                editable: false,
                render: ({ value }) => {
                    if (this.state.terminalAllowVersion != "") {
                        let allowVersionStr = this.state.terminalAllowVersion.split(".");
                        let terminalVersionStr = value.split(".");
                        let disableVersion = false;
                        for (let i = 0; i < allowVersionStr.length; i++) {
                            if (parseInt(allowVersionStr[i]) > parseInt(terminalVersionStr[i])) {
                                disableVersion = true;
                                break;
                            } else if (parseInt(allowVersionStr[i]) < parseInt(terminalVersionStr[i])) {
                                disableVersion = false;
                                break;
                            }

                            if (disableVersion == true) {
                                return (
                                    <td>
                                        <div>
                                            <span className="disable-version"></span>
                                            &nbsp;{value}
                                        </div>
                                        <div>Disable Version</div>
                                    </td>
                                );
                            }
                        }
                    }

                    if (this.state.terminalLatestVersion != "") {
                        if (this.state.terminalLatestVersion != value) {
                            return (
                                <div>
                                    <div>
                                        <span className="low-version"></span>
                                        &nbsp;{value}
                                    </div>
                                    <div>Low Version</div>
                                </div>
                            );
                        }
                    }

                    return (
                        <div>
                            <span className="status-on"></span>
                            &nbsp;{value}
                        </div>
                    );
                },
            },
            {
                name: "machine_status",
                header: "status",
                defaultFlex: 0.4,
                editable: false,
                render: ({ value }) => {
                    if (value === "up") {
                        return (
                            <div>
                                <span className="status-on"></span> &nbsp;ON
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <span className="status-down"></span> &nbsp;DOWN
                            </div>
                        );
                    }
                },
            },
        ];

        this.tutorial_sys = ["linux 64 bit", "linux 32 bit", "winserver 64 bit", "winserver 32 bit", "mac 64 bit"];

        this.state = {
            dataready: false,
            tableData: [],
            tutorialsys: "linux 64 bit",
            terminalAllowVersion: "",
            terminalLatestVersion: "",
            ipCountryMap: {},
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

        this.GetTerminalAllowVersion();
        this.loadData();
    }

    async GetTerminalAllowVersion() {
        let response = await axios.get(Global.apiHost + "/api/v1/common/terminalversion");
        if (response.data.status == 0) {
            this.setState({
                terminalAllowVersion: response.data.data.allowVersion,
                terminalLatestVersion: response.data.data.latestVersion,
            });
        }
    }

    loadData = null;
    reRenderTable = null;
    DataGrid = () => {
        const columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 150,
                editable: false,
                render: ({ value }) => {
                    return <div>{"id-" + value}</div>;
                },
            },
            // {
            //     name: "machine_mac",
            //     header: "Mac Addr",
            //     defaultFlex: 1,
            // },
            {
                name: "machine_ip",
                header: "IP",
                defaultFlex: 0.8,
                editable: false,
            },
            {
                name: "port",
                header: "port",
                defaultFlex: 0.4,
                editable: false,
            },
            {
                name: "country",
                header: "place",
                defaultFlex: 1.5,
                shouldComponentUpdate: () => true,
                style: {padding:"0"},
                render: useCallback(({ data }) => {
                    //console.log(data);
                    return (
                        <select
                            className="custom-select"
                            id="inlineFormCustomSelectMesages"
                            value={this.state.ipCountryMap[data.info.machine_ip]}
                            onChange={(e) => {
                                console.log(data);
                                console.log(e.target.value);
                                const recordInfo = data;
                                const newCoutry = e.target.value;
                                const onConfirm = async () => {
                                    const response = await axios.post(
                                        Global.apiHost + "/api/v1/terminal/modifyiplocation",
                                        {
                                            Ip: recordInfo.machine_ip,
                                            CountryCode: newCoutry,
                                            MachineTag: recordInfo.id,
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + UserManager.GetUserToken(),
                                            },
                                        }
                                    );

                                    if (!response || !response.data) {
                                        this.props.alert.error("request error");
                                        return;
                                    }

                                    if (response.data.status === 101) {
                                        this.props.alert.error("Have no auth");
                                        return;
                                    }

                                    if (response.data.status === 103) {
                                        this.props.alert.error("Request params error");
                                        return;
                                    }
                                    if (response.data.status === 5002) {
                                        this.props.alert.error("Can not find terminal");
                                        return;
                                    }

                                    if (response.data.status !== 0) {
                                        this.props.alert.error("Can not find terminal");
                                        return;
                                    }

                                    const ipCountryMap = { ...this.state.ipCountryMap };
                                    for (const key in ipCountryMap) {
                                        if (key == data.machine_ip) {
                                            ipCountryMap[data.machine_ip] = newCoutry;
                                        }
                                    }
                                    this.setState({ ipCountryMap: ipCountryMap });
                                    this.props.alert.success("Location changed");
                                };

                                Confirm.ShowConfirm(
                                    "warning",
                                    "Are you sure",
                                    "You will permanently change the location of your machine.",
                                    true,
                                    "warning",
                                    "primary",
                                    "Confirm",
                                    onConfirm
                                );

                                
                            }}
                        >
                            {countryList.map((value, index, array) => {
                                return (
                                    <option key={index} value={value[0]}>
                                        {value[1]}
                                    </option>
                                );
                            })}
                        </select>
                    );
                }, []),
            },
            // {
            //     name: "city",
            //     header: "city",
            //     defaultFlex: 1,
            // },
            {
                name: "speed_mbs",
                header: "speed",
                defaultFlex: 0.6,
                editable: false,
                render: ({ value }) => {
                    return <div>{value.toFixed(2)} Mb/s</div>;
                },
            },
            {
                name: "cdn_space_usage",
                header: "cdn_space_usage",
                defaultFlex: 0.9,
                editable: false,
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
            // {
            //     name: "disk_usage",
            //     header: "disk_usage",
            //     defaultFlex: 1,
            //     render: ({ value }) => {
            //         let percent = value;
            //         let width2 =   percent + "%" ;
            //         //console.log(width2);

            //         let className = "progress-bar bg-secondary";
            //         if (percent < 60) {
            //             className = "progress-bar bg-tertiary";
            //         } else if (percent < 85) {
            //             className = "progress-bar bg-primary";
            //         }
            //         return (
            //             <div>
            //                 <div>{width2}</div>
            //                 <div className="progress mb-0">
            //                     <div className={className} role="progressbar"
            //                          aria-valuenow={'"'+percent+'"'}
            //                          aria-valuemin="0" aria-valuemax="100"
            //                          style={{width:percent+'px'}} ></div>
            //                 </div>
            //             </div>

            //         );
            //     },
            // },
            {
                name: "memory_usage",
                header: "memory_usage",
                defaultFlex: 0.8,
                editable: false,
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
                name: "version",
                header: "version",
                defaultFlex: 0.4,
                editable: false,
                render: ({ value }) => {
                    if (this.state.terminalAllowVersion != "") {
                        let allowVersionStr = this.state.terminalAllowVersion.split(".");
                        let terminalVersionStr = value.split(".");
                        let disableVersion = false;
                        for (let i = 0; i < allowVersionStr.length; i++) {
                            if (parseInt(allowVersionStr[i]) > parseInt(terminalVersionStr[i])) {
                                disableVersion = true;
                                break;
                            } else if (parseInt(allowVersionStr[i]) < parseInt(terminalVersionStr[i])) {
                                disableVersion = false;
                                break;
                            }

                            if (disableVersion == true) {
                                return (
                                    <td>
                                        <div>
                                            <span className="disable-version"></span>
                                            &nbsp;{value}
                                        </div>
                                        <div>Disable Version</div>
                                    </td>
                                );
                            }
                        }
                    }

                    if (this.state.terminalLatestVersion != "") {
                        if (this.state.terminalLatestVersion != value) {
                            return (
                                <div>
                                    <div>
                                        <span className="low-version"></span>
                                        &nbsp;{value}
                                    </div>
                                    <div>Low Version</div>
                                </div>
                            );
                        }
                    }

                    return (
                        <div>
                            <span className="status-on"></span>
                            &nbsp;{value}
                        </div>
                    );
                },
            },
            {
                name: "machine_status",
                header: "status",
                defaultFlex: 0.4,
                editable: false,
                render: ({ value }) => {
                    if (value === "up") {
                        return (
                            <div>
                                <span className="status-on"></span> &nbsp;ON
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <span className="status-down"></span> &nbsp;DOWN
                            </div>
                        );
                    }
                },
            },
        ];

        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/terminal/getmachineinfo",
                        {
                            limit: limit,
                            offset: skip,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + UserManager.GetUserToken(),
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
                        if (terminalInfos == null || terminalInfos.length <= 0) {
                            return [];
                        }
                        let tableData = [];
                        const ipCountryMap = {};
                        for (let index = 0; index < terminalInfos.length; index++) {
                            const terminalInfo = terminalInfos[index];

                            ipCountryMap[terminalInfo.machine_ip] = this.countryMap[terminalInfo.country];
                            let tData = {
                                id: terminalInfo.id,
                                machine_mac: terminalInfo.machine_mac,
                                machine_ip: terminalInfo.machine_ip,
                                port: terminalInfo.port,
                                country: terminalInfo.country,
                                //city:terminalInfo.city,
                                speed_mbs: terminalInfo.speed_mbs,
                                cdn_space_usage: (
                                    ((terminalInfo.cdn_disk_total - terminalInfo.cdn_disk_available) / terminalInfo.cdn_disk_total) *
                                    100
                                ).toFixed(2),
                                disk_usage: (
                                    ((terminalInfo.machine_total_disk - terminalInfo.machine_available_disk) / terminalInfo.machine_total_disk) *
                                    100
                                ).toFixed(2),
                                memory_usage: (
                                    ((terminalInfo.machine_total_memory - terminalInfo.machine_free_memory) / terminalInfo.machine_total_memory) *
                                    100
                                ).toFixed(2),
                                machine_status: terminalInfo.machine_status,
                                version: terminalInfo.version == "" ? "0.1.1" : terminalInfo.version,
                                info: terminalInfo,
                            };
                            tableData.push(tData);
                        }

                        this.setState({ ipCountryMap: ipCountryMap });
                        console.log(ipCountryMap);
                        this.tableData.data = tableData;
                        this.tableData.count = parseInt(responseData.total);
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
                    columns={columns}
                    dataSource={this.state.tableData}
                    //onEditComplete={onEditComplete}
                    pagination
                    //editable
                    defaultLimit={10}
                    style={{ minHeight: 485 }}
                ></ReactDataGrid>
            </div>
        );
    };

    renderContent() {
        if (!this.state.dataready || !UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)) {
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

    renderTutorial() {
        let tutorialheaders = this.tutorial_sys.map((m, idx) => {
            if (this.state.tutorialsys == m) {
                return (
                    <a className="nav-link  active ml-0" href="#">
                        {m}
                    </a>
                );
            } else {
                return (
                    <a
                        className="nav-link  ml-0"
                        href="#"
                        onClick={(e) => {
                            this.setState({ tutorialsys: m });
                        }}
                    >
                        {m}
                    </a>
                );
            }
        });

        //https://meson.network/static/terminal/v0.1.2/meson-darwin-amd64.tar.gz
        let tutorialcontent = <div></div>;
        if (this.state.tutorialsys == "linux 64 bit") {
            tutorialcontent = (
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on linux server#######</div>
                    <div style={{ color: "#FFD234" }}>
                        Please make sure the port you use is opened on the firewall and sudo permission can be used
                    </div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: "yellow" }}>
                        $ wget '{Global.coldCdnApiHost}/api/cdn/f2cobx/terminal/v{this.state.terminalLatestVersion}/meson-linux-amd64.tar.gz'
                    </div>
                    <div>
                        If the above link is abnormal, please try the backup link '{Global.assetsHost}/static/terminal/v
                        {this.state.terminalLatestVersion}/meson-linux-amd64.tar.gz'
                    </div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{ color: "yellow" }}>$ tar -zxf meson-linux-amd64.tar.gz</div>
                    <div>#Step.3 install the app as service</div>
                    <div style={{ color: "yellow" }}>$ cd ./meson-linux-amd64</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-install</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>#Step.5 start the app</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-start</div>
                    <div>#Step.6 wait about 1 minutes and check status</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-status</div>
                    <div>after 2-3 minutes you will have a new terminal record </div>
                    <div>#Step.7 check your earnings</div>
                    <div>### Other commands ###</div>
                    <div>"sudo ./meson service-stop" to stop app</div>
                    <div>"sudo ./meson service-remove" to remove app</div>
                    <div style={{ marginTop: "10px" }}>
                        Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials
                    </div>
                </div>
            );
        }

        if (this.state.tutorialsys == "linux 32 bit") {
            tutorialcontent = (
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on linux server#######</div>
                    <div style={{ color: "#FFD234" }}>
                        Please make sure the port you use is opened on the firewall and sudo permission can be used
                    </div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: "yellow" }}>
                        $ wget '{Global.coldCdnApiHost}/api/cdn/f2cobx/terminal/v{this.state.terminalLatestVersion}/meson-linux-386.tar.gz'
                    </div>
                    <div>
                        If the above link is abnormal, please try the backup link '{Global.assetsHost}/static/terminal/v
                        {this.state.terminalLatestVersion}/meson-linux-386.tar.gz'
                    </div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{ color: "yellow" }}>$ tar -zxf meson-linux-386.tar.gz</div>
                    <div>#Step.3 install the app as service</div>
                    <div style={{ color: "yellow" }}>$ cd ./meson-linux-386</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-install</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>#Step.5 start the app</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-start</div>
                    <div>#Step.6 wait about 1 minutes and check status</div>
                    <div style={{ color: "yellow" }}>$ sudo ./meson service-status</div>
                    <div>after 2-3 minutes you will have a new terminal record </div>
                    <div>#Step.7 check your earnings</div>
                    <div>### Other commands ###</div>
                    <div>"sudo ./meson service-stop" to stop app</div>
                    <div>"sudo ./meson service-remove" to remove app</div>
                    <div style={{ marginTop: "10px" }}>
                        Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials
                    </div>
                </div>
            );
        }

        if (this.state.tutorialsys == "winserver 64 bit") {
            tutorialcontent = (
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on windows server#######</div>
                    <div style={{ color: "#FFD234" }}>Please make sure the port you use is opened on the firewall</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: "yellow" }}>
                        $ wget '{Global.coldCdnApiHost}/api/cdn/f2cobx/terminal/v{this.state.terminalLatestVersion}/meson-windows-amd64.zip'
                    </div>
                    <div>
                        If the above link is abnormal, please try the backup link '{Global.assetsHost}/static/terminal/v
                        {this.state.terminalLatestVersion}/meson-windows-amd64.zip'
                    </div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{ color: "yellow" }}>$ unzip meson-windows-amd64.zip</div>
                    <div>#Step.3 run the app</div>
                    <div style={{ color: "yellow" }}>$ cd ./meson-windows-amd64 && ./meson.exe</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record </div>
                    <div>#Step.5 check your earnings</div>
                    <div style={{ marginTop: "10px" }}>
                        Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials
                    </div>
                </div>
            );
        }

        if (this.state.tutorialsys == "winserver 32 bit") {
            tutorialcontent = (
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on windows server#######</div>
                    <div style={{ color: "#FFD234" }}>Please make sure the port you use is opened on the firewall</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: "yellow" }}>
                        $ wget '{Global.coldCdnApiHost}/api/cdn/f2cobx/terminal/v{this.state.terminalLatestVersion}/meson-windows-386.zip'
                    </div>
                    <div>
                        If the above link is abnormal, please try the backup link '{Global.assetsHost}/static/terminal/v
                        {this.state.terminalLatestVersion}/meson-windows-386.zip'
                    </div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{ color: "yellow" }}>$ unzip meson-windows-386.zip</div>
                    <div>#Step.3 run the app</div>
                    <div style={{ color: "yellow" }}>$ cd ./meson-windows-386 && ./meson.exe</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record </div>
                    <div>#Step.5 check your earnings</div>
                    <div style={{ marginTop: "10px" }}>
                        Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials
                    </div>
                </div>
            );
        }

        if (this.state.tutorialsys == "mac 64 bit") {
            tutorialcontent = (
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on mac server#######</div>
                    <div style={{ color: "#FFD234" }}>Please make sure the port you use is opened on the firewall</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: "yellow" }}>
                        $ wget '{Global.coldCdnApiHost}/api/cdn/f2cobx/terminal/v{this.state.terminalLatestVersion}/meson-darwin-amd64.tar.gz'
                    </div>
                    <div>
                        If the above link is abnormal, please try the backup link '{Global.assetsHost}/static/terminal/v
                        {this.state.terminalLatestVersion}/meson-darwin-amd64.tar.gz'
                    </div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{ color: "yellow" }}>$ tar -zxf meson-darwin-amd64.tar.gz</div>
                    <div>#Step.3 install the app as service</div>
                    <div style={{ color: "yellow" }}>$ cd ./meson-darwin-amd64</div>
                    <div style={{ color: "yellow" }}>$ ./meson service-install</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>#Step.5 start the app</div>
                    <div style={{ color: "yellow" }}>$ ./meson service-start</div>
                    <div>#Step.6 wait about 1 minutes and check status</div>
                    <div style={{ color: "yellow" }}>$ ./meson service-status</div>
                    <div>after 2-3 minutes you will have a new terminal record </div>
                    <div>#Step.7 check your earnings</div>
                    <div>### Other commands ###</div>
                    <div>"./meson service-stop" to stop app</div>
                    <div>"./meson service-remove" to remove app</div>
                    <div style={{ marginTop: "10px" }}>
                        Please check <a href="https://docs.meson.network">https://docs.meson.network</a> for more tutorials
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="nav nav-tabs" style={{ marginTop: "20px" }}>
                    {tutorialheaders}
                </div>

                <div className="card border-light shadow-sm" style={{ borderRadius: "0px", marginBottom: "20px", minHeight: "200px" }}>
                    <div
                        className="card-body"
                        style={{
                            background: "#3a3a3a",
                            marginTop: "-2px",
                            marginLeft: "-1px",
                            borderBottomRightRadius: "6px",
                            borderBottomLeftRadius: "6px",
                            borderTopRightRadius: "6px",
                            minHeight: "120px",
                            color: "white",
                            padding: "25px 20px",
                        }}
                    >
                        {tutorialcontent}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const Content = this.renderContent();
        const Tutorial = this.renderTutorial();
        return (
            <AdminLayout name="Terminal" description="terminals">
                {Tutorial}

                <div className="card border-light shadow-sm" style={{ marginBottom: "10px" }}>
                    <div className="card-body" style={{ padding: "10px 20px" }}>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">My Token</label>
                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-unlock-alt"></i>
                                    </span>
                                </div>
                                <input id="mytoken" value={UserManager.GetUserToken()} className="form-control" type="text" />
                                <div className="input-group-append">
                                    <div data-clipboard-target="#mytoken" className="btn   btn-light" type="button">
                                        copy
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ color: "#bf9500",padding:"10px" }}>
                    Attention: For better token reward please check the country information in the table below, if the country item is not correct
                    please correct it manually.
                </div>
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalPage);

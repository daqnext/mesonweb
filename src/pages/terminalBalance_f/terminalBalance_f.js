/* eslint-disable no-undef */
/*
 * @Author: your name
 * @Date: 2020-12-02 15:18:47
 * @LastEditTime: 2021-11-05 17:41:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/terminalBalance/terminalBalance.js
 */

import React, { useCallback } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import SendCode from "../../components/sendcode/sendcode";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";
import Utils from "../../utils/utils";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { withAlert } from "react-alert";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Confirm } from "../../components/confirm/confirm";

let abi = [
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "_MSNcontractAddr",
    "type": "address"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "address",
    "name": "keeper_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "string",
    "name": "keeper_name",
    "type": "string"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "add_keeper_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "add_merkle_root_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "time",
    "type": "uint256"
    }
    ],
    "name": "claim_erc20_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "address",
    "name": "keeper_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "string",
    "name": "keeper_name",
    "type": "string"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "remove_keeper_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "remove_merkle_root_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "address",
    "name": "oldOwner",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "set_MiningOwner_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "indexed": false,
    "internalType": "string",
    "name": "userid",
    "type": "string"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "stake_token_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "address",
    "name": "_from",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "withdraw_contract_EVENT",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": false,
    "internalType": "address",
    "name": "trigger_user_addr",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "blocktime",
    "type": "uint256"
    }
    ],
    "name": "withdraw_eth_EVENT",
    "type": "event"
    },
    {
    "stateMutability": "payable",
    "type": "fallback"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "keeper_addr",
    "type": "address"
    },
    {
    "internalType": "string",
    "name": "keeper_name",
    "type": "string"
    }
    ],
    "name": "add_keeper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
    },
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "internalType": "bytes32[]",
    "name": "merkleProof",
    "type": "bytes32[]"
    }
    ],
    "name": "claim_erc20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
    }
    ],
    "name": "erc20_claimed",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "get_MiningOwner",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "addr",
    "type": "address"
    }
    ],
    "name": "get_acc_staking",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "get_contract_balance",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "keeper_addr",
    "type": "address"
    }
    ],
    "name": "get_keeper",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    }
    ],
    "name": "get_merkle_balance",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "get_msn_addr",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "keeper_addr",
    "type": "address"
    }
    ],
    "name": "remove_keeper",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    }
    ],
    "name": "remove_merkle_root",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "_newOwner",
    "type": "address"
    }
    ],
    "name": "set_MiningOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "bytes32",
    "name": "merkleRoot",
    "type": "bytes32"
    },
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    }
    ],
    "name": "set_merkle_root",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    },
    {
    "internalType": "string",
    "name": "userid",
    "type": "string"
    }
    ],
    "name": "stake_token",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "withdraw_contract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "withdraw_eth",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "stateMutability": "payable",
    "type": "receive"
    }
    ]

class TerminalBalancePage_f extends React.Component {
    constructor(props) {
        super(props);

        // Address: "0x24f952c8c4d2ed90fdc2f7cbe62ef6f5ea837e9f"
        // Amount: "3000"
        // CreditName: "MSNTT"
        // FinanceId: 118
        // Id: 51
        // MerkleRoot: "0x2f5e77f4b32ff649e2e2ef207a66b59b5fde284a4dc38ce30163ca5ce6e25748"
        // Status: "confirmed"
        // UnixTime: 1635227890
        this.columns = [
            {
                name: "Id",
                header: "Id",
                defaultFlex: 0.15,
            },
            {
                name: "UnixTime",
                header: "Date",
                defaultFlex: 0.5,
                render: ({ value }) => {
                    if (value == 0) {
                        return <div>{"-"}</div>;
                    }
                    return <div>{moment(value * 1000).format("YYYY-MM-DD")}</div>;
                },
            },
            {
                name: "Address",
                header: "Recipient Address",
                defaultFlex: 1,
                editable: true,
            },
            {
                name: "Amount",
                header: "Amount",
                defaultFlex: 0.8,
                editable: true,
                render: ({ value }) => {
                    return <div>{Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },
            },
            {
                name: "CreditName",
                header: "TokenType",
                defaultFlex: 0.3,
            },
            {
                name: "Status",
                header: "Status",
                defaultFlex: 0.3,
                render: ({ value }) => {
                    switch (value) {
                        case "pending":
                            return (
                                <div>
                                    <span className="status-on" style={{ backgroundColor: "orange" }}></span> &nbsp;Pending
                                </div>
                            );

                        case "confirmed":
                            return (
                                <div>
                                    <span className="status-on" style={{ backgroundColor: "skyblue" }}></span> &nbsp;Confirmed
                                </div>
                            );

                        case "rejected":
                            return (
                                <div>
                                    <span className="status-on" style={{ backgroundColor: "red" }}></span> &nbsp;Rejected
                                </div>
                            );

                        case "finished":
                            return (
                                <div>
                                    <span className="status-on"></span> &nbsp;Finished
                                </div>
                            );
                        case "received":
                            return (
                                <div>
                                    <span className="status-on"></span> &nbsp;Received
                                </div>
                            );
                        default:
                            return (
                                <div>
                                    <span>{value}</span>
                                </div>
                            );
                    }
                },
            },
            {
                name: "action",
                header: "",
                defaultFlex: 0.35,
                render: ({ data }) => {
                    //console.log(data);
                    switch (data.Status) {
                        case "pending":
                            return (
                                <div style={{ display: "flex" }}>
                                    <div
                                        style={{ marginLeft: "5px" }}
                                        className="btn btn-primary-rocket btn-sm"
                                        onClick={async () => {
                                            //console.log(data);
                                            let response = await axios.post(
                                                Global.apiHost + "/api/v1/user/cancelwithdraw_f",
                                                {
                                                    Id: data.Id,
                                                },
                                                {
                                                    headers: {
                                                        Authorization: "Bearer " + UserManager.GetUserToken(),
                                                    },
                                                }
                                            );

                                            if (response.data.status == 0) {
                                                this.props.alert.success("Cmd Sended");
                                                this.loadData();
                                                return;
                                            }

                                            this.props.alert.error("Cmd send error");
                                        }}
                                    >
                                        Cancel
                                    </div>
                                </div>
                            );

                        case "confirmed":
                            return null;

                        case "rejected":
                            return null;

                        case "finished":
                            return (
                                <div style={{ display: "flex" }}>
                                    <div
                                        style={{ marginLeft: "5px" }}
                                        className="btn btn-primary-rocket btn-sm"
                                        onClick={async () => {
                                            console.log("get token click");
                                            console.log(data);
                                            let response;
                                            let contractAddress;
                                            try {
                                                response = await axios.post(
                                                    Global.apiHost + "/api/v1/user/withdrawcontractname_f",
                                                    {
                                                        Contract: "MSNTT_MINING",
                                                    },
                                                    {
                                                        headers: {
                                                            Authorization: "Bearer " + UserManager.GetUserToken(),
                                                        },
                                                    }
                                                );

                                                if (response.data.status == 0) {
                                                    console.log(response.data.data);
                                                    contractAddress = response.data.data;

                                                    console.log("root", data.MerkleRoot);
                                                    console.log("index", data.MerkleIndex);
                                                    console.log("amount", data.Amount);
                                                    console.log("proof", data.MerkleProof);

                                                    this.claimErc20(
                                                        contractAddress,
                                                        abi,
                                                        data.MerkleRoot,
                                                        data.MerkleIndex,
                                                        data.Amount,
                                                        data.MerkleProof,
                                                        data.Address
                                                    );
                                                    return;
                                                } else {
                                                    this.props.alert.error("get contract error");
                                                    return;
                                                }
                                            } catch (error) {
                                                this.props.alert.error(error.message);
                                            }
                                        }}
                                    >
                                        Get Token
                                    </div>
                                </div>
                            );
                        default:
                            return null;
                    }
                },
            },
        ];

        this.state = {
            dataready: false,
            token: "",
            tableData: [],
            targetWalletAddress: "",
            amount: "",
            vcode: "",
            queryStart: moment().subtract(31, "days").startOf("day"),
            queryEnd: moment().endOf("day"),
        };

        this.withdrawInfos = [];
    }

    async checkReceivedErc20(contract_address, abi, merkleRoot, index) {
        try {
            if (typeof window.ethereum !== "undefined") {
                await window.ethereum.request({ method: "eth_requestAccounts" });
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let contract = new ethers.Contract(contract_address, abi, provider);
            let result = await contract.erc20_claimed(merkleRoot, index);
            return result
        } catch (e) {
            Utils.HandleErc20Error(e.message,this.props.alert)
            return false;
        }
    }

    async claimErc20(contract_address, abi, merkleRoot, index, amount, proof,targetAddress) {
        try {
            //let merkleProof = merkleInfo.proof;
            let account
            if (typeof window.ethereum !== "undefined") {
                [account]=await window.ethereum.request({ method: "eth_requestAccounts" });
            }
            if (account.toLowerCase()!=targetAddress.toLowerCase()) {
                this.props.alert.error(`Please switch to correct wallet`);
                return
            }

            let proofArray = proof;
            if (typeof proof == "string") {
                proofArray = eval(proof);
            }

            

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(contract_address, abi, signer);
            console.log("contract", contract_address);
            console.log("root", merkleRoot);
            console.log("index", index);
            console.log("amount", amount);
            console.log("proof", typeof proofArray);
            console.log("proof", proofArray);
            let transcation = await contract.claim_erc20(merkleRoot, index.toString(), amount.toString(), proofArray);
            await transcation.wait();
        } catch (e) {
            //alert("Error:" + e.message);
            console.log(e.message);
            Utils.HandleErc20Error(e.message,this.props.alert)
        }
    }

    async checkReceived() {
        //get all finished withdraw info
        console.log("start to check received");
        let finishedWithdraws = [];
        console.log(this.withdrawInfos);
        for (let i = 0; i < this.withdrawInfos.length; i++) {
            if (this.withdrawInfos[i].Status == "finished") {
                finishedWithdraws.push(this.withdrawInfos[i]);
            }
        }
        //console.log(finishedWithdraws);
        if (finishedWithdraws.length == 0) {
            return;
        }

        //
        let contractAddress;
        try {
            let response = await axios.post(
                Global.apiHost + "/api/v1/user/withdrawcontractname_f",
                {
                    Contract: "MSNTT_MINING",
                },
                {
                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                }
            );

            if (response.data.status == 0) {
                //console.log(response.data.data);
                contractAddress = response.data.data;
                // this.claimErc20(contractAddress, abi, data.MerkleRoot, data.MerkleIndex, data.Amount, data.MerkleProof);
                // return;
            } else {
                this.props.alert.error("get contract error");
                return;
            }
        } catch (error) {
            this.props.alert.error(error.message);
            return;
        }

        let receivedIds=[]
        for (let i = 0; i < finishedWithdraws.length; i++) {
            const info = finishedWithdraws[i];
            let result=await this.checkReceivedErc20(contractAddress, abi, info.MerkleRoot, info.MerkleIndex.toString());
            if (result==true) {
                receivedIds.push(info.Id)
            }
        }

        //console.log(receivedIds);
        if (receivedIds.length==0) {
            return
        }

        try {
            let response = await axios.post(
                Global.apiHost + "/api/v1/user/withdrawreceived_f",
                {
                    Ids: receivedIds,
                },
                {
                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                }
            );

            if (!response.data) {
                return;
            }

            if (response.data.status == 0) {
                this.loadData()
                // return;
            } else {
                this.props.alert.error(response.data.msg);
                return;
            }
        } catch (error) {
            this.props.alert.error(error.message);
            return;
        }
    }

    checkemail() {
        let userInfo = UserManager.GetUserInfo();
        if (userInfo == null) {
            // login
            this.props.alert.error("Please login");
            return false;
        }
        if (userInfo.email == "") {
            this.props.alert.error("Please bind email");
            return false;
        }

        return true;
    }

    clicksendemailvcode() {
        axios
            .get(Global.apiHost + "/api/v1/user/getwithdrawvcode_f", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response) => {
                //console.log(response);

                if (response && response.data.status == 2006) {
                    this.props.alert.error("Email format is not correct");
                    return;
                }

                if (response && response.data.status == 102) {
                    this.props.alert.error("please wait 60 seconds before you send verify code again");
                    return;
                }

                if (response && response.data.status == 0) {
                    this.props.alert.success("VCode send");
                    return;
                }
            });
    }

    updatebalance() {
        axios
            .get(Global.apiHost + "/api/v1/user/gettoken_f", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response_rp) => {
                if (response_rp.data.status == 0) {
                    this.setState({
                        dataready: this.state.dataready,
                        token: Utils.ParseMesonTokenStringToNormal(response_rp.data.data),
                    });
                }
            });
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });

        this.updatebalance();
        this.loadData();

        setInterval(() => {
            this.checkReceived();
        }, 60 * 1000);
    }

    async AddWithdraw(address, amount, vcode) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/user/addwithdraw_f",
            {
                Address: address,
                Amount: amount,
                VCode: vcode,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response == null || response.data == null) {
            this.props.alert.error("Request error");
            return;
        }

        switch (response.data.status) {
            case 0:
                this.props.alert.success("Add exchange Success");
                this.loadData();
                break;

            default:
                this.props.alert.error(response.data.msg);
                return;
        }
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/user/withdrawrecord_f",
                        {
                            startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                            endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
                            Limit: limit,
                            Offset: skip,
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
                        //console.log(responseData);
                        this.withdrawInfos = responseData.data;
                        return {
                            data: responseData.data,
                            count: responseData.total,
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        let label = this.state.queryStart.format("YYYY-MM-DD") + " ~ " + this.state.queryEnd.format("YYYY-MM-DD");

        return (
            <div>
                <div className="row" style={{ marginBottom: "20px" }}>
                    <DateRangePicker
                        className="col-4"
                        initialSettings={{
                            startDate: this.state.queryStart.toDate(),
                            endDate: this.state.queryEnd.toDate(),
                            ranges: {
                                Today: [moment().toDate(), moment().toDate()],
                                Yesterday: [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()],
                                "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
                                "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
                                "This Month": [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
                                "Last Month": [
                                    moment().subtract(1, "month").startOf("month").toDate(),
                                    moment().subtract(1, "month").endOf("month").toDate(),
                                ],
                            },
                        }}
                        onCallback={(start, end) => {
                            this.setState({
                                queryStart: start,
                                queryEnd: end,
                            });
                        }}
                    >
                        <div id="reportrange" className="btn btn-light btn-sm line-height-normal p-2" style={{ marginLeft: "15px" }}>
                            <i className="mr-2 text-primary-rocket" data-feather="calendar"></i>
                            <span>{label}</span>
                            <i className="ml-1" data-feather="chevron-down"></i>
                        </div>
                    </DateRangePicker>
                    <button
                        className="btn btn-primary-rocket btn-xs"
                        type="button"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                            loadData();
                        }}
                    >
                        Query Record
                    </button>
                    <div className="col-10" style={{ marginTop: "10px", color: "rgb(28 28 28)", fontSize: "16px" }}>
                        {/* It takes about [1-5 minutes] to receive your token. */}
                        It takes [1 ~ 7] days for the system to check all data before confirmation.
                    </div>
                </div>
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

    withdrawArea() {
        return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2"> Exchange to your ERC20 wallet</strong>
                </div>

                {UserManager.GetUserInfo() && UserManager.GetUserInfo().email == "" ? (
                    <div className="toast-body h6" style={{ color: "#555e68" }}>
                        Please bind your email first.
                        <button
                            onClick={() => {
                                window.location = "/bindemail";
                            }}
                            className="btn btn-primary-rocket"
                            type="button"
                            style={{ marginLeft: "10px" }}
                        >
                            Bind email
                        </button>
                    </div>
                ) : (
                    <div className="toast-body" style={{ color: "#555e68" }}>
                        <form>
                            <div className="form-group">
                                <label>recipient ERC20 wallet</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            targetWalletAddress: event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="text"
                                />
                                <label>amount</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            amount: event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="number"
                                />

                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="small mb-2">email code</label>
                                            <input
                                                className="form-control py-3"
                                                type="text"
                                                placeholder="Enter vcode"
                                                onChange={(event) => {
                                                    this.setState({
                                                        vcode: event.currentTarget.value.trim(),
                                                    });
                                                }}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="small mb-2">send email</label>
                                            <div style={{ textAlign: "left" }}>
                                                <SendCode
                                                    checkphonecorrect={() => {
                                                        return this.checkemail();
                                                    }}
                                                    click={() => {
                                                        this.clicksendemailvcode();
                                                    }}
                                                ></SendCode>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        //check
                                        if (!(this.state.targetWalletAddress.startsWith("0x")||this.state.targetWalletAddress.startsWith("0X"))) {
                                            this.props.alert.error("Please input correct address");
                                            return
                                        }

                                        if (this.state.targetWalletAddress.length!=42) {
                                            this.props.alert.error("Please input correct address");
                                            return
                                        }

                                        let amount=Utils.ParseNormalToMesonTokenString(this.state.amount)
                                        console.log(amount);
                                        if (amount=="0") {
                                            this.props.alert.error("Please input correct amount");
                                            return
                                        }
                                        if (amount.startsWith("-")) {
                                            this.props.alert.error("Please input correct amount");
                                            return
                                        }

                                        Confirm.ShowConfirm(
                                            "warning",
                                            "Are you sure",
                                            `${this.state.targetWalletAddress}`,
                                            true,
                                            "warning",
                                            "primary",
                                            "Confirm",
                                            () => {
                                                this.AddWithdraw(this.state.targetWalletAddress, amount, this.state.vcode);
                                            }
                                        );

                                        
                                    }}
                                    className="btn btn-primary-rocket"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    Exchange token to your ERC20 wallet
                                </button>

                                {/* <button
                                    onClick={() => {
                                        this.checkReceived()
                                    }}
                                    className="btn btn-primary-rocket"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    test
                                </button> */}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <AdminLayout name="Terminal" description="Token">
                <div className="card border-light shadow-sm" style={{ marginBottom: "20px" }}>
                    <div className="card-body">
                        <div className="small text-muted">Current Account Token</div>
                        <div className="h5" style={{ marginTop: "10px", color: "rgb(85,94,104)" }}>
                            {this.state.token}
                        </div>
                    </div>
                </div>

                {this.withdrawArea()}

                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2"> Exchange Record</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalBalancePage_f);

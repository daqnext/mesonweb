/* eslint-disable no-undef */
/*
 * @Author: your name
 * @Date: 2020-12-02 15:18:47
 * @LastEditTime: 2021-11-08 14:03:30
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
import BN from "bn.js";
import { Loading } from "../../components/loading/loading";
import WithdrawVideoTutorial from "../../components/withdrawVideoTutorial/withdrawVideoTutorial";

let MSN_abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "inisupply",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "special_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "_id",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "add_special_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "burn_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "mint_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "special_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "_special_id",
                type: "uint16",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "remove_special_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "exchange_open",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "set_exchange_open_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_recipient",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "from_special",
                type: "uint16",
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "to_special",
                type: "uint16",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "special_transfer_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "withdraw_contract_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "withdraw_eth_EVENT",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "special_addr",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "_id",
                type: "uint8",
            },
        ],
        name: "add_special",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "get_exchange_open",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "special_addr",
                type: "address",
            },
        ],
        name: "get_special",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "_id",
                type: "uint16",
            },
        ],
        name: "get_special_by_id",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "special_addr",
                type: "address",
            },
        ],
        name: "remove_special",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_exchange_open",
                type: "bool",
            },
        ],
        name: "set_exchange_open",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw_contract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw_eth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

let MSN_MINING_abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_MSNcontractAddr",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "keeper_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "keeper_name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "add_keeper_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "add_merkle_root_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "time",
                type: "uint256",
            },
        ],
        name: "claim_erc20_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "keeper_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "keeper_name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "remove_keeper_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "remove_merkle_root_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "oldOwner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "set_MiningOwner_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "userid",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "stake_token_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "withdraw_contract_EVENT",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "trigger_user_addr",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blocktime",
                type: "uint256",
            },
        ],
        name: "withdraw_eth_EVENT",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "keeper_addr",
                type: "address",
            },
            {
                internalType: "string",
                name: "keeper_name",
                type: "string",
            },
        ],
        name: "add_keeper",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "merkleProof",
                type: "bytes32[]",
            },
        ],
        name: "claim_erc20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "erc20_claimed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get_MiningOwner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "get_acc_staking",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get_contract_balance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "keeper_addr",
                type: "address",
            },
        ],
        name: "get_keeper",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "get_merkle_balance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get_msn_addr",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "keeper_addr",
                type: "address",
            },
        ],
        name: "remove_keeper",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
        ],
        name: "remove_merkle_root",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "set_MiningOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "set_merkle_root",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "userid",
                type: "string",
            },
        ],
        name: "stake_token",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw_contract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw_eth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];

class StakePage_f extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "date",
                header: "Date",
                defaultFlex: 0.5,
            },
            {
                name: "amount",
                header: "Amount",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },
            },
            {
                name: "credit_name",
                header: "TokenType",
                defaultFlex: 0.5,
            },
            {
                name: "status",
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
                                    <span className="status-on"></span> &nbsp;Confirmed
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

        this.financeId = 0;
    }

    async stakeErc20(msn_contract_address, msn_abi, msn_mining_contract_address, msn_mining_abi, stake_userid, stake_amount) {
        try {
            let account;
            if (typeof window.ethereum !== "undefined") {
                console.log("no ethereum");
                [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            ///////////////
            let msn_contract = new ethers.Contract(msn_contract_address, msn_abi, provider);

            let balance = await msn_contract.balanceOf(account);
            // console.log(balance);
            // console.log(stake_amount);
            // console.log(balance.toString());
            let amountBN = new BN(stake_amount, 10);
            let balanceBN = new BN(balance.toString(), 10);
            if (amountBN.gt(balanceBN)) {
                this.props.alert.error("balance not enough");
                return null;
            }

            let mining_allowance = await msn_contract.allowance(account, msn_mining_contract_address);
            let mining_allowance_str = mining_allowance.toString();
            let allowance_min_level = "1000000000000000000000000000000000000000000000";
            if (mining_allowance_str.length < allowance_min_level.length) {
                //reset allowance
                let msn_approve_contract = new ethers.Contract(msn_contract_address, msn_abi, signer);
                //console.log("show page loader .......");
                let msn_approve_transcation = await msn_approve_contract.approve(
                    msn_mining_contract_address,
                    allowance_min_level + "0000000000000000000"
                );
                let mining_allowance_result = await msn_approve_transcation.wait();
                //console.log("hide page loader .......");
                if (mining_allowance_result.status != 1) {
                    this.props.alert.error("approve error,please try again");
                    return null;
                }
            }
            ///////////////
            let msn_mining_contract = new ethers.Contract(msn_mining_contract_address, msn_mining_abi, signer);
            let stake_transcation = await msn_mining_contract.stake_token(stake_amount, stake_userid);
            return await stake_transcation.wait();
            //console.log(result);
            //await stake_transcation.wait();
        } catch (e) {
            //alert('Error:' + e.message);
            Utils.HandleErc20Error(e.message, this.props.alert);
            return null;
        }
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

        this.getFinanceId();
        this.updatebalance();
        await this.LoadTotalData();
        this.loadData();

        setInterval(async () => {
            this.updatebalance();
            await this.LoadTotalData();
            this.loadData();
        }, 60 * 1000);
    }

    async getFinanceId() {
        axios
            .get(Global.apiHost + "/api/v1/user/financeid_f", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response_rp) => {
                if (response_rp.data.status == 0) {
                    this.financeId = response_rp.data.data;
                    return true;
                } else {
                    this.props.alert.error("get finance id error");
                    return false;
                }
            })
            .catch((err) => {
                this.props.alert.error(err.message);
                return false;
            });
    }

    loadData = null;
    async LoadTotalData() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/user/stakerecord_f",
            {
                startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            return [];
        }
        let responseData = response.data.data;
        //console.log(responseData);

        let stakeRecord = [];
        //
        let confirmedTxMap = {};
        for (let i = 0; i < responseData.length; i++) {
            responseData[i].status = "confirmed";
            //console.log(responseData[i].log);

            // if (i==0) {
            //     responseData[i].log='{"Blocktime":12323,"Useraddress":"xasfasdf","Tx":"0x9e2252d180187005abccaf10ac539fe9909bc2cf554ab7455e279f853d87ae20"}'
            // }

            if (responseData[i].log && responseData[i].log != "") {
                try {
                    let v = JSON.parse(responseData[i].log);
                    //console.log(v.Tx);
                    if (v.Tx && v.Tx != "") {
                        responseData[i].tx = v.Tx;
                        confirmedTxMap[v.Tx] = 1;
                    }
                } catch (error) {
                    //console.log(error);
                }
            }

            stakeRecord.push(responseData[i]);
        }

        //console.log(stakeRecord);

        //read localStorage
        let existRecordStr = localStorage.getItem("stakeRecord");
        let existRecord = [];
        if (existRecordStr != null) {
            try {
                existRecord = JSON.parse(existRecordStr);
            } catch (error) {}
        }

        let pendingRecordArray = [];
        // stakeRecord.push(...existRecord)
        let nowTime = moment().unix();
        for (let i = 0; i < existRecord.length; i++) {
            if (nowTime - existRecord[i].createTime > 60 * 20) {
                continue;
            }
            if (confirmedTxMap[existRecord[i].tx_hash]) {
                continue;
            }
            pendingRecordArray.push(existRecord[i]);
        }

        stakeRecord.splice(0, 0, ...pendingRecordArray);

        let newStr = JSON.stringify(pendingRecordArray);
        localStorage.setItem("stakeRecord", newStr);

        this.tableData = stakeRecord;

        // return {
        //     data: stakeRecord,
        //     count: stakeRecord.length,
        // };
    }

    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                let limitTableData = this.tableData.slice(skip, skip + limit);
                return Promise.resolve({
                    data: limitTableData,
                    count: this.tableData.length,
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
                        onClick={async () => {
                            await this.LoadTotalData();
                            this.loadData();
                        }}
                    >
                        Query Record
                    </button>
                    <div className="col-10" style={{ marginTop: "10px", color: "rgb(28 28 28)", fontSize: "16px" }}>
                        It takes about [1-5 minutes] for the system to receive your staking.
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

    operation() {
        return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2"> operation </strong>
                </div>

                <div className="toast-body" style={{ color: "#555e68" }}>
                    <form>
                        <div className="form-row">
                            <div className="col-4">
                                <input
                                    className="form-control py-3"
                                    type="number"
                                    placeholder="Stake Amount"
                                    onChange={(event) => {
                                        this.stakeAmount = event.target.value.trim();
                                    }}
                                ></input>
                            </div>
                            <button
                                onClick={async () => {
                                    console.log("stake click", this.stakeAmount);
                                    if (this.stakeAmount.startsWith("-")) {
                                        this.props.alert.error("please input correct stake amount");
                                        return;
                                    }

                                    let stakeAmount = Utils.ParseNormalToMesonTokenString(this.stakeAmount);
                                    if (stakeAmount == "0" || stakeAmount == "") {
                                        this.props.alert.error("please input correct stake amount");
                                        return;
                                    }
                                    //get address
                                    let response;
                                    let msn_contractAddress;
                                    let msn_mining_contractAddress;
                                    try {
                                        if (this.financeId == 0) {
                                            let success = await this.getFinanceId();
                                            if (!success) {
                                                return;
                                            }
                                        }

                                        Loading.ShowLoading("Waiting....");

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
                                            msn_mining_contractAddress = response.data.data;
                                        } else {
                                            this.props.alert.error("get msn_mining contract error");
                                            Loading.HideLoading();
                                            return;
                                        }

                                        response = await axios.post(
                                            Global.apiHost + "/api/v1/user/withdrawcontractname_f",
                                            {
                                                Contract: "MSNTT",
                                            },
                                            {
                                                headers: {
                                                    Authorization: "Bearer " + UserManager.GetUserToken(),
                                                },
                                            }
                                        );

                                        if (response.data.status == 0) {
                                            console.log(response.data.data);
                                            msn_contractAddress = response.data.data;
                                        } else {
                                            this.props.alert.error("get msn contract error");
                                            Loading.HideLoading();
                                            return;
                                        }

                                        console.log("msn_contractAddress", msn_contractAddress);
                                        console.log("msn_mining_contractAddress", msn_mining_contractAddress);
                                        console.log("this.financeId", this.financeId);
                                        console.log("stakeAmount", stakeAmount);

                                        let result = await this.stakeErc20(
                                            msn_contractAddress,
                                            MSN_abi,
                                            msn_mining_contractAddress,
                                            MSN_MINING_abi,
                                            this.financeId.toString(),
                                            stakeAmount
                                        );

                                        if (result == null || result.status != 1) {
                                            this.props.alert.error("stake error");
                                            Loading.HideLoading();
                                            return;
                                        }

                                        //console.log(result);
                                        if (result && result.status == 1) {
                                            Loading.HideLoading();
                                            console.log("commit success", "tx", result.transactionHash);
                                        }

                                        //add to localStorage
                                        // amount: "1000000000000000000"
                                        // credit_name: "MSNTT"
                                        // date: "2021-11-05 02:57:57"
                                        // reason: "MSN_MINING_STAKE"
                                        // tx_hash: ""
                                        // type: "ADD"
                                        // unixtimesec: 0
                                        // userid: 14

                                        let newRecord = {
                                            amount: stakeAmount,
                                            credit_name: "MSNTT",
                                            reason: "MSN_MINING_STAKE",
                                            tx_hash: result.transactionHash.toLowerCase(),
                                            type: "ADD",
                                            date: moment().format("YYYY-MM-DD hh:mm:ss"),
                                            createTime: moment().unix(),
                                            status: "pending",
                                        };
                                        let existRecordStr = localStorage.getItem("stakeRecord");
                                        let existRecord = [];
                                        if (existRecordStr != null) {
                                            existRecord = JSON.parse(existRecordStr);
                                        }
                                        let newRecordArray = [];
                                        newRecordArray.push(newRecord);
                                        newRecordArray.push(...existRecord);

                                        let str = JSON.stringify(newRecordArray);
                                        localStorage.setItem("stakeRecord", str);
                                        
                                        await this.LoadTotalData()
                                        this.loadData();
                                    } catch (error) {
                                        this.props.alert.error(error.message);
                                        Loading.HideLoading();
                                        return;
                                    }
                                }}
                                className="btn btn-primary-rocket"
                                type="button"
                                style={{ marginRight: "10px" }}
                            >
                                Stake
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <AdminLayout name="Terminal" description="Stake">
                <div className="card border-light shadow-sm" style={{ marginBottom: "20px" }}>
                    <div className="card-body">
                        <div className="small text-muted">Current Account Token</div>
                        <div className="h5" style={{ marginTop: "10px", color: "rgb(85,94,104)" }}>
                            {this.state.token}
                        </div>
                    </div>
                </div>
                <WithdrawVideoTutorial/>

                {this.operation()}

                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2"> Stake Record</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(StakePage_f);

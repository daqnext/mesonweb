
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import GetallDomains from "../client/getalldomains";
import DataTable from "../../components/table/datatable";

class BalancePage extends React.Component {


    constructor(props) {
        super(props);

        this.paymethods=[
          'Erc20',
          'Alipay[支付宝]',
          'Wechat',
          'Paypal'
        ];

        this.state={
            dataready:false,
            balance:'',
            currentpaymethod:'Erc20',
            erc20wallet:'',
        };

        this.fieldnames={
            RecordType:'Type',
            Status:'Status',
            TransactionHex:'TransactionHash',
            Value:'Value',
            CreatedAt:'Time',
        };
    }


    updatebalance(){

        axios.get("/api/v1/user/getbalance", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }}).then( (response_rp)=>{
            if(response_rp.data.status==0){
                this.setState({
                    dataready:this.state.dataready,
                    balance:response_rp.data.data/1000000000,
                    currentpaymethod:this.state.currentpaymethod,
                    erc20wallet:this.state.erc20wallet,
                });
            }
        });
    }


    gettabledata = async () => {

        this.updatebalance();
        /////////////////////
        let tabledata= await axios.post("/api/v1/client/getdepositrecord",{}, {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
        }
        });
        if (tabledata.data.status==0) {
            return tabledata.data.data.records;
        }
        
        return []

    }

    /*
    async gettabledata(){


    }
     */

    renderRowItem(data,key){
       // console.log(data);
       // console.log(key);
        if(key=='Value'){
            return <td>{data[key]/1000000000}</td>
        }

        if(key=='Status'){
            if(data[key]=='success'){
                return(<td><span className="badge badge-success">{data[key]}</span></td>);
            }else if(data[key]=='failure'){
                return (<td><span className="badge badge-danger">{data[key]}</span></td>);
            }else{
                return (<td><span className="badge badge-light">{data[key]}</span></td>)
            }
        }



        return <td>{data[key]}</td>
    }

    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready:true,
            balance:this.state.balance,
            currentpaymethod:this.state.currentpaymethod,
            erc20wallet:this.state.erc20wallet,
        });

        this.updatebalance();
        //this.scheduleupdatebalance();
        this.updatewallet();

        ///this.gettabledata();
    }




    updatewallet(){

        axios.get("/api/v1/user/walletaddress", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }}).then( (response_rp)=>{
            if(response_rp.data.status==0){
                this.setState({
                    dataready:this.state.dataready,
                    balance:this.state.balance,
                    currentpaymethod:this.state.currentpaymethod,
                    erc20wallet:response_rp.data.data,
                });
            }
        });
    }


    /*
    scheduleupdatebalance(){
        setInterval( ()=>{
            this.updatebalance();
        }, 1000*30);
    }
     */


    render() {

        //console.log(UserManager.GetUserInfo());

        if(!this.state.dataready){
            return (<div></div>);
        }


        let paymentheaders=this.paymethods.map((m, idx) => {
            if(this.state.currentpaymethod==m){
                return (<a className="nav-link  active ml-0" href="#">{m}</a>);
            }else{
                return (<a className="nav-link  ml-0" href="#"  onClick={(e)=>{

                    this.setState({
                        dataready: this.state.dataready,
                        balance: this.state.balance,
                        currentpaymethod: m,
                    });

                }} >{m}</a>);
            }
        });


        let paymentbody= (<div></div>);

        if(this.state.currentpaymethod=='Erc20'){

            let erc20img="/api/v1/user/walletqrcode?token="+UserManager.GetUserToken();

            paymentbody=(
                <div>


                    <div style={{padding:'2px 10px'}}>

                        <div className="bg-light border-left border-lg rounded border-primary p-3 mb-3">
                            [ We only support USDT USDC Now ! Don't transfer other coins!]
                        </div>

                        <input className="form-control"  type="text" value={this.state.erc20wallet} />

                        <img src={erc20img} style={{margin:'20px'}} />
                    </div>


                    <DataTable
                        fieldnames={this.fieldnames}
                        gettabledata={this.gettabledata}
                        renderRowItem={this.renderRowItem}
                        refreshtable={30}
                    ></DataTable>

                </div>

                 );
        }


        if(this.state.currentpaymethod=='Alipay[支付宝]'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <div className="bg-light border-left border-lg rounded border-primary p-3 mb-3">
                    [ Alipay[支付宝] is under development ]
                </div>
            </div>);
        }

        if(this.state.currentpaymethod=='Wechat'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <div className="bg-light border-left border-lg rounded border-primary p-3 mb-3">
                    [ Wechat is under development ]
                </div>
            </div>);
        }

        if(this.state.currentpaymethod=='Paypal'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <div className="bg-light border-left border-lg rounded border-primary p-3 mb-3">
                    [ Paypal is under development ]
                </div>
            </div>);
        }


        return (
            <AdminLayout
                name="Balance"
                description="Balance"
            >
                <div className="card h-100 border-left-lg border-left-primary">
                    <div className="card-body">
                        <div className="small text-muted">Current Account Balance</div>
                        <div className="h3">${this.state.balance}</div>
                    </div>
                </div>

                <div className="card mb-4" style={{marginTop:'35px'}}>
                    <div className="card-header">Pay</div>
                    <div className="card-body p-0" style={{backgroundColor:'#f8f8f9'}}>
                        <nav className="nav nav-borders" style={{margin:'10px 20px'}}>
                            {paymentheaders}
                        </nav>
                        {paymentbody}
                    </div>
                </div>


            </AdminLayout>
        );
    }
}

export  default  BalancePage;
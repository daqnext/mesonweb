
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import Global from "../../global/global";
import QRCode  from 'qrcode.react'
import AdminContent from "../../components/layout/adminContent";
import Utils from '../../utils/utils';
import moment from 'moment';

class BalancePage_f extends React.Component {

    constructor(props) {
        super(props);

        this.paymethods=[
          'Erc20',
        //   'DOT',
        //   'Alipay[支付宝]',
        //   'Wechat',
        //   'Paypal'
        ];

        this.state={
            dataready:false,
            //balance:'',
            coins:[],
            summarize:"",
            unCommitted:"",
            currentpaymethod:'Erc20',
            erc20wallet:'',
        };

        this.fieldnames={
            credit_name:'Type',
            amount:'Amount',
            date:'Date',
        };
    }


    updatebalance(){

        axios.get(Global.apiHost+"/api/v1/user/getbalance_f", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }}).then( (response_rp)=>{
            if(response_rp.data.status==0){
                let coinArray=[]
                for (const key in response_rp.data.data.Coins) {
                    coinArray.push({type:key,amount:response_rp.data.data.Coins[key]})
                }
                this.setState({
                    dataready:this.state.dataready,
                    //balance:response_rp.data.data/1000000000,
                    coins:coinArray,
                    unCommitted:response_rp.data.data.UnCommitted,
                    summarize:response_rp.data.data.Summarize,
                    currentpaymethod:this.state.currentpaymethod,
                    erc20wallet:this.state.erc20wallet,
                });
            }
        });
    }


    gettabledata = async () => {

        this.updatebalance();
        /////////////////////
        let tabledata= await axios.post(Global.apiHost+"/api/v1/client/getdepositrecord_f",
        {
            startTime: Math.floor(moment()/1000)-2592000,
            endTime: Math.floor(moment()/1000)
        }, 
        {
            headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
        }
        });
        if (tabledata.data.status==0) {
            return tabledata.data.data;
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
        if(key=='amount'){
            return <td>{Utils.ParseUSDStringToNormal(data[key])}</td>
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

        setInterval(() => {
            this.gettabledata();
        }, 60*1000);
    }




    updatewallet(){

        axios.get(Global.apiHost+"/api/v1/user/walletaddress_f", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }}).then( (response_rp)=>{
            if(response_rp.data.status==0){
                this.setState({
                    dataready:this.state.dataready,
                    // balance:this.state.balance,
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

            paymentbody=(
                <div>
                    <div style={{marginBottom:'20px'}}>
                        <span style={{color:"#495057"}}>[ We only support USDT USDC Now ! Don't transfer other coins!]</span>

                        <input className="form-control"  style={{margin:'20px 0px'}} type="text" value={this.state.erc20wallet} />

                        {/* <img src={erc20img} style={{border:'1px solid #ececec'}} /> */}
                        {this.state.erc20wallet.length>0&&
                        (<QRCode
                            style={{border:'1px solid #ececec'}}
                            value={this.state.erc20wallet}  //value参数为生成二维码的链接
                            size={200} //二维码的宽高尺寸
                            fgColor="#000000"  //二维码的颜色
                        />)}
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


        if(this.state.currentpaymethod=='DOT'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <span style={{color:"#495057"}}>[ DOT is under development ]</span>
            </div>);
        }

        if(this.state.currentpaymethod=='Alipay[支付宝]'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                 <span style={{color:"#495057"}}>[ Alipay[支付宝] is under development ]</span>
            </div>);
        }

        if(this.state.currentpaymethod=='Wechat'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <span style={{color:"#495057"}}> [ Wechat is under development ]</span>
            </div>);
        }

        if(this.state.currentpaymethod=='Paypal'){
            paymentbody=(<div style={{padding:'2px 10px'}}>
                <span style={{color:"#495057"}}>[ Paypal is under development ]</span>
            </div>);
        }


        return (
            <AdminLayout
                name="Client"
                description="Balance"
            >

                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <div className="small text-muted">Current Account Balance</div>
                        {/* <div className="h3" style={{color:"#555e68"}}>Total: ${Utils.ParseUSDStringToNormal(this.state.summarize)}</div> */}
                        {this.state.coins&&this.state.coins.map((value,index,array)=>{
                            if (value.amount=="0"){
                                return 
                            }
                            return <div className="h5" key={index} style={{color:"#555e68"}}>{value.type}: ${Utils.ParseUSDStringToNormal(value.amount)}</div>;
                        })}
                        {this.state.unCommitted!="0"&&
                        <div className="h5" style={{color:"#555e68"}}>UnCommited: ${-Utils.ParseUSDStringToNormal(this.state.unCommitted)}</div>}
                    </div>
                </div>


                <div className="nav nav-tabs" style={{marginTop:'20px'}}>
                    {paymentheaders}
                </div>

                <div className="card border-light shadow-sm" style={{borderRadius:'0px'}}>
                    <div className="card-body">
                        {paymentbody}
                    </div>
                </div>

            </AdminLayout>
        );
    }
}


export  default  BalancePage_f;
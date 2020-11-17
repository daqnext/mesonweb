
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import './binddomain.css'
import axios from "axios";
import { withAlert } from "react-alert";
import GetallDomains from "./getalldomains";
import Global from "../../global/global";

class BindDomain extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            inputurl:'',
            inputurlerror:false,
            checkandadd:false, //false means you need to check
        };

        this.randomhash=this.makeid(6);

        this.coldcdnDomainPrefix="coldcdn.com/api/cdn/"+this.randomhash;
    }


    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true,
            inputurl:this.state.inputurl,
            inputurlerror:this.state.inputurlerror,
            checkandadd:this.state.checkandadd,

        });
    }


    urlcheck(str){
        var pattern = new RegExp(
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }


    removeinputUrlPrefix(str){
        if(str.startsWith("https://")){
            return str.slice(8);
        }

        if(str.startsWith("http://")){
            return str.slice(7);
        }

        if(str.startsWith("https")){
            return str.slice(5);
        }

        if(str.startsWith("http:")){
            return str.slice(6);
        }

        return str;
    }


    changeinputUrl(str){

        let inputurlerror_=false;

        if(str.length!=0){
            if(!this.urlcheck(str)){
                inputurlerror_=true;
            }
        }

        this.setState({
            dataready:this.state.dataready,
            inputurl:str,
            inputurlerror:inputurlerror_,
            checkandadd:false
        });
    }



    addRecord(){

        if(this.state.inputurl.length==0||this.state.inputurlerror){
            this.props.alert.error("please input the correct localtion url first");
            return;
        }


            axios.post(Global.apiHost+"/api/v1/client/newdomain",
                {
                    BindName:this.randomhash,
                    OriginUrl:this.state.inputurl,
                },{headers: {
                        Authorization: "Bearer "+UserManager.GetUserToken()
                    }})
                .then(  (response)=>{


                    if(response.data.status==1001){
                        this.props.alert.error("some thing wrong please try again");
                        window.location.href="/binddomain";
                        return;
                    }

                    if(response.data.status==1002){
                        this.props.alert.error("sorry you already have a record with the same input url ");
                        return;
                    }

                    if(response.data.status==0){
                        this.props.alert.success("add successfully");
                        setTimeout(function(){ window.location.href="/binddomain";}, 2000);
                        return;
                    }

                    this.props.alert.error("some thing wrong,please contact us!");
                });

    }


    renderContent(){
        if(!this.state.dataready||!UserManager.checkUserHasAuth(UserManager.UserAuth.client)){
            return (<div className="alert alert-danger" role="alert">Auth Required</div>);
        }


        let inputurlerrordisplay=(<div></div>)
        if(this.state.inputurlerror){
            inputurlerrordisplay=<div><span className="badge badge-danger">format error</span></div>
        }

        let toastbody=(<div></div>)
        if(!this.state.inputurlerror&&this.state.inputurl.length!==0){
            toastbody= (

                <div className="form-group col-md-9">
                    <div className="  toast fade show" id="toastBasic" role="alert" aria-live="assertive" aria-atomic="true"
                         data-delay="5000">
                        <div className="toast-header">
                            <i data-feather="bell"></i>
                            <strong className="mr-auto">Note</strong>
                            <button className="ml-2 mb-1 close" type="button" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            simply replace your url with our url in your application,all your files will be accerlated
                            e.g :
                            <span className="badge badge-light" >{"https://"+this.state.inputurl+"/*"}</span>
                            will become
                            <span className="badge badge-light" >{"https://"+this.coldcdnDomainPrefix+"/*"}</span>
                        </div>
                    </div>
                </div>
            )
        }



        let checkandadd=(
            <button
                onClick={()=>{
                    let inputurl_=this.removeinputUrlPrefix(this.state.inputurl);
                    this.setState({
                        dataready:this.state.dataready,
                        inputurl:inputurl_,
                        inputurlerror:!this.urlcheck(inputurl_),
                        checkandadd:this.urlcheck(inputurl_)
                    });

                }}
                className="btn btn-primary" type="button">Check Input Url</button>
        );
        if(this.state.checkandadd){
            checkandadd=( <button
                onClick={()=>{
                    this.addRecord();
                }}
                className="btn btn-success" type="button">Add Record</button>);
        }

        return (

            <div className="card border-light shadow-sm">
                <div className="card-body">

                    <form>
                        <div className="form-group">
                            <label >add your location</label>
                            {inputurlerrordisplay}
                            <input className="form-control"
                                   //value={this.state.inputurl}
                                    onChange={()=>{
                                        this.setState({
                                            dataready:this.state.dataready,
                                            inputurl:this.state.inputurl,
                                            inputurlerror:this.state.inputurlerror,
                                            checkandadd:false
                                        });
                                    }}
                                   onBlur={(event)=>{
                                       event.target.value=this.removeinputUrlPrefix(event.target.value.trim());
                                       this.changeinputUrl(event.target.value.trim());
                                   }}
                                   type="text"
                                   placeholder="input your location here e.g: www.mydomain.com/myfolder"/>
                        </div>


                        <div  className="form-group" >
                            <label>For http accerlation in your own application replace your location url to :</label>
                            <div className="input-group input-group-joined input-group-solid">
                                <input  value={"http://"+this.coldcdnDomainPrefix} className="form-control" type="text" placeholder="Input group append..." aria-label="Search"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i data-feather="search"></i></span>
                                    </div>
                            </div>
                        </div>

                        <div  className="form-group" >
                            <label >For https accerlation in your own application replace your location url to </label>
                            <div className="input-group input-group-joined input-group-solid">
                                <input  value={"https://"+this.coldcdnDomainPrefix} className="form-control" type="text" placeholder="Input group append..." aria-label="Search"/>
                                <div className="input-group-append">
                                    <span className="input-group-text"><i data-feather="search"></i></span>
                                </div>
                            </div>
                        </div>


                        <div className="form-row">

                            <div className="form-group col-md-3">
                                {checkandadd}
                            </div>

                            {toastbody}
                        </div>

                    </form>
                </div>
            </div>
        )
    }



    render() {

        const Content=this.renderContent();

        return (
            <AdminLayout
                name="BindDomain"
                description="Bind your domain"
            >
                {Content}


                <div className="card border-light shadow-sm" style={{marginTop:'20px'}}>
                    <div className="card-body">

                        <div style={{marginTop:'10px'}}>
                            <GetallDomains ></GetallDomains>
                        </div>
                    </div>
                </div>

            </AdminLayout>
        );
    }
}

export default withAlert()(BindDomain)

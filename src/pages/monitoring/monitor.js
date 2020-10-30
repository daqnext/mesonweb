
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";
import axios from "axios";

class MonitorPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            data:{}
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
           await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true,
            data:this.state.data,
        });


        axios.get("https://coldcdn.com/api/v1/admin/walletjob", {headers: {
                    Authorization: "Bearer "+UserManager.GetUserToken()
                }}).then( (response)=>{

            this.setState({
                dataready:this.state.dataready,
                data:response.data.data,
            });

        });



    }

    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }

        let monitorcontent=Object.keys(this.state.data).map((key,id) => {
            return(
                <div className="card card-progress" style={{marginTop:'10px'}}>
                    <div className="card-header text-success">{key}</div>
                    <div className="card-body">{this.state.data[key]}</div>
                    <div className="progress rounded-0"  >
                        <div className="progress-bar bg-success" role="progressbar" style={{width:'100%'}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            );
        });

        return (
            <AdminLayout
                name="monitoring"
                description="monitoring"
            >
                {monitorcontent}
            </AdminLayout>
        );
    }
}

export  default  MonitorPage;
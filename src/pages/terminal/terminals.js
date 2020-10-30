
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";
import axios from "axios";

class TerminalPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            tlist:[],
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true,
            tlist:this.state.tlist
        });


        let response = await axios.post("https://coldcdn.com/api/v1/terminal/getmachineinfo" ,{
             limit:999999,
             offset:0
        },{headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }})

        if(response.data.status!=0){
            return false;
        }

        console.log(response);
        //return true;

    }



    renderContent(){
        if(!this.state.dataready||!UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)){
            return (<div className="alert alert-danger" role="alert">Auth Required</div>);
        }


        return(<div>

        </div>);
    }


    render() {


        const Content=this.renderContent();

        return (
            <AdminLayout
                name="Terminals"
                description="terminals"
            >
                {Content}
            </AdminLayout>
        );
    }
}

export  default  TerminalPage;
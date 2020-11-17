
import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";

class GetallDomains extends React.Component {

    constructor(props) {
        super(props);
        this.fieldnames={
            id:'id',
            state:'state',
            active_region:'active region',
            originurl:'user url',
            cdnurl:'cdn url',

        };

        this.state={
            dataready:false,
        };

    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready:true,
        });
    }


   async updatetable(rowdata){

       let response = await axios.post("/api/v1/client/modifydomainstate" ,{
           Id:rowdata["id"],
           State:rowdata["state"],
           ActiveRegion:rowdata["active_region"],
           BindName:rowdata["bindname"],

       },{headers: {
               Authorization: "Bearer "+UserManager.GetUserToken()
           }})

       if(response.data.status!=0){
           return false;
       }
       return true;
   }


   async gettabledata(){

         let response = await axios.get("/api/v1/client/getdomains", {headers: {
                    Authorization: "Bearer "+UserManager.GetUserToken()
                }})

      // console.log(response.data.data);
          return response.data.data;
    }



    async gettableupdateconfig(){

        if(this.updatecoloumsconfig){
            return this.updatecoloumsconfig;
        }
        let response_rp = await axios.get("/api/v1/common/regionprice", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }})

        let allregions=response_rp.data.data.allregions;

        this.updatecoloumsconfig={
            state:{
                type:'singlesel',
                data:['ON','OFF'],
            },
            active_region:{
                type:'mulsel',
                data:allregions,
            }
        };


        return this.updatecoloumsconfig;
    }



    renderRowItem(data,key){
        if(key=='active_region'){
            let item_ar=data[key].map((ag, idx) => {return <span style={{marginRight:'10px'}} className="badge badge-light">{ag}</span>});
            return  <td style={{width:"20%"}} >{item_ar}</td>
        }
        if(key=='state') {
            if(data[key]==true){
                return <td><span className="badge badge-success">ON</span> </td>
            }else{
                return <td><span className="badge badge-dark">OFF</span></td>
            }
        }

        return <td>{data[key]}</td>
    }


    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }

        return (
           <DataTable
               fieldnames={this.fieldnames}
               gettabledata={this.gettabledata}
               renderRowItem={this.renderRowItem}
               gettableupdateconfig={this.gettableupdateconfig}
               updatetable={this.updatetable}
           ></DataTable>
        );
    }
}

export  default  GetallDomains;
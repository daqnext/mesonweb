/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-11-10 08:35:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/components/usertypes/usertypeselector.js
 */
import React from "react";
import axios from "axios";
import Global from "../../global/global";

class UserTypeSelector extends React.Component {

    constructor(props) {
        super(props);
        this.callback=this.props.callback;

        this.usertypes=[];

        this.state={
            selectedUsertypes:[]
        }
    }

     componentDidMount() {

         axios.get(Global.apiHost+"/api/v1/common/usertype",
            {})
            .then(  (response)=>{
                if(response.status==200){

                    this.usertypes=response.data.data;
                    this.setState({
                        selectedUsertypes: JSON.parse(JSON.stringify(this.usertypes))
                    });
                    this.callback(this.state.selectedUsertypes);
                }
            });
    }


    displayname(usertype){
        if(usertype=='terminal'){
            return (<div> [Terminal] Mine coldCDN-tokens by providing resource to us </div>)
        }

        if(usertype=='client'){
            return (<div>[CDN-User] to use our global CDN service</div>)
        }
        return usertype;
    }

    //flag true for add false for remove
    updateUserTypes(type,flag){

        let curselectedUserteyps=this.state.selectedUsertypes;

        if(curselectedUserteyps.includes(type)){
            if(flag==false){
                this.removeElement(curselectedUserteyps,type);
            }
        }else{
            if(flag==true){
                curselectedUserteyps.push(type);
            }
        }

        this.setState({
            selectedUsertypes:curselectedUserteyps
        });

        this.callback(curselectedUserteyps);

    }

    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }






render() {

        const renData = this.usertypes.map((data, idx) => {
            return (<div style={{marginLeft:'20px'}}>
                <input value={data}
                       //checked={false}
                    checked={this.state.selectedUsertypes.includes(data)}
                    onChange={e => {
                        this.updateUserTypes(e.target.value,e.target.checked)
                    }}
                    //onClick={()=>{this.callback(data);}}
                    className="form-check-input" id={"customCheck"+idx} type="checkbox"  />
                <label className="form-check-label" htmlFor={"customCheck"+idx}>{this.displayname(data)}</label>
            </div>)
        });
        return (<div>{renData}</div>)
    }

}

export default  UserTypeSelector
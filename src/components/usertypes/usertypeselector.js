import React from "react";
import axios from "axios";

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

         axios.get("https://coldcdn.com/api/v1/common/usertype",
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
            return (<div>
                <div className = "badge badge-success" style={{textAlign:"left",whiteSpace:"inherit"}} > [Terminal] Mine coldCDN-tokens by providing resource to us  </div>

            </div>)
        }

        if(usertype=='client'){
            return (<div><span className="badge badge-success"
                                 >[CDN-User] to use our global CDN service</span></div>)
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
            return (<div className="custom-control custom-checkbox">
                <input value={data}
                       //checked={false}
                    checked={this.state.selectedUsertypes.includes(data)}
                    onChange={e => {
                        this.updateUserTypes(e.target.value,e.target.checked)
                    }}
                    //onClick={()=>{this.callback(data);}}
                    className="custom-control-input" id={"customCheck"+idx} type="checkbox"  />
                <label className="custom-control-label" htmlFor={"customCheck"+idx}>{this.displayname(data)}</label>
            </div>)
        });
        return (<div>{renData}</div>)
    }

}

export default  UserTypeSelector
import React from "react";
import axios from "axios";

class UserTypeSelector extends React.Component {

    constructor(props) {
        super(props);
        this.callback=this.props.callback;

        this.state={
            usertypes:[]
        }
    }

     componentDidMount() {

         axios.get("https://coldcdn.com/api/v1/common/usertype",
            {})
            .then(  (response)=>{
                if(response.status==200){
                    this.setState({
                        usertypes:response.data.data
                    });
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

    render() {

        const renData = this.state.usertypes.map((data, idx) => {
            return (<div className="custom-control custom-radio">
                <input onClick={()=>{this.callback(data);}} className="custom-control-input" id={"customRadio"+idx} type="radio" name="customRadio"/>
                <label className="custom-control-label" htmlFor={"customRadio"+idx}>{this.displayname(data)}</label>
            </div>)
        });
        return (<div>{renData}</div>)
    }

}

export default  UserTypeSelector
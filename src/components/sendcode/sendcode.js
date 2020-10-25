import React from "react";

class SendCode extends React.Component {

    constructor(props) {
        super(props);

        this.click=props.click;
        this.checkphonecorrect=props.checkphonecorrect;
        this.state = {
            pasttime: 0
        };

        if(localStorage.coldcdnvcodesecs){
            this.state = {
                pasttime: localStorage.coldcdnvcodesecs
            };
        }
    }


    triggerTimer(){
        let myinterval=setInterval(()=>{
            this.setState({
                pasttime:this.state.pasttime-1
            });
            localStorage.setItem('coldcdnvcodesecs', this.state.pasttime-1);

            if(this.state.pasttime==0){
                clearInterval(myinterval);
            }
        }, 1000);
    }



    sendMeCode(){
       if(this.state.pasttime>0)
       {
           return;
       }

       this.state.pasttime=61;
       this.triggerTimer();
    }

    componentDidMount() {
        if(this.state.pasttime>0){
            this.triggerTimer();
        }
    }


    render() {

        if(this.state.pasttime>0){
            return (
                <button className="btn btn-outline-blue" type="button" disabled
                >SendAgain:{this.state.pasttime}</button>
            )
        }else{
            return( <button
                onClick={()=>{
                    if(!this.checkphonecorrect()){
                        return;
                    }
                    this.sendMeCode();
                    this.click();
                     }}
                className="btn btn-outline-blue" type="button">SendMeCode</button>);
        }

    }
}

export  default SendCode;


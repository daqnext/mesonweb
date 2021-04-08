/*
 * @Author: your name
 * @Date: 2021-03-24 19:15:34
 * @LastEditTime: 2021-04-08 15:02:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/components/sendcode/sendcode.js
 */
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
                <button  class="btn mb-2 mr-2 btn-light" type="button" disabled
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
                class="btn mb-2 mr-2 btn-primary-rocket" type="button">SendMeCode</button>);
        }

    }
}

export  default SendCode;


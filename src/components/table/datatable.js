import React from "react";
import './datatable.css';
import { withAlert } from "react-alert";

class DataTable extends React.Component {

    constructor(props) {
        super(props);
        this.fieldnames =props.fieldnames;
        this.fieldkeys=Object.keys(props.fieldnames);
        this.gettabledata=props.gettabledata;
        this.renderRowItem=props.renderRowItem;
        this.gettableupdateconfig=props.gettableupdateconfig;
        this.updatetable=props.updatetable;
        this.refreshtable=props.refreshtable;

        this.state={
            table_data:[],
            expand_rows:{},
            tableupdateconfig:{},
        }
    }



    componentWillUnmount() {
        if(this.refreshtable){
            clearInterval(this.refreshtableHandle);
        }
    }


    async componentDidMount() {

        let tableupdateconfig=null;
        if(this.gettableupdateconfig){
            tableupdateconfig= await  this.gettableupdateconfig();
        }
        let table_data=  await this.gettabledata();

        this.setState({
            table_data:table_data,
            expand_rows:{},
            tableupdateconfig:tableupdateconfig,
        });


        if(this.refreshtable){
            this.refreshtableHandle = setInterval(
                () => {
                    this.gettabledata().then(  (data)=>{
                        this.setState({
                            table_data:data,
                            expand_rows:this.state.expand_rows,
                            tableupdateconfig:this.state.tableupdateconfig,
                        });
                    });

                },
                1000*this.refreshtable
            );
        }

    }


    removeElement(array, elem) {
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
    }



    render() {

        const table_header =  this.fieldkeys.map((data, idx) => {
            return (<th>{this.fieldnames[data]}</th>);});

        if(this.gettableupdateconfig){
            table_header.push(<th>settings</th>);
        }


        const table_rows = this.state.table_data.map((data, rownum) => {

            let table_row_items= this.fieldkeys.map((key, idx) => {
                return this.renderRowItem(data,key) });


            if(!this.gettableupdateconfig){
               return (<tr className="tr1">{table_row_items}</tr>)
            }



            let tr1=(<tr class="tr1">{table_row_items}
                <td><button onClick={()=>{
                    if(this.state.expand_rows[rownum]){
                        delete this.state.expand_rows[rownum];
                    }else{
                        this.state.expand_rows[rownum]=data;
                    }
                    this.setState(this.state);
                }} className="btn btn-light btn-xs">settings</button></td>
            </tr>);



            if(!this.state.expand_rows[rownum]||!this.state.tableupdateconfig){
                return tr1;
            }



            let tr2_items= Object.keys(this.state.tableupdateconfig).map((configkey, idx) => {


                let itemcontent=null;

                if(this.state.tableupdateconfig[configkey].type=='mulsel'){

                    const multiselitems =  this.state.tableupdateconfig[configkey].data.map((mselitem, mselitem_idx) => {

                        return (<div className="custom-control custom-checkbox">
                            <input value={mselitem}
                                   checked={data[configkey].includes(mselitem)}
                                   onChange={e => {
                                        if(data[configkey].includes(mselitem)){
                                           if(e.target.checked==false){this.removeElement(this.state.table_data[rownum][configkey],mselitem);}
                                       }else{
                                           if(e.target.checked==true){this.state.table_data[rownum][configkey].push(mselitem);}
                                       }
                                        this.setState(this.state);
                                   }}

                                   className="custom-control-input" id={""+mselitem_idx+rownum+configkey} type="checkbox"  />
                            <label className="custom-control-label" htmlFor={""+mselitem_idx+rownum+configkey}>{mselitem}</label>
                        </div>)
                    });

                    itemcontent=(<div>{multiselitems}</div>);

                }else if (this.state.tableupdateconfig[configkey].type=='singlesel'){

                    itemcontent=(<div>
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input"
                                   checked={data[configkey]}
                                   onClick={()=>{
                                       this.state.table_data[rownum][configkey]=true;
                                       this.setState(this.state);
                                   }}
                                   id={"sel1"+rownum+configkey} type="radio" name={""+rownum+configkey} />
                                <label className="custom-control-label"
                                       htmlFor={"sel1"+rownum+configkey}>{this.state.tableupdateconfig[configkey].data[0]}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input onClick={()=>{
                                this.state.table_data[rownum][configkey]=false;
                                this.setState(this.state);
                            }}   checked={!data[configkey]} className="custom-control-input" id={"sel2"+rownum+configkey} type="radio" name={""+rownum+configkey} />
                                <label className="custom-control-label"
                                       htmlFor={"sel2"+rownum+configkey}>{this.state.tableupdateconfig[configkey].data[1]}</label>
                        </div>
                    </div>);

                }else {
                    itemcontent=(<input className="form-control"  value={data[configkey]} onChange={(e)=>{
                        this.state.table_data[rownum][configkey]=e.target.value;
                        this.setState(this.state);
                    }} />);
                }


                return (

                    <div className="form-group">
                        <label style={{textAlign:"left"}} htmlFor="exampleFormControlInput1">{this.fieldnames[configkey]}</label>
                        {itemcontent}
                    </div>
                     );

                 });


            let tr2=(<tr>
               <td colspan="6">
                   <form>
                       {tr2_items}
                       <div className="btn btn-primary btn-sm"
                       onClick={()=>{
                             this.updatetable(data).then((result)=>{
                                 //console.log(result);
                                 if(result){
                                     this.props.alert.success("update successfully");
                                 }else{
                                     this.props.alert.error("update failed!");
                                 }
                             });
                       }}
                       >Save</div>

                   </form>
               </td>
            </tr>);

            return [
                tr1,
                tr2
            ];

        });


       return (
           <div className="datatable">
            <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                <tr>
                    {table_header}
                </tr>
                </thead>

                <tbody>
                {table_rows}

                </tbody>
            </table>
        </div>



       );

    }
}


export default withAlert()(DataTable)

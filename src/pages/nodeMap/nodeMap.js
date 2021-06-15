/*
 * @Author: your name
 * @Date: 2021-02-12 13:32:00
 * @LastEditTime: 2021-06-13 20:46:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/nodeMap/nodeMap.js
 */

import React from "react";
import worldmap from "../../img/world-map-new.svg";
import axios from "axios";
// import "./world copy 2";
import Global from "../../global/global";
import "./nodeMap.css";

export default class NodeMapPage extends React.Component {
  constructor(props) {
    super(props);

    const jscode = `
    
    var script = document.createElement('script');
document.head.appendChild(script); // insert into the <head></head> tag

script.addEventListener('load', ev => { // when the js execute done
  myearth = new Earth( 'myearth', {
	
    location : { lat: 20, lng : 20 },

    light: 'none',

    mapImage: 'https://assets.meson.network:10443/static/hologram/hologram-map.svg',
    transparent: true,
    draggable: false,
    autoRotate : true,
    autoRotateSpeed: 2.0,
    autoRotateDelay: 100,
    autoRotateStart: 2000,			
  
  });


  myearth.addEventListener( "ready", function() {

    this.startAutoRotate();

    // connections
    
    var line = {
      color : '#009CFF',
      opacity: 0.35,
      hairline: true,
      offset: -0.5
    };

  let that=this

  var settings = {
    "url": "/api/v1/common/nodelocation",
    "method": "GET",
};
 
  $.ajax(settings).done(function (response) {
    if (response.status == 0) {
      // console.log(response.data)
      connections = response.data
      //console.log(connections)

      for ( var i in connections ) {			
        line.locations = [ 
        { lat: connections[i][0], lng: connections[i][1] },
        { lat: connections[i][2], lng: connections[i][3] } ];
        that.addLine( line );
      }
      
      // add shine sprites
      for ( var i=0; i < connections.length; i++ ) {
        sprites[i] = that.addSprite( {
          image: '/map/hologram-shine-green2.svg',
          scale: 0.01,
          offset: -0.5,
          opacity: 0.5
        } );
        pulse( i );
      }
        
    }
});
});
});

script.src = 'https://assets.meson.network:10443/static/map/miniature.earth.core.js'; // start execute a js, can delay

    var myearth;
    var sprites = [];

    function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
    }


    function pulse( index ) {
	    var random_location = connections[ index ];
	    sprites[index].location = { lat: random_location[0] , lng: random_location[1] };
	
	    sprites[index].animate( 'scale', 0.8, { duration: 920, complete : function(){
		    this.animate( 'scale', 0.3, { duration: 920, complete : function(){
			  setTimeout( function(){ pulse( index ); }, getRandomInt(100, 900) );
		    }});
	    }});
    }

    // locations conntected by lines and places where hologram shines appear
    var connections = [
	    [35.4,139.53,	35.4,139.53],
      [1.2,103.1, 1.2,103.1     ],
    ];
    `;
    new Function(jscode)();

    this.someNodeInfo=[]
    this.allNodeInfo=[]
    this.lastShowNodeInfo=[]
    this.lastShowAllButtonState=true
    
    this.state = {
      // vmData: [
      //   // { name: "Hangzhou", value: [120.16, 30.29, 24] },
      //   // { name: "San Francisco", value: [-122.42, 37.77, 10] },
      // ],
      activeNode: [],
      activeNodeShow: [],
      showAllNodeButton: true,
      queryId: "",
      isLoadingRecord:false,

      totalNode: 0,
      asiaNode: 0,
      naNode: 0,
      europeNode: 0,
      otherNode: 0,
      totalBandwidthStr: 0,
    };
  }

  async GetAllAccNodeInfo() {
    //get terminal Data from server
    this.setState({isLoadingRecord:true})
    let response = await axios.get(
      Global.apiHost + "/api/v1/common/activenode"
    );
    if (response.data.status != 0) {
      console.error("get active node error");
      return;
    }
    let responseData = response.data.data;
    responseData.sort(function (x, y) {
      return x.id.localeCompare(y.id);
    });

    // this.setState({ activeNode: responseData });
    this.setState({ activeNodeShow: responseData, showAllNodeButton: false,isLoadingRecord:false });
    this.allNodeInfo=responseData
    this.lastShowNodeInfo=this.allNodeInfo
    this.lastShowAllButtonState=false
  }

  async GetPartAccNodeInfo() {
    //get terminal Data from server
    let response = await axios.get(
      Global.apiHost + "/api/v1/common/activenode/300"
    );
    if (response.data.status != 0) {
      console.error("get part active node error");
      return;
    }
    let responseData = response.data.data;
    responseData.sort(function (x, y) {
      return x.id.localeCompare(y.id);
    });

    // this.setState({ activeNode: responseData });
    this.setState({ activeNodeShow: responseData, showAllNodeButton: true });
    this.someNodeInfo=responseData
    this.lastShowNodeInfo=this.someNodeInfo
    this.lastShowAllButtonState=true
  }

  async GetNodeStatisticsInfo() {
    //get terminal Data from server
    let response = await axios.get(
      Global.apiHost + "/api/v1/common/nodestatisticsinfo"
    );
    if (response.data.status != 0) {
      console.error("get nodestatisticsinfo error");
      return;
    }
    let responseData = response.data.data;

    // this.setState({ activeNode: responseData });
    this.setState({
      totalNode: responseData.TotalNodeCount,
      asiaNode: responseData.AsiaNodeCount,
      naNode: responseData.NorthAmericaNodeCount,
      europeNode: responseData.EuropeNodeCount,
      otherNode: responseData.OtherNodeCount,
      totalBandwidthStr: responseData.TotalBandwidthMbs,
    });
  }

  async GetNodeInfoById(id) {
    //get terminal Data from server
    let response = await axios.get(
      Global.apiHost + "/api/v1/common/nodeinfo/" + id
    );
    if (response.data.status != 0) {
      console.error("get nodeInfo by Id error");
      return;
    }
    let responseData = response.data.data;

    // this.setState({ activeNode: responseData });
    this.setState({ activeNodeShow: responseData, showAllNodeButton: false });
  }

  async componentDidMount() {
    this.GetPartAccNodeInfo();
    this.GetNodeStatisticsInfo();

    // let asia = 0;
    // let na = 0;
    // let other = 0;
    // let europe = 0;
    // let totalBandwidth = 0;
    // for (let i = 0; i < responseData.length; i++) {
    //   switch (responseData[i].continent) {
    //     case "Asia":
    //       asia++;
    //       break;
    //     case "North America":
    //       na++;
    //       break;
    //     case "Europe":
    //       europe++;
    //       break;
    //     default:
    //       other++;
    //       break;
    //   }

    //   totalBandwidth += (responseData[i].machine_net_speed * 8) / 1000;
    // }
    // console.log(totalBandwidth);
    // let totalBandwidthStr = totalBandwidth.toFixed(2) + " Mb/s";
    // if (totalBandwidth > 1000 * 1000) {
    //   totalBandwidthStr = (totalBandwidth / 1000000).toFixed(2) + " Tb/s";
    // } else if (totalBandwidth > 1000) {
    //   totalBandwidthStr = (totalBandwidth / 1000).toFixed(2) + " Gb/s";
    // }

    // console.log(totalBandwidthStr);

    // this.setState({
    //   totalNode: responseData.length,
    //   asiaNode: asia,
    //   naNode: na,
    //   europeNode: europe,
    //   otherNode: other,
    //   totalBandwidthStr: totalBandwidthStr,
    // });
  }

  // queryNodeId(id){
  //   let fixId=id.trim()
  //   //console.log(fixId)
  //   if (fixId!=="") {
  //     let tempNode=this.state.activeNode
  //     let showNodes=[]
  //     for (let i = 0; i < tempNode.length; i++) {
  //       if (tempNode[i].id.indexOf(fixId)!==-1) {
  //         showNodes.push(tempNode[i])
  //       }
  //     }
  //     this.setState({activeNodeShow:showNodes})
  //   }else{
  //     this.setState({activeNodeShow:this.state.activeNode})
  //   }
  // }

  queryNodeInput() {
    return (
      <div className="query-input">
        <div className="input-group ">
          <input
            id="id"
            value={this.state.queryId}
            onChange={(event) => {
              let id = event.target.value;
              id = id.trim();
              this.setState({ queryId: id });
              if (id=="") {
                //this.setState({activeNodeShow:this.lastShowNodeInfo,showAllNodeButton:this.lastShowAllButtonState})
                this.setState({activeNodeShow:this.someNodeInfo,showAllNodeButton:true})
              }
            }}
            className="form-control"
            placeholder="input your node id here:"
            type="text"
            style={{
              background: "none",
              color: "#485056",
              paddingLeft: "5px",
              backgroundColor: "white",
            }}
          />
          <div className="input-group-append">
            <div
              className="btn "
              style={{
                border: "1px solid white",
                color: "#c1c1c1",
                backgroundColor: "#2f2f2f",
              }}
              onClick={() => {
                this.GetNodeInfoById(this.state.queryId);
              }}
            >
              Query
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="row row-30 justify-content-center justify-content-xl-between align-items-center align-items-xl-start">
        <div class="col-sm-4 col-md-4 text-center">
          <div class="headings-default">
            <div class="headings-default-subtitle">Miners</div>
            <h3>Nodes & Capacity</h3>
            <p class="d-inline-block text-width-medium">
              Your node information will be listed here within 5-10 minutes
              after you start the mining terminal program on your server
            </p>
          </div>

          <div
            id="myearth"
            // style="height: 480px;margin-top: 60px"
            style={{}}
          >
            {/* <div id="glow"></div> */}
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              zIndex: "900",
              left: "0",
              top: "0",
            }}
          ></div>
        </div>
        <div class="col-md-7 col-xl-7 wow fadeInUp ">
          {this.queryNodeInput()}
          <div
            className="node-table"
            style={{
              maxHeight: "260px",
              overflowY: "scroll",
              marginTop: "10px",
            }}
          >
            <table
              id="nodetable"
              border="1"
              style={{ width: "100%", margin: "0" }}
            >
              <tbody>
                <tr>
                  <th>Region</th>
                  <th>Node ID&IP</th>
                  <th>Bandwidth</th>
                  {/* <th>Count</th> */}
                </tr>
                {this.state.activeNodeShow.length<=0&&(
                  <tr style={{ fontSize: "15px" ,height:"40px"}}>
                    <td colspan="3">
                      <div style={{ textAlign: "center" }} >
                        No record
                      </div>
                    </td>
                  </tr>
                )}
                {this.state.activeNodeShow.map((value, index, array) => {
                  let speed = ((value.machine_net_speed * 8) / 1000).toFixed(2);
                  let ip = value.ip.split(".");
                  return (
                    <tr claseName="table-tr">
                      <td className="table-td">
                        {value.country + " ***  [" + value.city + "]"}
                      </td>
                      <td>
                        <div>{value.id}</div>
                        <div>{`ip:*.${ip[1]}.${ip[2]}.*`}</div>
                      </td>
                      <td>{speed} Mb/s</td>
                      {/* <td style={{ padding: "0px 2px" }}>1</td> */}
                    </tr>
                  );
                })}

                {(this.state.showAllNodeButton && this.state.isLoadingRecord ==false )&& (
                  <tr style={{ fontSize: "15px" ,height:"40px"}}>
                    <td colspan="3">
                      <a style={{ textAlign: "center" }} onClick={()=>{
                        this.GetAllAccNodeInfo()
                      }}>
                        Show all terminals
                      </a>
                    </td>
                  </tr>
                )}
                {(this.state.isLoadingRecord )&& (
                  <tr style={{ fontSize: "15px" ,height:"40px"}}>
                    <td colspan="3">
                      <div style={{ textAlign: "center" }}>
                        Loading...
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div class="group-xl group-middle discount-details justify-content-center justify-content-sm-start">
            <div>
              <p class="discount-details-title">Current nodes statistics</p>
              <ul class="discount-details-list">
                {/* <li style={{fontWeight: "bold",fontStyle:"italic"}}><span>Total Bandwidth : </span><span style={{color: "#ffd234"}}>{this.state.totalBandwidthStr}</span></li> */}
                <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  <span>Total nodes number : </span>
                  <span style={{ color: "#ffd234" }}>
                    {this.state.totalNode}
                  </span>
                </li>
                <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  <span>Asia nodes number : </span>
                  <span style={{ color: "#ffd234" }}>
                    {this.state.asiaNode}
                  </span>
                </li>
                <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  <span>North America nodes number : </span>
                  <span style={{ color: "#ffd234" }}>{this.state.naNode}</span>
                </li>
                <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  <span>Europe nodes number : </span>
                  <span style={{ color: "#ffd234" }}>
                    {this.state.europeNode}
                  </span>
                </li>
                <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  <span>Other region nodes number : </span>
                  <span style={{ color: "#ffd234" }}>
                    {this.state.otherNode}
                  </span>
                </li>
              </ul>
            </div>
            <a class="button button-isi button-primary" href="/login">
              Start Mining
            </a>
          </div>
        </div>
      </div>
    );
  }
}

// export default withAlert()(NodeMapPage);

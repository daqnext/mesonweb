/*
 * @Author: your name
 * @Date: 2021-02-12 13:32:00
 * @LastEditTime: 2021-03-13 17:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/nodeMap/nodeMap.js
 */

import React from "react";
// import { withAlert } from "react-alert";
// import ReactEcharts from "echarts-for-react";
import worldmap from "../../img/world-map-new.svg";
import axios from "axios";
// import "./world copy 2";
import Global from "../../global/global";
import "./nodeMap.css";

export default class NodeMapPage extends React.Component {
  constructor(props) {
    super(props);

    const jscode = `
    var myearth;
var sprites = [];

window.addEventListener( 'load', function() {

	myearth = new Earth( 'myearth', {
	
		location : { lat: 20, lng : 20 },
	
		light: 'none',

		mapImage: '/static/map/hologram/hologram-map.svg',
		transparent: true,
		
		autoRotate : true,
		autoRotateSpeed: 2.0,
		autoRotateDelay: 100,
		autoRotateStart: 2000,			
		
	} );
	
	
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
      "url": "/api/v1/common/nodeinfo",
      "method": "GET",
  };
   
    $.ajax(settings).done(function (response) {
      if (response.status == 0) {
        // console.log(response.data)
        connections = response.data
        // console.log(connections)

        for ( var i in connections ) {			
          line.locations = [ 
          { lat: connections[i][0], lng: connections[i][1] },
          { lat: connections[i][2], lng: connections[i][3] } ];
          that.addLine( line );
        }
        
        
        
        // add 8 shine sprites
       
        for ( var i=0; i < connections.length; i++ ) {
          sprites[i] = that.addSprite( {
            image: '/static/map/hologram/hologram-shine.svg',
            scale: 0.01,
            offset: -0.5,
            opacity: 0.5
          } );
          pulse( i );
        }
          
      }
  });
		
		
		
		
	} );
	
	
} );


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function pulse( index ) {
	var random_location = connections[ index ];
	sprites[index].location = { lat: random_location[0] , lng: random_location[1] };
	
	sprites[index].animate( 'scale', 0.5, { duration: 920, complete : function(){
		this.animate( 'scale', 0.1, { duration: 920, complete : function(){
			setTimeout( function(){ pulse( index ); }, getRandomInt(100, 900) );
		} });
	} });
}

// locations conntected by lines and places where hologram shines appear
var connections = [
	 [35.4,139.53,	35.4,139.53],
   [1.2,103.1, 1.2,103.1     ],
];
    `;
    new Function(jscode)();

    this.state = {
      vmData: [
        // { name: "Hangzhou", value: [120.16, 30.29, 24] },
        // { name: "San Francisco", value: [-122.42, 37.77, 10] },
      ],
      activeNode:[]
    };
  }

  async componentDidMount() {
    //get terminal Data from server
    let response = await axios.get(
      Global.apiHost + "/api/v1/common/activenode"
    );
    if (response.data.status != 0) {
      console.error("get active node error");
      return;
    }
    let responseData = response.data.data;
    console.log(responseData);

    //summarize data
    // const cityInfo = responseData.cityInfo;
    // const terminals = responseData.terminals;
    // let data = [];
    // for (let key in terminals) {
    //   if (key == "") {
    //     continue;
    //   }
    //   if (cityInfo[key]) {
    //     const value = [
    //       cityInfo[key].MachineGeoX,
    //       cityInfo[key].MachineGeoY,
    //       terminals[key],
    //     ];
    //     const v = { name: key, value: value };
    //     data.push(v);
    //   }
    // }

    // //set state value
    // console.log(data);
    this.setState({ activeNode: responseData });
  }

  // getOption() {
  //   let option = {
  //     backgroundColor: "#02233e",
  //     // title: {
  //     //   text: "Acceleration nodes",
  //     //   left: "center",
  //     //   textStyle: {
  //     //     color: "#fff",
  //     //     fontSize: "26",
  //     //   },
  //     //   // subtext: '人口密度数据来自Wikipedia',
  //     // },
  //     tooltip: {
  //       trigger: "item",
  //       formatter: function (params) {
  //         //格式化鼠标指到点上的弹窗返回的数据格式
  //         if (params.value) {
  //           return params.name + " : " + params.value[2];
  //         }
  //         return "";
  //       },
  //     },
  //     geo: {
  //       //地里坐标系组件（相当于每个省块）
  //       map: "world",
  //       zoom: 1.15,
  //       roam: true, //是否开启缩放
  //       // scaleLimit:{
  //       //   min:1.15
  //       // },
  //       // label: {
  //       //    emphasis: {                //鼠标划到后弹出的文字 显示省份
  //       //       color: '#FF0000',       //高亮背景色
  //       //       show: true,             //是否高亮显示
  //       //       fontSize:12             //字体大小
  //       //    }
  //       // },
  //       itemStyle: {
  //         //坐标块本身
  //         normal: {
  //           //坐标块默认样式控制
  //           areaColor: "#fff", //坐标块儿颜色
  //           borderColor: "#fff",
  //         },
  //         emphasis: {
  //           areaColor: "#757575", //放坐标块儿上，块儿颜色
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: "city node", // series名称
  //         type: "effectScatter", // series图表类型
  //         effectType: "ripple", // 圆点闪烁样式，目前只支持ripple波纹式
  //         coordinateSystem: "geo", // series坐标系类型
  //         data: this.state.vmData, // series数据内容
  //         showEffectOn: "render", //配置何时显示特效 render 一直显示，emphasis放上去显示
  //         symbolSize: function (val) {
  //           let size = val[2];
  //           if (size < 10) {
  //             size = 10;
  //           }
  //           if (size > 20) {
  //             size = 20;
  //           }
  //           return size;
  //         },
  //         rippleEffect: {
  //           // ripple的样式控制
  //           brushType: "stroke",
  //           color: "#28FF28",
  //         },
  //         label: {
  //           normal: {
  //             formatter: "{b}",
  //             position: "right",
  //             fontSize:18,
  //             show: true, //显示位置信息，
  //           },
  //         },

  //         itemStyle: {
  //           //散点本身显示控制
  //           normal: {
  //             color: "#28FF28",
  //             shadowBlur: 10,
  //             shadowColor: "#28FF28",
  //           },
  //         },
  //         zlevel: 1,
  //       },
  //       // {
  //       //   name: "country node", // series名称
  //       //   type: "effectScatter", // series图表类型
  //       //   effectType: "ripple", // 圆点闪烁样式，目前只支持ripple波纹式
  //       //   coordinateSystem: "geo", // series坐标系类型
  //       //   data: this.state.vmData, // series数据内容
  //       //   showEffectOn: "render", //配置何时显示特效 render 一直显示，emphasis放上去显示
  //       //   symbolSize: function (val) {
  //       //     let size = val[2];
  //       //     if (size > 20) {
  //       //       size = 20;
  //       //     }
  //       //     return size;
  //       //   },
  //       //   rippleEffect: {
  //       //     // ripple的样式控制
  //       //     brushType: "stroke",
  //       //     color: "#28FF28",
  //       //   },
  //       //   label: {
  //       //     normal: {
  //       //       formatter: "{b}",
  //       //       position: "right",
  //       //       show: true, //显示位置信息，
  //       //     },
  //       //   },

  //       //   itemStyle: {
  //       //     //散点本身显示控制
  //       //     normal: {
  //       //       color: "#28FF28",
  //       //       shadowBlur: 10,
  //       //       shadowColor: "#28FF28",
  //       //     },
  //       //   },
  //       //   zlevel: 1,
  //       // },
  //     ],
  //   };
  //   return option;
  // }

  renderPoint() {
    return (
      <div>
        {this.state.vmData.map((value, index, array) => {
          console.log(value);
          let top = -((value.value[1] - 73) / 130) * 100;
          let left = ((value.value[0] + 160) / 346) * 100;
          console.log(left);
          return (
            <div
              style={{
                display: "block",
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                width: "12px",
                height: "12px",
              }}
            >
              <div className="point"></div>
              <div className="point-a">
                <span className="city-label">{value.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <>
        <div
          className="container"
          style={{
            backgroundColor: "#00000029",
            textAlign: "center",
            // padding: "50px 50px",
            borderRadius: "10px",
            border: "1px solid #00000033",
            position: "relative",
          }}
        >
          <h3
            style={{
              backgroundColor: "#00000061",
              fontWeight: 60,
              color: "rgb(232 232 232)",
              position: "absolute",
              left: "1px",
              top: "20px",
              fontSize: "25px",
              padding: "5px 20px",
              borderRadius: "5px",
            }}
          >
            Acceleration Nodes
          </h3>

          <div
            style={{
              position: "absolute",
              backgroundColor: "#00000036",
              left: "20px",
              top: "80px",
              maxHeight: "260px",
              overflowY: "scroll",
              zIndex:"1000000"
            }}
          >
            <table border="1" style={{minWidth:"300px"}}>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Country</th>
                  <th>Bandwidth</th>
                </tr>
                {this.state.activeNode.map((value,index,array)=>{
                  let speed=(value.machine_net_speed*8 / 1000).toFixed(2)
                  return (
                    
                    <tr>
                      <td>{value.id}</td>
                      <td><div style={{maxWidth:"150px"}}>{value.country}</div></td>
                      <td>{speed} Mb/s</td>
                    </tr>
                  )
                })}
                
              </tbody>
            </table>
          </div>

          <div id="myearth" style={{height:"500px"}}>
            <div id="glow" style={{height:"500px",width:"400px"}}></div>
          </div>
        </div>
      </>
    );
  }
}

// export default withAlert()(NodeMapPage);

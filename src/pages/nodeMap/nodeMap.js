/*
 * @Author: your name
 * @Date: 2021-02-12 13:32:00
 * @LastEditTime: 2021-02-14 15:46:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/nodeMap/nodeMap.js
 */
/*
 * @Author: your name
 * @Date: 2021-02-12 13:32:00
 * @LastEditTime: 2021-02-12 14:20:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/nodeMap/nodeMap.js
 */

import React from "react";
import { withAlert } from "react-alert";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import "./world";
import Global from "../../global/global";

class NodeMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vmData: [
        // { name: "Hangzhou", value: [120.16, 30.29, 24] },
        // { name: "San Francisco", value: [-122.42, 37.77, 10] },
      ],
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
    const cityInfo=responseData.cityInfo
    const terminals=responseData.terminals
    let data=[]
    for(let key in terminals){
      if(cityInfo[key]){
        const value=[cityInfo[key].MachineGeoX,cityInfo[key].MachineGeoY,terminals[key]]
        const v={name:key,value:value}
        data.push(v)
      }
    }
    
    //set state value
    console.log(data)
    this.setState({vmData:data})
  }

  getOption() {
    let option = {
      backgroundColor: "#0948B3",
      title: {
        text: "Acceleration nodes",
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: "26",
        },
        // subtext: '人口密度数据来自Wikipedia',
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          //格式化鼠标指到点上的弹窗返回的数据格式
          if (params.value) {
            return params.name + " : " + params.value[2];
          }
          return "";
        },
      },
      geo: {
        //地里坐标系组件（相当于每个省块）
        map: "world",
        zoom: 1.15,
        roam: true, //是否开启缩放
        scaleLimit:{
          min:1.15
        },
        // label: {
        //    emphasis: {                //鼠标划到后弹出的文字 显示省份
        //       color: '#FF0000',       //高亮背景色
        //       show: true,             //是否高亮显示
        //       fontSize:12             //字体大小
        //    }
        // },
        itemStyle: {
          //坐标块本身
          normal: {
            //坐标块默认样式控制
            areaColor: "#5c5c5c", //坐标块儿颜色
            borderColor: "#111",
          },
          emphasis: {
            areaColor: "#757575", //放坐标块儿上，块儿颜色
          },
        },
      },
      series: [
        {
          name: "city node", // series名称
          type: "effectScatter", // series图表类型
          effectType: "ripple", // 圆点闪烁样式，目前只支持ripple波纹式
          coordinateSystem: "geo", // series坐标系类型
          data: this.state.vmData, // series数据内容
          showEffectOn: "render", //配置何时显示特效 render 一直显示，emphasis放上去显示
          symbolSize: function (val) {
            let size = val[2];
            if (size < 10) {
              size = 10;
            }
            if (size > 20) {
              size = 20;
            }
            return size;
          },
          rippleEffect: {
            // ripple的样式控制
            brushType: "stroke",
            color: "#28FF28",
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true, //显示位置信息，
            },
          },

          itemStyle: {
            //散点本身显示控制
            normal: {
              color: "#28FF28",
              shadowBlur: 10,
              shadowColor: "#28FF28",
            },
          },
          zlevel: 1,
        },
        // {
        //   name: "country node", // series名称
        //   type: "effectScatter", // series图表类型
        //   effectType: "ripple", // 圆点闪烁样式，目前只支持ripple波纹式
        //   coordinateSystem: "geo", // series坐标系类型
        //   data: this.state.vmData, // series数据内容
        //   showEffectOn: "render", //配置何时显示特效 render 一直显示，emphasis放上去显示
        //   symbolSize: function (val) {
        //     let size = val[2];
        //     if (size > 20) {
        //       size = 20;
        //     }
        //     return size;
        //   },
        //   rippleEffect: {
        //     // ripple的样式控制
        //     brushType: "stroke",
        //     color: "#28FF28",
        //   },
        //   label: {
        //     normal: {
        //       formatter: "{b}",
        //       position: "right",
        //       show: true, //显示位置信息，
        //     },
        //   },

        //   itemStyle: {
        //     //散点本身显示控制
        //     normal: {
        //       color: "#28FF28",
        //       shadowBlur: 10,
        //       shadowColor: "#28FF28",
        //     },
        //   },
        //   zlevel: 1,
        // },
      ],
    };
    return option;
  }

  render() {
    return (
      <div style={{ backgroundColor: "#0948B3", padding: "30px 0" }}>
        <div className="container">
          <ReactEcharts
            style={{ height: "650px",border:"2px dashed white",paddingTop:"20px" }}
            option={this.getOption()}
            // notMerge={true}
            // lazyUpdate={true}
            // theme={"theme_name"}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={}
          />
        </div>
      </div>
    );
  }
}

export default withAlert()(NodeMapPage);

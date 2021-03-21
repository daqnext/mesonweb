/*
 * @Author: your name
 * @Date: 2021-02-12 13:37:27
 * @LastEditTime: 2021-02-14 15:11:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/financing/financing.js
 */

import React from "react";
import { withAlert } from "react-alert";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Global from "../../global/global";

class FinancingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xData: [],
      yData: [],
    };
  }

  async componentDidMount() {
    //get terminal Data from server
    let response = await axios.get(Global.apiHost + "/api/v1/common/financing");
    if (response.data.status != 0) {
      console.error("get financing info error");
      return;
    }
    let responseData = response.data.data;
    console.log(responseData);

    //summarize data
    let progress = responseData.progress;
    let date = [];
    let amount = [];
    let sum = 0;
    for (let i = 0; i < progress.length; i++) {
      date.push(progress[i].FinishDate);
      sum += progress[i].Amount;
      amount.push(sum);
    }

    //set state value
    this.setState({ xData: date, yData: amount });
  }

  getOption() {
    let option = {
      backgroundColor: "#02233e",
      textStyle: {
        color: "white",
      },
      title: {
        text: "Financing",
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: "26",
        },
        // subtext: '人口密度数据来自Wikipedia',
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          //格式化鼠标指到点上的弹窗返回的数据格式
          //console.log(params);
          return (
            params[0].axisValue + "<br/> Total Financing:" + params[0].data
          );
        },
      },
      grid: {
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      // toolbox: {
      //     feature: {
      //         saveAsImage: {}
      //     }
      // },
      xAxis: {
        // type: 'time',
        boundaryGap: false,
        data: this.state.xData,
      },
      yAxis: {
        type: "value",
        name: "Financing total amount",
        nameLocation: "end",
        nameTextStyle: {
          align: "left",
          color: "white",
        },
      },
      series: [
        {
          name: "Financing",
          type: "line",
          stack: "Total amount",
          data: this.state.yData,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "red", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };

    return option;
  }

  render() {
    return (
      <div style={{ backgroundColor: "#02233e", padding: "30px 0" }}>
        <div className="container">
          <ReactEcharts
            style={{ height: "450px" }}
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

export default withAlert()(FinancingPage);

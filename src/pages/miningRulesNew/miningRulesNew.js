/*
 * @Author: your name
 * @Date: 2021-03-30 10:00:02
 * @LastEditTime: 2021-08-21 11:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/miningRules/miningRules.js
 */

import React from "react";
import rules from "./rules.html";
import AdminLayout from "../../components/layout/adminLayout";
class NewMiningRulesPage extends React.Component {
    constructor(props) {
        super(props);
        const typed = `
      //   var settings = {
      //     "url": "/api/v1/common/tokenconfig",
      //     "method": "GET",
      // };
       
      //   $.ajax(settings).done(function (response) {
      //     if (response.status == 0) {
      //       let totalToken = response.data
      //       console.log(totalToken)
      //       $('#total_token').html(totalToken/1e9);
      //     }
      //   })

        var settings = {
          "url": "/api/v1/common/tokenperscore",
          "method": "GET",
      };
       
        $.ajax(settings).done(function (response) {
          if (response.status == 0) {
            let tokenPerScore = response.data
            console.log(tokenPerScore)
            $('#token_per_score').html((tokenPerScore/1e9).toFixed(3)+"(Current)");
          }
        })

      //   var getTotalReleasedToken = {
      //     "url": "/api/v1/common/totalreleasedtoken",
      //     "method": "GET",
      // };
       
      //   $.ajax(getTotalReleasedToken).done(function (response) {
      //     if (response.status == 0) {
      //       let totalReleased = response.data
      //       console.log(totalReleased)
      //       let total=(totalReleased/1e9).toFixed(0)
      //       $('#total_token_released').html(total);
      //     }
      //   })

        
        google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      google.charts.setOnLoadCallback(drawTokenDownChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Bandwidth Mb/s', 'Bandwidth Score'],
          ['0',  0 ],
          ['10',  1 ],
          ['20',  3 ],
          ['40',  9],
          ['80',  27 ],
          ['200', 100],
          ['400', 500],
          ['800', 1100],
          ['1200', 1650],
          ['1200+', 1650],
          
        ]);
        

        var options = {
        title: 'Bandwidth(Mb/s) vs Bandwidth Score',
        width: 580,
        height: 300,
        backgroundColor: '#f5f8fc',
        //curveType: 'function',
        legend: { position: 'bottom' }
        };


        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

      function drawTokenDownChart() {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Token/MiningScore per Day'],
          ['1',  0.507 ],
          ['2',  0.469 ],
          ['3',  0.438 ],
          ['4',  0.417],
          ['5',  0.398 ],
          ['6', 0.382],
          ['7', 0.370],
          ['8', 0.359],
          ['9', 0.356],
          ['10', 0.352],
          ['11', 0.351],
          ['12', 0.350],
          ['13', 0.350],
          ['14', 0.350],
          ['15', 0.350],
        ]);
        

        var options = {
        title: 'Bandwidth(Mb/s) vs Bandwidth Score',
        width: 580,
        height: 300,
        backgroundColor: '#f5f8fc',
        //curveType: 'function',
        legend: { position: 'bottom' }
        };


        var chart = new google.visualization.LineChart(document.getElementById('curve_chart_token_down'));

        chart.draw(data, options);
      }
`;
        new Function(typed)();
    }

    async componentDidMount() {}

    render() {
        return (
            <AdminLayout name="Terminal" description="Mining Rules">
                <div
                    dangerouslySetInnerHTML={{
                        __html: rules,
                    }}
                ></div>
            </AdminLayout>
        );
    }
}

export default NewMiningRulesPage;

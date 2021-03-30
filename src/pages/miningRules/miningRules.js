/*
 * @Author: your name
 * @Date: 2021-03-30 10:00:02
 * @LastEditTime: 2021-03-30 20:14:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/miningRules/miningRules.js
 */

import React from 'react';
import rules from "./rules.html";
import AdminLayout from "../../components/layout/adminLayout";
class MiningRulesPage extends React.Component {


    constructor(props) {
        super(props);
        const typed=`
        var settings = {
          "url": "/api/v1/common/tokenconfig",
          "method": "GET",
      };
       
        $.ajax(settings).done(function (response) {
          if (response.status == 0) {
            let totalToken = response.data
            console.log(totalToken)
            $('#total_token').html(totalToken/1e9);
          }
        })

        
        google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

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
          ['800 Mb/s', 1500],
        ]);
        

        var options = {
        title: 'Bandwidth vs Bandwidth Score',
        width: 480,
        height: 300,
        backgroundColor: '#f5f8fc',
        curveType: 'function',
          legend: { position: 'bottom' }
        };


        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
`

new Function(typed)();
        
    }


    async componentDidMount() {
        

    }


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

export  default  MiningRulesPage;
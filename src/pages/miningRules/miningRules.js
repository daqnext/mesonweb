
import React from 'react';
import rules from "./rules.html";
import AdminLayout from "../../components/layout/adminLayout";

class MiningRulesPage extends React.Component {



    constructor(props) {
        super(props);
        const typed=`
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
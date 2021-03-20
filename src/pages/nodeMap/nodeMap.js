/*
 * @Author: your name
 * @Date: 2021-02-12 13:32:00
 * @LastEditTime: 2021-03-20 15:44:07
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
    
    var script = document.createElement('script');
document.head.appendChild(script); // insert into the <head></head> tag

script.addEventListener('load', ev => { // when the js execute done
  myearth = new Earth( 'myearth', {
	
    location : { lat: 20, lng : 20 },

    light: 'none',

    mapImage: 'https://assets.meson.network:10443/static/map/hologram/hologram-map.svg',
    transparent: true,
  
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
      console.log(connections)

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

    window.addEventListener( 'load', function() {

	//     myearth = new Earth( 'myearth', {
	
	// 	  location : { lat: 20, lng : 20 },
	
	// 	  light: 'none',

	// 	  mapImage: '/mapdot/hologram-map.svg',
	// 	  transparent: true,
		
	// 	  autoRotate : true,
	// 	  autoRotateSpeed: 2.0,
	// 	  autoRotateDelay: 100,
	// 	  autoRotateStart: 2000,			
		
	//   });
	
	
	//   myearth.addEventListener( "ready", function() {

	// 	  this.startAutoRotate();

	// 	  // connections
      
	// 	  var line = {
	// 		  color : '#009CFF',
	// 		  opacity: 0.35,
	// 		  hairline: true,
	// 		  offset: -0.5
	// 	  };

  //   let that=this

  //   var settings = {
  //     "url": "/api/v1/common/nodelocation",
  //     "method": "GET",
  // };
   
  //   $.ajax(settings).done(function (response) {
  //     if (response.status == 0) {
  //       // console.log(response.data)
  //       connections = response.data
  //       console.log(connections)

  //       for ( var i in connections ) {			
  //         line.locations = [ 
  //         { lat: connections[i][0], lng: connections[i][1] },
  //         { lat: connections[i][2], lng: connections[i][3] } ];
  //         that.addLine( line );
  //       }
        
  //       // add shine sprites
  //       for ( var i=0; i < connections.length; i++ ) {
  //         sprites[i] = that.addSprite( {
  //           image: '/mapdot/hologram-shine-green2.svg',
  //           scale: 0.01,
  //           offset: -0.5,
  //           opacity: 0.5
  //         } );
  //         pulse( i );
  //       }
          
  //     }
  // });
	// });
});
    `;
    new Function(jscode)();

    this.state = {
      vmData: [
        // { name: "Hangzhou", value: [120.16, 30.29, 24] },
        // { name: "San Francisco", value: [-122.42, 37.77, 10] },
      ],
      activeNode: [],
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
    responseData.sort(function(x,y){
      return x.id-y.id
    })
    
    //console.log(responseData);

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
              backgroundColor: "rgb(1 18 32)",
              fontWeight: 60,
              color: "rgb(232 232 232)",
              position: "absolute",
              left: "1px",
              top: "0px",
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
              backgroundColor: "rgb(0 0 0 / 14%)",
              marginRight: "5px",
              left: "5px",
              top: "80px",
              maxHeight: "260px",
              overflowY: "scroll",
              zIndex: "1000000",
              border: "1px solid #ffffff1a",
            }}
          >
            <table
              border="1"
              style={{
                minWidth: "300px",
                color: "#e0e0e0",
                borderColor: "#013c6f",
              }}
            >
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Place</th>
                  <th>Bandwidth</th>
                </tr>
                {this.state.activeNode.map((value, index, array) => {
                  let speed = ((value.machine_net_speed * 8) / 1000).toFixed(2);
                  return (
                    <tr>
                      <td style={{ padding: "0px 5px" }}>{"id-" + value.id}</td>
                      <td>
                        <div style={{ maxWidth: "150px", fontSize: "16px" }}>
                          {value.country + " ***  [" + value.city + "]"}
                        </div>
                      </td>
                      <td style={{ padding: "0px 10px" }}>{speed} Mb/s</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div id="myearth" style={{ height: "500px" }}>
            <div id="glow" style={{ height: "500px", width: "400px" }}></div>
          </div>
        </div>
      </>
    );
  }
}

// export default withAlert()(NodeMapPage);

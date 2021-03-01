/*
 * @Author: your name
 * @Date: 2021-02-27 14:56:32
 * @LastEditTime: 2021-02-27 21:14:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/investors/investors.js
 */

import React from "react";
import hotbitlab from "../../img/seed-round-investor-logos/hotbitlab.jpeg";
import ia from "../../img/seed-round-investor-logos/ia.png";
import kernelventures from "../../img/seed-round-investor-logos/kernelventures.png";
import mask from "../../img/seed-round-investor-logos/mask.png";
import paka from "../../img/seed-round-investor-logos/paka.png";
import tfp from "../../img/seed-round-investor-logos/tfp.png";
import youbi from "../../img/seed-round-investor-logos/youbi2.png";

export default class Investors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="section section-lg pb-5 bg-soft">
        <div className="container">
          <div class="row justify-content-center mb-5 mb-lg-6">
            <div class="col-12 text-center">
              <h2 class="h1 px-lg-5">INVESTORS</h2>
              {/* <p class="lead px-lg-10">Every page from Rocket has been carefully built to provide all the necessary pages your startup will require</p> */}
            </div>
          </div>

          <div
            className="row justify-content-center mb-4"
            style={{ alignItems: "center" }}
          >
            {/* <div className="col-6 col-lg-3 mb-6" style={{maxWidth:"20%",margin:"auto 2%",marginBottom:"2%"}}>
                        <a href="javascript:;" class="page-preview scale-up-hover-2">
                            <img class="rounded" src={hotbitlab} alt="hotbitlab"/>
                        </a>
                    </div> */}

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={mask} alt="mask" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={youbi} alt="youbi" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={ia} alt="ia" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={paka} alt="paka" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={tfp} alt="tfp" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img src={kernelventures} alt="kernelventures" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>

            <div className="col-6 col-lg-2 mb-6 ml-4 mr-4">
              <a href="javascript:;" class="page-preview scale-up-hover-2">
                <img class="rounded" src={hotbitlab} alt="hotbitlab" />
                {/* <div class="text-center show-on-hover">
                                <h6 class="m-0 text-center text-white">Sign in 2 <i class="fas fa-external-link-alt ml-2"></i></h6>
                            </div> */}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

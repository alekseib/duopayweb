import React, {ReactNode} from 'react';

import './Frame.css';
import {appdata} from "../model/AppData";

function Frame(props: { children: ReactNode }) {
    let image = "https://duopaysetup.s3.eu-west-1.amazonaws.com/" + appdata.productCode + "/MiniPoster/Slide1.JPG";
    return (
        <header className="Frame" id="header">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="offer">
                            <time className="Frame-header">{appdata.header}</time>
                            <img src={image} alt="" className= "img1"/>
                            <div>
                                  {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Frame;

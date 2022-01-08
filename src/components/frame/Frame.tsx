import React, {ReactNode} from 'react';

import './Frame.css';
import {appdata} from "../AppData";

function Frame(props: { children: ReactNode }) {
    let image = "img/events/" + appdata.productCode + ".JPG";
    return (
        <header className="Frame" id="header">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="offer">
                            <time className="Frame-header">{appdata.header}</time>
                            <img src={image} alt=""/>
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

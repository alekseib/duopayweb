import React, {ReactNode} from 'react';

import './Frame.css';

function Frame(props: { children: ReactNode }) {
    return (
        <header className="Frame" id="header">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="offer">
                            <time className="Frame-header">Загловок!!!888</time>
                            <img src="img/events/ONEGIN1.JPG" alt=""/>
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

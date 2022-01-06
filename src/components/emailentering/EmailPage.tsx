import React from 'react';
import Footer from "../footer/Footer";

import './EmailPage.css';
import Frame from "../frame/Frame";

function EmailPage() {
    return (
        <Frame>
            <div>
                <br/>
                <div>Header</div>
                <div>
                    <form className="app-form" method="post" id="myform">
                        <h2 className="app-title">test3</h2>
                        <input type="text" placeholder="Имя" name="name" required/>
                        <input type="email" placeholder="E-mail" name="email" required/>
                        <label id="radiobox" className="label label_agree">
                            <input type="radio" className="radio" name="agreeWithConditions" value="true"/>
                            <span className="fake"></span>
                            <p className="radio__text">
                                <a href="https://duoclassico.eu/conditions-ru" className="radio__link">
                                    Согласен с правилами продажи билетов
                                </a>
                            </p>
                        </label>
                        <p className="app-text">
                            Сообщение об ошибке
                        </p>
                        <script
                            src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                        <div className="app-button d-flex justify-content-around">
                            <button type="submit" className="app-btn app-btn-further next-step-btn" >
                                <span>Далее</span>
                            </button>
                        </div>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        </Frame>
    );
}

export default EmailPage;
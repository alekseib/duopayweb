import React from 'react';
import Footer from "../footer/Footer";
import './EmailPage.css';
import Frame from "../frame/Frame";
// @ts-ignore
import { withRouter } from 'react-router-dom';
import {appdata, save} from "../AppData";

interface EmailProps {
}

interface EmailState {
    input: any
    errors: any
}

class EmailPage extends React.Component<EmailProps, EmailState> {

    constructor(props: EmailProps) {
        super(props);
        this.state = {
            input: {},
            errors: {}
        };
        this.state.input["email"] = appdata.customerEmail;
        this.state.input["name"] = appdata.customerName;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    // @ts-ignore
    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            appdata.customerEmail = this.state.input["email"];
            appdata.customerName = this.state.input["name"];
            save()
            // @ts-ignore
            this.props["history"].push("/payment")
        }
        console.log(this.state);
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            // @ts-ignore
            errors["name"] = "Пожалуйста введите имя.";
        }

        if (!input["email"]) {
            isValid = false;
            // @ts-ignore
            errors["email"] = "Пожалуйста введите емайл.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                // @ts-ignore
                errors["email"] = "Please enter valid email address.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <Frame>
                <div>
                    <div>
                        <form className="app-form" method="post" id="myform" onSubmit={this.handleSubmit}>
                            <h2 className="app-title">Пожалуйста, введите имя и емайл. На этот емайл мы вышлем вам билет.</h2>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.input.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Имя"
                                    id="name"/>
                                <div className="text-danger">{this.state.errors.name}</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.input.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="E-mail"
                                    id="email"/>
                                <div className="text-danger">{this.state.errors.email}</div>
                            </div>
                            <label id="radiobox" className="label label_agree">
                                <input
                                    type="radio"
                                    name="agreeWithConditions"
                                    value={this.state.input.agreeWithConditions}
                                    onChange={this.handleChange}
                                    className="radio"
                                    id="agreeWithConditions" checked/>
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
                                <button type="submit" className="app-btn app-btn-further next-step-btn">
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
}

export default withRouter(EmailPage);
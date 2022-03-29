import Frame from "../common/Frame";
import Footer from "../common/Footer";
import React from "react";
// @ts-ignore
import { withRouter } from 'react-router-dom';
import {appdata, save} from "../model/AppData";
import axios from "axios";
import {Spinner} from "react-bootstrap";

interface EmailProps {
}

interface EmaleState {
    input: any
    errors: any
}
let busy = false;
class Refresh extends React.Component<EmailProps, EmaleState> {

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
        axios.get('https://api.duoclassico.eu/functions/hello')
    }

    handleChange(event: any) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        })
    }
    // @ts-ignore
    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            appdata.customerEmail = this.state.input["email"];
            appdata.customerName = this.state.input["name"];
            save()
            this.refreshTicket()
        }
        console.log(this.state);
    }

    refreshTicket() {
        if (busy) return;
        busy = true;
        axios.post('https://api.duoclassico.eu/functions/lead', appdata)
            .then(response => {
                // @ts-ignore
                appdata.country = response.data["country"];
                save();
                busy = false;
                // @ts-ignore
                this.props["history"].push("/refreshthankyou")
            })
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

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?(25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.)((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                // @ts-ignore
                errors["email"] = "Пожалуйста введите емайл.";
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
                            <h2 className="app-title">Пожалуйста, введити ваше имя и емайл. На этот емайл мы вышлем вам новую ссылку а запись.</h2>
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
                            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"/>
                            <div className="app-button d-flex justify-content-around">
                                <button type="submit" className="app-btn app-btn-further next-step-btn">
                                    {busy?<Spinner
                                        as="span"
                                        variant="light"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        animation="border"/>:<span>Далее</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </Frame>
        )
    }
}
export default withRouter(Refresh);

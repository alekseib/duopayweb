import React, {useState} from 'react';
import Footer from "../common/Footer";
import Frame from "../common/Frame";
// @ts-ignore
import {withRouter} from 'react-router-dom';
import {appdata, save} from "../model/AppData";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";
import {withTranslation} from 'react-i18next';
import i18next from "i18next";
interface LeadProps {

}

interface LeadState {
    input: any
    errors: any
    error: string
}

let busy = false;


class Lead extends React.Component<LeadProps, LeadState> {

    constructor(props: LeadProps) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            error: ""
        };
        this.state.input["email"] = appdata.customerEmail;
        this.state.input["name"] = appdata.customerName;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        axios.get('https://api.duoclassico.eu/functions/hello')
        // @ts-ignore
        const { t } = this.props;
        function calcHeader() {
            // @ts-ignore
            if(appdata.count === 1 || appdata.count === 21)
                appdata.header = appdata.count + " " + t("oneTicket") + ". ";
            else if(appdata.count === 2 || appdata.count === 3 || appdata.count === 4)
                appdata.header = appdata.count + " " + t("234Tickets") + ". ";
            else
                appdata.header = appdata.count + " " + t("manyTickets") + ". ";
            appdata.header = appdata.header + " " + appdata.amount + "€";

        }
        calcHeader();

    }
    calcHeader()
    {

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
            this.saveLead()
            ReactPixel.init('325830968618472');
            ReactPixel.track("Lead");
        }
        console.log(this.state);
    }

    saveLead() {
        this.setState({ error: ""});
        if (busy) return;
        busy = true;
        appdata.language = i18next.language;
        axios.post('https://api.duoclassico.eu/functions/lead', appdata)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ error: response.statusText});
                    return;
                }

                appdata.country = response.data["country"];
                save();
                // @ts-ignore
                if (appdata.sold)
                {
                    // @ts-ignore
                    this.props["history"].push("/sold")
                }
                else
                {
                    // @ts-ignore
                    this.props["history"].push("/payment")
                }

            })
            .catch((error) => {
                this.setState({ error: error.message});
                return Promise.reject(error)
            })
            .finally(() => {
                busy = false;
            });
    }

    validate() {
        // @ts-ignore
        const { t } = this.props;

        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            // @ts-ignore
            errors["name"] = t("PleaseEnterName");
        }

        if (!input["email"]) {
            isValid = false;
            // @ts-ignore
            errors["email"] = t("PleaseEnterEMail");
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                // @ts-ignore
                errors["email"] = t("PleaseEnterEMail");
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        // @ts-ignore
        const { t } = this.props;
        return (
            <Frame>
                <div>
                    <div>
                        <form className="app-form" method="post" id="lead_form" onSubmit={this.handleSubmit}>
                            <h2 className="app-title">
                                {t("PleaseEnterNameAndEmail")}
                                <br/>
                                {t("WeWillSendTicketOnThisEmail")}
                            </h2>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.input.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder={t("Name")}
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
                                    placeholder={t("EMail")}
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

                                <span className="fake"/>
                                <p className="radio__text">
                                    <a href={t("urlOfConditions")} className="radio__link">
                                        {t("AgreeWithConditions")}
                                    </a>
                                </p>
                                <div className="text-danger">{this.state.errors.agreeWithConditions}</div>
                            </label>
                            <p className="app-text">
                                {this.state.error}
                            </p>

                            <div className="app-button d-flex justify-content-around">
                                <button type="submit" className="app-btn app-btn-further next-step-btn">
                                    {busy ? <MySpinner/> : <span>{t("NextButton")}</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                    <Footer/>
                </div>
            </Frame>
        );
    }
}

export default withRouter(withTranslation()(Lead));


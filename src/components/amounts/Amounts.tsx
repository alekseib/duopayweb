import React from 'react';
import Footer from "../common/Footer";
import './Amounts.css';
import Frame from "../common/Frame";
// @ts-ignore
import {withRouter} from 'react-router-dom';
import {appdata, save} from "../model/AppData";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";

interface AmountsProps {

}

interface AmountsState {
    input: any
    errors: any
    error: string
}

let busy = false;

class Amounts extends React.Component<AmountsProps, AmountsState> {

    constructor(props: AmountsProps) {
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
        axios.post('https://api.duoclassico.eu/functions/lead', appdata)
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ error: response.statusText});
                    return;
                }
                // @ts-ignore
                appdata.country = response.data["country"];
                save();
                // @ts-ignore
                this.props["history"].push("/payment")

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
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            // @ts-ignore
            errors["name"] = "Пожалуйста введите имя.AAA";
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
                    <div className="calculate">
                        <form className="offer__form" method="post" id="lead_form" onSubmit={this.handleSubmit}>
                            <h2 className="app-title">
                                Пожалуйста, выберите количество билетов.
                            </h2>
                            <p className="app-text">
                                {this.state.error}
                            </p>
                            <div className="offer__label-wrap">
                                <table>
                                    <tr>
                                       <td>Полный билет: 17€</td>
                                       <td>
                                           <div className="offer__value fullPrice">
                                               <div className="offer__change">
                                                   <span className="offer__minus">-</span>
                                                   <input type="number" id="fullPrice" min="0" value="2"/>
                                                   <span className="offer__plus">+</span>
                                               </div>
                                           </div>
                                       </td>
                                    </tr>
                                    <tr>
                                        <td><br/><br/></td>
                                    </tr>
                                    <tr>
                                        <td>Полный билет: 15€</td>
                                        <td>
                                            <div className="offer__value fullPrice">
                                                <div className="offer__change">
                                                    <span className="offer__minus">-</span>
                                                    <input type="number" id="fullPrice" min="0" value="2"/>
                                                    <span className="offer__plus">+</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                            <br></br>
                            <ul className="offer__total">
                                <li className="offer__total-item offer__total-item_sum">Сумма: 20€
                                </li>
                            </ul>
                            <div className="app-button d-flex justify-content-around">
                                <button type="submit" className="app-btn app-btn-further next-step-btn">
                                    {busy ? <MySpinner/> : <span>Далее</span>}
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

export default withRouter(Amounts);


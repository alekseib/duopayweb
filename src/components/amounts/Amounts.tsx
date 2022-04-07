import React from 'react';
import Footer from "../common/Footer";
import './Amounts.css';
import Frame from "../common/Frame";
// @ts-ignore
import {withRouter} from 'react-router-dom';
import {appdata, save} from "../model/AppData";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";

interface AmountsProps {

}

interface AmountsState {
    input: any
    errors: any
    error: string
}

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
        appdata.header = "";
        ReactPixel.init('325830968618472');
        ReactPixel.track("AddToWishlist");

        this.calculate();
    }
    changeCount(field: string, change: number) {
        if ("Full" === field) {
            appdata.countFull = appdata.countFull + change;
            if (appdata.countFull < 0 )
                appdata.countFull = 0;
        }

        else {
            appdata.countReduced = appdata.countReduced + change;
            if (appdata.countReduced < 0 )
                appdata.countReduced = 0;

        }
        this.calculate();
        let input = this.state.input;
        this.setState({
            input,
            error:""
        });
    }

    calculate()
    {
        appdata.count = appdata.countFull + appdata.countReduced;
        appdata.amount = appdata.countFull * appdata.priceFull + appdata.countReduced * appdata.priceReduced;

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
        ReactPixel.init('325830968618472');
        ReactPixel.track("AddToCart");
        if (this.validate()) {
            save();
            // @ts-ignore
            this.props["history"].push("/start");
        }
    }

    validate() {
        this.calculate();
        if (appdata.count === 0) {
            this.setState({
                error: "Пожалуйста выберите хотя бы один билет!"
            });
            return false;
        }
        return true;
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
                            <div className="offer__label-wrap">
                                <table>
                                    <tbody>
                                    <tr>
                                       <td>{appdata.priceHeader}{appdata.priceFull}€</td>
                                       <td>
                                           <div className="offer__value fullPrice">
                                               <div className="offer__change">
                                                   <span className="offer__minus" onClick={() => this.changeCount("Full",-1)}>-</span>
                                                   <input type="number" id="fullPrice" min="0" value={appdata.countFull} onChange={this.handleChange}/>
                                                   <span className="offer__plus" onClick={() => this.changeCount("Full",1)}>+</span>
                                               </div>
                                           </div>
                                       </td>
                                    </tr>
                                    <tr>
                                        <td><br/><br/></td>
                                    </tr>
                                    {appdata.priceReduced > 0 ?
                                    <tr>
                                        <td>{appdata.priceReducedHeader}{appdata.priceReduced}€</td>
                                        <td>
                                            <div className="offer__value fullPrice">
                                                <div className="offer__change">
                                                    <span className="offer__minus" onClick={() => this.changeCount("Reduced",-1)}>-</span>
                                                    <input type="number" id="fullPrice" min="0" value={appdata.countReduced} onChange={this.handleChange}/>
                                                    <span className="offer__plus" onClick={() => this.changeCount("Reduced",1)}>+</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> : <div></div>}
                                    </tbody>
                                </table>
                            </div>
                            <br></br>
                            <ul className="offer__total">
                                <li className="offer__total-item offer__total-item_sum">Сумма: {appdata.amount}€
                                </li>
                            </ul>
                            <p className="app-text">
                                {this.state.error}
                            </p>
                            <div className="app-button d-flex justify-content-around">
                                <button type="submit" className="app-btn app-btn-further next-step-btn">
                                    <span>Далее</span>
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


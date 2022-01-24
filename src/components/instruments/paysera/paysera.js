import payseraData from "../../instrumentsOld/paysera.json";
import {appdata} from "../../AppData";
import axios from "axios";

export function Paysera() {
    const paysera = (method) => {
        console.log(method)
        axios.post('https://api.duoclassico.eu/functions/init', appdata)
            .then(response => {
                // @ts-ignore
                appdata.country = response.data["country"];
                window.open("https://www.google.com","_self");
        })
    }
    return <div>
        <div className="App">
            <ul className="offer-pay__banks">
                {
                    (payseraData["data"][appdata.country.toLowerCase()] !== undefined)?
                    Object.keys(payseraData["data"][appdata.country.toLowerCase()]).map(function(name, index){
                        return <li key={ index }>
                                <img src={payseraData["data"][appdata.country.toLowerCase()][name]["url"]} alt="" onClick={()=>paysera(name)}/>
                        </li>
                    }):<div> </div>
                }
            </ul>
        </div>
    </div>
}

import {appdata, load, save} from "./AppData";
import axios from "axios";

export async function parseParams(params: any) {
    let productCode1 = params["productCode"];
    if ("" === productCode1 || productCode1 === undefined) {
        load();
        return;
    }
    appdata.errorMessage = "";
    appdata.productCode = params["productCode"];
    try {
        appdata.priceFull = params["key"].split('A')[1] / 100;
        appdata.price1 = params["key"].split('A')[2] / 100;
        if (appdata.price1 - appdata.priceFull - 1.11 > 0.0000001) {
            console.log("Errorr!!! PriceFull!")
            appdata.errorMessage = "InvalidKey";
        }
        appdata.priceReduced = params["key"].split('B')[1] / 100;
        appdata.price1Reduced = params["key"].split('B')[2] / 100;
        if (appdata.price1Reduced - appdata.priceReduced - 1.11 > 0.0000001) {
            console.log("Errorr!!! PriceReduced")
            appdata.errorMessage = "InvalidKey";
        }
        appdata.priceReducedHeader = "ReducedTicket"
        if (appdata.priceReduced > 0)
            appdata.priceHeader = "FullTicket"
        else
            appdata.priceHeader = "Ticket"
    } catch (e) {
        appdata.errorMessage = "ParsingError";
    }
    appdata.header = "";
    const response = await axios("https://duopaysetup.s3.eu-west-1.amazonaws.com/" + appdata.productCode + "/" + appdata.productCode + ".json")
    console.log(response.data);
    appdata.config = response.data;
    appdata.eventType = response.data["type"];
    appdata.productName = response.data["name"];
    appdata.description = appdata.productName;
    appdata.countFull = 1;
    appdata.countReduced = 0;
    if ("OFFLINE" === appdata.eventType) {
        appdata.countFull = 2;
    } else {
        appdata.amount = appdata.priceFull;
        appdata.count = 1;
    }
    console.log("SETUP OK")
    if ("" === appdata.errorMessage)
        save();
    else
        load();
}

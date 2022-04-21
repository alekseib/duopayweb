export const appdata = {
       "eventType":"",
       "productCode":"",
       "priceHeader":"",
       "priceReducedHeader":"",
       "priceFull":0.0,
       "priceReduced":0.0,
       "price1":0.0,
       "price1Reduced":0.0,
       "productName":"",
       "amount":0.0,
       "count":0,
       "countFull":0,
       "countReduced":0,
       "errorMessage":"",
       "header":"",
       "customerEmail":"",
       "customerName":"",
       "country":"",
       "paymentMethod":"",
       "paymentInstrument":"",
       "orderId":"",
       "description":"",
       "redirectData":""

}
export function save()
{
    window.localStorage.setItem('state', JSON.stringify(appdata));
}
export function load()
{
    let text = window.localStorage.getItem('state');
    // @ts-ignore
    let state1 = JSON.parse(text);
    try {
        appdata["productCode"] = state1["productCode"];
        appdata["priceFull"] = state1["priceFull"];
        appdata["priceReduced"] = state1["priceReduced"];
        appdata["count"] = state1["count"];
        appdata["amount"] = state1["amount"];
        appdata["countFull"] = state1["countFull"];
        appdata["countReduced"] = state1["countReduced"];
        appdata["productName"] = state1["productName"];
        appdata["customerEmail"] = state1["customerEmail"];
        appdata["customerName"] = state1["customerName"];
        appdata["header"] = state1["header"];
        appdata["country"] = state1["country"];
        appdata["description"] = state1["description"];
        appdata["redirectData"] = state1["redirectData"];
        appdata["eventType"] = state1["eventType"];

    }
    catch (e)
    {

    }
}

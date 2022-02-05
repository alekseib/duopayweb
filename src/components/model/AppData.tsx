export const appdata = {
       "productCode":"",
       "price":0.0,
       "price1":0.0,
       "productName":"",
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
        appdata["price"] = state1["price"];
        appdata["productName"] = state1["productName"];
        appdata["customerEmail"] = state1["customerEmail"];
        appdata["customerName"] = state1["customerName"];
        appdata["header"] = state1["header"];
        appdata["country"] = state1["country"];
        appdata["description"] = state1["description"];
        appdata["redirectData"] = state1["redirectData"];

    }
    catch (e)
    {

    }
}

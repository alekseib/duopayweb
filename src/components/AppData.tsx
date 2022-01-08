import app from "./App";

export const appdata = {
       "productCode":"",
       "price":0.0,
       "price1":0.0,
       "productName":"",
       "errorMessage":"",
       "header":"",
       "customerEmail":"",
       "customerName":""
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
    appdata["productCode"] = state1["productCode"];
    appdata["price"] = state1["price"];
    appdata["productName"] = state1["productName"];
    appdata["customerEmail"] = state1["customerEmail"];
    appdata["customerName"] = state1["customerName"];
    appdata["header"] = state1["header"];
}


export function parseParams(params:any)
{
    appdata.errorMessage = "";
    appdata.productCode  = params["productCode"];
    try {
        appdata.price  = params["key"].split('A')[1] /100;
        appdata.price1  = params["key"].split('A')[2] /100;
        if (appdata.price1 - appdata.price - 1.11 > 0.0000001)
        {
            appdata.errorMessage = "InvalidKey";
        }

    } catch (e)
    {
        appdata.errorMessage = "InvalidKey";
    }
    appdata.header = "Билет " + appdata.price + "€";
    if ("SILVER1" === appdata.productCode)
    {
        appdata.productName = "Песни и романсы на стихи поэтов серебряного века. Часть 1";
    }
    else
    if ("SILVER2" === appdata.productCode)
    {
        appdata.productName = "Песни и романсы на стихи поэтов серебряного века. Часть 2";
    }
    else
    if ("SILVER3" === appdata.productCode)
    {
        appdata.productName = "Песни и романсы на стихи поэтов серебряного века. Часть 3";
    }
    else
    if ("FR" === appdata.productCode)
    {
        appdata.productName = "Физика и история музыки";
    }
    else
    if ("ONEGIN1" === appdata.productCode)
    {
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 1";
    }
    else
    if ("ONEGIN2" === appdata.productCode)
    {
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 2";
    }
    if ("" === appdata.productCode)
    {
        appdata.errorMessage = "InvalidEventCode";
    }
    if ("" === appdata.errorMessage)
        save();
    else
        load();
}

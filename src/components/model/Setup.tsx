import {appdata, load, save} from "./AppData";

export function parseParams(params:any)
{
    appdata.errorMessage = "";
    appdata.productCode  = params["productCode"];
    try {
        appdata.price  = params["key"].split('A')[1] /100;
        appdata.price1  = params["key"].split('A')[2] /100;
        if (appdata.price1 - appdata.price - 1.11 > 0.0000001)
        {
            console.log("Errorr!!!")
            appdata.errorMessage = "InvalidKey";
        }

    } catch (e)
    {
        appdata.errorMessage = "ParsingError";
    }
    appdata.header = "Билет " + appdata.price + "€";
    if ("SILVER1" === appdata.productCode)
    {
        appdata.productName = "Серебрянный век. Часть 1 ";
    }
    else
    if ("SILVER2" === appdata.productCode)
    {
        appdata.productName = "Серебрянный век. Часть 2 ";
    }
    else
    if ("SILVER3" === appdata.productCode)
    {
        appdata.productName = "Серебрянный век. Часть 3 ";
    }
    else
    if ("FR" === appdata.productCode)
    {
        appdata.productName = "Физика и история музыки. ";
    }
    else
    if ("ONEGIN1" === appdata.productCode)
    {
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 1 ";
    }
    else
    if ("ONEGIN2" === appdata.productCode)
    {
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 2 ";
    }
    else
    if ("NOVIKOV2022" === appdata.productCode)
    {
        appdata.productName = "Вячеслав Новиков. Франц Шуберт";
    }
    else
        appdata.errorMessage = "InvalidEventCode";
    if ("" === appdata.productCode || undefined === appdata.productCode)
    {
        appdata.errorMessage = "EmptyEventCode";
    }
    appdata.description = appdata.productName;
    if ("" === appdata.errorMessage)
        save();
    else
        load();
}

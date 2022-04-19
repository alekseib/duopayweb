import {appdata, load, save} from "./AppData";

export function calcHeader()
{
    if(appdata.count === 1 || appdata.count === 21)
        appdata.header = appdata.count + " билет. ";
    else if(appdata.count === 2 || appdata.count === 3 || appdata.count === 4)
            appdata.header = appdata.count + " билетa. ";
    else
        appdata.header = appdata.count + " билетов. ";
    appdata.header = appdata.header + " " + appdata.amount + "€";

}
export function parseParams(params:any)
{
    appdata.errorMessage = "";
    appdata.productCode  = params["productCode"];
    try {
        appdata.priceFull  = params["key"].split('A')[1] /100;
        appdata.price1  = params["key"].split('A')[2] /100;
        if (appdata.price1 - appdata.priceFull - 1.11 > 0.0000001)
        {
            console.log("Errorr!!! PriceFull!")
            appdata.errorMessage = "InvalidKey";
        }
        appdata.priceReduced  = params["key"].split('B')[1] /100;
        appdata.price1Reduced  = params["key"].split('B')[2] /100;
        if (appdata.price1Reduced - appdata.priceReduced - 1.11 > 0.0000001)
        {
            console.log("Errorr!!! PriceReduced")
            appdata.errorMessage = "InvalidKey";
        }
        appdata.priceReducedHeader = "Льготный билет: "
        if (appdata.priceReduced > 0)
            appdata.priceHeader = "Полный билет:"
        else
            appdata.priceHeader = "Билет:"
    } catch (e)
    {
        appdata.errorMessage = "ParsingError";
    }
    appdata.header = "";
    if ("SILVER1" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Серебрянный век. Часть 1 ";
    }
    else
    if ("SILVER2" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Серебрянный век. Часть 2 ";
    }
    else
    if ("SILVER3" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Серебрянный век. Часть 3 ";
    }
    else
    if ("FR" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Физика и история музыки. ";
    }
    else
    if ("ONEGIN1" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 1 ";
    }
    else
    if ("ONEGIN2" === appdata.productCode)
    {
        appdata.eventType = "RECORDING";
        appdata.productName = "Тайны оперы Евгений Онегин. Часть 2 ";
    }
    else
    if ("NOVIKOV2022" === appdata.productCode)
    {
        appdata.eventType = "OFFLINE";
        appdata.productName = "Вячеслав Новиков. Франц Шуберт";
    } else
    if ("HOPNER20220515" === appdata.productCode)
    {
        appdata.eventType = "OFFLINE";
        appdata.productName = "Музыка любви. Благотворительный концерт";
    }
    else
        appdata.errorMessage = "InvalidEventCode";
    if ("" === appdata.productCode || undefined === appdata.productCode)
    {
        appdata.errorMessage = "EmptyEventCode";
    }
    appdata.description = appdata.productName;
    appdata.countFull = 1;
    appdata.countReduced = 0;
    if ("OFFLINE" === appdata.eventType)
    {
        appdata.countFull = 2;
    }
    else
    {
        appdata.amount = appdata.priceFull;
        appdata.count = 1;
    }

    if ("" === appdata.errorMessage)
        save();
    else
        load();
}

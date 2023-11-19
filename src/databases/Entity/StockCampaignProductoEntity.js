import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'


export async function insertStockCampaignProductoToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO stock_campaign_producto (idstock_campaign_producto, productos_idproductos, stock_camion_campaign_idstock_camion_campaign, " + 
        "cantidad, cantidad_initial, created, modified, status, cant_transfer) " +
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idstock_campaign_producto, data.productos_idproductos, 
                data.stock_camion_campaign_idstock_camion_campaign, data.cantidad, data.cantidad_initial, data.created, data.modified, data.status, data.cant_transfer], 
                (_, result) => {
                   
                  
                    console.log('inserted data campaign producto');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    //console.log(err);
                    //console.log('camioncampaign erro');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return true;
    },
    (error) => { 
        //setResult(false);
        //console.log(error);
        return false;
       
    });
    //db.closeAsync();

    return result;
   
   
}


export async function updateStockCampaignProductoToDB(data)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE stock_campaign_producto SET cantidad = ?, modified = ?, cant_transfer = ? WHERE idstock_campaign_producto = ?;"
    console.log(data);


    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.cantidad, data.modified,  data.cant_transfer, data.idstock_campaign_producto], 
                (_, result) => {
                   
                  
                    //console.log('update data campaign producto');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    //console.log(sqlerror);
                    //console.log(err);
                    console.log('vsmpaign producto error');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        //console.log(error);
        return false;
       
    });
    //db.closeAsync();

    return result;



}


export async function getStockCampaignProductoById(idstock_campaign_producto)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM stock_campaign_producto where idstock_campaign_producto = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idstock_campaign_producto], 
                (_, result) => {
                
            
                    resolve(result);
                }, (err) => {
                   
                    reject(err);
   
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        //console.log('Error en User ENtity CANTIDAD');
        return false;
    });

    //console.log(result);
    return result;

}

export async function deleteStockCampaignProductoById(idstock_camion_campaign){

    const db = SQLITE.openDatabase(database_name);

    const query = "DELETE FROM stock_campaign_producto WHERE stock_camion_campaign_idstock_camion_campaign = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idstock_camion_campaign], 
                (_, result) => {
                
                    console.log(result);
                    resolve(result);
                }, (err) => {
                   
                    reject(err);
   
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        console.log('Error en delete de cartsession');
        return false;
    });

    //console.log(result);
    return result;


}
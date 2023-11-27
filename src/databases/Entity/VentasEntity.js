import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'


export async function insertVentasToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO ventas (created, users_idusers, clientes_idclientes, subtotal, descuentos, total, descuento_general, pedidos_idpedidos, " + 
    "coordenadas, campaign_idcampaign, cuenta_corriente, is_pay, camion_idcamion, status) " +
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.created, data.users_idusers, 
                data.clientes_idclientes,  data.subtotal, data.descuentos, data.total, data.descuento_general, data.pedidos_idpedidos, 
                data.coordenadas, 
                data.campaign_idcampaign, data.cuenta_corriente, data.is_pay, data.camion_idcamion, data.status], 
                (_, result) => {
                   
                  
                    console.log('inserted data Ventas');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('Ventas error');
                   
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

export async function getVentasFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM ventas ORDER BY ventas_id ASC;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [], 
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

export async function getResumenVentasFromDB(is_pay)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT SUM(subtotal) as subtotal, SUM(descuentos) AS descuentos, SUM(descuento_general) as descuento_general, "
    + "SUM(total) AS total FROM ventas WHERE is_pay = ? ORDER BY ventas_id ASC;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [is_pay], 
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

export async function getResumenVentasAllFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM ventas INNER JOIN clientes ON ventas.clientes_idclientes = clientes.idclientes ORDER BY ventas_id ASC;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [], 
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

export async function getResumenVentasNotSentFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM ventas WHERE status = 0 ORDER BY ventas_id ASC;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [], 
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

export async function updateVentaStatusDB(status, ventas_id, ventas_idventas){
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE ventas SET status = ?, ventas_idventas = ? WHERE ventas_id = ?;"
 

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [status, ventas_idventas, ventas_id], 
                (_, result) => {
                    //console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    console.log('update data productos');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    //console.log(err);
                    console.log('error productos');
                   
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

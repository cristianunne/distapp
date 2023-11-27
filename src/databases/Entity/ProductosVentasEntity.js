import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertProductosVentasToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO productos_ventas (ventas_idventas, productos_idproductos, cantidad, precio_unidad, descuento_unidad, created, idstock_campaign_producto) " +
    " VALUES (?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.ventas_idventas, data.productos_idproductos, data.cantidad, 
                data.precio_unidad, data.descuento_unidad, data.created, data.idstock_campaign_producto], 
                (_, result) => {
                   
                  
                    console.log('inserted data productos_ventas');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('productos_ventas error');
                   
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


export async function getProductosVentasById(ventas_id)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM productos_ventas INNER JOIN productos ON productos.idproductos = productos_ventas.productos_idproductos where ventas_idventas = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [ventas_id], 
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

export async function getProductosVentasByIdNotProd(ventas_id)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM productos_ventas WHERE ventas_idventas = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [ventas_id], 
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
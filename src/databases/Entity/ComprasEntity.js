import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertCompras(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO compras_stock (idcompras_stock, created, descripcion, status)" + 
    " VALUES (?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idcompras_stock, data.created, data.descripcion, data.status], 
                (_, result) => {
                    console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    console.log('inserted data success compras');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('mmmmmm');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        console.log(result);
        return true;
    },
    (error) => { 
        //setResult(false);
        console.log(error);
        return false;
       
    });
    //db.closeAsync();

    return result;
   
   
}

export async function insertEmpleadoComprasstock(data, status){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO empleado_comprasstock (idempleado_comprastock, productos_idproductos, " + 
    "comprasstock_idcomprasstock, cantidad, comprobante, observaciones, status, cantidad_comprada)" + 
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idempleado_comprastock, data.productos_idproductos, 
                data.comprasstock_idcomprasstock, data.cantidad, data.comprobante, 
                data.observaciones, status, data.cantidad_comprada], 
                (_, result) => {
                    //console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    //console.log('inserted data success compras empleados');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    //console.log('mmmmmm');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        console.log(result);
        return true;
    },
    (error) => { 
        //setResult(false);
        console.log(error);
        return false;
       
    });
    //db.closeAsync();

    return result;
   
   
}


export async function getComprasStock()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM compras_stock";

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


export async function getEmpleadosComprasStock(idcomprasstock)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM empleado_comprasstock INNER JOIN productos ON " + 
    "empleado_comprasstock.productos_idproductos = productos.idproductos WHERE comprasstock_idcomprasstock = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idcomprasstock], 
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


export async function updateCantidadEmpleadosComprasStock(empleado_comprastock_id, cantidad)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE empleado_comprasstock SET cantidad_comprada = ?, status = 1 " + 
    "WHERE empleado_comprastock_id = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [cantidad, empleado_comprastock_id], 
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
        //console.log(error);
        return false;
    });

    //console.log(result);
    return result;

}


export async function updateEstadoEmpleadosComprasStock(empleado_comprastock_id, status)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE empleado_comprasstock SET status = ? " + 
    "WHERE empleado_comprastock_id = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [status, empleado_comprastock_id], 
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
        //console.log(error);
        return false;
    });

    //console.log(result);
    return result;

}




import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertPedidos(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO pedidos (idpedidos, number, created, users_idusers, clientes_idclientes, " + 
     "observaciones, status_val)" + 
    " VALUES (?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idpedidos, data.number, data.created, data.users_idusers, 
                data.clientes_idclientes, data.observaciones, data.status_val], 
                (_, result) => {
                   
                    console.log('inserted data success pedidos');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('dsfsdfsdf');
                   
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

export async function insertProductosPedidos(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO productos_pedidos (idproductos_pedidos, productos_idproductos, cantidad, created, pedidos_idpedidos) " + 
    " VALUES (?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idproductos_pedidos, data.productos_idproductos, data.cantidad, data.created, data.pedidos_idpedidos], 
                (_, result) => {
                   
                    console.log('inserted data success pedidos');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('dsfsdfsdf');
                   
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


export async function getPedidosFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM pedidos as p INNER JOIN clientes as cl ON p.clientes_idclientes = cl.idclientes;";

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

export async function getProductosPedidosByIdFromDB(idpedido)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM productos_pedidos pp INNER JOIN productos as p ON pp.productos_idproductos = p.idproductos WHERE pedidos_idpedidos = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idpedido], 
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


export async function updatePedidoStatus(idpedido)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE pedidos SET status_val = 1 " + 
    "WHERE idpedidos = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idpedido], 
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
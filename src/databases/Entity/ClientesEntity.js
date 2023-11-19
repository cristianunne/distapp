import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertClientes(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO clientes (idclientes, nombre, apellido, dni, pais, provincia, " +  
    "departamento, localidad, direccion, altura, shop_name, telefono)" + 
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idclientes, data.nombre, 
                data.apellido,  data.dni, data.pais,  data.provincia, data.departamento, 
                data.localidad, data.direccion, data.altura, data.shop_name, data.telefono], 
                (_, result) => {
                   
                  
                    console.log('inserted data Clientes');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    //console.log(sqlerror);
                    //console.log(err);
                    console.log('mmmmmm');
                   
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

export async function getClientesDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM clientes ORDER BY shop_name ASC;";

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

export async function getClientesByIdDB(idcliente)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM clientes WHERE idclientes = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idcliente], 
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

export async function updateClientesDB(data){
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE clientes SET nombre = ?, apellido = ?, dni = ?, pais = ?, provincia =?, " +  
    "departamento = ?, localidad = ?, direccion = ?, altura = ?, shop_name = ?, " + 
    "telefono = ? WHERE idclientes = ?;"
 

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.nombre, data.apellido, data.dni, data.pais,
                data.provincia, data.departamento, data.localidad, data.direccion, 
                data.altura, 
                data.shop_name,  data.telefono, data.idclientes], 
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


//maneja todos los eventos de update, actualizacion y delete de informacion del Usuario

import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'





export async function insertUser(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO users (idusers, firstname, lastname, email, photo, role)" + 
    " VALUES (?, ?, ?, ?, ?, ?);";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [data.idusers, data.firstname, data.lastname, 
                data.email, data.photo, data.role], 
                (_, result) => {
                    //console.log('inserted data success');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                    //console.log('sdsadsdjaosjdoasjdoasjda');
                    console.log(sqlerror);
                   
                    //reject();
                    reject(sqlerror);
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
    db.closeAsync();

    return result;
   
   
}

export async function getUserCount()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT COUNT(*) AS cantidad FROM users";

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
        console.log('Error en User ENtity CANTIDAD');
        return false;
    });

    //console.log(result);
    return result;

}

export async function getUser()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM users LIMIT 1";

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
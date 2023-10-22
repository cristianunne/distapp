import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertSubcategories(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO subcategories (idsubcategories, name, categories_idcategories)" + 
    " VALUES (?, ?, ?);";

    //console.log(data);


    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [data.idsubcategories, data.name, 
                data.categories_idcategories], 
                (_, result) => {

                  
                    console.log('inserted data success');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(err);
                    console.log(sqlerror);
                   
                    //reject();
                    reject(sqlerror);
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
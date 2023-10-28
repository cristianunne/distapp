import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertCategories(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO categories (idcategories, name, color)" + 
    " VALUES (?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idcategories, data.name, 
                data.color], 
                (_, result) => {
                    console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    console.log('inserted data success');
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
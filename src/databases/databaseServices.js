import { openDatabase } from 'expo-sqlite';
import * as SQLITE from 'expo-sqlite'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import { camion_table, campaign_table, cart_session_table, categories_table, clientes_table, compras_table, productos_comprasstock_table, productos_table, productos_ventas_table, proveedores_table, stock_camion_campaign_producto_table, stock_camion_campaign_table, subcategories_table, users_table, ventas_table } from './querysTables';


export const database_name = 'distapp2.db'; // Add your Database name

export async function getDatabase()
{
    const uri = FileSystem.documentDirectory + 'SQLite/' + database_name;
    let result = await FileSystem.getInfoAsync(uri);
    //console.log(uri_);

    return result.exists;
}


export async function initDatabase() {
   
     /*if(!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists){
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }*/
    
 
    let res = await getDatabase();
    //console.log(res);

    if(!res){
        //llamo al metodo que crea la tabla y creo la database
        const db = SQLITE.openDatabase(database_name);

        await createTables(db, users_table);
        await createTables(db, campaign_table);
        await createTables(db, camion_table);
        await createTables(db, categories_table);
        await createTables(db, subcategories_table);
        await createTables(db, campaign_table);
        await createTables(db, clientes_table);
        await createTables(db, proveedores_table);
        await createTables(db, productos_table);

        await createTables(db, compras_table);
        await createTables(db, productos_comprasstock_table);
        await createTables(db, cart_session_table);

        await createTables(db, ventas_table);
        await createTables(db, productos_ventas_table);

        await createTables(db, stock_camion_campaign_table);
        await createTables(db, stock_camion_campaign_producto_table);

        

        db.closeAsync();

        return false;

    }

    return true;
       

}


export async function createTables(db, query) {
    return await new Promise((resolve, reject) => {
        db.transaction(
            function (tx) {
                tx.executeSql(query);
            },
            function (error) {
                reject(error.message);
            },
            function () {
                resolve(true);
                //console.log('Created database OK');

            }
        );
    });

}

export async function deleteTables(db, query) {
    return await new Promise((resolve, reject) => {
        db.transaction(
            function (tx) {
                tx.executeSql(query);
            },
            function (error) {
                reject(error.message);
                return false;
            },
            function () {
                resolve(true);
                //console.log('Created database OK');


            }
        );
    });

}




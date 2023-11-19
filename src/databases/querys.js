
import { getCompras, getProductos, getProveedores } from '../services/fetching';


/*const getCategoriesFromAPI = async () => {
    const categories = await getCategories();

    if (categories != false) {
       
    }


}


const getSubcategoriesAPI = async () => {

    const subcategories = await getSubcategories();
    console.log(subcategories);

    if (subcategories != false) {
       

        //await saveCategoriesInDB();
    }

}*/

export const getProductosAPI = async () => {

    const productos = await getProductos();
    //console.log(productos);
    if (productos != false) {
       return productos;
    }

    return false;

}

export const getProveedoresAPI = async () => {

    const proveedores = await getProveedores();
    //console.log(proveedores);

    if (proveedores != false) {
        return proveedores;
     }
 
     return false;

}

export const getComprasAPI = async (user_id) => {

    const compras = await getCompras(user_id);
    //console.log(proveedores);

    if (compras != false) {
        return compras;
     }
 
     return false;

}

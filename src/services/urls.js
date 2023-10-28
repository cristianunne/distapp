//sesiones

import { PreventRemoveProvider } from "@react-navigation/native";

const prefix_url = 'http://192.168.0.154/stockcontrolv3/API/';
//const prefix_url = 'http://192.168.1.22/stockcontrolv3/API/';

const URLS = {
    LOGIN_URL: prefix_url + 'loginApp',

    GET_CAMPAIGN_USER: prefix_url + 'getCampaignUser',
    GET_CATEGORIES: prefix_url + 'getCategories',
    GET_SUBCATEGORIES: prefix_url + 'getSubcategories',
    GET_PRODUCTOS: prefix_url + 'getProductos',
    GET_PROVEEDORES: prefix_url + 'getProveedores',
    GET_COMPRAS: prefix_url + 'getCompras',
    SEND_PRODUCTO_COMPRA : prefix_url + 'setComprasEmpleado'

  }
export default URLS
//sesiones

import { PreventRemoveProvider } from "@react-navigation/native";

//const prefix_url = 'http://iighicartografia.com/API/';
//const prefix_url_print = 'http://iighicartografia.com/';
//const prefix_url = 'http://192.168.1.8/stockcontrolv3/API/';
//const prefix_url = 'http://192.168.0.154/stockcontrolv3/API/';
const prefix_url = 'http://distapppeon.store/API/';
const prefix_url_print = 'http://distapppeon.store/';
//const prefix_url_print = 'http://192.168.0.154/stockcontrolv3/'; 

//const prefix_url = 'http://192.168.0.77/stockcontrolv3/API/';

const URLS = {
    LOGIN_URL: prefix_url + 'loginApp',
    PRINT_URL: prefix_url_print +  'ventas/printVentaWithout/',

    GET_CAMPAIGN_USER: prefix_url + 'getCampaignUser',
    GET_CATEGORIES: prefix_url + 'getCategories',
    GET_SUBCATEGORIES: prefix_url + 'getSubcategories',
    GET_PRODUCTOS: prefix_url + 'getProductos',
    GET_PROVEEDORES: prefix_url + 'getProveedores',
    GET_COMPRAS: prefix_url + 'getCompras',
    SEND_PRODUCTO_COMPRA : prefix_url + 'setComprasEmpleado',
    GET_CLIENTES: prefix_url + 'getClientes',
    GET_CAMIONES: prefix_url + 'getCamiones',
    GET_PRODUCTOS_FOR_STOCK: prefix_url + 'getProductosForStock',
    ADD_PRODUCTOS_TO_CAMION_STOCK: prefix_url + 'addProductoToStockCamion',
    GET_PRODUCTOS_SOLICITUDES_STOCK: prefix_url + 'getProductosSolicitudesStock',
    EDIT_PRODUCTOS_SOLICITUDES_STOCK: prefix_url + 'editProductosSolicitudesStock', 
    DELETE_PRODUCTOS_SOLICITUDES_STOCK: prefix_url + 'deleteProductosSolicitudStock',
    GET_PRODUCTOS_STOCK: prefix_url + 'getProductosStock',
    GET_CAMIONES_WITOUHT_CURRENT: prefix_url + 'getCamionesWithoutCurrent',
    UPLOAD_TRANFER_PRODUCTO_CAMION: prefix_url + 'uploadTransferProductoCamion',
    GET_PRODUCTOS_TRANSFERENCIAS_CAMION: prefix_url + 'getProductosTransferenciasCamion',
    GET_PRODUCTOS_TRANSFERENCIAS_BY_CAMION: prefix_url + 'getProductosTransferenciasByCamion',
    ACCEPT_TRANSFERS_CAMION: prefix_url + 'acceptTransfersCamion',
    DELETE_TRANSFERS_CAMION: prefix_url + 'deleteProductoTransferenciaCamion',
    ADD_VENTA : prefix_url + 'addVenta',

    GET_PEDIDOS_BY_USER : prefix_url + 'getPedidosByUser'
    //getProductosTransferenciasCamion

  }
export default URLS
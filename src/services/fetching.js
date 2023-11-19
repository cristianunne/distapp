import URLS from "./urls"

const sessionAPI = async (username, password) =>{

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}
    let data = {username :username, password: password}


    const rawResponse = await fetch(URLS.LOGIN_URL, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

}
export default sessionAPI;



export async function getCampaignUserFetch(user_id)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}
    let data = {user_id :user_id}


    const rawResponse = await fetch(URLS.GET_CAMPAIGN_USER, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getCamionesFetch()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}
    //let data = {user_id :user_id}


    const rawResponse = await fetch(URLS.GET_CAMIONES, { 
        method: 'POST',
        headers: headers,
        /*body: JSON.stringify(data)*/});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getCategories()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}

    const rawResponse = await fetch(URLS.GET_CATEGORIES, { 
        method: 'POST',
        headers: headers});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}


export async function getSubcategories()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}

    const rawResponse = await fetch(URLS.GET_SUBCATEGORIES, { 
        method: 'POST',
        headers: headers});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}


export async function getProductos()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}

    const rawResponse = await fetch(URLS.GET_PRODUCTOS, { 
        method: 'POST',
        headers: headers});
    
    try {
        const content = await rawResponse.json(); 
        console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}


export async function getProveedores()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}

    const rawResponse = await fetch(URLS.GET_PROVEEDORES, { 
        method: 'POST',
        headers: headers});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getCompras(user_id)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}
    let data = {idusers :user_id}


    const rawResponse = await fetch(URLS.GET_COMPRAS, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
        console.log("eror");
       console.log(err);
    }

    return false;

    
}

export async function setComprasEmpleado(data)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}
    //let data = {idusers :user_id}
    console.log(data);


    const rawResponse = await fetch(URLS.SEND_PRODUCTO_COMPRA, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
        console.log("eror");
       console.log(err);
       return false;
    }

    return false;

    
}


export async function getClientes()
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    //let data = {username : 'cris@hotmail.com', password: '1234567'}

    const rawResponse = await fetch(URLS.GET_CLIENTES, { 
        method: 'POST',
        headers: headers});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getProductosForStockFetch(id_campaign, idstock_camion_campaign)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {id_campaign : id_campaign, idstockcc : idstock_camion_campaign}

    const rawResponse = await fetch(URLS.GET_PRODUCTOS_FOR_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function addProductoToCamionStock(idproducto_, idstock_camion_campaign_ , cantidad_)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idproducto : idproducto_, idstockcamioncampaign : idstock_camion_campaign_, cantidad : cantidad_}
    console.log(data);

    const rawResponse = await fetch(URLS.ADD_PRODUCTOS_TO_CAMION_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getProductosSolicitudesStockFetch(id_campaign, idstock_camion_campaign)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {id_campaign : id_campaign, idstockcc : idstock_camion_campaign}

    const rawResponse = await fetch(URLS.GET_PRODUCTOS_SOLICITUDES_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function editProductoSolicitudesStock(idstock_campaign_producto, cantidad)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idstock_campaign_producto : idstock_campaign_producto , cantidad : cantidad}
    console.log(data);

    const rawResponse = await fetch(URLS.EDIT_PRODUCTOS_SOLICITUDES_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function deleteProductoSolicitudesStock(idstock_campaign_producto)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idstock_campaign_producto : idstock_campaign_producto}
    console.log(data);

    const rawResponse = await fetch(URLS.DELETE_PRODUCTOS_SOLICITUDES_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}


export async function getProductosStockFetch(id_campaign, idstock_camion_campaign)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {id_campaign : id_campaign, idstockcc : idstock_camion_campaign}

    const rawResponse = await fetch(URLS.GET_PRODUCTOS_STOCK, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
    }

    return false;

    
}

export async function getCamionesWithoutCurrentFetch(idcamion)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idcamion : idcamion}

    const rawResponse = await fetch(URLS.GET_CAMIONES_WITOUHT_CURRENT, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
       return false;
    }

    return false;

    
}


export async function uploadTransferProductoCamion(idcampaign, camion_origen, camion_destino, idstock_campaign_producto, idstock_camion_campaign, 
    productos_idproductos, cantidad)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idcampaign : idcampaign, camion_origen : camion_origen, camion_destino : camion_destino, 
        idstock_campaign_producto : idstock_campaign_producto, idstock_camion_campaign : idstock_camion_campaign, productos_idproductos : productos_idproductos, 
        cantidad : cantidad}

    const rawResponse = await fetch(URLS.UPLOAD_TRANFER_PRODUCTO_CAMION, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
       return false;
    }

    return false;

    
}


export async function getProductosTransferenciasCamionFetch(idcampaign, camion_destino)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idcampaign : idcampaign, camion_destino : camion_destino}


    const rawResponse = await fetch(URLS.GET_PRODUCTOS_TRANSFERENCIAS_CAMION, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
       return false;
    }

    return false;

    
}

export async function acceptTransferCamionFetch(idtransferencia_stock, idstock_campaign_producto, cantidad, idcamion, idcampaign, productos_idproductos)
{
    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
   // headers.append('X-CSRF-Token', csrf);

    let data = {idtransferencia_stock : idtransferencia_stock, idstock_campaign_producto : idstock_campaign_producto, 
        cantidad : cantidad, idcamion : idcamion, idcampaign : idcampaign, productos_idproductos : productos_idproductos}


    const rawResponse = await fetch(URLS.ACCEPT_TRANSFERS_CAMION, { 
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(data)});
    
    try {
        const content = await rawResponse.json(); 
        //console.log(content);
    
        //user = content;
        return content;
    } catch(err) {
       console.log(err);
       return false;
    }

    return false;

    
}




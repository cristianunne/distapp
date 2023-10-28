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



export async function getCampaignUser(user_id)
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




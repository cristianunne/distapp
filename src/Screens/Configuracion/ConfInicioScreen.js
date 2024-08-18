import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'
import * as SQLITE from 'expo-sqlite'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { getCamionesFetch, getCampaignUserFetch, getCategories, getClientes, getPedidosByUserFetch, getSubcategories } from '../../services/fetching'
import { insertCategories } from '../../databases/Entity/CategoriesEntity'
import { insertSubcategories } from '../../databases/Entity/SubcategoriesEntity'
import { getComprasAPI, getProductosAPI, getProveedoresAPI } from '../../databases/querys'
import { insertProveedores } from '../../databases/Entity/Proveedores'
import { getProductoById, insertProductos, updateProductos } from '../../databases/Entity/ProductosEntity'
import { LoadingModal } from "react-native-loading-modal";
import { AppContext } from '../../Context/ContextApp'
import { insertCompras, insertEmpleadoComprasstock } from '../../databases/Entity/ComprasEntity'
import { createTables, database_name, deleteTables } from '../../databases/databaseServices'
import { compras_table, delete_camiones_table, delete_campaign_table, delete_cart_session_table, delete_categories_table, delete_clientes_table, delete_compras_table, delete_pedidos_table, delete_productos_comprasstock_table, delete_productos_pedidos_table, delete_productos_table, delete_proveedores_table, delete_stock_camion_campaign, delete_stock_campaign_producto, delete_subcategories_table, delete_users_table, delete_ventas_table, productos_comprasstock_table } from '../../databases/querysTables'
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native';
import { insertCampaignToDB } from '../../databases/Entity/CampaingEntity'
import { getCamionesFromDB, insertCamionesToDB } from '../../databases/Entity/CamionesEntity'
import { insertStockCamionCampignToDB } from '../../databases/Entity/StockCamionCampaignEntity'
import { insertClientes } from '../../databases/Entity/ClientesEntity'

import { showMessage, hideMessage } from "react-native-flash-message";
import { insertPedidos, insertProductosPedidos } from '../../databases/Entity/PedidosEntity'

const ConfInicioScreen = () => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [categoriesData, setCategoriesData] = useState(null);

    const [subcategoriesData, setSubcategoriesData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);



    const syncProductos = () => {
        Alert.alert('Actualización', '¿Desea Sincronizar los Productos?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);

                    getCategoriesFromAPI();
                    getSubcategoriesAPI();

                    //traigo los precios y los descuentos


                    const proveedores = await getProveedoresAPI();
                    //console.log(proveedores[0]);
                    saveProveedoresInDB(proveedores);

                    const productos = await getProductosAPI();

                    saveProductosInDB(productos);


                    setTimeout(() => {
                        setIsLoading(false);
                        showMessage({
                            message: "Los Productos se han actualizado con éxito!",
                            type: "success",
                            icon: "success"
                        });
                    }, 5000)


                }
            },
        ]);
    }


    const getCategoriesFromAPI = async () => {
        const categories = await getCategories();

        if (categories != false) {
            setCategoriesData(categories);
            saveCategoriesInDB(categories);
        }


    }

    const getSubcategoriesAPI = async () => {

        const subcategories = await getSubcategories();
        //console.log(subcategories);

        if (subcategories != false) {
            setSubcategoriesData(subcategories);
            await saveSubcategoriesInDB(subcategories);

            //await saveCategoriesInDB();
        }

    }


    const getClientesAPIandSave = async () => {
        const clientes = await getClientes();
        for (item of clientes) {

            const res = await insertClientes(item);

        }
    }



    const saveCategoriesInDB = async (categories) => {


        for (item of categories) {
            //const res = await insertCategories(categoriesData[i]);
            const res = await insertCategories(item);
            //console.log(res);
        }


    }

    const saveSubcategoriesInDB = async (subcategories) => {

        for (item of subcategories) {
            //const res = await insertCategories(categoriesData[i]);
            const res = await insertSubcategories(item);

        }
    }

    const saveProveedoresInDB = async (proveedores) => {
        //console.log(proveedores);

        for (item of proveedores) {
            const res = await insertProveedores(item);
        }

    };

    const saveProductosInDB = async (productos) => {

        for (item_ of productos) {
            //consulto si el producto existe, si existe actualizo, sino bue, agrego

            const exist_product = await getProductoById(item_.idproductos);
            //console.log('existe: ' + exist_product.rows.length);
            //console.log(item_);

            if (exist_product != false) {

                if (exist_product.rows.length > 0) {
                    //console.log(item.descuentos);

                    //existe el producto entonces lo actualizo
                    const res = await updateProductos(item_);
                    //console.log('actualizo');
                } else {
                    const res = await insertProductos(item_);
                    //console.log('precios: ');
                    //console.log(item.precios);
                }

            }




        }

    };

    const syncCompras = () => {
        Alert.alert('Actualización', '¿Desea Sincronizar las Compras?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);
                    const db = SQLITE.openDatabase(database_name);
                    //aca puedo eliminar las tablas primero
                    const del_empl_table = await deleteTables(db, delete_productos_comprasstock_table);
                    const del_compra_table = await deleteTables(db, delete_compras_table);
                    const create_compra_table = await createTables(db, compras_table);
                    const create_empcompra_table = await createTables(db, productos_comprasstock_table);


                    const myobj = JSON.parse(user);

                    const compras = await getComprasAPI(myobj.idusers);
                    console.log('comprassssss');
                    console.log(compras);

                    if (compras != false) {
                        let aa = await saveComprasToDB(compras);
                        let ee = await saveEmpleadoCComprasStock(compras);
                    }


                    setTimeout(() => {

                        setIsLoading(false);
                        showMessage({
                            message: "Las Compras se han actualizado con éxito!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000)


                }
            },
        ]);
    }

    const saveComprasToDB = async (compras) => {
        //console.log("entro aca");
        //console.log(compras);

        for (item of compras) {
            //console.log(item);
            const res = await insertCompras(item);
        }

    }

    const saveEmpleadoCComprasStock = async (compras) => {

        //acadebo controlar y guardar el estado de la compra

        for (item of compras) {

            //console.log(item);
            for (item_prod of item.empleado_comprasstock) {
                //console.log(item_prod);

                let status = 0;


                if (item_prod.status == 1) {
                    status = 2;
                }

                const res = await insertEmpleadoComprasstock(item_prod, status);
            }

        }

    }


    const deleteAll = () => {
        Alert.alert('Eliminar', '¿Desea Eliminar toda la información del Sistema?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);
                    const db = SQLITE.openDatabase(database_name);
                    //EMpiezo ccon las ventas
                    const del_ventas_table = await deleteTables(db, delete_ventas_table);
                    const del_compras_table = await deleteTables(db, delete_compras_table);
                    const del_cartsession_table = await deleteTables(db, delete_cart_session_table);
                    const del_productos_table = await deleteTables(db, delete_productos_table);
                    const del_clientes_table = await deleteTables(db, delete_clientes_table);
                    const del_proveedores_table = await deleteTables(db, delete_proveedores_table);
                    const del_subcat_table = await deleteTables(db, delete_subcategories_table);
                    const del_cat_table = await deleteTables(db, delete_categories_table);
                    const del_camion_table = await deleteTables(db, delete_camiones_table);
                    const del_campaign_table = await deleteTables(db, delete_campaign_table);
                    const del_stock_camion_campaign_table = await deleteTables(db, delete_stock_camion_campaign);
                    const del_stock_campaign_producto_table = await deleteTables(db, delete_stock_campaign_producto);
                    const del_users = await deleteTables(db, delete_users_table);
                    setIsLogin(false);
                    setCampaignActive(null);

                    setTimeout(() => {

                        setIsLoading(false);
                        showMessage({
                            message: "Proces exitoso!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000)


                }
            },
        ]);
    }

    const getCampaignAPI = async () => {

        Alert.alert('Actualización', '¿Desea Sincronizar la Campaña?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);
                    const myobj = JSON.parse(user);
                    const campaign_res = await getCampaignUserFetch(myobj.idusers);
                    //elimino la campa;a
                    const db = SQLITE.openDatabase(database_name);
                
                    const del_ventas_table = await deleteTables(db, delete_ventas_table);
                    const del_compras_table = await deleteTables(db, delete_compras_table);
                    const del_cartsession_table = await deleteTables(db, delete_cart_session_table);
                    const del_productos_table = await deleteTables(db, delete_productos_table);
                    const del_clientes_table = await deleteTables(db, delete_clientes_table);
                    const del_proveedores_table = await deleteTables(db, delete_proveedores_table);
                    const del_subcat_table = await deleteTables(db, delete_subcategories_table);
                    const del_cat_table = await deleteTables(db, delete_categories_table);
                    const del_camion_table = await deleteTables(db, delete_camiones_table);
                    const del_campaign_table = await deleteTables(db, delete_campaign_table);
                    const del_stock_camion_campaign_table = await deleteTables(db, delete_stock_camion_campaign);
                    const del_stock_campaign_producto_table = await deleteTables(db, delete_stock_campaign_producto);
                    setCampaignActive(null);
                    /*console.log('resultado del borrado');
                    console.log(del_res);*/



                    if (campaign_res) {

                        saveCampaignToDb(campaign_res);
                        //traigo los camiones
                        const camiones_res = await getCamionesFetch();
                        console.log(camiones_res);

                        for (item of camiones_res) {
                            //const res = await insertCategories(categoriesData[i]);
                            const res_inser_camion = await insertCamionesToDB(item);

                        }

                        if (campaign_res.stock_camion_campaign != undefined && campaign_res.stock_camion_campaign != null) {

                            //console.log(campaign_res.stock_camion_campaign[0]);
                            const res_cam_cap = await insertStockCamionCampignToDB(campaign_res.stock_camion_campaign[0]);

                        }

                        //actualizo los productos

                        getCategoriesFromAPI();
                        getSubcategoriesAPI();

                        //traigo los precios y los descuentos


                        const proveedores = await getProveedoresAPI();
                        //console.log(proveedores[0]);
                        saveProveedoresInDB(proveedores);

                        const productos = await getProductosAPI();


                        saveProductosInDB(productos);

                        //traigo tmb los clientes
                        getClientesAPIandSave();

                        setTimeout(() => {
                            setIsLoading(false);
                            showMessage({
                                message: "La Campaña se actualizó correctamente!",
                                type: "success",
                                icon: "success"
                            });
    
                            navigation.navigate('Home');

                        }, 3000)

                       

                    } else {

                        //console.log(campaign_res);
                        setTimeout(() => {
                            setIsLoading(false);
                            showMessage({
                                message: "No existen Campañas Activas!",
                                type: "danger",
                                icon: "danger"
                            });
                            navigation.navigate('Home');

                        }, 3000)

                      


                    }



                }
            },
        ]);

    }

    const saveCampaignToDb = async (campaign) => {


        const res_save = insertCampaignToDB(campaign);

    }


    const goToClientes = () => {
        navigation.navigate('ClientesInicioScreen');
    }

    const goToCamiones = () => {

        //navigation.navigate('CamionesInicioScreen');
        //verifico que la campaign este activa
        if (campaignActive != null) {
            navigation.navigate('CamionesInicioScreen');
        } else {
            showMessage({
                message: "No existen Campañas Activas!",
                type: "danger",
                icon: "danger"
            });
        }


    }

    const goCompras = () => {
        navigation.navigate('InicioCompras');
    }


    const goProductos = () => {

        if (campaignActive != null) {
            navigation.navigate('ProductosInicioScreen');
        } else {
            showMessage({
                message: "No existen Campañas Activas!",
                type: "danger",
                icon: "danger"
            });
        }
    }

    const goLocalCamion = () => {

        if (campaignActive != null) {
            navigation.navigate('CamionLocalInicioScreen');
        } else {
            showMessage({
                message: "No existen Campañas Activas!",
                type: "danger",
                icon: "danger"
            });
        }

    }

    const syncPedidos = async () => {

        Alert.alert('Sincronión', '¿Desea Sincronizar Pedidos?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Aceptar', onPress: async () => {

                    setIsLoading(true);
                    const db = SQLITE.openDatabase(database_name);
                    //aca puedo eliminar las tablas primero
                    const del_pedido = await deleteTables(db, delete_pedidos_table);
                    const del_prod_ped = await deleteTables(db, delete_productos_pedidos_table);

                    const myobj = JSON.parse(user);

                    const pedidos = await getPedidosByUserFetch(myobj.idusers);

                    //almaceno los datos en la db local
            
                    for (pedido of pedidos)
                    {
                        let data_pedido = {
                            idpedidos : pedido.idpedidos,
                            number : pedido.number,
                            created : pedido.created,
                            users_idusers : pedido.users_idusers,
                            clientes_idclientes : pedido.clientes_idclientes,
                            observaciones : pedido.observaciones,
                            status_val : pedido.status_val,
                          
                        };
                        console.log(pedido);
                        
                        const res_pedidos = await insertPedidos(data_pedido);
            
                        if(res_pedidos){
                            //almacenoslos productos
            
                            for(prod of pedido.productos)
                            {
            
                                let prod_pedidos = {
                                    idproductos_pedidos : prod._joinData.idproductos_pedidos,
                                    productos_idproductos : prod._joinData.productos_idproductos,
                                    cantidad : prod._joinData.cantidad,
                                    pedidos_idpedidos : prod._joinData.pedidos_idpedidos,
                                }
            
                                const res_prod_ped = await insertProductosPedidos(prod_pedidos);
            
                            }
            
                        }
            
                    }
            
                
                    setTimeout(() => {

                        setIsLoading(false);
                        showMessage({
                            message: "Los Pedidos se han actualizado con éxito!",
                            type: "success",
                            icon: "success"
                        });

                    }, 3000)


                }
            },
        ]);

     


       

    }

    useEffect(() => {

        /*if (categoriesData != null) {
            saveCategoriesInDB();

        }*/

    }, [isFocused]);



    return (
        <View style={styles.container}>

            <Header title={'Configuraciones'} leftIcon={require('../../images/home.png')} />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            <Text style={styles.text_title}>Ver (Datos Almacenados en el Móvil)</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={null}>
                        <Image source={require('../../images/calendario.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Campañas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={goLocalCamion}>
                        <Image source={require('../../images/truck.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Transfer. Stock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={goProductos}>
                        <Image source={require('../../images/productos.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Productos del Camión</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={goToClientes}>
                        <Image source={require('../../images/clientes.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Clientes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={goCompras}>
                        <Image source={require('../../images/bag.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Compras</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={deleteAll}>
                        <Image source={require('../../images/borrar.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Eliminar Todo</Text>
                    </TouchableOpacity>

                </View>


            </View>

            <Text style={styles.text_title}>Sincronizar (Desde el Servidor)</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={getCampaignAPI}>
                        <Image source={require('../../images/calendario.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Campañas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={goToCamiones}>
                        <Image source={require('../../images/truck.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Camiones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={syncProductos}>
                        <Image source={require('../../images/productos.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Productos</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={goToClientes}>
                        <Image source={require('../../images/clientes.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Clientes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={syncPedidos}>
                        <Image source={require('../../images/pedido.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Pedidos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={syncCompras}>
                        <Image source={require('../../images/bag.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Compras</Text>
                    </TouchableOpacity>


                </View>



            </View>

            <Footer />
        </View>
    )
}

export default ConfInicioScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 12,
        color: '#187351'
    },

    box_main: {
        flex: 0.44,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },

    item_content_final: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },
    item: {

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 40,
        height: 40,
    },

    text_icon: {
        fontSize: 11,
        maxWidth: 90,
        alignSelf: 'center',
        textAlign: 'center'
    }
});
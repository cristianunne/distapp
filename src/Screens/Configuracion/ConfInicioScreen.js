import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { getCategories, getSubcategories } from '../../services/fetching'
import { insertCategories } from '../../databases/Entity/CategoriesEntity'
import { insertSubcategories } from '../../databases/Entity/SubcategoriesEntity'
import { getComprasAPI, getProductosAPI, getProveedoresAPI } from '../../databases/querys'
import { insertProveedores } from '../../databases/Entity/Proveedores'
import { insertProductos } from '../../databases/Entity/ProductosEntity'
import { LoadingModal } from "react-native-loading-modal";
import { AppContext } from '../../Context/ContextApp'
import { insertCompras, insertEmpleadoComprasstock } from '../../databases/Entity/ComprasEntity'

const ConfInicioScreen = () => {


    const [categoriesData, setCategoriesData] = useState(null);

    const [subcategoriesData, setSubcategoriesData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [isLogin, setIsLogin, user, setUser] = React.useContext(AppContext);


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


                    const proveedores = await getProveedoresAPI();
                    //console.log(proveedores[0]);
                    saveProveedoresInDB(proveedores);

                    const productos = await getProductosAPI();
                    //console.log(productos);
                    saveProductosInDB(productos);


                    setTimeout(()=> {
                        setIsLoading(false);
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
        console.log(subcategories);

        if (subcategories != false) {
            setSubcategoriesData(subcategories);
            await saveSubcategoriesInDB(subcategories);

            //await saveCategoriesInDB();
        }

    }


    const saveCategoriesInDB = async (categories) => {


        for (item of categories) {
            //const res = await insertCategories(categoriesData[i]);
            const res = await insertCategories(item);
            console.log(res);
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

        for (item of proveedores){
            const res = await insertProveedores(item);
        }

    }; 

    const saveProductosInDB = async (productos) => {

        for (item of productos)
        {
            const res = await insertProductos(item);
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

                    const myobj = JSON.parse(user);

                    const compras = await getComprasAPI(myobj.idusers);
                  
                    if(compras != false){
                        saveComprasToDB(compras);
                        saveEmpleadoCComprasStock(compras);
                    }


                    setTimeout(()=> {
                        setIsLoading(false);
                    }, 5000)


                }
            },
        ]);
    }

    const saveComprasToDB = async (compras) => {
        //console.log("entro aca");
       console.log(compras);

        for (item of compras)
        {
            //console.log(item);
            const res = await insertCompras(item);
        }

    }

    const saveEmpleadoCComprasStock = async (compras) => {

        for (item of compras)
        {

            //console.log(item);
            for(item_prod of item.empleado_comprasstock) 
            {
                //console.log(item_prod);

                const res = await insertEmpleadoComprasstock(item_prod);
            }
           
        }

    }




    useEffect(() => {

        /*if (categoriesData != null) {
            saveCategoriesInDB();

        }*/

    }, []);



    return (
        <View style={styles.container}>

            <Header title={'Configuraciones'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'}/>

            <Text style={styles.text_title}>Sincronizar</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../../images/calendario.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Campañas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../../images/truck.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Camiones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={syncProductos}>
                        <Image source={require('../../images/productos.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Productos</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../../images/clientes.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Clientes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image source={require('../../images/proveedores.png')} style={styles.iconItem} />
                        <Text style={styles.text_icon}>Proveedores</Text>
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
        flex: 0.5,
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


        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 40,
        height: 40,
    },

    text_icon: {
        fontSize: 14
    }
});
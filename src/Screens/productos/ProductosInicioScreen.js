import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import Header from '../../components/Header'
import ItemProducto from '../../components/ItemProducto'
import Footer from '../../components/Footer'
import { getProductosDB } from '../../databases/Entity/ProductosEntity'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";




import FlashMessage from "react-native-flash-message";
import ItemsProductosBox from '../../components/ItemsProductosBox'

const ProductosInicioScreen = () => {
    const [country, setCountry] = React.useState();


    const [isLoading, setIsLoading] = useState(false);

    const [result, setResult] = useState([]);

    const [dataProducto, setDataProducto] = useState();
    const [dataProductoDinamic, setDataProductoDinamic] = useState();
    const [busqueda, setBusqueda] = useState('');

    const isFocused = useIsFocused();
    const result_ = [];
    
    const getProductos = async () => {
        setIsLoading(true);
        const productos = await getProductosDB();
      

        let data_ = [];
        if(productos != undefined){
            for (let i = 0; i < productos.rows.length; i++) {
        
                let producto = productos.rows.item(i); 
                console.log('id que quiero nueov: ' +  producto.idstock_campaign_producto);              
                data_.push(producto);               
            }
        }

        setDataProducto(data_);
        setDataProductoDinamic(data_);
        
       
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        
    }

    const onChangeBuscar = (value) => {

        if(value != undefined){
        
            setBusqueda(value);
            filter(value);
        } else {
            setDataProducto(dataProductoDinamic);
        }
       

    }

    const filter = (textBusqueda) => {

        let resultadoFiltro = dataProductoDinamic.filter((elemento) => {

            if(elemento.name.toString().toLowerCase().includes(textBusqueda.toLowerCase())){
                return elemento;
            }
            
        })
        setDataProducto(resultadoFiltro);
    }

    useEffect(() => {

        getProductos();
        //console.log(dataProducto);

    }, [isFocused]);



    return (
        <View style={styles.container}>
            <Header title={'Productos'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'}/>
            <View style={styles.search_box}>
                   
            <TextInput
                            style={styles.input}
                            onChangeText={onChangeBuscar}
                            value={busqueda}
                            placeholder="Buscar"
                        />


            </View>
            <View style={styles.box_main}>
            
                <SafeAreaView style={styles.box_content}>
                    <ScrollView style={styles.scrollview}>
                      
                            {/*result*/}
                            <ItemsProductosBox productos={dataProducto} setIsLoading={setIsLoading}>

                            </ItemsProductosBox>
    
                    </ScrollView>
                </SafeAreaView>
            </View>

           

            <Footer></Footer>

        </View>
    )
}

export default ProductosInicioScreen

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
        flex: 0.81,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,

    },

    box_content: {
        flex: 1,
       
    },

    scrollview: {
        padding: 5,
      
    },
    search_box: {
        flex: 0.1,
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0,
    
       
    },
    input: {
        flex: 1,
        height: 35,
        borderWidth: 0.4,
        padding: 5,
        alignSelf: 'center',
        borderColor: '#888888',
        backgroundColor: '#ffffff'
    },
});
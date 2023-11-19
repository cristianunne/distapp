import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import Header from '../../components/Header';
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";

import ItemsProductosStockBox from '../../components/stock/ItemsProductosStockBox';
import { getProductosForStockFetch } from '../../services/fetching';
import Footer from '../../components/Footer';

const StockCargaInicioScreen = ({ route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataProducto, setDataProducto] = useState();
    const [dataProductoDinamic, setDataProductoDinamic] = useState();
    const [busqueda, setBusqueda] = useState('');
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    const { idcampaign, idcammioncampaign } = route.params;


    const getProductosForStock = async () => {

        setIsLoading(true);
        const productos = await getProductosForStockFetch(idcampaign, idcammioncampaign);
        //console.log(productos);

        setDataProducto(productos);
        setDataProductoDinamic(productos);
        setIsLoading(false);
    }

    const onChangeBuscar = (value) => {

        if (value != undefined) {

            setBusqueda(value);
            filter(value);
        } else {
            setDataProducto(dataProductoDinamic);
        }


    }

    const filter = (textBusqueda) => {

        let resultadoFiltro = dataProductoDinamic.filter((elemento) => {

            if (elemento.name.toString().toLowerCase().includes(textBusqueda.toLowerCase())) {
                return elemento;
            }

        })
        setDataProducto(resultadoFiltro);
    }




    useEffect(() => {

        getProductosForStock();
    }, [isFocused, reload])

    return (

        <View style={styles.container}>
            <Header title={'Carga de Stock'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />
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

                        <ItemsProductosStockBox productos={dataProducto} setIsLoading={setIsLoading} idstockcamioncampaign={idcammioncampaign}
                            reload={reload} setReload={setReload} funcion={1}></ItemsProductosStockBox>

                    </ScrollView>
                </SafeAreaView>
            </View>
            <Footer></Footer>
        </View>
    )
}

export default StockCargaInicioScreen

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
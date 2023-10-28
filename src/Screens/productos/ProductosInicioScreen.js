import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import ItemProducto from '../../components/ItemProducto'
import Footer from '../../components/Footer'
import { getProductosDB } from '../../databases/Entity/ProductosEntity'
import { useIsFocused } from '@react-navigation/native';

const ProductosInicioScreen = () => {
    const [result, setResult] = useState([]);
    const isFocused = useIsFocused();
    const result_ = [];
    const getProductos = async () => {
        const productos = await getProductosDB();
        for (let i = 0; i < productos.rows.length; i++) {
            let producto = productos.rows.item(i);
            
            result_.push(<ItemProducto key={i} producto={producto} />);

        }
        //console.log(productos);
        setResult(result_);
    }

    useEffect(() => {

        getProductos();

    }, [isFocused]);



    return (
        <View style={styles.container}>
            <Header title={'Productos'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <View style={styles.box_main}>
                <SafeAreaView style={styles.box_content}>
                    <ScrollView style={styles.scrollview}>
                        <View style={styles.item_box}>
                            {result}
                        </View>
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
        flex: 0.92,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,

    },
    box_content: {
        flex: 1,

    },
    item_box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 7
    },
    scrollview: {
        padding: 15
    }
});
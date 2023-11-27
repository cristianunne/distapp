import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { COLORS } from '../../styles/common_styles';
import { getResumenVentasFromDB } from '../../databases/Entity/VentasEntity';

const VentasInicioScreen = () => {

    /**
         * Number.prototype.format(n, x, s, c)
         * 
         * @param integer n: length of decimal
         * @param integer x: length of whole part
         * @param mixed   s: sections delimiter
         * @param mixed   c: decimal delimiter
         */
    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    const [subtotal, setSubtotal] = useState();
    const [descuentos, setDescuentos] = useState();
    const [total, setTotal] = useState();

    const [subtotalcc, setSubtotalcc] = useState();
    const [descuentoscc, setDescuentoscc] = useState();
    const [totalcc, setTotalcc] = useState();


    const getVentasDB = async () => {

        const resumen_ventas = await getResumenVentasFromDB(1);
        if (resumen_ventas.rows.length > 0) {

            setSubtotal(parseFloat(resumen_ventas.rows.item(0).subtotal));
            setDescuentos(parseFloat(resumen_ventas.rows.item(0).descuentos) + parseFloat(resumen_ventas.rows.item(0).descuento_general));
            setTotal(parseFloat(resumen_ventas.rows.item(0).total));

        }

        const resumen_ventas_cc = await getResumenVentasFromDB(0);
        if (resumen_ventas.rows.length > 0) {

            setSubtotalcc(parseFloat(resumen_ventas_cc.rows.item(0).subtotal));
            setDescuentoscc(parseFloat(resumen_ventas_cc.rows.item(0).descuentos) + parseFloat(resumen_ventas_cc.rows.item(0).descuento_general));
            setTotalcc(parseFloat(resumen_ventas_cc.rows.item(0).total));

        }
       

    }


    useEffect(() => {

        getVentasDB();

    }, [])

    return (
        <View style={styles.container}>
            <Header leftIcon={require('../../images/menu.png')}
                rightIcon={require('../../images/cart.png')}
            />

            
              
      <View style={styles.box_content}>
          <View style={styles.box_text_content}>

            <SafeAreaView>
                <ScrollView style={styles.scrolview}>
                <View style={[styles.box_welcome, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/dinero.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title}>Subtotal (Efectivo)</Text>
                            <Text style={styles.textuser}>$ {subtotal != null ?
                                subtotal.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>

                    <View style={[styles.box_descuento, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/descuentos.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title_descuento}>Descuentos (Efectivo)</Text>
                            <Text style={styles.textuser_descuento}> $ {descuentos != null ?
                                descuentos.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>

                    <View style={[styles.box_total, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/dinero_total.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title_total}>Total (Efectivo)</Text>
                            <Text style={styles.textuser_total}>$ {total != null ?
                                total.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>

                    <View style={[styles.box_subtotal_cc, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/dinero.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title}>Subtotal (CC)</Text>
                            <Text style={styles.textuser}>$ {subtotalcc != null ?
                                subtotalcc.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>

                    <View style={[styles.box_descuento_cc, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/descuentos.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title_descuento_cc}>Descuentos (CC)</Text>
                            <Text style={styles.textuser_descuento_cc}> $ {descuentoscc != null ?
                                descuentoscc.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>

                    <View style={[styles.box_total_cc, styles.elevation]}>
                        <View style={styles.box_hand}>
                            <Image source={require('../../images/dinero_total.png')} style={styles.bottomTabIcon} />
                        </View>
                        <View style={styles.box_saludo}>
                            <Text style={styles.title_total_cc}>Total (CC)</Text>
                            <Text style={styles.textuser_total_cc}>$ {totalcc != null ?
                                totalcc.format(2, 3, '.', ',') : 0}</Text>
                        </View>
                    </View>
                  
                </ScrollView>
            </SafeAreaView>
            
          </View>
      </View>


         
                                <Footer></Footer>


        </View>
    )
}

export default VentasInicioScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed'
    },
    container_scrollview: {
        alignItems: 'left',
        flexDirection: 'row',
        marginBottom: 150,
      
       
    },
    scrolview: {
        paddingLeft: 10,
        paddingRight: 5,
        paddingBottom: 20,
        marginBottom: 10
    },

    box_content: {
        flex: 0.91,
        alignItems: 'left',
        flexDirection: 'row',
        


    },
    box_text_content: {
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        

    },

    box_welcome: {
        height: '13%',
        backgroundColor: '#0e813c',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5

    },

    box_hand: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',

    },

    box_saludo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },

    bottomTabIcon: {
        width: 60,
        height: 60,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser: {
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',

    },
    elevation: {
        elevation: 7,
        shadowColor: '#164620',
    },

    box_descuento: {
        height: '13%',
        backgroundColor: '#ff0000',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5

    },

    title_descuento: {
        fontFamily: 'Roboto',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser_descuento: {
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',
        textDecorationLine: 'line-through',

    },

    box_total: {
        height: '15%',
        backgroundColor: COLORS.SUCCESS,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5

    },

    title_total: {
        fontFamily: 'Roboto',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser_total: {
        fontFamily: 'Roboto',
        fontSize: 29,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',

    },

    box_subtotal_cc: {
        height: '13%',
        backgroundColor: '#cac4b0',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5

    },

    title_subtotal_cc: {
        fontFamily: 'Roboto',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser_subtotal_cc: {
        fontFamily: 'Roboto',
        fontSize: 29,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',

    },

    box_descuento_cc: {
        height: '13%',
        backgroundColor: '#d7d7d7',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5

    },

    title_descuento_cc: {
        fontFamily: 'Roboto',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser_descuento_cc: {
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',
        textDecorationLine: 'line-through',

    },

    box_total_cc: {
        height: '15%',
        backgroundColor: '#6c7156',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 100
    },

    title_total_cc: {
        fontFamily: 'Roboto',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser_total_cc: {
        fontFamily: 'Roboto',
        fontSize: 29,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#ffffff',

    },

})
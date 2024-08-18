
import React, { useEffect, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AppContext } from '../../Context/ContextApp';

import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { TYPES_BTN } from '../../styles/common_styles';
import ButtonAction from '../../components/ButtonAction';
import { showMessage, hideMessage } from "react-native-flash-message";

LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
    today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';

const FechaSelection = ({route}) => {
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const productos = route.params.productos;
    const clientes = route.params.clientes;
    const subtotal = route.params.subtotal;
    const descuento_ = route.params.descuento;
    const total = route.params.total;

    const aceptar =  () => {

        if(selected != ''){
            console.log(selected);
            navigation.navigate('DescuentoGeneralScreen', {
                productos: productos,
                clientes : clientes,
                subtotal : subtotal,
                descuento : descuento_,
                total : total,
                fecha_venta: selected
    
            });

        } else {
            showMessage({
                message: "Seleccione una Fecha!",
                type: "danger",
                icon: "danger"
            });
        }
       
    }

    

    return (

        <View style={styles.container}>
            <Header title={'Seleccionar Fecha'} leftIcon={require('../../images/home.png')}
            />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            <View style={styles.productos_container}>

                <ScrollView>
                    <Calendar
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'green' }
                        }}
                    />

                    <View style={styles.btn_container}>

                        <ButtonAction style={styles.btn_aceptar} title={'Aceptar'} type={TYPES_BTN.SUCCESS} onPress={aceptar}></ButtonAction>

                    </View>

                </ScrollView>


            </View>
            <Footer></Footer>

        </View>

    )
}

export default FechaSelection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bcbcbc',
    },

    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 12,
        color: '#187351'
    },
    box_main: {
        flex: 0.6,
        borderRadius: 10,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        paddingBottom: 1,
        backgroundColor: '#ffffff'

    },

    productos_container: {
        flex: 1,
        marginTop: 10,
        padding: 5
    },

    productos_table_container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 3

    },
    table_head: {
        height: 32,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#dedede',
    },

    row: {
        height: 32,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    column_head: {
        flex: 0.5,
        borderColor: '#444444',
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',

    },
    column_head_icon: {
        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.1

    },
    column_head_cantidad: {

        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.26
    },
    column_head_tot: {

        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.23
    },
    column_head_prod: {

        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.23
    },
    column_head_precio: {

        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_head_desc: {

        borderColor: '#444444',
        borderWidth: 0.3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },

    /*  <View style={styles.column_prod_icon}_><Text style={styles.text_row_head}></Text></View>
                <View style={styles.column_shop_name}><Text style={styles.text_row_head}>{item.shop_name}</Text></View>
                <View style={styles.column_apellido}><Text style={styles.text_row_head}>{}</Text></View>
                <View style={styles.column_nombre}><Text style={styles.text_row_head}>{}</Text></View>
                <View style={styles.column_localidad}><Text style={styles.text_row_head}>{}</Text></View></View>*/



    column_prod_icon: {

        borderColor: '#444444',
        borderWidth: 0.4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.1
    },

    column_shop_name: {

        borderColor: '#444444',
        borderWidth: 0.4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.23
    },
    column_apellido: {

        borderColor: '#444444',
        borderWidth: 0.4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.26
    },
    column_nombre: {

        borderColor: '#444444',
        borderWidth: 0.4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    column_localidad: {

        borderColor: '#444444',
        borderWidth: 0.4,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.21
    },
    text_column_head: {
        fontSize: 10
    },


    text_row_head: {
        fontSize: 9.5
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
    btn_container: {

        flex: 0.1,
        marginTop: 5,
        flexDirection: 'column',
        alignContent: 'flex-start',
        alignItems: 'flex-end',
        gap: 1,


    },
    btn_aceptar: {
        width: '50px'
    }
});

import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const ItemCompras = ({number_compra, fechaIni, status}) => {

    const [isOnPress,setIsOnPress] = useState(false);

    const [fechaInicio, setFechaInicio] = useState();

    const [estado, setEstado] = useState();

    const navigation = useNavigation();


   

    useEffect(() => {
        const fecha_ini = new Date(fechaIni);
        //console.log(fecha_ini.toLocaleDateString());
        setFechaInicio(fecha_ini.toLocaleDateString());

        if(status == 1){
            setEstado('Abierto');
        } else if (status == 0){
            setEstado('Terminado');
        }


    }, [])


    const numCampaign = null;
  
    const fechaFin = null;


    const onPress = () => {

        //tengo que pasarle el id de la compra
       
        navigation.navigate('ProductosComprasScreen', {
            number_compra : number_compra
        });
    }

    const onPressIn = () => {
        
        setIsOnPress(true);
    }

    const onPressOut = () => {
        
        setIsOnPress(false);
    }

    return (
        <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <View style={styles.container}>
                <View style={[styles.sub_container, isOnPress ? styles.backgroundcolorPress : styles.backgroundcolor]}>
                    <View style={styles.box_icon}>
                        <Image source={require('../images/bag.png')} style={styles.icon} />
                    </View>
                    <View style={styles.box_text_content}>
                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_campaign}>Compra N°: </Text>
                            <Text style={styles.text_details}>{number_compra != undefined ? (number_compra) : null}</Text>
                        </View>
                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_campaign}>Fecha: </Text>
                            <Text style={styles.text_details}>{fechaInicio != undefined ? (fechaInicio) : null}</Text>
                        </View>

                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_estado}>Estado: </Text>
                            <Text style={styles.text_details_estado}>{estado != undefined ? (estado) : null}</Text>
                        </View>


                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default ItemCompras

const styles = StyleSheet.create({

    container: {
        height: 100,
        marginTop: 10,
        padding: 5

    },
    sub_container: {
        flexDirection: 'row',
        flex: 1,
       
        borderBottomColor: '#cdcdcd',
        borderTopColor: '#cdcdcd',
        borderLeftColor: '#cdcdcd',
        borderRightColor: '#cdcdcd',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        justifyContent: 'flex-start'
    },
    backgroundcolor: {
        backgroundColor: '#efefef',
    },
    backgroundcolorPress: {
        backgroundColor: '#6ee7b7',
    },
    box_icon: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: 50,
        height: 50
    },

    box_text_content: {
        padding: 1,
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'center',
        flex: 1

    },

    box_text_sub_content: {
        flexDirection: 'row',
    },

    box_text_sub_content_error: {
        flexDirection: 'column',
    },

    text_campaign: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        fontWeight: 'bold'
    },
    text_details: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
    },

    text_estado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        fontWeight: 'bold',
        paddingTop: 3
    },

    text_details_estado: {
        marginBottom: 5,
        fontFamily: 'serif',
        fontSize: 11,
        backgroundColor: '#00ff00',
        padding: 3
    },
    

});
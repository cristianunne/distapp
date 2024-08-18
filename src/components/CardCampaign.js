import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../styles/common_styles';



const CardCampaign = ({campaign, cantCampaign}) => {
    const campaign_ = campaign;

    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [numCampaign, setNumCampaign] = useState();




    useEffect(() => {

        if(campaign_ != undefined){
            const fecha_ini = new Date(campaign_.fecha_inicio);
            console.log();
            //console.log(campaign_.fecha_inicio);
            let fec = (fecha_ini.getDate() + 1) + '/' +  (fecha_ini.getMonth() + 1) + '/' + fecha_ini.getFullYear();
            setFechaInicio(fec);
    
            const fecha_fin = new Date(campaign_.fecha_fin);
            let fec_fin = (fecha_fin.getDate() + 1) + '/' +  (fecha_fin.getMonth() + 1) + '/' + fecha_fin.getFullYear();
         
            setFechaFin(fec_fin);
    
            setNumCampaign(campaign_.number);
        }

       console.log("entro a carsdcamp");
       console.log("valor" + cantCampaign);


    });

    if (cantCampaign > 0){
        return (
            <View style={[styles.box_welcome, styles.elevation]}>
                <View style={styles.box_header}>
                    <View>
                        <Text style={styles.text_header}>Campañas Activas</Text>
                    </View>
                </View>
    
                <View style={styles.box_content}>
    
                
                    <View style={styles.box_icon}>
                        <Image source={require('../images/calendario.png')} style={styles.icon} />
                    </View>
    
                    <View style={styles.box_text_content}>
                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_campaign}>Campaña N°: </Text>
                            <Text>{numCampaign != undefined ? (numCampaign) : null}</Text>
                        </View>
                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_campaign}>Fecha de Inicio: </Text>
                            <Text>{fechaInicio != undefined ? (fechaInicio) : null}</Text>
                        </View>
    
                        <View style={styles.box_text_sub_content}>
                            <Text style={styles.text_campaign}>Fecha de Fin: </Text>
                            <Text>{fechaFin != undefined ? (fechaFin) : null}</Text>
                        </View>
    
    
                    </View>
                </View>
    
            </View>
    
        )
    } else {
        return(
            <View style={[styles.box_welcome, styles.elevation]}>
            <View style={styles.box_header}>
                <View>
                    <Text style={styles.text_header}>Campañas Activas</Text>
                </View>
            </View>

            <View style={styles.box_content}>

            
                <View style={styles.box_icon}>
                    <Image source={require('../images/calendario.png')} style={styles.icon} />
                </View>

                <View style={styles.box_text_content}>
                    <View style={styles.box_text_sub_content_error}>
                        <Text style={styles.text_campaign}>¡No Existen Campañas Activas!</Text>
                        <Text style={styles.text_load}>Actualice la Información para visualizar Campañas activas.</Text>
                    </View>
                   


                </View>
            </View>

        </View>
        )
    }

   
}

export default CardCampaign

const styles = StyleSheet.create({
    box_welcome: {
        height: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 15

    },
    elevation: {
        elevation: 7,
        shadowColor: '#164620',
    },
    box_header: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.WARNING,
        marginTop: -10,
        marginLeft: -10,
        marginRight: -10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },

    box_content: {
        flex: 2,
        alignItems: 'left',
        flexDirection: 'row',

    },
    text_header: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#624b05',
        marginBottom: 7,
        alignSelf: 'center'
    },
    box_icon: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    box_text_content: {
        padding: 15,
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

    icon: {
        width: 70,
        height: 70
    },
    text_campaign: {
        marginBottom: 10,
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: 'bold'
    },
    text_load:{
        justifyContent: 'center',
        textAlign: 'justify'
    }

});
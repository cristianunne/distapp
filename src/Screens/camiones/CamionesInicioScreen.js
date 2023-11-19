import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Header from '../../components/Header'
import ButtonView from '../../components/ButtonView'
import Footer from '../../components/Footer'
import { AppContext } from '../../Context/ContextApp'
import { getStockCamionCampaignFromDB } from '../../databases/Entity/StockCamionCampaignEntity'
import CamionesCardInformation from '../../components/CamionesCardInformation'


const CamionesInicioScreen = () => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const [camion, setCamion] = useState(null);
    /*const [nombre, setNombre] = useState();
    const [marca, setMarca] = useState();
    const [matricula, setMatricula] = useState();*/
 
    const getCamionByCampaignAndUser = async () => {

        const user_obj = JSON.parse(user);
        //const campaignActive_obj = JSON.parse(campaignActive);
        if(campaignActive != null){
            const res = await getStockCamionCampaignFromDB(campaignActive.idcampaign, user_obj.idusers);

            if (res){
    
                setCamion(res);
    
                /*setNombre(res.rows.item(0).nombre);
                setMarca(res.rows.item(0).marca);
                setMatricula(res.rows.item(0).matricula);*/
            }
         
        }
       

    }


    useEffect(() => {

        getCamionByCampaignAndUser();

    }, [])
    return (
        <View style={styles.container}>
            <Header title={'Camiones'} leftIcon={require('../../images/home.png')} />
          
                <CamionesCardInformation camion={camion}></CamionesCardInformation>
               
          
            <Footer></Footer>

        </View>
    )
}

export default CamionesInicioScreen

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
        columnGap: 4,
        marginBottom: 10
    },
    scrollview: {
        padding: 5,
        paddingBottom: 15,

    },
    icon: {
        width: 90,
        height: 90
    },
    sub_container: {
        flexDirection: 'column',
        flex: 0.25,
        borderBottomColor: '#b0f2c2',
        borderTopColor: '#b0f2c2',
        borderLeftColor: '#b0f2c2',
        borderRightColor: '#b0f2c2',
        borderBottomWidth: 1.2,
        borderTopWidth: 1.2,
        borderLeftWidth: 1.2,
        borderRightWidth: 1.2,
        backgroundColor: '#b0f2c2',
        marginTop: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#164620',
        padding: 10
    },
    box_message: {
        flex: 1,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    icon_info: {
        flex: 0.4,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    text_content: {
        flex: 1,
        padding: 10,
        flexDirection: 'column'

    },
    text_sub_content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        paddingLeft: 10

    },
    label_cliente: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginRight: 4,
        flex: 0.3,
        fontSize: 12,
        fontWeight: 'bold',

    },
    text_item: {
        flex: 0.7,
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 12
    },
    title_content: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

    },
    title_container: {
        flex: 0.2,

    },
    details_container: {
        flex: 0.8,
    },
    title: {

        fontSize: 18,
        color: '#234F1E',
        fontWeight: 'bold'

    }
});
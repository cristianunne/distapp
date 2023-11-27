import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { getResumenVentasFromDB } from '../../databases/Entity/VentasEntity';
import VentasRealizadasItem from './VentasRealizadasItem';

const VentasRealizadasBox = ({ ventas, setIsLoading, idcampaign, reload, setReload, sent }) => {

    const [result, setResult] = useState([]);

    //console.log(ventas);

    const createItems = () => {
        let result_ = [];
        let i = 1;
        if (ventas != undefined) {
            ventas.map((prod, key) => {
              
               // console.log(prod);
               result_.push(<VentasRealizadasItem key={key} venta={prod} sent={sent} reload={reload} setReload={setReload}></VentasRealizadasItem>)
               
            });
            setResult(result_);
            i++;

        }

    }


    useEffect(() => {
        createItems();

    }, [ventas]);


    return (
        <View>
            <View style={styles.item_box}>
                {result}

            </View>
        </View>
    )
}

export default VentasRealizadasBox

const styles = StyleSheet.create({

    item_box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 1,
        columnGap: 4,
        paddingBottom: 20,

    },
});
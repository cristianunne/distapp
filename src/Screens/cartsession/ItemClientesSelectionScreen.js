import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ButtonIcon from '../../components/ButtonIcon';

import { TYPES_BTN } from '../../styles/common_styles';


const ItemClientesSelectionScreen = ({ productos, subtotal, descuento, total, clientes }) => {
    const navigation = useNavigation();
    const [items, setItems] = useState();
    const items_table = [];
   

    createItems = (dataCliente)=> {
       
        if(dataCliente != null){
            dataCliente.map((cliente, key) => {

                let sub_item = [];

                sub_item.push(<View style={styles.row} key={key}>
                    <View style={styles.column_prod_icon}_>
    
                    <ButtonIcon type={TYPES_BTN.SUCCESS} icon={'check'} size_={18}
                    onPress={() => {
                        selectCliente(cliente);
                    }}></ButtonIcon>
                    </View>
                    <View style={styles.column_shop_name}><Text style={styles.text_row_head}>{cliente.shop_name}</Text></View>
                    <View style={styles.column_apellido}><Text style={styles.text_row_head}>{cliente.apellido}</Text></View>
                    <View style={styles.column_nombre}><Text style={styles.text_row_head}>{cliente.nombre}</Text></View>
                    <View style={styles.column_localidad}><Text style={styles.text_row_head}>{cliente.localidad}</Text></View></View>
    
                );

                items_table.push(sub_item);
               
            });
            setItems(items_table);
        }
       
        
        /*for (let j = 0; j < res_clientes.rows.length; j++) {

            let item = res_clientes.rows.item(j);

            let sub_item = [];

            sub_item.push(<View style={styles.row} key={j}>
                <View style={styles.column_prod_icon}_>

                <ButtonIcon type={TYPES_BTN.SUCCESS} icon={'check'} size_={18}
                onPress={() => {
                    selectCliente(res_clientes.rows.item(j));
                }}></ButtonIcon>
                </View>
                <View style={styles.column_shop_name}><Text style={styles.text_row_head}>{item.shop_name}</Text></View>
                <View style={styles.column_apellido}><Text style={styles.text_row_head}>{item.apellido}</Text></View>
                <View style={styles.column_nombre}><Text style={styles.text_row_head}>{item.nombre}</Text></View>
                <View style={styles.column_localidad}><Text style={styles.text_row_head}>{item.localidad}</Text></View></View>

            );
     
            items_table.push(sub_item);

        }*/

    }




    const selectCliente = (cliente) => {
     

        navigation.navigate('FechaSelection', {
            productos: productos,
            clientes : cliente,
            subtotal : subtotal,
            descuento : descuento,
            total : total,

        });


    }

    useEffect(() => {

        createItems(clientes);
    }, [clientes])

  return (

   
      <View>
            {items}
      </View>
   
  )
}

export default ItemClientesSelectionScreen

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
        flex: 1,
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
});
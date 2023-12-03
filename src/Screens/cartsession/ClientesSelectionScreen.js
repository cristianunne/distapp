import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header from '../../components/Header';

import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { getClientesDB } from '../../databases/Entity/ClientesEntity';
import ButtonIcon from '../../components/ButtonIcon';
import { TYPES_BTN } from '../../styles/common_styles';
import Footer from '../../components/Footer';
import { AppContext } from '../../Context/ContextApp';


const ClientesSelectionScreen = ({ route }) => {
    
    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive,  idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido] = React.useContext(AppContext);

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [items, setItems] = useState();
    const items_table = [];

    state = {
        tableHead: ['', 'Comercio', 'Apellido', 'Nombre', 'Localidad', 'Telefono'],
        widthArr: [100, 100, 100, 100, 100]
    }

    const productos = route.params.productos;
    const subtotal = route.params.sutotal;
    const descuento = route.params.descuento;
    const total = route.params.total;
    const idcliente = route.params.idcliente;


    const selectCliente = (cliente) => {
     

        navigation.navigate('DescuentoGeneralScreen', {
            productos: productos,
            clientes : cliente,
            subtotal : subtotal,
            descuento : descuento,
            total : total,

        });


    }

    const getClientes_ = async () => {
        setIsLoading(true);
        const res_clientes = await getClientesDB();
        

        if(res_clientes.rows.length > 0){

            _tabledate = [];

            for (let i = 0; i < res_clientes.rows.length; i++) {


                const rowData = [];

                rowData.push(<ButtonIcon type={TYPES_BTN.SUCCESS} icon={'check'} size_={24}
                onPress={() => {
                    selectCliente(res_clientes.rows.item(i));
                }}></ButtonIcon>);
                
                rowData.push(res_clientes.rows.item(i).shop_name);
                rowData.push(res_clientes.rows.item(i).apellido);
                rowData.push(res_clientes.rows.item(i).nombre);
                rowData.push(res_clientes.rows.item(i).localidad);
                rowData.push(res_clientes.rows.item(i).telefono);
                _tabledate.push(rowData);
            }
            setTableData(_tabledate);
           
        }
     
        setTimeout(() => {
            setIsLoading(false);
        
        }, 3000);
       
    }

    const getClientes = async () => {

        //setIsLoading(true);
        const res_clientes = await getClientesDB();

        //console.log(res_clientes);

        /*for(let j = 0; j < res_clientes.length; j++){
            console.log(res_clientes.rows.items(j));
        }*/
        //console.log(res_clientes.rows.length);


        for (let j = 0; j < res_clientes.rows.length; j++) {

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

        }

        setItems(items_table);

 

    }


    const selectClienteById = async (idcliente) => {
        const res_clientes = await getClientesDB();

        for (let j = 0; j < res_clientes.rows.length; j++) {
            let item = res_clientes.rows.item(j);

            if(item.idclientes == idcliente){
                selectCliente(item);
                return;
            }
        }


    }




    useEffect(() => {

        if(isPedido){
            if(clientePedido != undefined && clientePedido != null){
                selectClienteById(clientePedido);
     
             }

        }

       
       
       getClientes();
    }, []);

    return (
        <View style={styles.container}>
            <Header title={'Seleccionar Cliente'} leftIcon={require('../../images/home.png')}
            />
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

             <View style={styles.productos_container}>
                    <View style={styles.productos_table_container}>
                        <ScrollView>
                        <View style={styles.table_head}>
                        <View style={styles.column_head_icon}><Text style={styles.text_column_head}></Text></View>
                            <View style={styles.column_head_prod}><Text style={styles.text_column_head}>Comercio</Text></View>
                            <View style={styles.column_head_cantidad}><Text style={styles.text_column_head}>Apellido</Text></View>
                            <View style={styles.column_head_precio}><Text style={styles.text_column_head}>Nombre</Text></View>
                            <View style={styles.column_head_desc}><Text style={styles.text_column_head}>localidad</Text></View>
                            
                        </View>

                        {items}

                        </ScrollView>

                    </View>
            </View>
            <Footer></Footer>

        </View>
    )
}

export default ClientesSelectionScreen

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
});
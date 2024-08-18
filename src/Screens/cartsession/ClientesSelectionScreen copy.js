import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Header from '../../components/Header';

import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { getClientesDB } from '../../databases/Entity/ClientesEntity';
import ButtonIcon from '../../components/ButtonIcon';
import { TYPES_BTN } from '../../styles/common_styles';
import Footer from '../../components/Footer';


const ClientesSelectionScreen = ({ route }) => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    state = {
        tableHead: ['', 'Comercio', 'Apellido', 'Nombre', 'Localidad', 'Telefono'],
        widthArr: [100, 100, 100, 100, 100]
    }

    const productos = route.params.productos;
    const subtotal = route.params.sutotal;
    const descuento = route.params.descuento;
    const total = route.params.total;

    const selectCliente = (cliente) => {
     

        navigation.navigate('DescuentoGeneralScreen', {
            productos: productos,
            clientes : cliente,
            subtotal : subtotal,
            descuento : descuento,
            total : total,

        });


    }

    const getClientes = async () => {
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




    useEffect(() => {
       
       getClientes();
;
    }, []);

    return (
        <View style={styles.container}>
            <Header title={'Productos'} leftIcon={require('../../images/home.png')}
            />
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

             <View style={styles.box_main}>
                    <View style={styles.container_}>
                        <ScrollView horizontal={true}>
                            <View>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                    <Row data={state.tableHead}
                                        widthArr={state.widthArr} style={styles.header}
                                        textStyle={styles.text} />
                                </Table>
                                <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        {
                                            tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={state.widthArr}
                                                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' 
                                                   }]}
                                                    textStyle={styles.text_content}
                                                />
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                            </View>

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
        flex: 0.92,
        borderRadius: 10,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        paddingBottom: 1,
        backgroundColor: '#ffffff'

    },
    container_: { flex: 1, padding: 16, paddingTop: 30},
    header: { height: 40, backgroundColor: '#cecece',color: '#000000'},
    text: { textAlign: 'center', fontWeight: 'bold', color: '#000000' },
    text_content: { textAlign: 'center', fontWeight: '400', color: '#000000' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#fefefe'},
});
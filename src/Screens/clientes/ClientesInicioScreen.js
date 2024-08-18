import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import Header from '../../components/Header';
import CardSync from '../../components/CardSync';
import ButtonIcon from '../../components/ButtonIcon';
import { TYPES_BTN } from '../../styles/common_styles';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { getClientes } from '../../services/fetching';
import { getClientesByIdDB, getClientesDB, insertClientes, updateClientesDB } from '../../databases/Entity/ClientesEntity';
import { LoadingModal } from "react-native-loading-modal";
import Footer from '../../components/Footer';
import { showMessage, hideMessage } from "react-native-flash-message";

const ClientesInicioScreen = () => {
    const navigation = useNavigation();


    const [tableData,setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false)

    state = {
        tableHead: ['Comercio', 'Apellido', 'Nombre', 'Localidad', 'Telefono'],
        widthArr: [100, 100, 100, 100, 100]
    }

    const element = (data, index) => (
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );


    const onPressSyncClientes = async () => {
        setIsLoading(true);
        const clientes = await getClientes();
        console.log(clientes);


        if(clientes != false && clientes != null){
            for (item of clientes) {
                //const res = await insertCategories(categoriesData[i]);
                //llamo a getclientebyid para ver que onda
                const clin_byid = await getClientesByIdDB(item.idclientes);

                if(clin_byid.rows.length > 0){
                    const res_ = await updateClientesDB(item);
                } else {
                    const res = await insertClientes(item);
                    //console.log(res);
                }


                
            }

            setTimeout(() => {
                setIsLoading(false);
                showMessage({
                    message: "Los Clientes se actualizaron con éxito!",
                    type: "success",
                    icon: "success"
                });
              
            }, 3000);
            setTimeout(() => {
               
                setIsReload(!isReload);
            }, 4000)

            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setIsReload(!isReload);
        }, 3000);
    }

    const getClientesDB_ = async () => {
        setIsLoading(true);
        const res_clientes = await getClientesDB();

        if(res_clientes.rows.length > 0){

            _tabledate = [];

            for (let i = 0; i < res_clientes.rows.length; i++) {


                const rowData = [];

                /*rowData.push(<ButtonIcon type={TYPES_BTN.WARNING} icon={'sync'} size_={24}
                onPress={onPressSyncClientes}></ButtonIcon>);*/
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
        getClientesDB_();
        console.log(tableData);
    }, [isReload])

    return (
        <View style={styles.container}>
            <Header title={'Clientes'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            <View style={styles.container}>
                <CardSync title={'Actualizar Clientes'}>
                    <ButtonIcon type={TYPES_BTN.WARNING} icon={'sync'} size_={36}
                        onPress={onPressSyncClientes}></ButtonIcon>
                </CardSync>
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
                                                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7', 
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

            </View>

            <Footer></Footer>


        </View>
    )
}

export default ClientesInicioScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    box_main: {
        flex: 0.88,
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
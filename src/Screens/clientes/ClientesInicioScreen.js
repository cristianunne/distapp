import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../../components/Header';
import CardSync from '../../components/CardSync';
import ButtonIcon from '../../components/ButtonIcon';
import { TYPES_BTN } from '../../styles/common_styles';

const ClientesInicioScreen = () => {
    const navigation = useNavigation();


    const onPressSyncClientes = () => {
        console.log('botontttt');
    }

  return (
    <View style={styles.container}>
         <Header title={'Clientes'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />
            <CardSync title={'Actualizar Clientes'}>
                <ButtonIcon type={TYPES_BTN.WARNING} icon={'sync'} size_={36}
                onPress={onPressSyncClientes}></ButtonIcon>
            </CardSync>
        

    </View>
  )
}

export default ClientesInicioScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },
});
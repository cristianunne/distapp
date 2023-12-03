import React, { Component, useEffect, useState, useContext } from 'react'
import { View, Text, Image, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native';
import LoginStyles from '../styles/Login.styled';
import CustomTextInput from './CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import URLS from '../services/urls'
import sessionAPI from '../services/fetching';
import { AppContext } from '../Context/ContextApp';
import { getUser, getUserCount, insertUser } from '../databases/Entity/UsersEntity';
import { LoadingModal } from "react-native-loading-modal";

import { showMessage, hideMessage } from "react-native-flash-message";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Login() {


  const [isLogin, setIsLogin, user, setUser] = useContext(AppContext);



  const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [validate, setValidate] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);

  const [inicio, setInicio] = useState(true)

  //uso para controlar el mensaje de credenciales invalidas
  const [isSesion, setIsSesion] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const validateEmail = (text) => {

    if (email != '') {
      if (!EMAIL_REGEX.test(email)) {
        setValidate(false)

        return;
      }
      setValidate(true)
    }
    setValidate(true)

  }

  const validarPassword = () => {

    password == '' ? setValidatePassword(false) : setValidatePassword(true);
  }


  const getUserFromDb = async () => {

    const user_count = await getUserCount();
    //console.log(user_count);

    if (!user_count) {
      //mando al login
      navigation.navigate('Login');
    } else {

      if (user_count.rows.item(0).cantidad == 0) {

        //mando al login
        navigation.navigate('Login');

      } else {
        //traigo el usuario y agrego al context sus datos
        //console.log(user_count.rows.item(0).cantidad)

        const user_data = await getUser();




        setDataToContext(user_data)

        setTimeout(() => {
          setIsLoading(false);
          navigation.push('Home');
        }, 3000);



      }
    }
  }


  const setDataToContext = (user_data) => {
    //usare para 
    //console.log(user_data.rows.item(0));

    let data_ = JSON.stringify(user_data.rows.item(0));
    setUser(data_);
    //console.log(user);

    //setUser(...user, JSON.stringify(user_data.rows.item(0)));

  }



  useEffect(() => {

    if (!(email == '') && validate) {
      validateEmail(email);
    } else if ((email == '') && !validate) {
      validateEmail(email);
    } else {
      validateEmail(email);
    }

    if (inicio) {

      setValidatePassword(true);
    } else {


      if (password == '') {
        setValidatePassword(false);
      } else {
        setValidatePassword(true);
      }
    }


    if (isLogin) {
      navigation.navigate('Home');
    }


  }, [email, password, isLogin])


  const onPressButton = async () => {

    //const res = await sessionAPI(email, password);
    //console.log(res);

    if (validate && validatePassword) {

      setIsLoading(true);


      //tengo que traer los datos de los input text
      const res = await sessionAPI(email, password);


      if (!res) {
        setIsSesion(false);
        setIsLoading(false);

        showMessage({
          message: res.toString(),
          type: "danger",
          icon: "danger"
        });


      } else {

        setIsSesion(true);
        //mando a guardar el usuario creado
        //console.log(res);
        saveDataUser(res);


      }
    } else {
      showMessage({
        message: "Error!",
        type: "danger",
        icon: "danger"
      });
    }
  }


  const saveDataUser = async (data) => {



    const res = await insertUser(data);
    if (res) {

      const re = await getUserFromDb()
      setIsLogin(true);

    }

  }


  return (

    <KeyboardAwareScrollView style={LoginStyles.keyborard}>
      
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando...'} />
            <Image source={require('../images/login.png')} style={LoginStyles.logo}>
            </Image>
            <Text style={LoginStyles.title}>
              Iniciar Sesión
            </Text>

            <CustomTextInput placeholder={'Ingrese su Email'}
              icon={require('../images/correo.png')}
              value={email}
              validate={validate}
              onChangeText={(text) => {
                setEmail(text);
              }}

            />
            <CustomTextInput placeholder={'Ingrese su Contraseña'}
              type={'password'}
              validate={validatePassword}
              icon={require('../images/candado.png')}
              onChangeText={(text) => {
                setPassword(text);
                setInicio(false);
              }}
            />

            <CustomButton title={'Aceptar'} onPress={onPressButton} />


            <Text style={!isSesion ? LoginStyles.error : LoginStyles.dnone}>
              Credenciales invalidas
            </Text>
           
         

    </KeyboardAwareScrollView>

    /*<SafeAreaView style={LoginStyles.safearea}>
 
      <ScrollView style={LoginStyles.scrollview}>

      
          <View style={LoginStyles.subcontainer}>
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando...'} />
            <Image source={require('../images/login.png')} style={LoginStyles.logo}>
            </Image>
            <Text style={LoginStyles.title}>
              Iniciar Sesión
            </Text>

            <CustomTextInput placeholder={'Ingrese su Email'}
              icon={require('../images/correo.png')}
              value={email}
              validate={validate}
              onChangeText={(text) => {
                setEmail(text);
              }}

            />
            <CustomTextInput placeholder={'Ingrese su Contraseña'}
              type={'password'}
              validate={validatePassword}
              icon={require('../images/candado.png')}
              onChangeText={(text) => {
                setPassword(text);
                setInicio(false);
              }}
            />

            <CustomButton title={'Aceptar'} onPress={onPressButton} />


            <Text style={!isSesion ? LoginStyles.error : LoginStyles.dnone}>
              Credenciales invalidas
            </Text>
           
          </View>
     
      </ScrollView>
      </SafeAreaView>*/

  )
}

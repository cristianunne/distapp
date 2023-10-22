import React, { useState } from 'react'
import { View, Image, TextInput } from 'react-native'
import CustomTextInputStyle from '../styles/CustomTextInput.styled'
import CustomButton from './CustomButton'


export default function CustomTextInput({ value, onChangeText, placeholder, icon, type, validate }) {
  
  const [text, setText] = useState(value);
  return (

    <View style={validate ? CustomTextInputStyle.view : CustomTextInputStyle.viewError} >

      <Image source={icon} style={CustomTextInputStyle.image} />
      <TextInput placeholder={placeholder} 
      style={CustomTextInputStyle.inputText}
        secureTextEntry={type == 'password' ? true : false}
        value={value}
        onChangeText={(txt)=>{
          onChangeText(txt);
        }
        }
      />
    
    </View>
  )
}

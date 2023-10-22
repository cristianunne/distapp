import { StyleSheet } from 'react-native';


const LoginStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#6ee7b7',
       
        alignItems: 'center',
    },

    logo: {
        marginTop: 50,
        width: 150,
        height: 150,
    },

    title: {
        marginTop: 50,
        alignSelf:'center',
        fontSize: 34,
        fontWeight: '600',
        color:'#006400',
        fontFamily: 'Roboto'

    },
    loading: {
        marginTop: 40,
        width: 200,
        height: 40,
    },

    error: {
        color: '#ff0000',
        marginTop: 20,
        fontWeight: '600',
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    dnone: {
        display: 'none'
    }
  });

export default LoginStyles;
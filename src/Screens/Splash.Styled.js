import { StyleSheet } from 'react-native';


const SplashStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#6ee7b7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 300,
        height: 300,
    },
    loading: {
        marginTop: 40,
        width: 200,
        height: 40,
    }

  });

export default SplashStyles;
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db';
import Toast from 'react-native-toast-message';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    /*useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error al iniciar sesión", result)
        } else if (result.status === "fulfilled") {
            console.log("Usuario logueado con éxito")
            console.log(result.data)
            dispatch(setUser(result.data))
            if(rememberMe){
                insertSession(result.data)
                    .then((result) => console.log("User saved successfully at the db", result))
                    .catch((error) => console.log("User was not able to be saved at the db", error))
            }
        }
    }, [result,rememberMe])*/

    useEffect(() => {
        //result?.isSuccess
        //console.log("Remember me: ", rememberMe)
        if (result.isSuccess) {
            console.log("Usuario logueado con éxito")
            console.log(result.data)
            dispatch(setUser(result.data))

            if (rememberMe) {
                clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
                insertSession({
                    localId: result.data.localId,
                    email: result.data.email,
                    token: result.data.idToken
                })
                    .then(res => console.log("Usuario insertado con éxito", res))
                    .catch(error => console.log("Error al insertar usuario", error))
            }

        } 
        
        if (!result.isSuccess) {
            Toast.show({
                type: 'error',
                text1: 'Failed to log in',
                text2: 'Please try again',
                visibilityTime: 2000, // Duración en milisegundos
            });
        }
    }, [result, rememberMe])

    const onsubmit = () => {
        //console.log(email,password)       
        triggerLogin({ email, password })
    }

    return (
        <LinearGradient
            //colors={['#400962', '#11001B']}
            colors={['rgba(0,0,0,0.8)', 'rgba(60,60,60,0.8)']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <Text style={styles.title}>Erick's Store</Text>
            <Text style={styles.subTitle}>Log in</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>

            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Keep me logged in</Text>
                {
                    rememberMe
                        ?
                        <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.amarillo} /></Pressable>
                        :
                        <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.grisClaro} /></Pressable>
                }
            </View>

            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>Not a registered user?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Sign up
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Log in</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>Don't want to sing up?</Text>
                <Pressable onPress={() => dispatch(setUser({ email: "demo@mundogeek.com", token: "demo" }))}>
                    <Text style={{ ...styles.whiteText, ...styles.strongText }}>Continue as guess</Text>
                </Pressable>
            </View>
            <Toast />
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.amarillo,
        //fontFamily: "PressStart2P",
        fontFamily: "Roboto",
        fontSize: 40
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.blanco,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: "#95859E",
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.moradoClaro,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
    }
})
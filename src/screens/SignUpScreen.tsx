import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import BG from '../../assets/auth-background.svg'
import { SuccessModal, FailedModal } from '@components'

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: '',
        error: ''
    })
    const [visible, setVisible] = React.useState(false);

    async function signUp() {
        if (value.name === '' || value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            const data = await createUserWithEmailAndPassword(auth, value.email, value.password);
            if (data) toggleOverlay();
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    function redirectToLoadingScreen() {
        navigation.navigate('Loading Screen')
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };


    return (
        <View style={styles.container}>
            <BG style={{ position: 'absolute', top: 50 }} />
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.desc}>Please sign up to get started!</Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
                <Input
                    placeholder='Name'
                    containerStyle={styles.control}
                    value={value.name}
                    onChangeText={(text) => setValue({ ...value, name: text })}
                    leftIcon={<Icon
                        name='user'
                        size={22}
                        color='#6E929D'
                    />}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                />

                <Input
                    placeholder='Email'
                    containerStyle={styles.control}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon
                        name='envelope'
                        size={18}
                        color='#6E929D'
                    />}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                />

                <Input
                    placeholder='Password'
                    containerStyle={styles.control}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='lock'
                        size={24}
                        color='#6E929D'
                    />}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                />
                <Button title="Create Account" buttonStyle={styles.button} onPress={signUp} />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 14 }}>
                    <Text style={styles.label}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                        <Text style={[styles.label, { fontFamily: 'Inter-Bold', color: '#004359', marginLeft: 4 }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SuccessModal visible={visible} toggleOverlay={toggleOverlay} onSubmit={redirectToLoadingScreen()} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 44,
        lineHeight: 52,
        color: '#004359'
    },
    desc: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        lineHeight: 22,
        marginTop: 28,
        marginBottom: 96,
        color: '#004359'
    },
    container: {
        flex: 1,
        paddingTop: 121,
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    controls: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 16,
        width: '100%'
    },

    control: {
        marginTop: 10,
        backgroundColor: 'rgba(0, 67, 89, 0.05)',
        height: 56,
        width: 328,
        alignSelf: 'center',
        marginVertical: 6,
        borderRadius: 16
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    },

    button: {
        fontFamily: 'Inter-Regular',
        backgroundColor: '#004359',
        height: 56,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 22,
        marginTop: 100,
        marginHorizontal: 16,
        borderRadius: 16
        // flex: 1
        // justifyContent: 'flex-end'
    },
    label: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#004359'
    }
});

export default SignUpScreen;

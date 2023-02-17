import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import BG from '../../assets/auth-background.svg'
import { SuccessUpdatedModal } from '../components';

const auth = getAuth();

const ChangePasswordScreen = ({ navigation }) => {
    const { user, isLoading } = useAuthentication();
    const [visible, setVisible] = React.useState(false);
    const [value, setValue] = React.useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        error: ''
    })

    useEffect(() => {
        if (user) resetState()
    }, [user])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    async function updateUser() {
        await signInWithEmailAndPassword(auth, value.email, value.oldPassword)
            .then(async () => {
                await updatePassword(user, value.newPassword)
                toggleOverlay()
            })
            .catch(err => {
                setValue({
                    ...value,
                    error: err.message,
                })
            })
    }

    function resetState () {
        setValue({
            email: user.email,
            oldPassword: '',
            newPassword: '',
            error: ''
        })
        setVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
                <View>
                    <Text style={styles.label}>Old Password</Text>
                    <Input
                        placeholder='Old Password'
                        containerStyle={styles.control}
                        value={value.oldPassword}
                        onChangeText={(text) => setValue({ ...value, oldPassword: text })}
                        leftIcon={<Icon
                            name='lock'
                            size={22}
                            color="#6E929D"
                        />}
                        secureTextEntry={true}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                    />
                </View>

                <View>
                    <Text style={styles.label}>New Password</Text>
                    <Input
                        placeholder='New Password'
                        containerStyle={styles.control}
                        value={value.newPassword}
                        onChangeText={(text) => setValue({ ...value, newPassword: text })}
                        leftIcon={<Icon
                            name='lock'
                            size={22}
                            color="#6E929D"
                        />}
                        secureTextEntry={true}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                    />
                </View>
                <Button title="Save" buttonStyle={styles.button} onPress={() => updateUser()} containerStyle={{}} />
            </View>
            <SuccessUpdatedModal visible={visible} toggleOverlay={toggleOverlay} onSubmit={resetState} />
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
        paddingTop: 35,
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%'
    },

    controls: {
        flex: 1,
        // flexDirection: 'column',
        marginHorizontal: 32,
        width: '90%'
    },

    control: {
        marginBottom: 24,
        backgroundColor: 'rgba(0, 67, 89, 0.05)',
        height: 56,
        // width: 328,
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
        fontSize: 18,
        lineHeight: 22,
        marginTop: 250,
        marginHorizontal: 16,
        borderRadius: 16
        // flex: 1
        // justifyContent: 'flex-end'
    },
    label: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#6E929D'
    }
});

export default ChangePasswordScreen;

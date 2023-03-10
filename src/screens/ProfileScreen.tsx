import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import BG from '../../assets/auth-background.svg'
import { SuccessUpdatedModal } from '../components';

// const auth = getAuth();

const ProfileScreen = ({ navigation }) => {
    const { user, isLoading } = useAuthentication();
    const [visible, setVisible] = React.useState(false);
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: '',
        error: ''
    })

    useEffect(() => {
        if (user) {
            setValue({
                email: user.email,
                name: user.displayName,
                password: ''
            })
        }
    }, [user])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    async function updateUser() {
        try {
            await updateProfile(user, {
                displayName: value.name,
                photoURL: ''
            })
            console.log('here 1')
            try {
                await updateEmail(user, value.email)
                console.log('here 2')
                try {
                    if (!!value.password) await updatePassword(user, value.password)
                    toggleOverlay()
                    console.log('success')
                } catch (error) {
                    setValue({
                        ...value,
                        error: error.message,
                    })
                }
            } catch (error) {
                setValue({
                    ...value,
                    error: error.message,
                })
            }
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
                <View>
                    <Text style={styles.label}>Name</Text>
                    <Input
                        placeholder='Name'
                        containerStyle={styles.control}
                        value={value.name}
                        onChangeText={(text) => setValue({ ...value, name: text })}
                        leftIcon={<Icon
                            name='user'
                            size={22}
                            color="#6E929D"
                        />}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder='Email'
                        containerStyle={styles.control}
                        value={value.email}
                        onChangeText={(text) => setValue({ ...value, email: text })}
                        leftIcon={<Icon
                            name='envelope'
                            size={18}
                            color="#6E929D"
                        />}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        leftIconContainerStyle={{ marginLeft: 20, marginRight: 12 }}
                    />
                </View>
                <Button title="Save" buttonStyle={styles.button} onPress={() => updateUser()} containerStyle={{}} />
            </View>
            <SuccessUpdatedModal visible={visible} toggleOverlay={toggleOverlay} onSubmit={toggleOverlay} />
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

export default ProfileScreen;

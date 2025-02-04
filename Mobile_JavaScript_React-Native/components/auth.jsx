import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Auth({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [regView, setRegView] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            headerTintColor: 'black',
            title: "Login or Register",
        });
        getData();
    }, []);

    const auth = () => {
        if (regView) {
            fetch(`${API_URL}/api/users/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                .then(res => res.json())
                .then(res => {
                    alert("User Created! Please Log In.")
                    setRegView(false);
                })
                .catch(error => console.log(error));
        } else {
            fetch(`${API_URL}/auth/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                .then(res => res.json())
                .then(res => {
                    saveData(res.token);
                    navigation.navigate("MovieList");
                })
                .catch(error => console.log(error));
        }

    };
    const saveData = async (token) => {
        await AsyncStorage.setItem('MR_Token', token)

    };
    const getData = async () => {
        const token = await AsyncStorage.getItem('MR_Token');
        if (token) navigation.navigate("MovieList");
    };

    const toggleView = () => {
        setRegView(!regView);
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: 'orange' }}>
                <Image
                    source={require('../assets/MR_logo.png')}
                    style={{ width: '100%', height: 135, paddingTop: 30 }}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.viewText}>{regView ? "New User? Register" : "Returning User? Login"}</Text>


            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword} // ✅ Toggle visibility
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showHideButton}>
                    <Text style={{ fontSize: 18, color: 'blue' }}>{showPassword ? "🔓" : "🔒"}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={auth}>
                <Text style={styles.buttonText}>{regView ? "Register" : "Login"}</Text>
            </TouchableOpacity>
            {!regView ?

                <View style={styles.noteVie}>
                    <Text style={styles.viewText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => toggleView()}>
                        <Text style={[styles.viewText, styles.viewTextSub]}>Register here.</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.noteVie}>
                    <Text style={styles.viewText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => toggleView()}>
                        <Text style={[styles.viewText, styles.viewTextSub]}>Login here.</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        paddingHorizontal: 10
    },
    passwordInput: {
        flex: 1,
        fontSize: 24,
        padding: 10
    },
    showHideButton: {
        padding: 10
    },
    button: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noteVie: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    viewTextSub: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    }
});

import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '../node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage';
import axios from 'axios';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log(err);
            }
        }
    })

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };
        // send a post request to backend API
        axios.post("http://192.168.0.132:8000/login", user).then((response) => {
            // console.log("Ok " + JSON.stringify(response));
            console.log("Ok " + response.data.token);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            Alert.alert(response.data.message);
            setEmail("");
            setPassword("");
            navigation.replace("Main");
        }).catch((error) => {
            console.log(error);
            Alert.alert(error);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image style={{ width: 150, height: 100 }} source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#041E42" }}>Login to Your Account</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D0D0D0', padding: 8, borderRadius: 8, marginTop: 30 }}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <TextInput onChangeText={(text) => setEmail(text)} value={email} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Enter your email' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D0D0D0', padding: 8, borderRadius: 8, marginTop: 30 }}>
                        <MaterialIcons name="lock" size={24} color="black" />
                        <TextInput onChangeText={(text) => setPassword(text)} value={password} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Enter your password' secureTextEntry={true} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>Keep me logged in</Text>
                        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                            <Text style={{ color: "blue", fontWeight: "bold" }}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Pressable style={{ backgroundColor: "#041E42", padding: 20, borderRadius: 8 }} onPress={() => handleLogin()}>
                            <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Login</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16, alignSelf: 'center' }}>
                        <Text style={{ color: "#041E42" }}>Don't have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Register")}>
                            <Text style={{ color: "#041E42", fontWeight: "bold", marginLeft: 4 }}>Sign Up</Text>
                        </Pressable>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
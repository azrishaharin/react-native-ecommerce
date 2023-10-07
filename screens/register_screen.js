import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const handleRegister = () => {
        const user = {
            name: firstName,
            email: email,
            password: password,
        };
        // send a post request to backend API
        axios.post("http://192.168.0.132:8000/register", user).then((response) => {
            console.log(response.data.message);
            Alert.alert(response.data.message);
            setFirstName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }).catch((error) => {
            console.log(error.response.data.message);
            Alert.alert(error.response.data.message);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image style={{ width: 150, height: 100 }} source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#041E42" }}>Create Your Account</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <View style={styles.textInput}>
                    <AntDesign name="user" size={24} color="black" />
                        <TextInput onChangeText={(text) => setFirstName(text)} value={firstName} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Name' />
                    </View>
                    <View style={styles.textInput}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <TextInput onChangeText={(text) => setEmail(text)} value={email} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Email' />
                    </View>
                    <View style={styles.textInput}>
                        <MaterialIcons name="lock" size={24} color="black" />
                        <TextInput onChangeText={(text) => setPassword(text)} value={password} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Password' secureTextEntry={true} />
                    </View>
                    <View style={styles.textInput}>
                        <MaterialIcons name="lock" size={24} color="black" />
                        <TextInput onChangeText={(text) => setConfirmPassword(text)} value={confirmPassword} style={{ color: "gray", width: "80%", marginVertical: 10, marginLeft: 4 }} placeholder='Confirm Password' secureTextEntry={true} />
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Pressable style={{ backgroundColor: "#041E42", padding: 20, borderRadius: 8 }} onPress={() => {
                            if (password !== confirmPassword) {
                                Alert.alert("Passwords do not match");
                            } else {
                                
                                handleRegister();
                            }
                         }}>
                            <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Create Account</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16, alignSelf: 'center' }}>
                        <Text style={{ color: "#041E42" }}>Already have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: "#041E42", fontWeight: "bold", marginLeft: 4 }}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    textInput: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#D0D0D0', 
        padding: 8, 
        borderRadius: 8, 
        marginTop: 20
    }
})
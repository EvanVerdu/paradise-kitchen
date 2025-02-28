import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground } from 'react-native';
import Images from './Images';
import axios from 'axios';

const Login = ({navigation, route}) =>
{
    if(!route.params){
        route.params = {message:''};
    }
    const [username, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [data, setData] = React.useState('');

    const doLogin = async ({navigation}, username,password) =>
    {
        fetch('https://paradise-kitchen.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: username,
                    password: password,
                })
    
            })    
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
            .catch(error => {
              console.error(error);
            });
    };

    useEffect(() => {
        if(data){
            if(data["id"] != -1)
                navigation.navigate('Landing', {id:data['id'], firstName:data['firstName'], lastName:data['lastName'], email:data['email'], login:data['login'], favorites:data['favorites']});
            else
                createInvalidLoginAlert();
        }
    }, [data]);




    const createInvalidLoginAlert = () =>{
        Alert.alert('Login Failed', 'Your username or password is incorrect.\n Please try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        onChangeUserName('');
        onChangePassword('');

    };


 
    return(
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo} />
                <Text style={styles.header}>Paradise Kitchen</Text>
                <View style={styles.mainLogin}>
                    <View style={styles.formButtons}>
                        <View style={styles.loginBox}>
                            <Button color="white" title="Login" onPress={() => navigation.navigate('Login')}/>
                        </View>
                        <View style={styles.registerBox}>
                            <Button color="black" fontWeight="bold" title="Register"onPress={() =>navigation.navigate('Register')}/>
                        </View>
                    </View>
                    <Text style={styles.message}>{route.params.message}</Text>
                    <Text style={styles.subheader}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUserName}
                        value={username}
                        placeholder="User Name"
                    />
                    <Text style={styles.subheader}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <Button style={styles.forgotPassword} color="red" title="Forgot Password?"onPress={() => navigation.navigate('Forgot Password')}/>
                    <View style={styles.submitButton}>
                        <Button style={styles.login} color="white" title="Login"onPress={() => doLogin({navigation}, username,password)}/>
                    </View>
                    
                </View>
                
            </SafeAreaView>
      </ImageBackground>
    );
};



const styles = StyleSheet.create({
    input: {
        height: 50,
        width:"90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    container: {
        alignItems: 'center',
        height:'100%'
    },
    mainLogin: {
        width:'90%',
        backgroundColor:'white',
        alignItems:'center',
        padding:22,
        borderRadius:20,
        marginTop:30,

    },
    logo: {
        width:125,
        height:125
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight:'bold',
    },
    formButtons:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:10,
        width:'60%',
    },
    subheader: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight:'bold',
        width:"90%",
        marginTop:20,
        marginBottom:-10
    },
    message: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        marginTop:16,
    },
    loginBox:{
        backgroundColor:'orange',
        width:'70%',
        borderRadius:20,
        marginRight:-16,
        zIndex:99,
    },
    registerBox:{
        width:'70%',
        backgroundColor:'white',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
    },
    loginButton:{
        color:"#ffffff",
    },
    submitButton:{
        backgroundColor:'orange',
        width:"80%",
        padding:8,
        marginTop:20,
        marginBottom:12,
        borderRadius:20,
    }
  });

export default Login;

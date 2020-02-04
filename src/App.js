import React, {Component,createContext } from 'react';
import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'
import "firebase/auth";
import "firebase/firestore";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.css'; // This uses CSS modules.
import { Button } from 'antd';

export const NomberContext = createContext() 
export const CodeContext = createContext()

const firebaseConfig = {
  apiKey: "AIzaSyAT6FCsFT9qM4D66mBFEFd-8wDzr6Bdz7s",
  authDomain: "phoneauth-6cbfd.firebaseapp.com",
  databaseURL: "https://phoneauth-6cbfd.firebaseio.com",
  projectId: "phoneauth-6cbfd",
  storageBucket: "phoneauth-6cbfd.appspot.com",
  messagingSenderId: "177447056089",
  appId: "1:177447056089:web:eafecfdd1c8086f95944c8",
  measurementId: "G-JNLR56BR24"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

class SignInScreen extends Component {

  
  state = {
    isSignedIn: false 
  };

  
  uiConfig = {
    
    signInFlow: 'popup',
    
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      
      signInSuccess: () => false
    }
  };

  
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container">
          <h1>Програмний модуль авторизації та автенфікаціі веб-сайтів підрозділів ЗСУ</h1>

          <h2>Авторизуйтесь:</h2>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Програмний модуль авторизації та автенфікаціі веб-сайтів підрозділів ЗСУ</h1>
        <h2>Вітаю {firebase.auth().currentUser.displayName}! Ви успішно авторизувались!</h2>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <Button onClick={() => firebase.auth().signOut()}>Вийти</Button>
      </div>
    );
  }
}

export default SignInScreen;
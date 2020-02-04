import React from 'react'
import * as firebase from "firebase/app";

const Captha = () =>{

    React.useEffect(()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    })
    return(
        <div id='recaptcha-container'></div>
    )
}

export default Captha
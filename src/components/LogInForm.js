import React, {useContext} from 'react'
import { Form, Input} from 'antd';
import {NomberContext, CodeContext} from './../App'
import * as firebase from "firebase/app";


const LogInForm = (props) =>{
  
  const appVerifier = window.recaptchaVerifier
    const [inputValue, setInputValue] = useContext(NomberContext)
    const [codeValue, setCodeValue] = useContext(CodeContext)

    const handleChange=(e)=>{
        setInputValue(e.target.value)
    }
    const handleChangeCode = (e)=>{
        setCodeValue(e.target.value)
    }

    const handleSubmit = (e)=>{
        
        e.preventDefault()
    }
  
        firebase.auth().signInWithPhoneNumber(inputValue, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log('Sucsess send sms')
          window.confirmationResult = confirmationResult;

          confirmationResult.confirm(inputValue).then(function (result) {
            // User signed in successfully.
            console.log(result)
            var user = result.user;
            // ...
            }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error)
            // ...
    });
        }).catch(function (error) {
          // Error; SMS not sent
          // ..
          if(error) console.log('err')
          
        });
    console.log(inputValue, codeValue, appVerifier)
    return(
      <div>
        <Form onSubmit={handleSubmit}> 
       <Form.Item>
         <Input placeholder='+380666666666' onChange={handleChange} value={inputValue} />
         <Input placeholder='Напишіть код з смс' onChange={handleChangeCode} value={codeValue} />
       </Form.Item>
     </Form>
      </div>
        
    )
} 
export default LogInForm
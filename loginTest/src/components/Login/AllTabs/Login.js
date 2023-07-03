import React, { useState } from "react";
import "../../../styles/Login.css";
/*
import { useHistory } from "react-router-dom"; v5
Use history.push('/your-component')
*/

const Login = (props) => {
  /* Where the form data is stored. */
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userError/*, setUserError*/] = useState("")
  const [passwordError/*, setPasswordError*/] = useState("")
    
  //const navigate = useHistory();
        
  /**
   * Actions to take after pressing the "Log in" button
   */
  const onButtonClickL = () => {
    // temporary
    alert(`Username is ${username} and password is ${password}` );
    // TODO
    
  }

  /**
   * Actions to take after pressing the "Log in as Guest" button
   */
  const onButtonClickG = () => {
    // temporary
    alert(`Username is Panda1 and password is SunGod` );
  }

  return <div className ={"mainContainer"}>

    <div className={"titleContainer"}>
      Login
    </div>
    <br />

    <div className={"inputContainer"}>
      <input 
        value={username}
        placeholder="Enter your username here"
        onChange={ev => setUsername(ev.target.value)}
        className={"inputBox"} />
      <label className="errorLabel">{userError}</label>
    </div>
    <br />

    <div className={"inputContainer"}>
      <input 
        value = {password}
        placeholder="Enter your password here"
        onChange={ev => setPassword(ev.target.value)}
        className={"inputBox"} />
      <label className="errorLabel">{passwordError}</label>
    </div>
    <br />

    <div className={"login"}>
      <input 
        className={"inputButton"}
        type="button"
        onClick = {onButtonClickL}
        value={ "Log in" } />
    </div>

    <div className={"guestLogin"}>
      <input 
        className={"inputButtonG"}
        type="button"
        onClick = {onButtonClickG}
        value={ "Log in as Guest" } />
    </div>

  </div>
}

export default Login
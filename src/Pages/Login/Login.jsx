import './Login.css'
import Logo from '../../assets/logo.png'
import { useState } from 'react'

const Login = () => {

  const [signIn, setSignIn] = useState("Sign In");

  return (
    <div className='login'>
        <img src={Logo} className='login-logo' />
        <div className="login-form">
          <h1>{signIn}</h1>
          <form>
            {signIn === "Sign Up"?<input type="text" placeholder='Enter Your UserName'/>:
            <></>}
            <input type="text" placeholder='Enter Your Email'/>
            <input type="text" placeholder='Enter Your Password'/>
            <button>{signIn}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox"/>
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-change">
            {signIn === "Sign In"?
            <p>New to NetFlix <span onClick={()=>{setSignIn("Sign Up")}}>Sign Up</span></p>:
            <p>Already Have An Account? <span onClick={()=>{setSignIn("Sign In")}}>Sign In</span></p>
          }
          </div>
        </div>
    </div>
  )
}

export default Login
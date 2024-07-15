import { Link } from "react-router-dom"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SERVER_PORT from './Config';

const HandleLogin = () => {
  const [User_ID, setUser_ID] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    fetch(`http://localhost:${SERVER_PORT}/server/login`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error fetching Tables:', response.status);
          }
          return response.json();
      })
      .then((res) => res.json())
      .then(data => setUser_ID(data))
      console.log(User_ID)
      .catch(error => setError(error.message));
}, []);
  localStorage.setItem('userId', User_ID);
}


const Login = () => {

    const [Email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Email);
        console.log(pw);

        try {
            const response = await axios.post(`http://localhost:${SERVER_PORT}/server/login`, {
              Email: Email,
              password: pw,
            });
      
            if (response.data.message === 'Login successful') {
              console.log('Login successful');
              window.location.href = '/overview';
              console.log("richtig")
              HandleLogin();
            } else {
              console.log('Invalid credentials');
              
              // Handle invalid login
            }
          } catch (error) {
            console.error('Error logging in:', error);
            // Handle error
          }
    }

    return (
        <div className="centercontainer">

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email">Email: </label>
                <input type="text" name="Email" id="Email" placeholder="Insert Email" value={Email} onChange={(e) => setEmail(e.target.value)} /> <br></br>


                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="insert Password" value={pw} onChange={(e) => setPw(e.target.value)} />

                <br></br><button type="submit" >Login</button>
            </form>
            <p>Don't have an account?  <Link to="/signUp"><button>Sign Up</button></Link></p>
            <p>Forgot Password? <Link to="/forgotPw"><button type="submit">Forgot Password</button></Link> </p>


        </div>
    )
}

export default Login;
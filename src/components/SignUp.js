import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        console.log(pw);
        console.log(email);

        try {
            const response = await axios.post('/server/signup', {
              username: username,
              email: email,
              password: pw,
            });
      
            if (response.data.message === 'User created successfully') {
              console.log('User created successfully');
              // You can perform further actions like redirecting to another page here
            } else {
              console.log('Username or email already exists');
              // Handle error
            }
          } catch (error) {
            console.error('Error creating user:', error);
            // Handle error
          }
    }

    return (
        <div className="centercontainer">
            <h1>SignUp</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username: </label>
                <input type="text" name="username" id="username" placeholder="Insert username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br></br>

                <label htmlFor="email">email </label>
                <input type="email" name="email" id="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} /> <br></br>


                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="insert Password" value={pw} onChange={(e) => setPw(e.target.value)} />

                <br></br><button type="submit" >SignUp</button>
            </form>
            <p> Already have an account? <Link to="/" ><button type="submit">Login</button></Link> </p>

        </div>

    );
}

export default SignUp;
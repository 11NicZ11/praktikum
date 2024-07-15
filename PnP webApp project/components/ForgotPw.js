import React, { useState} from "react";
import axios from "axios";

const ForgotPw = ()=>{
const [email, setEmail] = useState('');

const centercontainer = {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
        // Send a POST request to the server's reset password endpoint
        const response = await axios.patch('/server/password/reset', { Email: email });
        
        // Log the response message
        console.log(response.data);
      } catch (error) {
        console.error("Error resetting password:", error);
      }
}
    return(
        <div className="centercontainer">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br /><br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPw;
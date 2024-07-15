import React, {useState} from "react";
import { PropTypes } from "prop-types";

async function loginUser(credentials) {
    return fetch('http://localhost:5001/testlogin', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body : JSON.stringify(credentials)
    })
    .then(data => data.json())
}



export default function LoginTest ({ setToken }){
const [email, setEmail] = useState();
const [password, setPassword] = useState();

const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        email,
        password
    });
    setToken(token);
}

    return(
<div>
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: 
        <input type="email" onChange={e => setEmail (e.target.value)} /> 
        </label><br/>
        <label htmlFor="password">Password: 
        <input type="password" onChange={e => setPassword (e.target.value)}/>
        </label>
        <button type="submit" >login</button>
    </form>
</div>

    );

}
LoginTest.propTypes = {
    setToken: PropTypes.func.isRequired
}

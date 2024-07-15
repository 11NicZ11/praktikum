import React, { useState } from "react";
import { Link } from "react-router-dom";

const JoinTable = () => {

    const [tableName, setTableName] = useState('');
    //const [tableId, setTableId] = useState('');
    const [tablePw, setTablePw] = useState('');

    const centercontainer = {
        backgroundColor: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableName);
        //  console.log(tableId);
        console.log(tablePw);
    }

    return (
        <div className="centercontainer">
            <h1>Join Table</h1><br />

            <form onSubmit={handleSubmit}>
                <label htmlFor="tableName">Table Name:</label>
                <input type='text' id='tableName' name='tableName' value={tableName} onChange={(e) => setTableName(e.target.value)} /> <br></br>

                <label htmlFor="tableName">Table Password:</label>
                <input type='text' id='tablePw' name='tablePw' value={tablePw} onChange={(e) => setTablePw(e.target.value)} />
                <Link to="/overview"><button>Cancel</button></Link>
                <Link to="/table"><button type="submit">Join Table</button></Link>
            </form>
        </div>

    );
}
export default JoinTable;

// button in tableoverview der einen zum table bringt
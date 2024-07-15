import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoE from "./GenerateOverviewElements";

const CreateTable = () => {
    const [tableName, setTableName] = useState('');
    const [numOfP, setNumOfP] = useState('');
    const [tablePw, setTablePw] = useState('');

    const centercontainer = {
        backgroundColor: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log(tableName);
        console.log(numOfP);
        console.log(tablePw);

    }

    // create new join buttons in TableOverview
    const [count, setCount] = useState(0);
    const GeneBtn = () => {
        let buttons = [];
        for (let i = 0; i < count; ++i) {
            buttons.push(<GoE />);
        }
        return (buttons);
    }

    return (
        <div className="centercontainer">
            <h1>create Table</h1>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="tableName">Table Name: </label>
                <input type="text" name="tableName" id="tableName" value={tableName} onChange={(e) => setTableName(e.target.value)} /> <br></br>

                <label htmlFor="numberOfP">Number of Seats/Player: </label>
                <input type="number" name="numOfS" id="numOfP" value={numOfP} onChange={(e) => setNumOfP(e.target.value)} /> <br></br>

                <label htmlFor="tablePw">Table Password: </label>
                <input type="text" name="tablePw" id="tablePw" value={tablePw} onChange={(e) => setTablePw(e.target.value)} />
                <br></br> <Link to="/overview"><button>Cancel</button></Link>
                <button onClick={() => setCount(count => count + 1)} type="submit">Create Table</button>
                {GeneBtn()}
            </form>

        </div>
    );
}

export default CreateTable;
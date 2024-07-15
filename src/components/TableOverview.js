import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';


const Overview = () => {
    const[table, setTable] = useState =([]);
    useEffect(() => {
        // Fetch GM username
        fetch('/server/tables')
          .then(response => response.json())
          .then(data => setTable(data))
          .catch(error => console.error('Error fetching Tables:', error));
    });

   


    
    return (
        <div>
            <div className="buttons" style={{ alignContent: "center" }}>
                <Link to="/joinTable"><button>Join Table</button></Link> <br></br>
                <Link to="/createTable"><button>Create Table</button></Link> <br></br>
                <Link to="/deleteTable"><button>Delete Table</button></Link> <br></br>
                <Link to="/table"><button>To Overview</button></Link> <br></br>
                <Link to="/"><button>Logout</button></Link>

            </div>
            <div className="TableOverview">


                <button> <br></br>Table-ID: 123456<br></br>GM: James Doe</button>
                <fieldset> {table}</fieldset>


            </div>
        </div>
    );
}
export default Overview;
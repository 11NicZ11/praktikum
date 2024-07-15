import { useState } from "react";

const TableRules = () => {
    const [tRules, setTRules] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tRules);
    }
    
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <label htmlFor="tableRules"></label>
                <input type="text" name="tRules" id="tRules" placeholder="Insert your Rules for the Table" value={tRules} onChange={(e) => setTRules(e.target.value)}></input>
                <button type="submit">Create Table Rules</button>
            </form>
        </div>
    );
}

export default TableRules;
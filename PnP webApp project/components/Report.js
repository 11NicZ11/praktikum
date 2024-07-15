import { useState } from "react";

const Report = () => {
    const [reporter, setReporter] = useState("");
    const [Reported, setReported] = useState('');
    const [Reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
            <label htmlFor="report">Reporting player: </label>
                <input type="text" id="report" name="report" placeholder="Goldenford23" value={reporter} onChange={(e) => setReporter(e.target.value)}></input>
                <br/>
                <label htmlFor="report">to be Reportet player: </label>
                <input type="text" id="reportName" name="reportName" placeholder="Hampter123" value={Reported} onChange={(e) => setReported(e.target.value)}></input>
                <br/>
                <label htmlFor="report">Report reason: </label>
                <input type="text" id="reportReason" name="reportReason" placeholder="Example: Broke Table Rules, unfriendly ... etc" value={Reason} onChange={(e) => setReason(e.target.value)}></input>
                <button type="submit" onClick={alert("Thank you for Helping to keep our website Fun")}>Report</button>
            </form>
        </div>
    );
}

export default Report;

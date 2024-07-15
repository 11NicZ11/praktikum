import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SERVER_PORT from './Config';

function Presets() {
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [presetsData, setPresetsData] = useState([]);
    const [advantageChecked, setAdvantageChecked] = useState(false);
    const [disadvantageChecked, setDisadvantageChecked] = useState(false);
    const [criticalHitChecked, setCriticalHitChecked] = useState(false);
    const [secretRollChecked, setSecretRollChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTableID, setActiveTableID] = useState(null);
    const [gmId, setGmId] = useState(null);
    const [rollUserId, setRollUserId] = useState(null);
    const presetsPerPage = 30;
    const totalPages = Math.ceil(presetsData.length / presetsPerPage);
    const startIndex = (currentPage - 1) * presetsPerPage;
    const endIndex = startIndex + presetsPerPage;

    // Logic to handle previous page button click
    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Logic to handle next page button click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePresetSelect = (presetId) => {
        setSelectedPreset(presetId);
    };

    const handleRollPreset = async () => {
        let resultString = '';
        console.log("--NEW ROLL--");
        presetsData.push({
            dice: dice,
            number: num,
            modifier: mod,
            damageType: damageType,
        });

        for (let i = 0; i < dice.length; i++) {

            console.log("i:" + i);
            const dice = parseInt(selectedDice[i]);
            let num = parseInt(number[i]);
            let mod = parseInt(modifier[i]);
            if (isNaN(mod)) {
                mod = 0;
            }
            const damageType = selectedDamageType[i];
            console.log("Dice:" + dice);
            console.log("Number:" + num);
            console.log("Mod:" + mod)
            console.log("Damage Type:" + damageType)

            if (!isNaN(dice) && !isNaN(num)) {
                let total = 0;
                if (dice === 20 || dice === 100) {
                    const isAdvantage = advantageChecked[i];
                    const isDisadvantage = disadvantageChecked[i];

                    if ((dice === 20 && isAdvantage) || (dice === 20 && isDisadvantage)) {
                        const randomRoll1 = Math.floor(Math.random() * dice) + 1;
                        const randomRoll2 = Math.floor(Math.random() * dice) + 1;
                        console.log("Roll1:" + randomRoll1)
                        console.log("Roll2:" + randomRoll2)
                        resultString += isAdvantage ? Math.max(randomRoll1, randomRoll2) : Math.min(randomRoll1, randomRoll2);
                    } else {
                        for (let j = 0; j < num; j++) {
                            resultString = Math.floor(Math.random() * dice) + 1;
                        }
                    }
                } else {
                    for (let k = 0; k < num; k++) {
                        const randomRoll = Math.floor(Math.random() * dice) + 1;
                        console.log("Roll:" + randomRoll)
                        total += randomRoll;
                    }

                    total += mod;
                    resultString += `${total}`;
                }
                if (damageType !== '--') {
                    resultString += `${damageType}`;
                }

                resultString += '\n';

                if (secretRollChecked) {
                    if (i === rollUserId) {
                        resultString = `${resultString}`;
                    } else if (i === gmId) {
                        resultString = `${resultString}`;
                    } else {
                        resultString = '';
                    }
                }
            }
        }

        if (resultString !== '') {
            setResult(resultString);
        }

    };

    const handleDeletePreset = () => {
        if (selectedPresetIndex !== null && selectedPresetIndex >= 0) {
            const updatedPresets = [...presets];
            updatedPresets.splice(selectedPresetIndex, 1); // Remove the selected preset
            setPresets(updatedPresets);
            setSelectedPresetIndex(null); // Clear the selected preset index
        }
    };

    const handleAdvantageChange = (e) => {
        setAdvantageChecked(e.target.checked);
    };

    const handleDisadvantageChange = (e) => {
        setDisadvantageChecked(e.target.checked);
    };

    const handleCriticalHitChange = (e) => {
        setCriticalHitChecked(e.target.checked);
    };

    const handleSecretRollChange = (e) => {
        setSecretRollChecked(e.target.checked);
    };

    useEffect(() => {
        // Get User ID of the user rolling a dice
        fetch(`http://localhost:${SERVER_PORT}/server/userId/${activeTableID}`)
            .then(response => response.json())
            .then(data => { setRollUserId(data[0].User_ID) })
            .catch(error => console.error('Error fetching user ID of the user rolling a dice:', error));

        // Fetch GM username and GM ID
        fetch(`http://localhost:${SERVER_PORT}/server/gmUsername`)
            .then(response => response.json())
            .then(data => {setGmId(data[0].GM_ID)})
            .catch(error => console.error('Error fetching GM username:', error));

        // Fetch presets data from the server when the component mounts
        fetch(`http://localhost:${SERVER_PORT}/server/presets`) // Change the URL to match your server route
            .then(response => response.json())
            .then(data => setPresetsData(data))
            .catch(error => console.error('Error fetching presets:', error));
    }, [activeTableID]);

    return (
        <div>
            {/* Render presets buttons */}
            <div className="presets-grid">
                {presetsData.slice(startIndex, endIndex).map((preset, index) => (
                    <button
                        key={index}
                        className={selectedPreset === preset ? 'selected' : ''}
                        onClick={() => handlePresetSelect(preset)}
                    >
                        {`Name: ${preset.name}`}
                    </button>
                ))}
            </div>
            <div className="presetsBottomLeftContainer">
                {currentPage > 1 && <button className="tableButtonStyle" onClick={handlePreviousPage}>Previous</button>}
                {currentPage < totalPages && <button className="tableButtonStyle" onClick={handleNextPage}>Next</button>}
            </div>
            <div className="presetsBottomRightContainer">
                {/* Checkboxes */}
                <label>
                    <input
                        type="checkbox"
                        className="checkboxStyle"
                        checked={advantageChecked}
                        onChange={handleAdvantageChange}
                    />
                    Advantage
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkboxStyle"
                        checked={disadvantageChecked}
                        onChange={handleDisadvantageChange}
                    />
                    Disadvantage
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkboxStyle"
                        checked={criticalHitChecked}
                        onChange={handleCriticalHitChange}
                    />
                    Critical Hit
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="checkboxStyle"
                        checked={secretRollChecked}
                        onChange={handleSecretRollChange}
                    />
                    Secret Roll
                </label>

                {/* Buttons */}
                <Link to="/table">
                    <button className="tableButtonStyle" onClick={handleRollPreset}>
                        Roll Preset
                    </button>
                </Link>
                    <button className="tableButtonStyle" onClick={handleDeletePreset}>
                        Delete Preset
                    </button>
                <Link to="/createNewPreset">
                    <button className="tableButtonStyle">
                        Create new Preset
                    </button>
                </Link>
                <Link to="/table">
                    <button className="tableButtonStyle">
                        Return to Table
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Presets;
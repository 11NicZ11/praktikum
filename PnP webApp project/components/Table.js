import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SERVER_PORT from './Config';

function Table() {
  const [selectedDice, setSelectedDice] = useState(Array(3).fill('--'));
  const [number, setNumber] = useState(['', '', '']);
  const [modifier, setModifier] = useState(['', '', '']);
  const [selectedDamageType, setSelectedDamageType] = useState(['--', '--', '--']);
  const [advantageChecked, setAdvantageChecked] = useState(false);
  const [disadvantageChecked, setDisadvantageChecked] = useState(false);
  const [secretRollChecked, setSecretRollChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [gmUsername, setGMUsername] = useState([]);
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [activeTableID, setActiveTableID] = useState(null);
  const [gmId, setGmId] = useState(null);
  const [rollUserId, setRollUserId] = useState(null);

  const rollDice = async () => {

    let resultString = '';
    console.log("--NEW ROLL--");

    for (let i = 0; i < 3; i++) {

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
          resultString += ` ${damageType}`;
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

    // Reset input fields after rolling dice
    setSelectedDice(Array(3).fill('--'));
    setNumber(['', '', '']);
    setModifier(['', '', '']);
    setSelectedDamageType(['--', '--', '--']);
    setAdvantageChecked(false);
    setDisadvantageChecked(false);
    setSecretRollChecked(false);

  };

  useEffect(() => {
    // Fetch player usernames for the active table
    fetch(`http://localhost:${SERVER_PORT}/server/playerUsernames/${activeTableID}`)
      .then(response => response.json())
      .then(data => setPlayerUsernames(data))
      .catch(error => console.error('Error fetching player usernames:', error));
    
    // Get User ID of the user rolling a dice
    fetch(`http://localhost:${SERVER_PORT}/server/userId/${activeTableID}`)
      .then(response => response.json())
      .then(data => {setRollUserId(data[0].User_ID)})
      .catch(error => console.error('Error fetching user ID of the user rolling a dice:', error));

      // Fetch GM username and GM ID
    fetch(`http://localhost:${SERVER_PORT}/server/gmUsername`)
    .then(response => response.json())
    .then(data => {
      setGMUsername(data);
      setGmId(data[0].GM_ID);
    })
    .catch(error => console.error('Error fetching GM username:', error));

  }, [activeTableID]);

  const diceOptions = ['--', 4, 6, 8, 10, 12, 20, 100];
  const damageTypes = ['--', 'Acid', 'Bludgeoning', 'Cold', 'Force', 'Fire', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];

  return (
    <div className="tableContainerStyle">
      <Link to="/presets">
        <button className="tableButtonStyle" style={{ position: 'absolute', top: '40px', left: '10px' }}>
          Presets
        </button>
      </Link>
      <div className="tableLeftButtonsContainer">
        <button className="tableLeftButtonStyle">
          Game Master
          <br />
          {gmUsername}
        </button>
        {playerUsernames.map((name, index) => (
          <button key={index} className="tableLeftButtonStyle">
            {name.split('\n').map((line, lineIndex) => (
              <div key={lineIndex}>{line}</div>
            ))}
          </button>
        ))}
      </div>
      <div className="tableRectangleStyle">
        <textarea
          value={result}
          readOnly
          className="tableTextareaStyle"
        />
      </div>
      <div className="tableTopRightContainer" style={{ marginTop: '10px' }}>
        <div>
          <label className="labelStyle">Dice</label>
          {selectedDice.map((dice, index) => (
            <select key={index} className="selectStyle" value={dice} onChange={(e) => {
              const updatedDice = [...selectedDice];
              updatedDice[index] = e.target.value;
              setSelectedDice(updatedDice);
            }}>
              <option value="--">--</option>
              {diceOptions.filter(option => option !== '--').map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          ))}
        </div>
        <div>
          <label className="labelStyle">Number</label>
          {number.map((num, index) => (
            <input key={index} type="text" className="inputStyle" value={num} onChange={(e) => {
              const updatedNumbers = [...number];
              updatedNumbers[index] = e.target.value;
              setNumber(updatedNumbers);
            }} />
          ))}
        </div>
        <div>
          <label className="labelStyle">Modifier</label>
          {modifier.map((mod, index) => (
            <input key={index} type="text" className="inputStyle" value={mod} onChange={(e) => {
              const updatedModifiers = [...modifier];
              updatedModifiers[index] = e.target.value;
              setModifier(updatedModifiers);
            }} />
          ))}
        </div>
        <div>
          <label className="labelStyle">Damage Type</label>
          {selectedDamageType.map((type, index) => (
            <select key={index} className="selectStyle" value={type} onChange={(e) => {
              const updatedTypes = [...selectedDamageType];
              updatedTypes[index] = e.target.value;
              setSelectedDamageType(updatedTypes);
            }}>
              {damageTypes.map((damageType, index) => (
                <option key={index} value={damageType}>{damageType}</option>
              ))}
            </select>
          ))}
        </div>
        <div>
          <button style={{ width: '100px', height: '30px', background: 'lightgray', border: '2px solid black' }}
            onClick={rollDice}
          >
            Roll
          </button>
        </div>
        <div>
          <label className="labelStyle">
            Advantage
            <input
              type="checkbox"
              className="checkboxStyle"
              checked={advantageChecked}
              onChange={(e) => {
                setAdvantageChecked(e.target.checked);
              }}
            />
          </label>
        </div>
        <div>
          <label className="labelStyle">
            Disadvantage
            <input
              type="checkbox"
              className="checkboxStyle"
              checked={disadvantageChecked}
              onChange={(e) => {
                setDisadvantageChecked(e.target.checked);
              }}
            />
          </label>
        </div>
        <div>
          <label className="labelStyle">
            Secret Roll
            <input type="checkbox"
              className="checkboxStyle"
              checked={secretRollChecked}
              onChange={(e) => {
                setSecretRollChecked(e.target.checked);
              }}
            />
          </label>
        </div>
      </div>
      <div className="tableBottomButtonsContainer">
        <Link to="/contactUs">
          <button className="tableButtonStyle" style={{ width: '150px' }}>
            Contact Us
          </button>
        </Link>
        <Link to="/rulesOfConduct">
          <button className="tableButtonStyle" style={{ width: '150px' }}>
            Rules of Conduct
          </button>
        </Link>
        <Link to="/tableRules">
          <button className="tableButtonStyle" style={{ width: '150px' }}>
            Table Rules
          </button>
        </Link>
        <Link to="/reportUser">
          <button className="tableButtonStyle" style={{ width: '150px' }}>
            Report User
          </button>
        </Link>
        <Link to="/overview">
          <button className="tableButtonStyle" style={{ width: '150px' }}>
            Back to Tables
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Table;
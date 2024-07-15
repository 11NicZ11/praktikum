import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SERVER_PORT from './Config';

function CreateNewPreset() {
  const [presetName, setPresetName] = useState('');
  const [selectedDice, setSelectedDice] = useState('--');
  const [number, setNumber] = useState('');
  const [modifier, setModifier] = useState('');
  const [selectedDamageType, setSelectedDamageType] = useState('--');

  const handleSavePreset = async () => {
    const presetData = {
      Preset_Name: presetName,
      Dice: selectedDice,
      Dice_Count: number,
      Modifier: modifier,
      Dmg_ID: selectedDamageType,
    };

    try {
      const response = await fetch(`http://localhost:${SERVER_PORT}/server/presetcreation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(presetData),
      });

      if (response.ok) {
        console.log('Preset saved successfully');
      } else {
        console.error('Error saving preset');
      }
    } catch (error) {
      console.error('Error saving preset:', error);
    }
  };

  // Dropdown options for dice and damage types
  const diceOptions = ['--', 4, 6, 8, 10, 12, 20, 100];
  const damageTypes = ['--', 'Acid', 'Bludgeoning', 'Cold', 'Force', 'Fire', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];

  return (
    <div>
      <h1>Create new Preset</h1>

      <label className="labelStyle">Preset Name:</label>
      <input type="text" value={presetName} onChange={e => setPresetName(e.target.value)} />

      {presetName.map((detail, index) => (
        <div key={index}>
          <h2>Preset {index + 1}</h2>
          <label className="labelStyle">Dice:</label>
          <select key={index} className="selectStyle" value={selectedDice} onChange={e => {
            const updatedDice = [...selectedDice];
            updatedDice[index] = e.target.value;
            setSelectedDice(updatedDice);
          }}>
            {diceOptions.filter(option => option !== '--').map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <label className="labelStyle">Number:</label>
          <input className="inputStyle" type="text" value={number} onChange={e => {
            const updatedNumbers = [...number];
            updatedNumbers[index] = e.target.value;
            setNumber(updatedNumbers);
          }} />
          <label className="labelStyle">Modifier:</label>
          <input className="inputStyle" type="text" value={modifier} onChange={e => {
            const updatedModifiers = [...modifier];
            updatedModifiers[index] = e.target.value;
            setModifier(updatedModifiers);
          }} />
          <label className="labelStyle">Damage Type:</label>
          <select key={index} className="selectStyle" value={damageTypes} onChange={e => {
            const updatedTypes = [...selectedDamageType];
            updatedTypes[index] = e.target.value;
            setSelectedDamageType(updatedTypes);
          }}>
            {damageTypes.map((damageType, index) => (
              <option key={index} value={damageType}>{damageType}</option>
            ))}
          </select>
        </div>
      ))}

      <Link to="/presets">
        <button className="tableButtonStyle" onClick={handleSavePreset}>
          Save Preset
        </button>
      </Link>
      <Link to="/presets">
        <button className="tableButtonStyle">
          Cancel
        </button>
      </Link>
    </div>
  );
}

export default CreateNewPreset;
import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)
    function handleButtonClick() {
        setIsEditing((editing) => !editing)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }
    function handleChange(e) {
        setPlayerName(e.target.value)
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" value={playerName} onChange={handleChange} required />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
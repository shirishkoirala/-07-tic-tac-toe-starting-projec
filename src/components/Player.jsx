import { useState } from "react";

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    function handleChange(e) {
        setPlayerName(e.target.value)
    }

    return (
        <li>
            <span className="player">
                {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" value={playerName} onChange={handleChange} required/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => setIsEditing((editing) => !editing)}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
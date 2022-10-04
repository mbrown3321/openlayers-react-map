import React, { useState } from "react";

import './EachItem.scss';

export const EachItem = ({ onAddCoordinatesOnMap, pointA, pointB, indexItem }) => {
    const [aPoint, setApoint] = useState(pointA);
    const [bPoint, setBpoint] = useState(pointB);
    return (
        <div className="listItemWrapper">
            <h4>{`Заявка на доставку №${indexItem}`}</h4>
            <div className="wrapper">
                <div>
                    <input
                        placeholder={pointA}
                        value={pointA}
                        onChange={(event) => setApoint(event.target.value)}
                    />
                    Координаты точки А
                </div>
                <div>
                    <input
                        placeholder={pointB}
                        value={pointB}
                        onChange={(event) => setBpoint(event.target.value)}
                    />
                    Координаты точки В
                </div>
            </div>
            <button onClick={() => onAddCoordinatesOnMap(aPoint, bPoint)}>Добавить координаты на карту</button>
        </div>
    )
}

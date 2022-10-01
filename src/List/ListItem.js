import React, { useState } from "react";
import './ListItem.css';

export const ListItem = ({ key, pointA, pointB, onAddCoordinatesOnMap, setApoint, setBpoint, aPoint, bPoint }) => {
    return (
        <div key={key}>
            <h4>first delivery item</h4>
            <div className="wrapper">
                <div>
                    <input
                        placeholder={pointA}
                        onChange={(event) => setApoint(event.target.value)}
                    />
                    Ввести координаты точки А
                </div>
                <div>
                    <input
                        placeholder={pointB}
                        onChange={(event) => setBpoint(event.target.value)}
                    />
                    Ввести координаты точки В
                </div>
            </div>
            <button
                onClick={onAddCoordinatesOnMap(aPoint, bPoint)}
            >Добавить координаты точек на карту</button>
        </div>
    )
}

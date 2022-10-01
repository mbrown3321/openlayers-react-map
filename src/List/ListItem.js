import React from "react";
import './ListItem.css';

export const ListItem = () => {
    return (
        <>
            <h4>first delivery item</h4>
            <div className="wrapper">
                <div>
                    <input
                    // onChange={(event) => setApoint(event.target.value)}
                    />
                    Ввести координаты точки А
                </div>
                <div>
                    <input
                    // onChange={(event) => setBpoint(event.target.value)}
                    />
                    Ввести координаты точки В
                </div>
            </div>
            <button
            // onClick={() => onAddCoordinatesOnMap(aPoint, bPoint)}
            >Добавить координаты точек на карту</button>
        </>

    )
}

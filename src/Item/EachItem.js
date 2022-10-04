import React, { useState } from "react";

import cn from './EachItem.module.scss';

export const EachItem = ({ onAddCoordinatesOnMap, pointA, pointB, indexItem, activeItem, setActiveItem }) => {
    const [aPoint, setApoint] = useState(pointA);
    const [bPoint, setBpoint] = useState(pointB);
    return (
        <div className={activeItem === indexItem ? cn.activeItem : cn.notActiveItem} onClick={() => {
            onAddCoordinatesOnMap(aPoint, bPoint);
            setActiveItem(indexItem)
        }}>
            <h4>{`Заявка на перевозку №${indexItem}`}</h4>
            <div className={cn.pointsWrapper}>
                <div>
                    <input
                        placeholder={pointA}
                        value={pointA}
                        onChange={(event) => setApoint(event.target.value)}
                    />
                    Точка погрузки
                </div>
                <div>
                    <input
                        placeholder={pointB}
                        value={pointB}
                        onChange={(event) => setBpoint(event.target.value)}
                    />
                    Точка разгрузки
                </div>
            </div>
        </div>
    )
}

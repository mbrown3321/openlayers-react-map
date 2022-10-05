import React, { useState, useEffect } from "react";

import cn from './EachItem.module.scss';

export const EachItem = ({ onAddCoordinatesOnMap, pointA, pointB, indexItem, activeItem, setActiveItem, setShowMarker }) => {
    const [aPoint, setApoint] = useState(pointA);
    const [bPoint, setBpoint] = useState(pointB);
    const onItemClick = () => {
        setActiveItem(indexItem);
        setTimeout(() => {
            onAddCoordinatesOnMap(aPoint, bPoint);
            setShowMarker(true);
        }, 100)
    }
    useEffect(() => {
        if (aPoint != pointA || bPoint != pointB) {
            setShowMarker(false);
            setTimeout(() => {
                onAddCoordinatesOnMap(aPoint, bPoint);
                setShowMarker(true);
            }, 100)
        }
    }, [aPoint, bPoint])
    return (
        <div className={activeItem === indexItem ? cn.activeItem : cn.notActiveItem}
            onClick={onItemClick}>
            <h4>{`Заявка на перевозку №${indexItem}`}</h4>
            <div className={cn.pointsWrapper}>
                <div>
                    <input
                        placeholder={pointA}
                        value={aPoint}
                        onChange={(event) => setApoint(event.target.value)}
                    />
                    Точка погрузки
                </div>
                <div>
                    <input
                        placeholder={pointB}
                        value={bPoint}
                        onChange={(event) => setBpoint(event.target.value)}
                    />
                    Точка разгрузки
                </div>
            </div>
        </div>
    )
}

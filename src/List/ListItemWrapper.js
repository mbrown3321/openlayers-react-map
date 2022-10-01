import { ListItem } from "./ListItem"
import React from "react";
import './ListItem.css';
import * as data from './deliveryItems.json';

const ListItemWrapper = (onAddCoordinatesOnMap, setApoint, setBpoint) => {
    const listItems = data.items;
    console.log('listItems ', listItems)
    return listItems.map((item) => {
        return (
            <div className="listItemWrapper">
                <ListItem key={item.key} pointA={item.pointA} pointB={item.pointB}
                    setApoint={() => setApoint}
                    setBpoint={() => setBpoint}
                    onAddCoordinatesOnMap={() => onAddCoordinatesOnMap} />
            </div>
        )
    })
}

export default ListItemWrapper

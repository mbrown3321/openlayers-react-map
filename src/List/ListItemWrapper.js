import { ListItem } from "./ListItem"
import React from "react";
import './ListItem.css';
import * as data from './deliveryItems.json';

const ListItemWrapper = () => {
    const listItems = data.items;
    console.log('listItems ', listItems)
    return listItems.map((item) => {
        return (
            <div className="listItemWrapper">
                <ListItem key={item.key} pointA={item.pointA} pointB={item.pointB} />
            </div>
        )
    })
}

export default ListItemWrapper

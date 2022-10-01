import { ListItem } from "./ListItem"
import React from "react";
import './ListItem.css';
import * as data from './deliveryItems.json';

const ListItemWrapper = () => {
    const listItems = data.items;
    console.log('listItems ', listItems)
    return (
        <div className="listItemWrapper">
            <ListItem />
        </div>
    )
}

export default ListItemWrapper

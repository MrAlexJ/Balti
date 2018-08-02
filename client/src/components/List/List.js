import React from "react";
import ListItem from "./ListItem.js";
import "./List.css";

const List = props => {

  console.log("DATA", props.data)

  switch(props.list){

    case "random": 
      return (
        <ul className="list-group">
          {props.data.map(item => (
            <li className="list-group-item" key={item.id}>
              {item.bucket_items}
              
              <span className="icons">
                <i className="fas fa-plus-circle" onClick={()=>props.addToList(item)}></i>
                <i className="fas fa-star" ></i>
              </span>
            </li>
          ))}
        </ul>
      );

      case "dashwish":
      return (
        <ul className="list-group">
          {props.data.map(item => (
            <li className="list-group-item" key={item.id} id={item.id} onClick={() => props.addToRealList(item)}>
              {item.bucket_items}
            </li>
          ))}
        </ul>
      );

    case "wish":
    return (
      <ul className="list-group">
        {props.data.map(item => (
          <li className="list-group-item" key={item.id} id={item.id}>
            {item.bucket_items}
            
            <span className="icons">
              <i className="fas fa-plus-circle" onClick={()=>props.addToRealList(item)}></i>
            </span>
          </li>
        ))}
      </ul>
    );
    default: 
      return (
        <ul className="list-group">
          {props.data.map(item => (
            <ListItem
              key={item.id}
              items={item.bucket_items}
              completed={item.completed}
              type="checkbox"
              id={item.id}
              onChange={props.toggleCheckComplete}
            > mission accomplished? </ListItem> 
          ))}
        </ul>
      );
  }

};

export default List;
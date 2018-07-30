import React from "react";


const List = props => {

  console.log("DATA", props.data)

  switch(props.list){

    case "random": 
      return (
        <ul className="list-group">
          {props.data.map(item => (
            <li className="list-group-item" key={item.id}>
              {item.bucket_items} | 
              
              <i className="fas fa-plus-circle" onClick={()=>props.addToList(item)}></i>
              <br />
              <i className="fas fa-star" ></i>
             
            </li>
          ))}
        </ul>
      );
    default: 
      return (
        <ul className="list-group">
          {props.data.map(item => (
            <li className="list-group-item" key={item.id}>
              {item.bucket_items}
            </li>
          ))}
        </ul>
      );
  }

};

export default List;

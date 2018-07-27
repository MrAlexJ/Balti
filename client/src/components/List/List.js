import React from "react";

const listItems = [
    {
      id: 1,
      name: "Skydive",
      complete: false
    },
    {
      id: 2,
      name: "finish this project",
      complete: false
    },
    {
      id: 3,
      name: "become a travel blogger",
      complete: false
    }
  ];
  

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately
const List = props => {
  // Using the filter method, we can create a new array containing only groceries which haven't been purchased
  return (
    <ul className="list-group">
      {listItems.map(item => (
        <li className="list-group-item" key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default List;

import React from "react";

const SearchForm = props => (

<div className="input-group mb-3">
  <input
  value={props.search}
  onChange={props.handleInputChange} 
  type="text" 
  className="form-control" 
  placeholder="Search..." 
  aria-label="Recipient's username" 
  aria-describedby="button-addon2" 
  />
  <datalist id="locationSearch">
  
  </datalist>
  <div className="input-group-append">
<button 
className="btn btn-outline-secondary" 
type="submit" 
id="button-addon2"
onClick={props.handleSearchSubmit}
>
Search
</button>
  </div>
</div>

)



export default SearchForm;
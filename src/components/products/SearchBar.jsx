const SearchBar = ({ onSearch, searchValue, productsCount }) => {

  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="row justify-content-end my-4">
      <div className="col-md-5">
        <div className="input-group shadow-sm">
          <input type="text" className="form-control" placeholder="Search product.." value={ searchValue } onChange={ handleChange }/>
        </div>
        {
          searchValue && (
            <small className="text-start text-muted mt-1 d-block">
              Search: "{searchValue}" • {productsCount} results
            </small>
          )
        }
      </div>
    </div>
  )
}

export default SearchBar;
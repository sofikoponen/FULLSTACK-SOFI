const Filter = ({newFilter, setNewFilter}) => {

    const filterWith = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
      }
    
    return (
    <form onSubmit={e=> e.preventDefault()}>
    <div>
      filter shown with:
      <input
        value={newFilter}
        onChange={filterWith}
      />
    </div>
    </form>
    )
}

export default Filter
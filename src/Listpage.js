const Listpage = ({ pokemon }) => {
  return (
    <>
        {pokemon.map(p => (
          <div key={p} className="col">
                {p.toUpperCase()} </div>
              ))}
   </>
  )
}

export default Listpage;
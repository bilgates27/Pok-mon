const Paggination = ({ goToNextPage, goToPrevPage }) => {
  return (
       <>
          {goToPrevPage && <button onClick={goToPrevPage} className="btn btn-primary">Prev</button>}&nbsp;
          {goToNextPage && <button onClick={goToNextPage} className="btn btn-primary">Next</button>}
       </>
  )
}

export default Paggination;
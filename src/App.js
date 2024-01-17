import { useEffect, useState } from 'react';
import Listpage from './Listpage';
import axios from 'axios';
import Paggination from './Paggination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/ability/");
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const source = axios.CancelToken.source();

    axios.get(currentPageURL, { cancelToken: source.token })
      .then((res) => {
        setLoading(false);
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        setPokemon(res.data.results.map(p => p.name));
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setLoading(false);
          console.error('Error fetching data:', error);
        }
      });

    return () => {
      source.cancel();
    };
  }, [currentPageURL]);

  function goToNextPage() {
    setCurrentPageURL(nextPageURL);
  }

  function goToPrevPage() {
    setCurrentPageURL(prevPageURL);
  }

  if (loading) return 'loading...';

  return (
    <>
      <Paggination
        goToNextPage={nextPageURL ? goToNextPage : null}
        goToPrevPage={prevPageURL ? goToPrevPage : null}
      />
      <Listpage pokemon={pokemon} />
    </>
  );
}

export default App;

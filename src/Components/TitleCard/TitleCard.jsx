import './TitleCard.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TitleCard = (props) => {

  const navigate = useNavigate();

  const cardsref = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsref.current.scrollLeft += event.deltaY;
  }

  const [detailedMovies, setDetailedMovies] = useState([]);



  async function fetchMovies() {
    const res = await fetch(
      `https://api.watchmode.com/v1/search/?apiKey=VdJ6Kd0OVBwnwBgxFluNVcYAgqYI5SwV505ADxCg&search_field=name&search_value=${props.search}`
    );

    const data = await res.json();
    

    if (!data.title_results) return;


    const detailed = await Promise.all(
      data.title_results.map(async (movie) => {
        const res = await fetch(
          `https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=VdJ6Kd0OVBwnwBgxFluNVcYAgqYI5SwV505ADxCg`
        );
        return await res.json();
      })
    );

    setDetailedMovies(detailed);
  }


  useEffect(() => {
    const cached = sessionStorage.getItem(props.search);

    if (cached) {
      setMovies(JSON.parse(cached));
    } else {
      fetchMovies();
    }

    const ref = cardsref.current;
    ref.addEventListener("wheel", handleWheel);

    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);


  return (
    <div className='titlecards'>
      <h2>{props.title ? props.title : "Popular on NetFlix"}</h2>
      <div className="card-list" ref={cardsref}>
        {detailedMovies.map((movie) => (
          <div to="/player" onClick={()=>navigate(`/Player/${movie.id}`)} className="card" key={movie.id}>
            <img src={movie.posterLarge || movie.posterMedium}/>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitleCard
import './TitleCard.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Movies from '../../Data/movies-full.json'

const TitleCard = (props) => {

  const navigate = useNavigate();

  const cardsref = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsref.current.scrollLeft += event.deltaY;
  }

  const detailedMovies = Movies[props.category] || [];

  useEffect(() => {
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
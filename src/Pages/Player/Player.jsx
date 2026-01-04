import './Player.css'
import back from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [movie, setMovie] = useState(null);

  const getEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  };

  useEffect(() => {
    const fetchMovie = async () => {
    try {
      const res = await fetch(
        `https://api.watchmode.com/v1/title/${id}/details/?apiKey=VdJ6Kd0OVBwnwBgxFluNVcYAgqYI5SwV505ADxCg`
      );
      const data = await res.json();
      setMovie(data)
    } catch {
      console.error(error);
      setMovie(null);
    }
  }
  fetchMovie()
  },[id])

  const embedUrl = getEmbedUrl(movie?.trailer);

  if (!movie) {
    return (<p>Loading...</p>)
  }



  return (
    <div className='player'>
      <img src={back} onClick={() => navigate(-1)} />
      {embedUrl ? (<div>
        <iframe src={embedUrl} title='trailer' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div className='player-info'>
          <p>Title: {movie.title}</p>
          <p>Released on: {movie.release_date}</p>
          <p>type: {movie.tmdb_type}</p>
        </div>
      </div>
      ) : (
        <>
          <img src={back} onClick={() => navigate(-1)} />
          <img className='poster' src={movie.posterLarge} alt="" />
          <div className='player-info'>
          <p>Title: {movie.title}</p>
          <p>Released on: {movie.release_date}</p>
          <p>type: {movie.tmdb_type}</p>
        </div>
        </>
      )}
    </div>
  )
}

export default Player
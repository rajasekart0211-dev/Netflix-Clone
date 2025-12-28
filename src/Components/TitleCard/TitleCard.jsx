import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect, useRef } from 'react'

const TitleCard = (props) => {

    const cardsref = useRef();

    const handleWheel = (event)=>{
      event.preventDefault();
      cardsref.current.scrollLeft += event.deltaY;
    }

    useEffect(()=>{
      cardsref.current.addEventListener('wheel', handleWheel);
    },[])

  return (
    <div className='titlecards'>
      <h2>{props.title ? props.title:"Popular on NetFlix"}</h2>
      <div className="card-list" ref={cardsref}>
        {cards_data.map((card, index)=>{
         return <div className="card" key={index}>
            <img src={card.image}/>
            <p>{card.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCard
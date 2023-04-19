import React from 'react';
import './Card.css'


export function Card({ name, img, rating, genres, platforms, released }) {

    return (
        < >
            <div className='card0'>
                <div className='rating'>
                    <span className="star">&#9733;<h3 className='numRating'>{rating}</h3></span>
                </div>
                <div className='imgCont'>
                    <img className='imgcard' src={img} alt='img not found' /> 
                </div>
                <div className='card1'>
                    <div className='C1open'>
                        <h2 className='name'>{name}</h2>
                        <span className='spanopen'>open</span>
                    </div>
                    <div className='detail'>
                        <h4 className='card2'>GENRE ›› {genres.join(' ・ ')} </h4>
                        <h4 className='card2'>PLATFORMS ›› {platforms.join(' ・ ')}</h4>
                        <h4 className='card2'>RELEASED ›› {released}</h4>
                    </div>
                </div>
            </div>
        </>

    )
};
import React from 'react'

export const Products = ({data}) => {

  return (
    <div className='products-container' >
        { data.length>0 ? data.map((elem)=>(
            <div className='products' key={elem.id} >
                <img src={elem.imageURL} /> 
                <h3>{elem.name}</h3>
                <div className='btn-price' >
                    <h3>{elem.price}</h3>
                    <button>Add To Cart</button>
                </div>
            </div>
        )):
        <div className='products-container'>
            <h2>No Product Found !! </h2>
        </div> }
    </div>
  )
}

import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
export const NavBar = () => {
  return (
    <div className='navbar' >
        <div>
            <h2>Terex Store</h2>
            < AiOutlineShoppingCart size={30} />
        </div>
    </div>
  )
}

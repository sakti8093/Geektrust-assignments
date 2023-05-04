import React from 'react'

export const Filter = ({handleChange}) => {


  return (
    <div className='filter' onChange={(e)=>handleChange(e)} >
        <h4 >color</h4>
        <input name='color' value='Red' type='checkbox' />
        <label >Red</label><br/>
        <input name='color' value='Blue' type='checkbox' />
        <label >Blue</label><br/>
        <input name='color' value='Green' type='checkbox' />
        <label >Green</label><br/>
        <input name='color' value='White' type='checkbox' />
        <label >White</label><br/>
        <input name='color' value='Black' type='checkbox' />
        <label >Black</label><br/>

        <h4 >Gender</h4>
        <input name='gender' value='Men' type='checkbox' />
        <label >Men</label><br/>
        <input name='gender' value='Women' type='checkbox' />
        <label >Women</label><br/>

        <h4 >Price</h4>
        <input value='0-250' name='price' type='checkbox' />
        <label >0 - 250 </label><br/>
        <input value='251-450' name='price' type='checkbox' />
        <label >251 - 450</label><br/>
        <input value='451-800' name='price' type='checkbox' />
        <label >451 - 800</label><br/>

        <h4 >Type</h4>
        <input name='type' value='Polo' type='checkbox' />
        <label >Polo </label><br/>
        <input value='Hoodie' name='type' type='checkbox' />
        <label >Hoodie</label><br/>
        <input value='Basic'name='type' type='checkbox' />
        <label>Basic</label><br/>
    </div>
  )
}

import { useEffect, useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { Products } from './components/Products'
import { Filter } from './components/Filter';
import filteredItems from './utilities/Filter';

function App() {

  const [ store , setStore ] = useState({
    products : [],
    itemsToDisplay : [],
    loading : false,
    error : false,
    filters : {
      color : [],
      price : [],
      gender : [],
      type : [],
    },
  });

  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    setStore({...store,loading:true});
    fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json").then((res)=>{
      return res.json();
    }).then((res)=>{
      setStore({...store,products:res,itemsToDisplay:res});
    }).catch((err)=>{
      setStore({...store,err:err})
    })
    setStore({...store,loading:false})
  }

  const handleChange = (e) =>{
    const {name,value} = e.target

    if(e.target.checked){
      setStore(prevState=>{
        const copyState = {...prevState}
        copyState.filters ={ ...copyState.filters,[name]:[...copyState.filters[name],value] }
        return{
          ...prevState,
         filters : { ...prevState.filters,[name]:[...prevState.filters[name],value] },
         itemsToDisplay : filteredItems( copyState.filters,copyState.products  )
        }
      })
    }else{
      setStore(prevState=>{
        const copyState = {...prevState}
        copyState.filters = { ...copyState.filters,[name]:copyState.filters[name].filter((item)=>(
          item !== value
         )) }
        return{
          ...prevState,
         filters : { ...prevState.filters,[name]:prevState.filters[name].filter((item)=>(
          item !== value
         )) },
         itemsToDisplay : filteredItems( copyState.filters,copyState.products  )
        }
      })
    }
  }

  if(store.loading){
    return <h1>loading</h1>
  }

  return (
    <div>
       < NavBar />
       <div className='body' >
        <div className='product-filter-container' >
          < Filter handleChange={handleChange}/>
          < Products data={store.itemsToDisplay}  />
        </div>
      </div>
    </div>
  )
}

export default App

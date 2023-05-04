import { AiOutlineDelete,AiOutlineEdit } from 'react-icons/ai'

export const Table = ({data,handleDelete,selectUser,deleteSelectedUser,disabled,showEditPage}) => {  
    
    if(!data?.length>0){
        return(
                <h3 className='err-text' >No Data Found</h3>
        )
    }

  return (
    <div className='table-container' >
        <table className='table'>
           <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
           </thead>
           <tbody>
             { data?.map((elem)=>(
                    <tr key={elem.id} >
                      <td> <input onChange={(e)=>selectUser(e,elem.id)} type='checkbox' /> </td>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>{elem.role}</td>
                      <td className='td-icon' >
                          <div><AiOutlineEdit onClick={()=>showEditPage(elem)} / ></div>
                          <div><AiOutlineDelete onClick={()=>handleDelete(elem.id)} /></div> 
                      </td>
                    </tr>
                ))}
           </tbody>
        </table>
        <button disabled={disabled} onClick={deleteSelectedUser} className="delete-btn" > Delete Selected</button>
    </div>
  )
}

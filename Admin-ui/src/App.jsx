import { NavBar } from "./components/NavBar";
import "./App.css";
import { Table } from "./components/Table";
import { useEffect, useState } from "react";
import { Paginaton } from "./components/Paginaton";
import { ShowEdit } from "./components/ShowEdit";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [store, setStore] = useState({
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemPerPage: 10,
    selectedUser: [],
    editData: null,
    showedit: false,
    searchItem : null
  });

  const indexOfLastItem = store.currentPage * store.itemPerPage;
  const indexOfFirstItem = indexOfLastItem - store.itemPerPage;
  let itemsToDisplay;
  if(store.searchItem){
   itemsToDisplay = store.searchItem.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  }else{
    itemsToDisplay =  store.products.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  }

  const getData = async () => {
    setStore({ ...store, loading: true });
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStore({
          ...store,
          products: data,
          error: null,
          totalpages: Math.ceil(data.length / 10),
        });
      })
      .catch((err) => {
        setStore({ ...store, products: [], error: err });
      })
      .finally({ ...store, loading: false });
  };


  if (itemsToDisplay?.length === 0 && store.currentPage !== 1) {
    setStore({ ...store, currentPage: store.currentPage - 1 });
  }

  const handlePageChange = (pageNumber) => {
    setStore({ ...store, currentPage: pageNumber });
  };

  const pageButtons = [];
  if(store.searchItem){
    for (
      let i = 1;
      i <= Math.ceil(store.searchItem.length / store.itemPerPage);
      i++
    ) {
      pageButtons.push(i);
    }
  }else{
    for (
      let i = 1;
      i <= Math.ceil(store.products.length / store.itemPerPage);
      i++
    ) {
      pageButtons.push(i);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    if(store.selectedUser.includes(id)){
      setStore({
      ...store,
        selectedUser: store.selectedUser.filter((item) => item!== id),
        products: store.products.filter((item) => item.id !== id),
        searchItem :store.searchItem?.filter((item) => item.id !== id),
      })
    }else if( store.searchItem ){
      setStore({
        ...store,
        products: store.products.filter((item) => item.id !== id),
        searchItem :store.searchItem.filter((item) => item.id !== id),
      });
    }else{
      setStore({
        ...store,
        products: store.products.filter((item) => item.id !== id),
      });
    }

  };

  const selectUser = (e, id) => {
    if (e.target.checked) {
      setStore({ ...store, selectedUser: [...store.selectedUser, id] });
    } else {
      setStore({
        ...store,
        selectedUser: store.selectedUser.filter((el) => el !== id),
      });
    }
  };

  const deleteSelectedUser = () => {
    setStore({
      ...store,
      products: store.products.filter(
        (item) => !store.selectedUser.includes(item.id)
      ),
      searchItem : store.searchItem?.filter(
        (item) => !store.selectedUser.includes(item.id)
      ),
      selectedUser: [],
    });
  };

  const showEditPage = (data) => {
    setStore({
      ...store,
      showedit: true,
      editData: data,
    });
  };

  const closeEditPage = () => {
    setStore({
      ...store,
      showedit: false,
      editData: null,
    });
  };

  const handleEditSubmit = (e, data) => {
    e.preventDefault();
    const { id } = data;
    for (let i = 0; i < store.products.length; i++) {
      if (store.products[i].id === id) {
        store.products[i] = data;
        break;
      }
    }
    if(store.searchItem){
      for (let i = 0; i < store.searchItem.length; i++) {
        if (store.searchItem[i].id === id) {
          store.searchItem[i] = data;
          break;
        }
      }
    }
    closeEditPage();
  };

  const handleSearch = (e) => {
      setStore({
      ...store,
        searchItem: store.products.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.role.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.email.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    });
  }

  if(store.loading){
    return <h1>LOADING....</h1>
  }

  if(store.error){
    return <h1>{store.error}</h1>
  }

  return (
    <div>
      <NavBar />
      <div className="main" >
      <SearchBar handleSearch={handleSearch} />
      <Table
        data={itemsToDisplay}
        handleDelete={handleDelete}
        selectUser={selectUser}
        deleteSelectedUser={deleteSelectedUser}
        disabled={store.selectedUser.length === 0}
        showEditPage={showEditPage}
      />
      { itemsToDisplay?.length>0 && <Paginaton
        currentPage={store.currentPage}
        handlePageChange={handlePageChange}
        pageButtons={pageButtons}
      /> }
      <ShowEdit
        showEdit={store.showedit}
        editData={store.editData}
        handleEditSubmit={handleEditSubmit}
        closeEditPage={closeEditPage}
      />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const ShowEdit = ({
  showEdit,
  handleEditSubmit,
  editData,
  closeEditPage,
}) => {
  if (!editData) {
    return;
  }

  const [data, setData] = useState({
    id: editData.id,
    name: editData.name,
    email: editData.email,
    role: editData.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    showEdit && (
      <div className="edit-box">
        <div className="form-container">
          <h1>Edit Page</h1>
          <IoMdClose className="close-btn" onClick={closeEditPage} />
          <form
            onSubmit={(e) => handleEditSubmit(e, data)}
            className="edit-form"
          >
            <label htmlFor="">Enter name</label>
            <input
              onChange={handleChange}
              name="name"
              value={data.name}
              placeholder="Enter New Name"
            />
            <label htmlFor="Enter email">Enter New Name</label>
            <input
              onChange={handleChange}
              name="email"
              value={data.email}
              placeholder="Enter New Email"
            />
            <label htmlFor="Enter role">Enter New Role</label>
            <input
              onChange={handleChange}
              name="role"
              value={data.role}
              placeholder="Enter New Role"
            />
            <button>submit</button>
          </form>
        </div>
      </div>
    )
  );
};

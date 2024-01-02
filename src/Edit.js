import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3030/users/" + id)
    .then((res) => setData(res.data)
    ).catch( (err) =>console.log(err))
  }, []);

  function hadleSumbit(e){
    e.preventDefault();
    axios.put("http://localhost:3030/users/"+id,data).then(
        (res)=>{
            // alert('data update Successfully');
            toast.success('data update Successfully');
            navigate('/');
        }
    ).catch( err => console.log(err));
  }

  return (
    <>
    <ToastContainer />
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={hadleSumbit}>

           <div>
                <label htmlFor="name">Id:</label>
                <input
                type="text"
                name="id"
                disabled
                className="form-control"
                value={data.id}
                />
           </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data.name}

              onChange={ (e) => setData({...data,name:e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={ (e) => setData({...data,email:e.target.value})}
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Edit;

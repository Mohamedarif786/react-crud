import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cloums, setCloums] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getalldata();
  }, []);

  function getalldata() {
    axios.get("http://localhost:3030/users").then((res) => {
      setCloums(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="text-end">
          <Link to="/create" className="btn btn-primary">
            Add +
          </Link>
        </div>
        <table className="table w-100">
          <thead>
            <tr>
              {cloums.map((c, i) => {
                return <th key={i}>{c}</th>;
              })}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.profile}</td>
                  <td>
                    <Link
                      to={`/update/${d.id}`}
                      className="btn btn-sm btn-success"
                    >
                      Update
                    </Link>
                    <button
                      onClick={(e) => handleSumbit(d.id)}
                      className="btn btn-sm ms-1 btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  function handleSumbit(id) {
    const conf = window.confirm("Do you want to delete");
    if (conf) {
      axios.delete("http://localhost:3030/users/" + id).then((res) => {
        // alert("Deleted Successfully");
        toast.success("Deleted Successfully");
        getalldata();
      });
    }
  }
}

export default App;

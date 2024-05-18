import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PiEyes } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { FcDeleteRow } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const formData = new FormData();
    formData.append('action', 'view');
    axios.post("http://localhost/php/index.php", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error occurred while reteriving data.");
        console.error("Error:", error);
      });
  }, []);

  const Delete = (id) => {
    alert('Delete ' + id);
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('id', id);
    axios.post("http://localhost/php/index.php", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data);
        // setData(response.data);
        setLoading(false);
        if (response.statusText === 'OK') {
          alert('Data Delete Successfully!....');
          window.location.reload();
        } else {
          alert("Data Not Deleted");
        }
      })
      .catch((error) => {
        alert("Error occurred while reteriving data.");
        console.error("Error:", error);
      });

  };

  const Edit = (id) => {
    alert('Edit ' + id);
    navigate(`/update/${id}`);
  };

  const View = (id) => {
    // alert('View ' + id);
    navigate(`/view/${id}`);
  };

  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive col-10 mx-auto">
          <div className="d-flex mt-4">
            <div className="col-7">
              <h2 className='float-end me-5' >View Data</h2>
            </div>
            <div className="col-5 float-end">
              <Link className='btn btn-primary float-end' to='/registration'style={{fontWeight:'bold'}} > Add </Link>
            </div>
          </div>
          <table className="table table-success table-hover table-striped">
            <thead>
              <tr className='text-center'>
                <th scope="col">Hall Ticket</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr className='text-center' key={item.hallticket}>
                  <td>{item.hallticket}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td> <PiEyes onClick={() => View(item.id)} /> &ensp; <FiEdit onClick={() => Edit(item.id)} /> &ensp; <FcDeleteRow onClick={() => Delete(item.id)} /> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;

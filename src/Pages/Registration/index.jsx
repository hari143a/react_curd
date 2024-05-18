import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom';
export default function Registration() {
  const [hallticket, setHallticket] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  function Handlesubmit() {
    if (!hallticket.trim()) {
      alert('please enter hallticket number');
    }
    else if (!name.trim()) {
      alert('please enter name');
    }
    else if (!email.trim()) {
      alert('please enter email');
    }
    else if (!phone.trim()) {
      alert('please enter your phone');
    }
    else {
      const formData = new FormData();
      formData.append('hallticket', hallticket);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('action', 'save');

      axios.post("http://localhost/php/index.php", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log(response);
          if (response.statusText === 'OK') {
            alert('Data Saved Successfully!....');
            navigate('../');
          } else {
            alert("Data Not Saved");
          }
        })
        .catch((error) => {
          alert("Error occurred while saving data.");
          console.error("Error:", error);
        });

    }
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Registration Form</h5>
                <div className="mb-3">
                  <label htmlFor="hallticket" className="form-label">Hall Ticket</label>
                  <input type="text" className="form-control" placeholder="Enter Hall Ticket" value={hallticket} onChange={(e) => { setHallticket(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="Enter Phone Number" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <button className="btn btn-primary" onClick={Handlesubmit} style={{fontWeight:'bold'}}>Submit</button>
                <Link to={'/'} className="btn btn-danger float-end" style={{fontWeight:'bold'}} > Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

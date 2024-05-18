import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams , Link } from 'react-router-dom';

export default function Update() {
    const [hallticket, setHallticket] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log('ID:', id);
        const formData = new FormData();
        formData.append('action', 'edit');
        formData.append('id', id);
        axios.post("http://localhost/php/index.php", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

            .then((response) => {
                // console.log(response.data[0]);
                setHallticket(response.data[0].hallticket);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setPhone(response.data[0].phone);
            })
            .catch((error) => {
                alert("Error occurred while retrieving data.");
                console.error("Error:", error);
            });
    }, [id]);

    const handleSubmit = (e) => {
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
          }else{
        e.preventDefault();
        alert('Data updated...!')
        const formData = new FormData();
        formData.append('hallticket', hallticket);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('action', 'update');
        formData.append('id', id);
        axios.post("http://localhost/php/index.php", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

            .then((response) => {
                console.log(response);
                if (response.statusText === 'OK') {
                    alert('Data Updated Successfully!....');
                    navigate('/');
                } else {
                    alert("Data Not Update");
                }
            })
            .catch((error) => {
                alert("Error occurred while update data.");
                console.error("Error:", error);
            });

        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Update Form</h5>
                            <form>
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
                                <button className="btn btn-primary" type="submit" onClick={handleSubmit} style={{fontWeight:'bold'}}>Submit</button>
                                <Link to={'/'} className="btn btn-danger float-end" style={{fontWeight:'bold'}}> Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

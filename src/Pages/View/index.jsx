import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';

export default function View() {
    const [data, setData] = useState([]);
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
                setData(response.data[0]);
            })
            .catch((error) => {
                alert("Error occurred while retrieving data.");
                console.error("Error:", error);
            });
    }, [id]);
    return (
        <>
            <div className="table-responsive-md mx-auto col-5 mt-4">
                <h2 className='text-center mb-3'>Detials of {data.name}</h2>
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th scope="col">Hallticket No</th>
                            <td>{data.hallticket}</td>
                        </tr> 
                        <tr>   
                            <th scope="col">Name</th>
                            <td>{data.name}</td>
                        </tr> 
                        <tr>
                            <th scope="col">Email</th>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <th scope="col">Phone Number</th>
                            <td>{data.phone}</td>
                        </tr>
                    </thead>
                </table>
                <div>
                    <Link to={'/'} className="btn btn-primary" style={{fontWeight:'bold'}}>Back</Link>
                </div>
            </div>
        </>
    )
}

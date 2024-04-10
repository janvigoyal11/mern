import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Signup() {

    const [credentials, setcred] = useState({ name: "", email: "", password: "", location: "" })

    // make a fetch API
    const handleSubmit = async (e) => {  // e is a parameter
        e.preventDefault();  // it is a synthetic event
        const resp = await fetch("http://localhost:5000/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // in bosy.stringify, we need to send the data(credentials) to the backend(mongo)
            // name:credentials.name here name(lhs wala) should be same as used in body in thunder client
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        });
        try {
            alert("Record Saved Successfully!!");
            const json = await resp.json();
            console.log(json);   // console log is not showing in inspect
            if (!json.success) {
                alert("Enter Valid Credentials!!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // so that we could change and store the values on our website    
    const onChange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}

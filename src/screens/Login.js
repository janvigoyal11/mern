import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  let navigate=useNavigate();
  const [credentials, setcred] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {  // e is a parameter
    e.preventDefault();  // it is a synthetic event
    
    const resp = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    
    try {
      if(resp.ok){
        const json = await resp.json()
        console.log(json);   // this is not showing in inspect

        if (!json.success) {
          alert("Enter Valid Credentials!!");
        }
        else{
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate('/');
        }
    } else{
      alert("Error occurred while processing the request.");
    }
    } catch (err) {
      console.log(err);
    }
  }

  const onChange = (e) => {
    setcred({ ...credentials, [e.target.name]: e.target.value })
  };

  return (
      <>
        <div className='container mt-4'>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
            </div>

            <button type="submit" className="m-3 btn btn-success">Log In</button>
            <Link to='/signup' className='m-3 btn btn-danger'>New User</Link>
          </form>
        </div>
      </>
  )
}


// some records

// gaurish02@gmail.com
// gauriibansal
// harshj2203@gmail.com
// harshj2203
// janvigoyal@gmail.com
// janvi2003
// arushigarg@gmail.com
// arushi07insts
// gaurishbansal@gmail.com
// gaurish02iitk
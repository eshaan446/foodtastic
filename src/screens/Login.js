import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //its a synthetic event (interview)
    //console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("https://foodtastic.onrender.com//api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    //console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)
      console.log(credentials.email); //storing this on Localstorage
      localStorage.setItem("authToken", json.authToken)
      //console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

  }

  const onChangefun = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
     <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChangefun} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChangefun} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success text-white">Login</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">I'm a new user</Link>
        </form>

      </div>
    </div>
    </>
  )
}

export default Login
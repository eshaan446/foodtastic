import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function Signup() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault(); //its a synthetic event (interview)
        const response = await fetch("http://localhost:5000//api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json();
        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        navigate('/login')
    }
    const onChangefun = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
                <div>
                    <Navbar />
                </div>

                <div className='container' >
                    <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                        <div className="m-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChangefun} aria-describedby="emailHelp" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="email" className="form-label">Email address:</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChangefun} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <fieldset>
                            <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChangefun} id="exampleInputPassword1" />
                            </fieldset>
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChangefun} name='password' />
                            <div id="emailHelp" className="form-text">Your password is end-to-end encrypted.</div>
                        </div>
                        <button type="submit" className="m-3 btn btn-success text-white">Sign-Up</button>
                        <Link to="/login" className="m-3 mx-1 btn btn-danger">I'm already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
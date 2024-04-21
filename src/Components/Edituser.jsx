// Note: Here, the validation() and postUserData() is not really required as we're updating few changes while other credentials are pre-filled by user and not kept blank.

import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { editUser, getUser } from '../Services/Api' // Import two functions which I create for edit
// For toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set initial values
const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: "",
    city: "",
    state: "",
    dob: ""
}



const Edituser = () => {

    const [user, setUser] = useState(initialValues) // Usestate for initial state
    const [error, setError] = useState({}) // Use state for validation
    const [loading, setLoading] = useState(false); // Use state for loading
    const navigate = useNavigate() // Use navigate for another page

    const { id } = useParams()// Create use params

    // Create validation function
    const validation = () => {
        let error = {}

        if (!user.name) {
            error.name = "Name is Required"
        }

        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }

        if (!user.phone) {
            error.phone = "Phone is Required";
        } else if (user.phone.length !== 10) {
            error.phone = "Phone number must be 10 characters";
        }


        if (!user.password) {
            error.password = "Password is Required"
        } else if (user.password.length < 8) {
            error.password = "Please Enter Valid password"
        }

        if (!user.city) {
            error.city = "City is Required"
        }

        if (!user.state) {
            error.state = "State is Required"
        }

        if (!user.dob) {
            error.dob = "Date of Birth is Required"
        }

        return error
    }

    // Make handle for changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        // In handle I set required field for all form field    
        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@Name is Required" })
                setUser({ ...user, name: "" })
            } else {
                setError({ ...error, name: "" })
                setUser({ ...user, name: value })
            }
        }

        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "@Email is Required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }

        if (name === "phone") {
            if (value.length === 0) {
                setError({ ...error, phone: "@Phone is Required" })
                setUser({ ...user, phone: "" })
            } else {
                setError({ ...error, phone: "" })
                setUser({ ...user, phone: value })
            }
        }

        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "@Password Line One is required" })
                setUser({ ...user, password: "" })
            } else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }

        if (name === "city") {
            if (value.length === 0) {
                setError({ ...error, city: "@City is Required" })
                setUser({ ...user, city: "" })
            } else {
                setError({ ...error, city: "" })
                setUser({ ...user, city: value })
            }
        }

        if (name === "state") {
            if (value.length === 0) {
                setError({ ...error, state: "@State is Required" })
                setUser({ ...user, state: "" })
            } else {
                setError({ ...error, state: "" })
                setUser({ ...user, state: value })
            }
        }

        if (name === "dob") {
            if (value.length === 0) {
                setError({ ...error, dob: "@Date of Birth is Required" })
                setUser({ ...user, dob: "" })
            } else {
                setError({ ...error, dob: "" })
                setUser({ ...user, dob: value })
            }
        }
    };

    const getData = async () => {
        let response = await getUser(id) // Call getUser()function for edit
        setUser(response?.data)
        console.log(response);

    }
    useEffect(() => {
        getData() // Call getData
    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        let ErrorList = validation()
        setError(validation())

       // Validation for Submit
        if (Object.keys(ErrorList).length === 0) {
            let reg = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.address,
                city: user.city,
                state: user.class,
                dob: user.dob
            }
            console.log(reg)

        }


    }
    
    // This function is make to click on edit button
    const handleOnClick = async () => {
        let ErrorList = validation()
        setError(validation())
        // This is make for use validation
        if (Object.keys(ErrorList).length === 0) {
            await editUser(user, id) // call editUser()function for edit 
                .then((response) => {
                    console.log(response);
                    toast.success("User edited successfully");

                    setTimeout(() => {
                        setLoading(false);
                        navigate('/showuser')
                    }, 2000);

                })
                .catch((error) => {
                    console.log(error);
                    toast.error("User is not edit");
                    setLoading(false);
                })
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

    }

    return (
        <>
            <ToastContainer style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)', alignItems: 'center', textAlign: 'center' }} />

            <section className="contact_section layout_padding" style={{ backgroundColor: '#f8f9fa', padding: '50px 0' }}>
                <div className="container">
                    <div className="heading_container text-center">
                        <h2 style={{ color: '#333' }}>Edit User</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleOnSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.name} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.email} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.phone} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.password} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="city"
                                        value={user.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.city} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="state"
                                        value={user.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.state} </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={user.dob}
                                        onChange={handleChange}
                                        placeholder="Date of birth"
                                        className="form-control"
                                        style={{ color: 'black', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px' }}
                                    />
                                    <span style={{ color: 'red', marginLeft: '24px', display: 'block' }}> {error.dob} </span>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleOnClick} style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff', borderRadius: '5px', padding: '10px 20px', marginTop: '10px' }}>
                                    {loading ?
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        'Submit'}
                                </button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="map_container">
                                <div className="map">
                                    <div id="googleMap" style={{ width: '100%', height: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Edituser

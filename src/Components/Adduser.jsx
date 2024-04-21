import React from 'react'
import { useState } from 'react'
import { addUser } from '../Services/Api' // Import addUser function 
import { useNavigate } from 'react-router-dom' // useNavigate for Navigation
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

const Adduser = () => {

    const [user, setUser] = useState(initialValues) // Make usestate for initialValues
    const [error, setError] = useState({}) // Make usestate for error message 
    const [loading, setLoading] = useState(false); // Use state for Loading
    const navigate = useNavigate() // Make navigate to another page.

    // Create a Validation function which is to make validation on form field
    const validation = () => {

        let error = {} // I take error a blank object 

        // If name is not present
        if (!user.name) {
            error.name = "Name is Required"
        } else if (user.name.length < 3) {
            error.name = "Name must be atleast 3 characters"
        }

        // If email is not present
        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }

        // If phone is not present
        if (!user.phone) {
            error.phone = "Phone is Required";
        } else if (user.phone.length !== 10) {
            error.phone = "Phone number must be 10 characters";
        }


        // For password
        if (!user.password) {
            error.password = "Password is Required"
        } else if (user.password.length < 8) {
            error.password = "You must be entered a strong password"
        }

        // If phone is not present 
        if (!user.city) {
            error.city = "City is Required"
        }

        // If state is not present 
        if (!user.state) {
            error.state = "State is Required"
        }

        // If Date of birth is not present 
        if (!user.dob) {
            error.dob = "Date of Birth is Required"
        }

        return error
    }

    // Make handle for changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        // In handle I set required field for all form field with name attribute   
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

    // Make handle for submit
    const handleSubmit = async (e) => {

        e.preventDefault(); // For to stop reloading the page

        setLoading(true) // After clicking submit button Loading will be start

        let ErrorList = validation() // Call validation function in ErrorList variable 
        setError(validation())

        // Validiation for Submit
        if (Object.keys(ErrorList).length === 0) {
            await addUser(user) // call addUser function

            .then((response) =>{
                console.log(response);
                setLoading(false) // Loading will be stop after loading data
                toast.success("User added successfully")
                setTimeout(() => {
                    navigate('/showuser')
                }, 2000);
            })
            .catch((error) =>{
                console.log(error);
                setLoading(false) // Loading will be stop after not loading data
                toast.error("User is not added")
            })
           

        } else {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }

    };


    return (
        <>
            <ToastContainer style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)', alignItems: 'center', textAlign: 'center' }} />

            <section className="contact_section layout_padding" style={{ backgroundColor: '#f8f9fa', padding: '50px 0' }}>
                <div className="container">
                    <div className="heading_container text-center">
                        <h2 style={{ color: '#333' }}>Registration</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.name} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.email} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.phone} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.password} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.city} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.state} </span>
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
                                    <span style={{ color: 'red', display: 'block' }}> {error.dob} </span>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff', borderRadius: '5px', padding: '10px 20px', marginTop: '10px' }}>
                                    {loading ?
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        'Submit'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Adduser

import React, { useEffect, useState } from 'react'
import { getUsers } from '../Services/Api'; // Import getUsers() function 
import { Link } from 'react-router-dom'; // For Link
import { deleteUser } from '../Services/Api'; // Function for delete



const Showuser = () => {
    const [user, setuser] = useState([]);



    const getdata = async () => {
        const response = await getUsers() // Call getUsers()
        setuser(response.data)
    }

    useEffect(() => {
        getdata() // Call getdata()function
    }, [])


    // Create a function for delete
    const deleteUserData = async (id) => {
        const response = await deleteUser(id)
        console.log("My Delete Response is...",response);
        getdata();
    }


    console.log('hd', user);
    return (
        <>
            <div className="container-fluid mt-5">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>City</th>
                            <th>State</th>
                            <th>DOB</th>
                            <th>Edit</th>
                            <th>Delete</th>


                        </tr>
                    </thead>

                    {user?.slice(0, user.length).reverse().map((value) => {
                        return (
                            <>
                                <tbody key={value.id}>


                                    <tr>

                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.password}</td>
                                        <td>{value.city}</td>
                                        <td>{value.state}</td>
                                        <td>{value.dob}</td>
                                        <td><Link to={`/edituser/${value.id}`}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                                        <td><button type="button" class="btn btn-danger" onClick={() => deleteUserData(value.id)}>Delete</button></td>
                                    </tr>

                                </tbody>
                            </>
                        )
                    })}



                </table>

            </div>
        </>
    )
}

export default Showuser

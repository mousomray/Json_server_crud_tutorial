import axios from "axios"
import { toast } from "react-toastify";


// Store URL here 
const API_URL = 'http://127.0.0.1:3003/users'

// Add user on JSON Server
export const addUser = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        console.log("Fetching Add User Data", response);
        toast.success("User Added Successfully")
        return response
    } catch (error) {
        console.log('Error while calling addUser API', error.message)
        toast.error("User Added Not Possiable")
    }
}

// All Users List
export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL)
        console.log("Fetching user list data...", response);
        return response
    }
    catch (error) {
        console.log('Error while calling getUsers API', error.message)
    }
}

// Single User Data
export const detailsuser = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/${data}`)
        console.log("Fetching Single Data", response);
        return response
    }
    catch (error) {
        console.log('Error while calling getUser API', error.message)
    }
}

// Edit User
export const editUser = async (data, id) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        console.log("Fetching Edit Data...", response);
        toast.success("User Edit Successfully")
        return response
    }
    catch (error) {
        console.log('Error while calling editUser API', error.message)
        toast.error("User Edit Not Possiable")
    }
}

// Delete Data
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        console.log('Fetching Delete Data...', response)
        toast.warning("User Deleted Successfully")
        return response
    }
    catch (error) {
        console.log('Error while calling deleteUser API', error.message)
    }
}
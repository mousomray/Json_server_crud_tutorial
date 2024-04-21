import axios from "axios"

// Data is fetch in one time 
const API_URL = 'http://127.0.0.1:3003/users'

// For Add Data in Get API using Post API. (Use this function in Adduser.jsx file);
export const addUser = async (data) => {
    try {
        return await axios.post(API_URL, data)
    }
    catch (error) {
        console.log('Error while calling addUser API', error.message)
    }
}

// For show Data in get API. (Use this function in Showuser.jsx file)
export const getUsers = async () => {
    try {
        return await axios.get(API_URL)
    }
    catch (error) {
        console.log('Error while calling getUsers API', error.message)
    }
}

// This is make for edit data
export const getUser = async (data) => {
    try {
        return await axios.get(`${API_URL}/${data}`)
    }
    catch (error) {
        console.log('Error while calling getUser API', error.message)
    }
}

// this is also a part of edit data
export const editUser = async (data, id) => {
    try {
        return await axios.put(`${API_URL}/${id}`, data)
    }
    catch (error) {
        console.log('Error while calling editUser API', error.message)
    }
}

// This is make for delete data from table.
export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${API_URL}/${id}`)
    }
    catch (error) {
        console.log('Error while calling deleteUser API', error.message)
    }
}
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import User from './components/user';

const App = () => {

  const [formData, setformData] = useState({
    name:'',
    password:'',
    confirmpassword:'',
    email:''
  })

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmpassword, setConfirmpassword] = useState('')
  const [error, setError] = useState('')

  const [users, setUsers] = useState([])

  const handleChanges = (e)=>{
    const {name,value} = e.target
    setformData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()


    if (formData.password.length < 8) {
      setError("Password must be 8 characters long")
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      setError("Password must be same")
      return;
    }
    if (!/[!@#$%^&*()<>,.']/.test(formData.password)) {
      setError("Password must contain special character")
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain Capital letter")
      return;
    }

    setUsers((prevUsers)=>[
      ...prevUsers,{
        name:formData.name,
        email:formData.email,
        password:formData.password,
        confirmpassword:formData.confirmpassword
      }
    ])
    setError('')
    setformData({
      name:'',
      email:'',
      password:'',
      confirmpassword:''
    })

    toast.success('Login Successful !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  }
  return (
    <>
      <div className="container">
        <div className="box">
          <h2>Create an Account</h2>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChanges}></input>
            <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChanges}></input>
            <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChanges}></input>
            <input type='password' name='confirmpassword' placeholder='confirm Password' value={formData.confirmpassword} onChange={handleChanges}></input>

            {error && (
              <p>{error}</p>
            )}

            <button>Submit</button>
          </form>
          {users.map(function(elem,idx){
            return <User key={idx} elem={elem}/>
          })}
        </div>
        <ToastContainer>

          </ToastContainer>
      </div>
    </>
  )
}

export default App
import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import SignIn from './SignUp';
import axios from 'axios';

const Login = ({setUser}) => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const initialLogin = {
    email: '',
    password: '',
    role: 'employee'
  }

  const [loginData, setLoginData] = useState(initialLogin)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (loginData.role === 'admin') {
      try {
        const res = await axios.post('http://localhost:5000/api/admin/login', loginData);
        console.log(res.data)
        alert('login successfully')
        setLoginData(initialLogin)
        navigate ("/")
      } catch (error) {
        console.error(error);
      }
    }
    if (loginData.role === 'employee') {
      try {
        const res = await axios.post('http://localhost:5000/api/employee/login', loginData);
        console.log(res.data)
        alert('login successfully')
        setLoginData(initialLogin)
        navigate ("/")
        setUser(res.data)
      } catch (error) {
        
        console.error(error);
      }
    }
    if (loginData.role === 'superAdmin') {
      try {
        const res = await axios.post('http://localhost:5000/api/superAdmin/login', loginData);
        console.log(res.data)
        alert('login successfully')
        setLoginData(initialLogin)
        navigate ("/")
      } catch (error) {
        console.error(error);
      }
    }

    


    // handleLogin(handleLogin.email, handleLogin.password)


    // setEmail("")
    // setPassword("")
  }
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value });

  }


  return (
    <div className='p-8 w-[424px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white shadow-[0px_8px_40px_0px_#0000001F]'>

      <h1 className='text-center txt-color font-semibold leading-8 text-[20px]'>Sign in to your account</h1>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>

        <div className='mt-5'>
          <p className='text-sm leading-5 txt-color '>Email Address</p>
          <input
            type='email'
            name='email'
            onChange={onChangeHandler}
            required
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2  h-11 '
            value={loginData.email}
          />
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between'>

            <p className='text-sm leading-5 txt-color'>Password</p>
            <p className='font-medium text-sm  text-[#2DA5F3] leading-5 '>Forgot Password</p>
          </div>
          <input
            name='password'
            type="password"
            value={loginData.password}
            onChange={onChangeHandler}


            required
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2  h-11 '

          />
        </div>
        <div className='mt-4'>
          <p className='text-sm leading-5 txt-color'>Role</p>
          <select
            name='role'
            value={loginData.role}
            onChange={onChangeHandler}
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2 h-11'
            required
          >
            <option value='employee'>Employee</option>
            <option value='admin'>Admin</option>
            <option value='superAdmin'>SuperAdmin</option>
          </select>
        </div>


        <button className='bg-[#FA8232] mt-4 h-12 w-full flex items-center justify-center font-bold text-sm leading-8 gap-2  '>
          LOGIN
          <ArrowRight className='text-white' />

        </button>
      </form>
      <div className='flex justify-center items-center flex-col mt-6'>
        <button
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">Sign in with Google</span>
        </button>

        <p onClick={() => {
          navigate('/register')
        }}
          className='uppercase font-bold text-sm leading-8 text-[#FA8232] tracking-[1.2%] mt-3 '>Create account</p>

      </div>

    </div>
  )
}

export default Login
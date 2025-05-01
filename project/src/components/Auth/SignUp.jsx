import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SignUp = () => {
  const initialSignUp = {
    name: '',
    email: '',
    password: '',
    role: 'employee'
  };

  const [signUp, setSignUp] = useState(initialSignUp);
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    console.log(signUp.role);
    if(signUp.role === 'admin' ) {
      try {
        const res = await axios.post('http://localhost:5000/api/admin/register', signUp);
        console.log(res.data);
        alert('Account created successfully');
        setSignUp(initialSignUp);
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('Error creating account');
      }
    }
    if(signUp.role === 'employee') {
      try {
        const res = await axios.post('http://localhost:5000/api/employee/register', signUp);
        console.log(res.data);
        alert('Account created successfully');
        setSignUp(initialSignUp);
        // navigate('/');
      } catch (error) {
        console.error(error);
        alert('Error creating account');
      }
    }
    
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  return (
    <div className='p-8 w-[424px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0px_8px_40px_0px_#0000001F]'>
      <h1 className='text-center txt-color font-semibold leading-8 text-[20px]'>
        Create an account
      </h1>
      <form onSubmit={handleCreateAccount}>
        <div className='mt-5'>
          <p className='text-sm leading-5 txt-color'>Name</p>
          <input
            type='text'
            name='name'
            required
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2 h-11'
            onChange={onChangeHandler}
            value={signUp.name}
          />
        </div>

        <div className='mt-5'>
          <p className='text-sm leading-5 txt-color'>Email Address</p>
          <input
            type='email'
            name='email'
            required
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2 h-11'
            onChange={onChangeHandler}
            value={signUp.email}
          />
        </div>

        <div className='mt-4'>
          <p className='text-sm leading-5 txt-color'>Password</p>
          <input
            type='password'
            name='password'
            required
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2 h-11'
            onChange={onChangeHandler}
            value={signUp.password}
          />
        </div>
        <div className='mt-4'>
          <p className='text-sm leading-5 txt-color'>Role</p>
          <select
            name='role'
            value={signUp.role}
            onChange={onChangeHandler}
            className='outline-none txt-color w-full border border-[#E4E7E9] rounded-[2px] mt-2 h-11'
            required
          >
            <option value='employee'>Employee</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <button
          type='submit'
          className='bg-[#FA8232] text-gray-900 mt-4 h-12 w-full flex items-center justify-center font-bold text-sm leading-8 gap-2'
        >
          SIGNUP
          <ArrowRight />
        </button>
      </form>

      <div className='text-center mt-6'>
        <p
          onClick={() => navigate('/')}
          className='text-sm leading-5 text-[#77878F] cursor-pointer'
        >
          I already have an account
        </p>
      </div>
    </div>
  );
};

export default SignUp;

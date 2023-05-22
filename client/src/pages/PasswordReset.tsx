import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);

  const setVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendLink = async () => {
    if (email === '') {
      toast.error('Email is required!', {
        position: 'top-center',
      });
    } else if (!email.includes('@')) {
      toast.warning('Include @ in your email!', {
        position: 'top-center',
      });
    } else {
      try {
        const res = await fetch("http://localhost:7890/faculty/sendpasswordlink", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.status === 201) {
          setEmail('');
          setMessage(true);
        } else {
          toast.error('Invalid User', {
            position: 'top-center',
          });
        }
      } catch (error) {
        toast.error('An error occurred', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-center items-center h-screen gr-bg">
          <div className="form_heading">
            <h5 className="text-xl font-semibold text-white py-8">Enter Your Email</h5>

            {message ? (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                Password reset link sent successfully to your email
              </p>
            ) : null}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="email" className="block text-gray-200 font-bold mb-2" style={{ marginRight: '10px' }}>
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={setVal}
                required
                className="shadow bg-transparent  border rounded w-full py-1 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="submit"
                style={{ marginRight: '5px' }}
                className="bg-blue-500 rounded-full hover:bg-blue-700 text-white py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
                onClick={sendLink}
              >
                Send
              </button>
              <span className="text-white  block cursor-pointer">
                <Link to={'/'} className="text-sky-600 underline">
                  {' '}
                  Go back
                </Link>
              </span>
            </div>
          </div>

          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default PasswordReset;

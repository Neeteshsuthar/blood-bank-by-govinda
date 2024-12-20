import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Mycontext from "../context/Mycontext";

const SignIn = () => {
  const { SignInfirebase } = useContext(Mycontext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const SiginFire = () => {
    SignInfirebase(email, password);
   
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-200 via-white to-red-300 relative">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="absolute inset-0 bg-red-600 opacity-10 blur-3xl transform scale-150 rounded-full animate-pulse"></div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          Welcome 
        </h2>
        <center>
          <img
            className="w-24 h-24 object-contain rounded-full shadow-lg animate-spin-slow"
            src="https://www.shutterstock.com/image-vector/blood-bag-donated-cute-cartoon-600nw-2293990295.jpg"
            alt="Login"
          />
        </center>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium" htmlFor="email" >
              Email
            </label>
            <input type="email" id="email" className="w-full px-4 py-2 mt-2 border border-gray-300  rounded-lgfocus:ring-red-500 focus:border-red-500 transition-all"placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium" htmlFor="password" >
              Password
            </label>
            <input type="password" id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"placeholder="Enter your password"  value={password} onChange={(e) => setPassword(e.target.value)}  />
          </div>
          <div>
            <button   type="button"  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transform transition-transform hover:scale-105"  onClick={SiginFire} >
              Sign In
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?
            <Link to="/Signup" className="text-red-500 hover:underline">
              Register first
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

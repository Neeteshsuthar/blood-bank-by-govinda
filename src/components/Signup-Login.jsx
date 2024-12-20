import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Mycontext from "../context/Mycontext";

function Signup() {
  const { SignupFirebase } = useContext(Mycontext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doners, SetDoner] = useState("");
  const [Age, Setage] = useState("");
  const [contact, Setcontact] = useState("");
  const [city,setCity]=useState('')
  const [url,seturl]=useState('')


  const SignupButton = () => {
    SignupFirebase(name, email, password, doners,Age,contact,city,url);

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-200 via-white to-red-300 relative">
      <Helmet>
        <title>Signup</title>
      </Helmet>

      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-red-600 opacity-10 blur-3xl transform scale-150 rounded-full animate-pulse"></div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
        {/* Header */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          Sign Up
        </h2>
        <center>
          <img
            className="w-24 h-24 object-contain rounded-full shadow-lg animate-bounce"
            src="https://thumbs.dreamstime.com/b/composite-image-blood-donation-against-thumbs-up-55533527.jpg"
            alt="Blood Donation"
          />
        </center>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Name Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="name"
            >
              Cityname:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter your city name "
              value={city}
              onChange={(e) => setCity(e.target.value.toLowerCase())}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="name"
            >
              Age:
            </label>
            <input
              type="number"
              id="number"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Age"
              value={Age}
              onChange={(e) => Setage(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="name"
            >
              Contact No:
            </label>
            <input
              type="number"
              id="number"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter Number"
              value={contact}
              onChange={(e) => Setcontact(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="name"
            >
              Url:
            </label>
            <input
              type="url"
              id="url"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter your name"
              value={url}
              onChange={(e) => seturl(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password" 
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="role"
            >
              Who Are You?
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-all"
              value={doners}
              onChange={(e) => SetDoner(e.target.value)}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Donor">Become A Donor</option>
              <option value="Receiver">Find Donor</option>
            </select>
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transform transition-transform hover:scale-105"
              onClick={SignupButton}
            >
              Sign Up
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;


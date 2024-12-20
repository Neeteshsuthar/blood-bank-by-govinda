import React from "react";
import '../styles/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../init-firebase";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import DonersData from "./done's";


const NavbaR = () => {
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        title: "Do you want to Logout?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes ",
        denyButtonText: `Cancel `,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          navigate('/login'); // Make sure this is inside the .then block after the alert
        } else if (result.isDenied) {
          Swal.fire("As Your Wish", "");
        }
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-red-600 shadow-lg">
      <div className="container mx-auto px-4">
     
        <div className="flex justify-between items-center py-4">
          <div className="text-white text-2xl font-bold">
            <Link to="/home">Blood Bank</Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/home" className="text-white hover:text-gray-300 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doner" className="text-white hover:text-gray-300 transition duration-200">
                  Doners
                </Link>
              </li>
              <button className="text-white hover:text-gray-300 transition duration-200" onClick={LogOut}>Logout</button>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300 transition duration-200">
                  Profile
                </Link>
              </li>
              <li>
                
                <Link to="/contact" className="text-white hover:text-gray-300 transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbaR;

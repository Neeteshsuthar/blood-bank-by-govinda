import React, { useState, useEffect } from "react";
import unknownImage from '../WhatsApp Image 2024-12-18 at 10.43.19 PM.jpeg';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint, FaEdit } from "react-icons/fa";
import { auth, db } from "../init-firebase";
import NavbaR from "./navbar";
import Footer from "./Footer";

function DonorProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const currentUser = auth.currentUser;
              if (currentUser) {
                  const docRef = doc(db, "SinupUser", currentUser.uid);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                      setUserData(docSnap.data());
                  } else {
                      setError("No user data found.");
                  }
              } else {
                  setError("User not logged in.");
              }
          } catch (err) {
              console.error("Error fetching data:", err);
              setError("Failed to fetch user data.");
          } finally {
              setLoading(false);
          }
      };

      fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
      e.preventDefault();
      if (!userData) return;

      try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
              setError("User not logged in.");
              return;
          }

          const docRef = doc(db, "SinupUser", currentUser.uid);
          await updateDoc(docRef, { ...userData });
          setShowModal(false);
          alert("Profile updated successfully!");
      } catch (err) {
          console.error("Error updating profile:", err);
          setError("Failed to update profile.");
      }
  };

  return (
      <>
          <NavbaR />        

          <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8">
            <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl">
                <h2 className="text-4xl font-extrabold text-red-600 text-center mb-6">
                    Donor Profile
                </h2>
                <p className="text-gray-600 text-center text-sm mb-8">
                    * Required Information
                </p>

                {loading ? (
                    <p className="text-center text-gray-500">Loading user data...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    userData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-36 h-36 border-4 border-gray-300 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={userData.url || unknownImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                                    Profile Picture
                                </h3>
                            </div>

                            {/* User Details */}
                            <div className="grid grid-cols-2 gap-6">
                                {[{
                                    label: "Name", value: userData.Name, icon: <FaUser className="text-red-500 text-xl" />
                                  }, 
                                  {
                                    label: "Age", value: userData.age, icon: <FaTint className="text-red-500 text-xl" />
                                  }, 
                                  {
                                    label: "Phone", value: userData.mobilt, icon: <FaPhone className="text-red-500 text-xl" />
                                  }, 
                                  {
                                    label: "Email", value: userData.UserEmail, icon: <FaEnvelope className="text-red-500 text-xl" />
                                  }, 
                                  {
                                    label: "Status", value: userData.Who, icon: <FaTint className="text-red-500 text-xl" />
                                  }, 
                                  {
                                    label: "City", value: userData.city, icon: <FaMapMarkerAlt className="text-red-500 text-xl" />
                                  }].map((field, idx) => (
                                    <div key={idx} className="flex items-center space-x-4">
                                        {field.icon}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                                {field.label} *
                                            </label>
                                            <h2 className="text-gray-800 font-medium">
                                                {field.value || "Not Provided"}
                                            </h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}

                {/* Edit Profile Button */}
                <div className="mt-8">
                    <button
                        type="button"
                        className="flex justify-center items-center gap-4 w-full bg-red-500 text-white text-lg py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                        onClick={() => setShowModal(true)}
                    >
                        <FaEdit style={{ marginTop: "-0.23rem", fontSize: "1.4rem" }} />
                        Edit Profile
                    </button>
                </div>
            </div>
          </div>

          {showModal && (
            <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
                        onClick={() => setShowModal(false)}
                    >
                        &times;
                    </button>

                    <h2 className="text-3xl font-bold text-red-600 mb-6">Edit Profile</h2>
                    <p className="text-gray-600 text-center text-sm mb-8">
                        Update your personal information
                    </p>

                    {/* Form Content Goes Here */}
                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.Name || ""}
                                    onChange={(e) => setUserData({ ...userData, Name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.UserEmail || ""}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="number"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.mobilt || ""}
                                    onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.age || ""}
                                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                <input
                                    type="text"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.Who || ""}
                                    onChange={(e) => setUserData({ ...userData, status: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                    value={userData?.city || ""}
                                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white text-lg py-3 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
          )}

          <Footer />
      </>
  );
}

export default DonorProfile;

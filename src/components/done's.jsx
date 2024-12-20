import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../init-firebase";
import Swal from "sweetalert2";
import "../styles/home.css";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import NavbaR from "./navbar";

const DonersData = () => {
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);

  const DonerBtn = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !city) {
      Swal.fire("Please add both city and blood group");
      return;
    }
  
    try {
      const searchDonors = [];
  
      // Adjust field names if necessary
      if (bloodGroup) {
        searchDonors.push(where("DonerBloodGroup", "==", bloodGroup));  // Ensure field name matches Firestore structure
      }
      if (city) {
        searchDonors.push(where("CityName", "==", city));  // Ensure field name matches Firestore structure
      }
  
      // Prepare the query
      const donorQuery = query(collection(db, "BloodDonors"), ...searchDonors);
  
      const querySnapshot = await getDocs(donorQuery);
  
      const matchedDonors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        DonerName: doc.data().Name,  // Ensure this matches the field in Firestore
        DonerBloodGroup: doc.data().DonerBloodGroup,  // Ensure this matches the field in Firestore
        CityName: doc.data().CityName,  // Ensure this matches the field in Firestore
        ContactNo: doc.data().ContactNo,  // Ensure this matches the field in Firestore
        Age: doc.data().Age,
        allData: doc.data(),
      }));
  
      if (matchedDonors.length === 0) {
        Swal.fire("No donors found for the selected blood group and city.");
      } else {
        setDonors(matchedDonors);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      Swal.fire("Error", "Firebase Error", "error");
    }
  };
  
  

  return (
    <div className="contact-us-container">
      <Helmet>
        <title>Donor</title>
      </Helmet>
      <NavbaR/>
      <h2 className="text-2xl font-bold mb-4 text-center">Find Blood Donors</h2>
      <form onSubmit={DonerBtn} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value.toLowerCase())}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Blood Group</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            placeholder="Enter blood group (e.g., A+, O-)"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
        >
          Find Donor
        </button>
      </form>

      <div className="mt-6 max-w-screen-xl mx-auto">
        {donors && donors.length > 0 ? (
          <div>
            <h3 className="text-lg font-bold mb-6 text-center text-red-600">
              Matching Donors
            </h3>
            <div className="grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {donors.map((donor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {donor.DonerName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Blood Group:</strong> {donor.DonerBloodGroup}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Donor Name:</strong> {donor.DonerName}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>City:</strong> {donor.CityName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Contact:</strong> {donor.ContactNo}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <Footer/>
    </div>
  );
};

export default DonersData;

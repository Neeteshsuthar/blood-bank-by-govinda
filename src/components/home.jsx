import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, addDoc, query, where, setDoc } from "firebase/firestore";
import { auth, db } from "../init-firebase";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Footer from './Footer';
import NavbaR from "./navbar";
import '../styles/bloodsec.css';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [bloodGroup, setBloodGroup] = useState("A+");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Swal.fire('Please Login First before you')
          
        }

        if (user) {
          const userDoc = doc(db, 'SinupUser', user.uid);
          const userData = await getDoc(userDoc);

          if (userData.exists()) {
            console.log(userData.data()); // Log user data to check its structure
            setCurrentUser({ uid: user.uid, ...userData.data() });
          } else {
            Swal.fire('User data not found.');
          }
        } else {
          Swal.fire('No user is currently logged in.');
        }
      } catch (error) {
        Swal.fire('Error fetching user data.');
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchCurrentUser();
  }, []);

  const testimonials = [
    {
      name: 'Virat Kolhi',
      text: 'I received blood during my surgery, and I am alive today because of the generosity of donors. Thank you!',
      location: 'India, Bangalore ',
    },
    {
      name: 'Odean Smith',
      text: 'I was in a car accident and needed blood urgently. Thanks to the blood bank, I made a full recovery.',
      location: 'London, UK',
    },
    {
      name: 'Elvish ',
      text: 'Donating blood saved my friend’s life. It’s a small act that makes a big difference.',
      location: 'India',
    },
  ];

  console.log(currentUser)

  const DonateButton = async () => {
    if (!currentUser) {
      Swal.fire("Please log in to donate blood.");
      return;
    }
  
    try {
      const docRef = doc(db, "BloodDonors", currentUser.uid); // Use the user ID or another unique ID
      const docSnap=await getDoc(docRef)
      if (docSnap.exists()) {
        Swal.fire('you have already donated blood ',"please signup again to donate.")
        return;
        
      }
      await setDoc(docRef, {
        DonerBloodGroup: bloodGroup || "A+",  // Make sure the field name is DonerBloodGroup
        Email: currentUser?.UserEmail,
        DonationDate: new Date(),
        Name: currentUser?.Name,
        Age: currentUser?.age,
        CityName: currentUser?.city,  // Ensure this is CityName (used in the search query)
        Status: currentUser?.Who,
        ContactNo: currentUser?.mobilt, // Make sure the field name is ContactNo
      });
  
      Swal.fire("Blood donated successfully!");
      setBloodGroup("A+"); // Reset the blood group state after donation
    } catch (error) {
      console.error("Error donating blood:", error.message);
      Swal.fire("An error occurred while donating blood. Please try again.");
    }

  };
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while fetching user data
  }

  return (
    <div>
      <NavbaR />
      <div className="homepage">
        <Helmet>
          <title>HomePage</title>
        </Helmet>
        <section id="BB">
          <h1 className="title">Donate Blood</h1>
          <div className="form-container">
            <select
              name="bloodGroup"
              className="hover:p-6 transition-all duration-500 bg-transparent outline-none cursor-pointer p-4 shadow-lg text-gray-500 rounded-lg mb-4"
              style={{ border: '1px solid gray' }}
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option className="bg-red-100 text-gray-400" value="A+">A+</option>
              <option className="bg-red-100 text-gray-400" value="A-">A-</option>
              <option className="bg-red-100 text-gray-400" value="B+">B+</option>
              <option className="bg-red-100 text-gray-400" value="B-">B-</option>
              <option className="bg-red-100 text-gray-400" value="AB+">AB+</option>
              <option className="bg-red-100 text-gray-400" value="AB-">AB-</option>
              <option className="bg-red-100 text-gray-400" value="O+">O+</option>
              <option className="bg-red-100 text-gray-400" value="O-">O-</option>
            </select>

            <div className="button-group">
              <button onClick={DonateButton} className="btn donate-btn">
                Donate Blood
              </button>
            </div>
          </div>
        </section>

        <section className="bg-red-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center text-red-600 mb-6">Why Donate Blood?</h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              Donating blood is one of the most selfless acts a person can do. Every donation helps save lives. It's quick, easy, and safe, and it can make a huge difference for someone in need.
            </p>
            <div className="flex justify-center gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                <h3 className="text-2xl text-red-600 font-semibold mb-4">Save Lives</h3>
                <p className="text-gray-600">Your donation can help someone in a life-threatening situation such as a car accident or surgery.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                <h3 className="text-2xl text-red-600 font-semibold mb-4">Easy Process</h3>
                <p className="text-gray-600">Blood donation is a simple process that only takes around 30 minutes, but the impact lasts a lifetime.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                <h3 className="text-2xl text-red-600 font-semibold mb-4">Help Your Community</h3>
                <p className="text-gray-600">Be a hero to someone in need. Blood donation is a community effort to help save lives.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center text-red-600 mb-6">Become a Blood Donor</h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Every donation counts! Become a regular blood donor and help save lives. By donating blood, you are giving the gift of life to people in need.
            </p>
            <div className="text-center">
              <a href="#BB">
                <button className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-red-700 transition">
                  to Donate
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-red-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center text-red-600 mb-6">What People Are Saying</h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Read how blood donation has made a difference in the lives of many people.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                  <h3 className="text-xl font-semibold text-red-600">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import NavbaR from './navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const contacts = [
    {
      id: 1,
      image: 'https://t4.ftcdn.net/jpg/02/21/47/99/360_F_221479946_2yUmWRmVPBka6d4zcXbBhJbRra8WcpQV.jpg',
      title: 'Donate Blood, Save Lives',
      description: 'Reach out to us to become a donor. Your contribution can save multiple lives!',
      phone: '+92 03262113526',
      email: 'Blooddoner@gmail.com',
    },
    {
      id: 2,
      image: 'https://api.time.com/wp-content/uploads/2023/04/imran-khan-8.jpg?quality=85&w=1789',
      title: 'Need Blood Urgently?',
      description: 'Contact us if you are in need of blood. We are here to assist you 24/7.',
      phone: '+987 654 3210',
      email: 'help@bloodbank.com',
    },
    {
      id: 3,
      image: 'https://img.freepik.com/premium-photo/blood-donor-donation-world-blood-donor-day-transfusion-blood-donation_419829-177.jpg',
      title: 'Join Our Blood Drive',
      description: 'Partner with us to organize blood donation camps in your area.',
      phone: '+456 789 0123',
      email: 'partner@bloodbank.com',
    },
  ];

  return (
    <div> <NavbaR/>
    <Helmet><title>Contact </title></Helmet>
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300 py-12 px-4">
     
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={contact.image}
              alt={contact.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                {contact.title}
              </h2>
              <p className="text-gray-700 mb-4">{contact.description}</p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {contact.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;

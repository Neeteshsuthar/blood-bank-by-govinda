import React from "react"
import '../styles/footer.css'
import '../styles/googlefont.css'
const Footer=()=>{
  return(
    
<footer className="footer bg-red-600 text-white py-6">
  <div className="footer-container mx-auto px-6 max-w-screen-xl">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-lg font-bold mb-2">About Blood Bank</h3>
        <p className="text-sm">
          We are committed to saving lives by connecting donors and recipients.
          Our platform ensures safe, easy, and effective blood donations.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Quick Links</h3>
        <ul className="text-sm space-y-1">
          <li> <a href="/home" className="hover:underline"> Donate Blood </a>
          </li>
          <li> <a href="/doner" className="hover:underline"> Find Blood </a>
          </li>
          <li> <a href="/contact" className="hover:underline">  Contact Us</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Resources</h3>
        <ul className="text-sm space-y-1">
          <li>
            <a href="https://www.who.int/health-topics/blood-transfusion" target="_blank" rel="noopener noreferrer" className="hover:underline"></a>
          </li>
          <li>
            <a href="https://www.redcrossblood.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Red Cross Blood Services
            </a>
          </li>
          <li>
            <a href="https://www.nhsbt.nhs.uk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              NHS Blood and Transplant
            </a>
          </li>
        </ul>
      </div>
    </div>

    
    <div className="text-center mt-6 border-t border-gray-400 pt-4">
      <p>&copy; {new Date().getFullYear()} Blood Bank | All Rights Reserved</p>
      <p className="text-xs mt-2">
      <div>
      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'italic', fontWeight: 700 }}>
        Designed By:
      </h2><br/>

     
<p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3rem' }}>
        Govind Kumar
      </p>
    </div>
     
      </p>
    </div>
  </div>
</footer>

  )
}

export default Footer
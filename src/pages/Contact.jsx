import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import backgroundImage from "../assets/bg.jpg"; 

const Contact = () => {
  return (
    <div
      className="min-h-[50vh] bg-cover bg-center flex items-center justify-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})`, marginBottom:"60px" }}
    >
      <div className="max-w-4xl w-full rounded-xl shadow-2xl p-8 backdrop-blur-sm bg-white border border-white/20">
        {/* Contact Info */}
        <div className="space-y-8 text-black">
          <div className="flex items-center space-x-4">
            <span className="text-green-400 text-2xl">
              <FaPhoneAlt />
            </span>
            <p>+91 8564239712</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-blue-400 text-2xl">
              <MdEmail />
            </span>
            <p>grillandchill@gmail.com</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-red-400 text-2xl">
              <FaLocationDot />
            </span>
            <p>Switzerland</p>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2797464.865633528!2d5.583951367622386!3d46.78658893748417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1742496159733!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

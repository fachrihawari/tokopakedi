import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-500">About Our Company</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Career</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Policies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-500">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">How to Shop</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Shipping & Delivery</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Partnerships</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-500">Sell on Our Platform</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Affiliate Program</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-500">Advertise with Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-500"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-green-500"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-green-500"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-green-500"><FaYoutube size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8">
          <p className="text-center text-gray-500">© 2024 TokoPakEdi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

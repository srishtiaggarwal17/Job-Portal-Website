import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo + Description */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Job<span className="text-orange-600">Sphere</span>
          </h1>
          <p className="mt-2 text-sm">
            Find your dream job from thousands of listings in one place. Your career journey starts here.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Job Seekers</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/jobs" className="hover:text-blue-500">Jobs</Link></li>
            <li><Link to="/signup" className="hover:text-blue-500">Create Account</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-600"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-700"><Linkedin /></a>
            <a href="mailto:support@jobsphere.com" className="hover:text-red-500"><Mail /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm border-t text-gray-600">
        © {new Date().getFullYear()} JobSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer
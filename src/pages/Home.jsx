import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans text-gray-900 dark:text-gray-100">

      {/* Hero Section */}
      <section className="bg-violet-600 text-white min-h-screen flex flex-col justify-center items-center text-center px-6">
       
        <h1 className="text-5xl font-bold mb-4">Welcome to ZapDataCloud</h1>
        <p className="text-lg max-w-xl mb-6">
          Manage your customers, credentials, income, and expenses seamlessly.
          Everything you need in one dashboard.
        </p>
        <div className="flex gap-4">
          <Link to="/register">
            <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your business data efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Customer Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of all your customers in one place with detailed information and easy search.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Income & Expenses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your cash flow, track payments, and see reports to make smarter decisions.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Secure Credentials</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Store sensitive information securely with easy access for your team.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose ZapDataCloud?</h2>
          <p className="mb-6 text-lg">
            Our platform is fast, secure, and easy to use. Access your data anywhere, anytime.
          </p>
          <Link to="/register">
            <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
              Start Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real feedback from our customers using ZapDataCloud to grow their business.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "ZapDataCloud helped us organize everything! Now managing clients and finances is a breeze."
            </p>
            <span className="font-semibold">- Alice Johnson</span>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The dashboard is clean and easy to use. I love tracking income and expenses all in one place."
            </p>
            <span className="font-semibold">- Michael Smith</span>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "Storing credentials securely is a lifesaver for our small team. Highly recommend!"
            </p>
            <span className="font-semibold">- Sarah Lee</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-indigo-700 text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-lg">Sign up today and streamline your business operations.</p>
        <Link to="/register">
          <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
            Sign Up Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} ZapDataCloud. All rights reserved.</p>
      </footer>
    </div>
  );
}

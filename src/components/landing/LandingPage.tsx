import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CheckSquare, Zap, ArrowRight, Music, Package2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Turn Your Creative Vision into Reality
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              The event planning app for creatives, powered by Craybo
            </p>
            <Link
              to="/sign-up"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:text-lg"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why MuseMate?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create unforgettable events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Event Planning",
                description: "Manage every detail of your event with our intuitive planning tools"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work seamlessly with your team, vendors, and artists"
              },
              {
                icon: Package2,
                title: "Equipment Management",
                description: "Track inventory and rentals all in one place"
              },
              {
                icon: CheckSquare,
                title: "Custom Checklists",
                description: "Stay organized with customizable event checklists"
              },
              {
                icon: Music,
                title: "Artist Management",
                description: "Handle performer schedules and technical requirements"
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Keep everyone in sync with live updates and notifications"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Craybo */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powered by Craybo
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Craybo is a creative event production and media company that empowers local creatives, 
                bands, and small businesses. We connect people through experiences and support creative 
                projects that inspire positive community impact.
              </p>
              <a
                href="https://craybo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                Learn more about Craybo <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                alt="Creative team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Plan Your Next Event?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join the Craybo community and start creating unforgettable experiences
            </p>
            <Link
              to="/sign-up"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">MuseMate</h3>
              <p className="text-gray-400">
                Powered by Craybo - Empowering creatives to bring their ideas to life
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com/craybo" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/craybo" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://craybo.com" className="text-gray-400 hover:text-white">
                    Website
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@craybo.com" className="text-gray-400 hover:text-white">
                    hello@craybo.com
                  </a>
                </li>
                <li className="text-gray-400">
                  Based in Los Angeles, CA
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Craybo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
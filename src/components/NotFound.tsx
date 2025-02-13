import React from 'react';
import { FileQuestion } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
          <div className="flex justify-center">
            <div className="bg-indigo-100 p-4 rounded-full">
              <FileQuestion className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have gone missing. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
            >
              Go Back
            </button>
            
            <a 
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
            >
              Return Home
            </a>
          </div>
          
          <div className="pt-6 border-t border-gray-100">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
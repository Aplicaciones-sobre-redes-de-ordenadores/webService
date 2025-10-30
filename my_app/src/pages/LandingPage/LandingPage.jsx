import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-white text-center">
      <h1 className="text-5xl font-bold mb-4 text-yellow-600">Bienvenido a mi App 🚀</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Esta es una landing page de ejemplo creada con Vite + React.
      </p>
      <a
        href="#"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
        Comenzar
      </a>
    </div>
  );
}

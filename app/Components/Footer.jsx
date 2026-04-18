"use client"

import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/20 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6 text-sm text-gray-600">
        <p className="text-center md:text-left">
          © 2026 Bolster. All rights reserved.
        </p>

        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="transition hover:text-violet-600">
            Privacy
          </a>
          <a href="#" className="transition hover:text-violet-600">
            Terms
          </a>
          <a href="#" className="transition hover:text-violet-600">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
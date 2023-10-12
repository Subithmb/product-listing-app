import React from 'react';

function Footer() {
  return (
    <footer className=" fixed bottom-0 left-0 w-full bg-gray-400 text-white text-center p-4">
    <p >&copy; {new Date().getFullYear()} Subith, Inc.</p>
  </footer>
  );
}

export default Footer;

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { href: '#accueil', label: 'Accueil' },
//     { href: '#competences', label: 'Compétences' },
//     { href: '#qualite', label: 'Qualité' },
//     { href: '#experience', label: 'Expérience' },
//     { href: '#portfolio', label: 'Portfolio' },
//     { href: '#contact', label: 'Contact' },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-[rgba(15,23,42,0.95)] backdrop-blur-md shadow-lg'
//           : 'bg-transparent'
//       }`}
//     >
//       <nav className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">

//           {/* Desktop Navigation */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <a
//                   href={link.href}
//                   className="text-gray-300 hover:text-[#0ea5e9] transition-colors duration-300 font-medium"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Menu"
//           >
//             <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <ul className="md:hidden mt-4 py-4 border-t border-gray-700">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <a
//                   href={link.href}
//                   className="block py-3 text-gray-300 hover:text-[#0ea5e9] transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </nav>
//     </header>
//   );
// }

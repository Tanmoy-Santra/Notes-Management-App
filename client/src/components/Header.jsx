// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaSearch } from "react-icons/fa";
// // import { MdOutlineFileUpload } from "react-icons/md";
// // import { GiHamburgerMenu } from "react-icons/gi";
// // import { useDispatch, useSelector } from "react-redux";
// // import { removeUserData, setUserData } from "../Redux/slices/user-slice";

// // const Navbar = () => {

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
// //   const user = useSelector((state) => state.user.userData);

// //   const handleLogout = () => {
// //     dispatch(removeUserData());
// //     navigate("/login");
// //   }

// //   return (
// //     <header className="flex h-[80px] items-center justify-center bg-primarybg text-textcolor">
// //       <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
// //         {/* image section */}
// //         <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
// //           <img src="/logo.png" alt="Logo" />
// //         </div>
// //         {/* nav links  */}
// //         <GiHamburgerMenu className="text-xl md:hidden" />
// //         <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
// //           <Link to="/home">
// //             Home
// //           </Link>   

// //           {/* Conditional Rendering */}
// //           {isAuthenticated ? (
// //             <>
// //               <Link to="/search">
// //                 <FaSearch className="text-xl" />
// //               </Link>
// //               <Link to="/upload">
// //                 <MdOutlineFileUpload className="text-[24px]" />
// //               </Link>
// //               <Link to="/profile">
// //                 <button className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor">
// //                   Profile
// //                 </button>
// //               </Link>
// //               <button className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor" onClick={handleLogout}>
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <>

// //               <Link to="/login">
// //                 <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
// //                   Login
// //                 </button>
// //               </Link>
// //               <Link to="/signup">
// //                 <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
// //                   Signup
// //                 </button>
// //               </Link>
// //             </>

// //           )}

// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSearch,FaHome } from "react-icons/fa";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";
// import { removeUserData } from "../Redux/slices/user-slice";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const user = useSelector((state) => state.user.userData);

//   const handleLogout = () => {
//     dispatch(removeUserData());
//     navigate("/");
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full flex h-[70px] items-center justify-between bg-primarybg text-textcolor px-4 md:px-8 z-50 mb-20">
//       <div className="flex w-full max-w-[1550px] items-center justify-between mx-auto">
//         {/* Logo */}
//         <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden mr-10">
//           <img src="/logo.png" alt="Logo" />
//         </div>

//         {/* Right-aligned Navigation Links */}
//         <div className="flex items-center justify-end gap-4 flex-1">
//           <Link to="/home" className="hover:text-buttoncolor">
//            <FaHome size="25"></FaHome>
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link to="/search" className="hover:text-buttoncolor">
//                 <FaSearch className="text-xl" />
//               </Link>
//               <Link to="/upload" className="hover:text-buttoncolor">
//                 <MdOutlineFileUpload className="text-[24px]" />
//               </Link>
//             </>
//           )}

//           {/* Hamburger Menu for mobile */}
//           <div className="md:hidden" onClick={toggleMenu}>
//             <GiHamburgerMenu className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Conditional rendering based on screen size */}
//         <nav className={`absolute top-[80px] left-0 z-50 w-full bg-primarybg transform transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:justify-end ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//           <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
           
//               <>
//                 <Link to="/profile">
//                   <button className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor">
//                     Profile
//                   </button>
//                 </Link>
//                 <button
//                   className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
            
              
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
//=============================================================================

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSearch, FaHome } from "react-icons/fa";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";
// import { removeUserData } from "../Redux/slices/user-slice";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
//   const user = useSelector((state) => state.user.userData);

//   // Check if the user is authenticated based on token in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       dispatch(removeUserData()); // Clear user data if no token
//       navigate("/login"); // Redirect to login if token is missing
//     }
//   }, [dispatch, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Remove token on logout
//     dispatch(removeUserData()); // Clear user data from Redux store
//     alert("Press ok for Log out")
//     navigate("/"); // Redirect to home page or login page
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full flex h-[70px] items-center justify-between bg-primarybg text-textcolor px-4 md:px-8 z-50 mb-20">
//       <div className="flex w-full max-w-[1550px] items-center justify-between mx-auto">
//         {/* Logo */}
//         <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden mr-10">
//           <img src="/logo.png" alt="Logo" />
//         </div>

//         {/* Right-aligned Navigation Links */}
//         <div className="flex items-center justify-end gap-4 flex-1">
//           <Link to="/home" className="hover:text-buttoncolor">
//             <FaHome size="25" />
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link to="/search" className="hover:text-buttoncolor">
//                 <FaSearch className="text-xl" />
//               </Link>
//               <Link to="/upload" className="hover:text-buttoncolor">
//                 <MdOutlineFileUpload className="text-[24px]" />
//               </Link>
//             </>
//           )}

//           {/* Hamburger Menu for mobile */}
//           <div className="md:hidden" onClick={toggleMenu}>
//             <GiHamburgerMenu className="text-2xl cursor-pointer" />
//           </div>
//         </div>

//         {/* Conditional rendering based on screen size */}
//         <nav className={`absolute top-[70px] left-0 z-50 w-full bg-primarybg transform transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:justify-end ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
//           <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/profile">
//                   <button className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor">
//                     Profile
//                   </button>
//                 </Link>
//                 <button
//                   className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
//                     Login
//                   </button>
//                 </Link>
//                 <Link to="/signup">
//                   <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
//                     Signup
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

//==============================================================================================



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHome } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiMicrosoftonenote } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";
import { toast } from "react-toastify";
import NotesEditor from "./NotesEditor";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      dispatch(removeUserData());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(removeUserData());
    toast.success("you have successfully logged out!");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to navigate to the notes editor page
  const goToNotesEditor = () => {
    navigate("/editor"); // Navigate to the /editor route
  };

  return (
    <header className="fixed top-0 left-0 w-full flex h-[70px] items-center justify-between bg-primarybg text-textcolor px-4 md:px-8 z-50 mb-20">
      <div className="flex w-full max-w-[1550px] items-center justify-between mx-auto">
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden mr-10">
          <img src="/logo.png" alt="Logo" />
        </div>

        <div className="flex items-center justify-end gap-4 flex-1">
          <Link to="/home" className="hover:text-buttoncolor">
            <FaHome size="25" />
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/search" className="hover:text-buttoncolor">
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload" className="hover:text-buttoncolor">
                <MdOutlineFileUpload className="text-[24px]" />
              </Link>
              {/* Button to navigate to the Notes Editor page */}
              <button onClick={goToNotesEditor} className="hover:text-buttoncolor">
              <SiMicrosoftonenote className="text-[24px]"/>
              </button>
            </>
          )}
          <div className="md:hidden" onClick={toggleMenu}>
            <GiHamburgerMenu className="text-2xl cursor-pointer" />
          </div>
        </div>

        <nav className={`absolute top-[70px] left-0 z-50 w-full bg-primarybg transform transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:justify-end ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <button className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor">
                    Profile
                  </button>
                </Link>
                <button
                  className="rounded-xl bg-buttoncolor px-5 py-2 font-semibold hover:bg-buttonhovercolor text-textcolor"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

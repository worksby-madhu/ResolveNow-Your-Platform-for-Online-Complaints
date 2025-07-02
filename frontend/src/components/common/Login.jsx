import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({ email: "", password: "" });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/Login", user)
         .then((res) => {
            alert("Successfully logged in");
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { userType } = isLoggedIn;
            switch (userType) {
               case "Admin":
                  navigate("/AdminHome");
                  break;
               case "Ordinary":
                  navigate("/HomePage");
                  break;
               case "Agent":
                  navigate("/AgentHome");
                  break;
               default:
                  navigate("/Login");
                  break;
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("User doesn’t exist");
            }
            navigate("/Login");
         });
   };

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to="/" className="nav-link text-light">Home</Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to="/signup" className="nav-link text-light">SignUp</Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link to="/login" className="nav-link text-light">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <section className="vh-100 login-gradient">
            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card text-white login-card">
                        <div className="card-body p-5 text-center">
                           <div className="mb-md-5 mt-md-4 pb-5">
                              <h2 className="fw-bold mb-4">Login To Register Complaint</h2>
                              <p className="text-white-50 mb-4">Enter your credentials below</p>
                              <form onSubmit={handleSubmit}>
                                 <div className="form-outline form-white mb-4">
                                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="email">Email</label>
                                 </div>
                                 <div className="form-outline form-white mb-4">
                                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" autoComplete="off" required />
                                    <label className="form-label" htmlFor="password">Password</label>
                                 </div>
                                 <button className="btn login-btn btn-lg px-5" type="submit">Login</button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0">Don't have an account? <Link to="/SignUp" className="text-info">SignUp</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer />
         <style>{`
            .login-gradient {
               background: linear-gradient(135deg,rgb(212, 123, 126), #fad0c4, #a1c4fd, #c2e9fb);
               background-size: 400% 400%;
               animation: gradientBG 15s ease infinite;
            }

            @keyframes gradientBG {
               0% { background-position: 0% 50%; }
               50% { background-position: 100% 50%; }
               100% { background-position: 0% 50%; }
            }

            .login-card {
               background: rgba(124, 124, 124, 0.7);
               border-radius: 1rem;
               box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
               backdrop-filter: blur(8px);
               -webkit-backdrop-filter: blur(8px);
               border: 1px solid rgba(255, 255, 255, 0.18);
            }

            .login-btn {
               background: linear-gradient(45deg, #00c6ff, #0072ff);
               color: white;
               border: none;
               transition: all 0.3s ease;
            }

            .login-btn:hover {
               background: linear-gradient(45deg, #0072ff, #00c6ff);
               transform: scale(1.05);
            }

            input.form-control:focus {
               border-color:rgb(0, 82, 105);
               box-shadow: 0 0 0 0.25rem rgba(0, 198, 255, 0.25);
            }
         `}</style>
      </>
   );
};

export default Login;

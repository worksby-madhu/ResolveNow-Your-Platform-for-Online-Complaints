import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const { name } = user;
          setUserName(name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const styles = {
    navbar: {
      background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
    },
    navLink: {
      color: '#f1f1f1',
      marginRight: '15px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
    },
    navLinkHover: {
      color: '#ffd700',
      textShadow: '0 0 5px rgba(255, 215, 0, 0.6)',
    },
    navLinkActive: {
      borderBottom: '2px solid #ffd700',
      fontWeight: 600,
    },
    logoutBtn: {
      color: '#ff4d4d',
      border: '1px solid #ff4d4d',
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease',
    },
    logoutBtnHover: {
      backgroundColor: '#ff4d4d',
      color: 'white',
    },
    content: {
      padding: '30px',
      backgroundColor: '#f5f7fa',
      minHeight: '90vh',
      animation: 'fadeIn 0.5s ease-in-out',
    },
    fadeInKeyframes: `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    `,
  };

  return (
    <>
      <style>{styles.fadeInKeyframes}</style>
      <Navbar style={styles.navbar} expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand className="text-white fw-bold" href="#">
            👋 Hi Admin, {userName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              {['dashboard', 'UserInfo', 'Agent'].map((item) => (
                <NavLink
                  key={item}
                  onClick={() => handleNavLinkClick(item)}
                  className="nav-link"
                  style={{
                    ...styles.navLink,
                    ...(activeComponent === item ? styles.navLinkActive : {}),
                  }}
                >
                  {item === 'dashboard' ? 'Dashboard' : item === 'UserInfo' ? 'User' : 'Agent'}
                </NavLink>
              ))}
            </Nav>
            <Button
              onMouseOver={(e) =>
                Object.assign(e.target.style, styles.logoutBtnHover)
              }
              onMouseOut={(e) =>
                Object.assign(e.target.style, styles.logoutBtn)
              }
              style={styles.logoutBtn}
              onClick={LogOut}
            >
              🚪 Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={styles.content}>
        {activeComponent === 'Agent' && <AgentInfo />}
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
      </div>
    </>
  );
};

export default AdminHome;

import React, { useRef } from 'react';
import MyGrid from '../components/MyGrid'; 
import './HomePage.css'; 
import logo from '../assets/logo.webp'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome for icons
import { faPlus, faLock, faMessage, faUser, faLink,faEdit } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const HomePage = () => {
  const gridRef = useRef(); // Reference for MyGrid

  const handleAdd = () => {
    gridRef.current?.addGridItem(); //  call the addGridItem function from MyGrid
  };



  const handleToggleLock = () => {
    gridRef.current?.toggleLock(); //  call the toggleLock function from MyGrid
  };

  return (
    <div className="home-page">
      <div className="side-bar">
        <div>
          <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
        </div>
        <div className="sidebar-icon" onClick={handleAdd} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faPlus} size="4x" title="Add Item" />
        </div>
        <div className="sidebar-icon" onClick={handleToggleLock} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faLock} size="4x" title="Toggle Lock" />
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon icon={faLink} size="4x" title="Link" style={{ cursor: 'pointer' }}/>
        </div>
        <div className="sidebar-icon">
          <FontAwesomeIcon icon={faMessage} size="4x" title="Messages" style={{ cursor: 'pointer' }}/>
        </div>
        
        <div className="sidebar-icon">
          <FontAwesomeIcon icon={faUser} size="4x" title="Profile" style={{ cursor: 'pointer' }}/>
        </div>
      </div>
      <MyGrid ref={gridRef} /> {}
    </div>
  );
};

export default HomePage;

import React, { useRef } from 'react';
import MyGrid from '../components/MyGrid';
import './HomePage.css';
import logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLock, faMessage, faUser, faLink } from '@fortawesome/free-solid-svg-icons';

const SidebarIcon = ({ icon, title, onClick }) => (
  <div
    className="sidebar-icon"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    title={title} // Native title attribute for hover tooltip
  >
    <FontAwesomeIcon icon={icon} size="4x" />
  </div>
);

const HomePage = () => {
  
  const gridRef = useRef();

  const handleAdd = () => gridRef.current?.addGridItem();
  const handleToggleLock = () => gridRef.current?.toggleLock();

  const icons = [
    { icon: faPlus, title: 'Add Item', onClick: handleAdd },
    { icon: faLock, title: 'Toggle Lock', onClick: handleToggleLock },
    { icon: faLink, title: 'Link' },
    { icon: faMessage, title: 'Messages' },
    { icon: faUser, title: 'Profile' },
  ];

  return (
    <div className="home-page">
      <div className="side-bar">
        <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
        {icons.map((item, index) => (
          <SidebarIcon key={index} icon={item.icon} title={item.title} onClick={item.onClick} />
        ))}
      </div>
      <MyGrid ref={gridRef} />
    </div>
  );
};

export default HomePage;

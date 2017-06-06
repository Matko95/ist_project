import React from 'react';

const Header = ({children}) => (
    <header className="dashboard-header">
        <h1 className="logo">Auto Servis Admin Panel</h1>
        {children}
    </header>
);

export default Header;
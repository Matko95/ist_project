import React from 'react';

const Header = ({children}) => (
    <header className="dashboard-header">
        <h1 className="logo">WCF Servis</h1>
        {children}
    </header>
);

export default Header;
import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Home from './Home';

function Layout({ t }) {
  //   const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  //   const handleRtlChange = (checked) => {
  //     setRtl(checked);
  //     setLocale(checked ? 'ar' : 'en');
  //   };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  //   ${rtl ? 'rtl' : ''}
  return (
    <div className={`app ${toggled ? 'toggled' : ''} flex-container`}>
      <div className="flex-child">
        <Sidebar
          image={image}
          collapsed={collapsed}
          // rtl={rtl}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div class="flex-child">
        <Home
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          // rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          // handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
}

export default Layout;
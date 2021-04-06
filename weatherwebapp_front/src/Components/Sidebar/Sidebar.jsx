import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import * as WiIcons from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../assets/css/Sidebar.css';
import { IconContext } from 'react-icons';
import i18n from '../../i18n'
import { withNamespaces } from 'react-i18next'

function Sidebar({ t }) {
  const [sidebar, setSidebar] = useState(true);
  const [Short_Sidebar, setShort_sidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showShort_Sidebar = () => setShort_sidebar(!Short_Sidebar);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff', size: '2em' }}>
        <nav className={Short_Sidebar ? 'navbar active' : 'navbar'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={() => { showShort_Sidebar(); showSidebar(); }} />
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={() => { showShort_Sidebar(); showSidebar(); }}>
            <li className='navbar-toggle'>
              <Link to='#'>
                <FaIcons.FaArrowCircleLeft />
              </Link>
            </li>
            <li>
              <h4> Weather App </h4>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{t(item.title)}</span>
                  </Link>
                </li>
              );
            })}
            <li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li>
            <li>
              <span><Button onClick={() => changeLanguage('en')}>en</Button></span>
              <span><Button onClick={() => changeLanguage('gr')}>gr</Button></span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withNamespaces()(Sidebar);

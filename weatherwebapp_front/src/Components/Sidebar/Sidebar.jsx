//import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
import { Button } from 'react-bootstrap'
import * as WiIcons from 'react-icons/wi';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../assets/css/Sidebar.css';
import { IconContext } from 'react-icons';
import i18n from '../../i18n'
import {withNamespaces} from 'react-i18next'

function Sidebar({t}) {
  // const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff', size: '2em' }}>
        {/* <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}
        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
        <nav className='nav-menu active'>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <WiIcons.WiDayCloudyGusts /> <h3> Weather App </h3>
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

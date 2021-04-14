import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Forecast',
    path: '/forecast',
    icon: <IoIcons.IoMdSunny />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics',
    path: '/stats',
    icon: <FaIcons.FaChartPie />,
    cName: 'nav-text'
  },
  {
    title: 'UserInfo',
    path: '/userinfo',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  }
];

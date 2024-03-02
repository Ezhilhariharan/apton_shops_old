import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation } from '../SidebarNavigation';
import { Divider } from 'antd';
import { Menu } from 'antd';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../theme/styles/light/lightTheme';

const StyledDivider = styled(Divider)`
  margin: 0 25px 0 15px;
  height: 2px;
  // color: #D9D9D9;
  width: 200px !important;
  min-width: 200px;
`;
const sidebarNavFlat = sidebarNavigation.reduce(
  (result, current) =>
    result.concat(
      current.children && current.children.length > 0
        ? current.children
        : current
    ),
  []
);
const CustomizedChildMenu = styled(Menu.Item)`
  ${props =>
    props.activeMenu &&
    `background-color: ${lightColorsTheme.primary} !important;
      span>a{
       color: white !important;
      }
       svg,path{
        fill: transparent !important; 
        stroke: #fff !important;
     } 
  `}
`;

const SiderMenu = ({ setCollapsed }) => {
  const settingsPathName = window?.location?.pathname;
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem('childrenMenuSelected')
  );

  const currentMenuItem = sidebarNavFlat.find(
    ({ url }) => url === location.pathname
  );
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];
  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname)
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];
  const menuItemHandler = ind => {
    setActiveMenu(ind);
    localStorage.setItem('childrenMenuSelected', ind);
  };
  const removeActiveChildren = () => {
    localStorage.removeItem('childrenMenuSelected');
    setActiveMenu(null);
  };

  useEffect(() => {
    if (location.pathname === '/settings') {
      setActiveMenu(null);
      localStorage.removeItem('childrenMenuSelected');
    } else if (location.pathname === '/dashboard') {
      setActiveMenu(null);
      localStorage.removeItem('childrenMenuSelected');
    }
  }, [location.pathname]);

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={
        location.pathname === '/dashboard' ? ['dashboard'] : defaultSelectedKeys
      }
      selectedKeys={
        location.pathname === '/dashboard' ? ['dashboard'] : defaultSelectedKeys
      }
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(false)}
      settingsPathName={settingsPathName}
    >
      {sidebarNavigation.map(nav =>
        nav.children && nav.children.length > 0 ? (
          <S.Menu.SubMenu
            key={nav.key}
            title={nav.title}
            icon={nav.icon}
            onTitleClick={() => setCollapsed(false)}
            popupClassName="d-none"
            className="childMenu"
          >
            {nav.children.map((childNav, childInd) => (
              <div key={childNav.key}>
                <CustomizedChildMenu
                  onClick={() => menuItemHandler(childInd)}
                  activeMenu={
                    activeMenu === childInd ||
                    parseInt(localStorage.getItem('childrenMenuSelected')) ===
                      childInd
                  }
                  title=""
                  icon={childNav.icon}
                >
                  <Link to={childNav.url || ''}>{childNav.title}</Link>
                </CustomizedChildMenu>
                {childInd !== nav.children.length - 1 && <StyledDivider />}
              </div>
            ))}
          </S.Menu.SubMenu>
        ) : (
          <Menu.Item
            key={nav.key}
            title=""
            icon={nav.icon}
            onClick={removeActiveChildren}
          >
            <Link to={nav.url || ''}>{nav.title}</Link>
          </Menu.Item>
        )
      )}
    </S.Menu>
  );
};
export default SiderMenu;

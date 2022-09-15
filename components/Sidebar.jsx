import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HomeIcon from './svgs/HomeIcon';
import CreateIcon from './svgs/CreateIcon';
import RequestIcon from './svgs/RequestIcon';
import NotificationsIcon from './svgs/NotificationsIcon';
import SavedIcon from './svgs/SavedIcon';
import MobileCreateIcon from './svgs/MobileCreateIcon';
import MobileRequestIcon from './svgs/MobileRequestIcon';
import MobileNotificationIcon from './svgs/MobileNotificationIcon';
import MobileSearchIcon from './svgs/MobileSearchIcon';

const StyledSideBar = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  bottom: 0;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 25%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 100;

  .createIcon {
    gap: 0;
    svg {
      height: 35px !important;
      width: 35px !important;
    }
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: 0 1rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    box-shadow: none;
    display: block;
    margin-top: 10px;
    padding: 1rem 0 1rem 1rem;
    position: fixed;
    top: 100px;
    width: 210px;
  }
`;

const NavButton = styled(Button)`
  background-color: transparent;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.gray.navfont};
  display: flex;
  font-family: ${({ theme }) => theme.fontFamily.body};
  height: 65px;
  justify-content: center;
  margin-bottom: 0;
  padding: 0.25rem 0;
  text-transform: none;
  transition: none;
  width: 100%;

  span {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &:hover {
    background-color: transparent;
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.orange};
  }

  .active {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 70px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: 75px;
    padding: 0.5rem 0.5rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin-bottom: 1rem;
    padding: 0 0 10px 0;
    justify-content: flex-start;

    span {
      flex-direction: row;
      gap: 1rem;
    }
  }
`;
const IconImage = styled.div`
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.orange};
  display: flex;
  height: 35px;

  svg {
    height: 25px;
    width: 25px;

    ${({ theme }) => theme.breakpoints.up('md')} {
      height: 30px;
      width: 30px;
    }

    ${({ theme }) => theme.breakpoints.up('lg')} {
      height: 35px;
      width: 35px;
    }
  }
`;
const IconLabel = styled.span`
  display: flex;
  font-size: 0.6rem;
  letter-spacing: -0.05px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 0.7rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 1rem;
    font-style: normal;
    font-weight: bold;
    line-height: 1rem;
    width: 65%;
    text-align: left;
  }
`;

export default function SideBar({ notifications }) {
  const router = useRouter();

  const desktopSidebars = [
    {
      href: '/',
      icon: <HomeIcon />,
      badge: false,
      label: 'Home',
      aria: 'Home',
    },
    {
      href: '/create',
      icon: <CreateIcon />,
      badge: false,
      label: 'Create',
      aria: 'create a totym',
      className: 'createIcon',
    },
    {
      href: '/request',
      icon: <RequestIcon />,
      badge: false,
      label: 'Request',
      aria: 'request a totym',
    },
    {
      href: '/notifications',
      icon: <NotificationsIcon />,
      badge: true,
      label: 'Notifications',
      aria: 'show new notifications',
    },
    {
      href: '/collections',
      icon: <SavedIcon />,
      badge: false,
      label: 'Saved',
      aria: 'view your collections',
    },
  ];
  const mobileSidebars = [
    {
      href: '/',
      icon: <HomeIcon />,
      badge: false,
      label: 'Home',
      aria: 'Home',
    },
    {
      href: '/search',
      icon: <MobileSearchIcon />,
      badge: false,
      label: 'Search',
      aria: 'Search',
    },
    {
      href: '/create',
      icon: <MobileCreateIcon />,
      badge: false,
      label: 'Create',
      aria: 'create a totym',
      className: 'createIcon',
    },
    {
      href: '/request',
      icon: <MobileRequestIcon />,
      badge: false,
      label: 'Request',
      aria: 'request a totym',
    },
    {
      href: '/notifications',
      icon: <MobileNotificationIcon />,
      badge: true,
      label: 'Notifications',
      aria: 'show new notifications',
    },
  ];

  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down('md'));

  return (
    <StyledSideBar>
      {!isMobile &&
        desktopSidebars &&
        desktopSidebars.map((sidebar) => (
          <Link href={sidebar.href} passHref key={sidebar.aria}>
            <a>
              <NavButton aria-label={sidebar.aria} color="inherit">
                <IconImage className={sidebar.classname}>
                  {sidebar.badge ? (
                    <Badge badgeContent={notifications} color="secondary">
                      {sidebar.icon}
                    </Badge>
                  ) : (
                    sidebar.icon
                  )}
                </IconImage>
                <IconLabel
                  className={router.pathname == sidebar.href ? 'active' : ''}
                >
                  {sidebar.label}
                </IconLabel>
              </NavButton>
            </a>
          </Link>
        ))}
      {isMobile &&
        mobileSidebars &&
        mobileSidebars.map((sidebar) => (
          <Link href={sidebar.href} passHref key={sidebar.aria}>
            <a>
              <NavButton aria-label={sidebar.aria} color="inherit">
                <IconImage className={sidebar.className}>
                  {sidebar.badge ? (
                    <Badge badgeContent={notifications} color="secondary">
                      {sidebar.icon}
                    </Badge>
                  ) : (
                    sidebar.icon
                  )}
                </IconImage>
                <IconLabel
                  className={router.pathname == sidebar.href ? 'active' : ''}
                >
                  {sidebar.label}
                </IconLabel>
              </NavButton>
            </a>
          </Link>
        ))}
    </StyledSideBar>
  );
}

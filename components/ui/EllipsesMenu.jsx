import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from 'next/link';
import { useRouter } from 'next/router';

const StyledCancelButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  border: 1px solid #ebebeb;
  padding: 0;
  text-transform: capitalize;
  letter-spacing: -0.5px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: none;
  }
`;
const ListItem = styled(MenuItem)`
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
`;
const styles = (theme) => ({
  popoverPaper: {
    width: '8.5rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      position: 'absolute',
      bottom: '0.875rem',
      top: 'unset !important',
      textAlign: 'center',
      background: 'transparent',
      boxShadow: 'none',
      '& ul': {
        padding: '0',
      },
      '& a li': {
        background: 'white',
        justifyContent: 'center',
        border: '1px solid #EBEBEB',
        '&:hover': {
          background: 'rgba(255, 255, 255, 1)',
        },
      },
      '& a:nth-child(1) li': {
        borderTopLeftRadius: '0.25rem',
        borderTopRightRadius: '0.25rem',
      },
      '& a:nth-child(3) li': {
        borderBottomLeftRadius: '0.25rem',
        borderBottomRightRadius: '0.25rem',
      },
    },
  },
});

const EllipsesMenu = React.forwardRef((props, ref) => {
  const isMenuOpen = Boolean(props.anchorEl);
  const { breakpoints } = useTheme();
  const menuId = 'primary-ellipse-menu';
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const router = useRouter();

  useEffect(() => {
    const root = document.getElementById(menuId);
    if (props.anchorEl !== null && isMobile) {
      root.style.background = 'rgba(0, 0, 0, 0.5)';
    }
  }, [props.anchorEl]);

  const handleClickEvent = (menu) => {
    props.handleMenuClose();
    if (menu.label === 'Request') {
      router.push({
        pathname: menu.href,
        query: { totymTitle: props.selectedTitle },
      });
    } else if (menu.label === 'Edit') {
      router.push({
        pathname: '/create',
        query: { title: props.totym.title, totymId: props.totym.id },
      });
    } else if (menu.label === 'Create') {
      router.push({
        pathname: '/create',
        query: { title: props.totym.title, totymId: null },
      });
    }
  };

  const userMenu = [
    {
      label: 'Edit',
      href: '#',
    },
    {
      label: 'Request',
      href: '/request',
    },
    {
      label: 'Share',
      href: '#',
      isModal: true,
    },
  ];
  const otherMenu = [
    {
      label: 'Create',
      href: '#',
    },
    {
      label: 'Share',
      href: '',
      isModal: true,
    },
    {
      label: 'Request',
      href: '/request',
    },
  ];

  return (
    <Menu
      ref={ref}
      anchorEl={props.anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={props.handleMenuClose}
      PopoverClasses={{ paper: props.classes.popoverPaper }}
    >
      {props.ellipsesType &&
        props.ellipsesType !== 'notification' &&
        userMenu.map((menu, i) =>
          menu.isModal ? (
            <Link href="/" onClick={(e) => e.preventDefault()} passHref key={i}>
              <a>
                <ListItem
                  popoverclasses={{ paper: props.classes.itemRoot }}
                  onClick={props.handleShareModal}
                >
                  {menu.label}
                </ListItem>
              </a>
            </Link>
          ) : (
            <Link
              href={menu.href}
              onClick={(e) => e.preventDefault()}
              passHref
              key={i}
            >
              <a>
                <ListItem
                  popoverclasses={{ paper: props.classes.itemRoot }}
                  onClick={() => handleClickEvent(menu)}
                >
                  {menu.label}
                </ListItem>
              </a>
            </Link>
          )
        )}
      {props.ellipsesType === 'notification' && [
        <Link
          href="#"
          passHref
          key="mark as read"
          onClick={(e) => e.preventDefault()}
        >
          <a>
            <ListItem
              popoverclasses={{ paper: props.classes.itemRoot }}
              onClick={() => props.handleMarkasRead(props.notificationId)}
            >
              Mark as Read
            </ListItem>
          </a>
        </Link>,
        <Link
          href="#"
          passHref
          key="remove"
          onClick={(e) => e.preventDefault()}
        >
          <a>
            <ListItem
              popoverclasses={{ paper: props.classes.itemRoot }}
              onClick={() => props.handleRemove(props.notificationId)}
            >
              Remove
            </ListItem>
          </a>
        </Link>,
      ]}
      {!props.ellipsesType &&
        otherMenu.map((menu, i) =>
          menu.isModal ? (
            <Link
              href={menu.href}
              onClick={(e) => e.preventDefault()}
              passHref
              key={i}
            >
              <a>
                <ListItem
                  popoverclasses={{ paper: props.classes.itemRoot }}
                  onClick={props.handleShareModal}
                >
                  {menu.label}
                </ListItem>
              </a>
            </Link>
          ) : (
            <Link
              href={menu.href}
              onClick={(e) => e.preventDefault()}
              passHref
              key={i}
            >
              <a>
                <ListItem
                  popoverclasses={{ paper: props.classes.itemRoot }}
                  onClick={() => handleClickEvent(menu)}
                >
                  {menu.label}
                </ListItem>
              </a>
            </Link>
          )
        )}
      <StyledCancelButton onClick={props.handleMenuClose}>
        <ListItem>Cancel</ListItem>
      </StyledCancelButton>
    </Menu>
  );
});

export default withStyles(styles)(EllipsesMenu);

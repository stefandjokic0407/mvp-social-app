import React, { useState, useRef, useMemo, useEffect } from 'react';
import { setOptions, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from './ui/Avatar';
import TotymIconNameTagline from './svgs/TotymIconNameTagline';
import ArrowIcon from './svgs/ArrowIcon';
import LinearGradientButton from './ui/LinearGradientButton';
import Loader from './Loader';
import { pluralize, slugify } from '../utils';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import Schedule from '@material-ui/icons/Schedule';
import { Divider } from '@material-ui/core';

const StyledToolbar = styled(Toolbar)`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ theme }) => `${theme.breakpoints.values.xxl}px`};
  padding: 0px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    grid-template-columns: 1fr 6fr 1fr;
  }
`;
const LogoSection = styled.div`
  display: flex;
  padding: 0 0 0 1rem;
`;
const HeaderWrapper = styled.div`
  background: white;
  flex-grow: 1;
  position: sticky;
  top: 0;
  z-index: 333;
`;
const StyledLogo = styled.a`
  align-items: center;
  display: flex;
  margin-right: 16px;
`;
const SectionDesktop = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.up('md')} {
    align-items: center;
    display: flex;
    padding-right: 2.5rem;
  }
`;
const UserButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.gray.base900};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: -0.05px;
  padding: 0;

  &:hover {
    box-shadow: none;
    background: transparent;
  }
`;
const UserLabel = styled.span`
  padding: 0 1rem 0 0.625rem;
`;
const SectionArrow = styled.div`
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
`;
const SectionMobile = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
  }
`;
const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.gray};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  display: none;
  flex-grow: 1;
  margin-left: 0;
  position: relative;
  margin: 1.875rem 0rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: block;
    width: calc(100% - 10px);
  }

  ${({ theme }) => theme.breakpoints.up('xxl')} {
    display: block;
    width: calc(50% - 10px);
  }
`;
const StyledSearchIcon = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.orange};
  display: flex;
  height: 100%;
  justify-content: center;
  margin-left: 0.5rem;
  pointer-events: none;
  position: absolute;
`;
const StyledSearchInput = styled.input`
  width: 100%;
  color: inherit;
  padding: 0.25rem 6.75rem 0.25rem 2.375rem;
  background: transparent;
  border: none;
  outline: none;
`;
const ListItem = styled(MenuItem)`
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
`;

export default function Header() {
  const {
    data: { totyms },
    users: { users },
  } = useAppContext();
  const [session, loading] = useSession();
  const router = useRouter();
  const {
    colors: { primary, secondary },
  } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const initOption = {
    name: `show all results for "${searchValue}"`,
    title: searchValue,
    value: 'all',
    type: searchValue,
    image: 'https://img.icons8.com/material-outlined/32/000000/clock--v1.png',
  };
  const [options, setOptions] = useState([initOption]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (totyms.length == 0) return;
    if (users.length == 0) return;

    setOptions([
      initOption,
      ...totyms.map((totym) => ({
        ...totym,
        name: `${pluralize(totym.user.name)} "${totym.title}"`,
        image: totym.user.image,
      })),
      ...users.map((user) => ({
        ...user,
      })),
    ]);
  }, [totyms, users, searchValue]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (event) => {
    setSelectedValue(event);
    if (event == 'all') {
      router.push({
        pathname: '/results',
        query: {
          result: searchValue,
        },
      });
    } else if (typeof event == 'number') {
      totyms.forEach((totym) => {
        if (totym.id == event) {
          router.push(
            `/totym/${totym.user.username}/${slugify(totym.title)}/${totym.id}`
          );
        }
      });
    } else if (typeof event == 'string') {
      users.forEach((user) => {
        if (user.username == event) {
          router.push(`/u/${user.username}`);
        }
      });
    }
  };

  const checkValue = (newValue) => {
    for (let totym of totyms) {
      if (newValue == `${pluralize(totym.user.name)} "${totym.title}"`) {
        return false;
      }
    }

    for (let user of users) {
      if (newValue == user.name) {
        return false;
      }
    }

    if (newValue == `show all results for "${searchValue}"`) {
      return false;
    }

    return true;
  };

  const handleSearchValue = (newValue) => {
    const checkedValue = checkValue(newValue);
    if (checkedValue) {
      setSearchValue(newValue);
    }
  };

  // if (loading || options.length == 0) return <Loader />;

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClick={handleMenuClose}
      onClose={handleMenuClose}
    >
      <Link href={`/u/${session?.user?.username}`} passHref>
        <a>
          <ListItem>Profile</ListItem>
        </a>
      </Link>
      <Divider />
      <Link href="/contact" passHref>
        <a>
          <ListItem>Contact</ListItem>
        </a>
      </Link>
      <Divider />
      <ListItem
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Logout
      </ListItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      getContentAnchorEl={null}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClick={handleMobileMenuClose}
      onClose={handleMobileMenuClose}
    >
      <Link href={`/u/${session?.user?.username}`} passHref>
        <a>
          <ListItem>Profile</ListItem>
        </a>
      </Link>
      <Divider />
      <Link href="/contact" passHref>
        <a>
          <ListItem>Contact</ListItem>
        </a>
      </Link>
      <Divider />
      <ListItem
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Logout
      </ListItem>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <AppBar color="transparent" position="static">
        <StyledToolbar>
          <LogoSection>
            <Link href="/">
              <StyledLogo>
                <TotymIconNameTagline />
              </StyledLogo>
            </Link>
          </LogoSection>
          <SearchContainer>
            <SelectSearch
              className="select-search"
              options={options}
              search
              value={selectedValue}
              filterOptions={(options) => {
                const fuse = new Fuse(options, {
                  keys: [
                    'type',
                    'title',
                    'value',
                    'items.name',
                    'username',
                    'name',
                  ],
                  threshold: 0.3,
                });

                return (value) => {
                  if (!value.length) {
                    return options;
                  }

                  return fuse.search(value);
                };
              }}
              emptyMessage={() => (
                <div style={{ textAlign: 'center', fontSize: '1rem' }}>
                  Not found results
                </div>
              )}
              onChange={(event) => handleSearch(event)}
              renderValue={(valueProps) => {
                handleSearchValue(valueProps.value);
                return (
                  <>
                    <StyledSearchIcon>
                      <SearchIcon />
                    </StyledSearchIcon>
                    <StyledSearchInput
                      className="select-search__input"
                      {...valueProps}
                    />
                  </>
                );
              }}
              renderOption={(props, option, snapshot) => {
                const imgStyle = {
                  borderRadius: '50%',
                  verticalAlign: 'middle',
                  marginRight: 10,
                };
                return (
                  <button
                    {...props}
                    className={`select-search__option ${
                      snapshot.highlighted ? 'is-highlighted' : ''
                    }`}
                    type="button"
                  >
                    <span className="avatar-option">
                      <img
                        alt=""
                        style={imgStyle}
                        width="32"
                        height="32"
                        src={option.image}
                      />
                      <span>{option.name}</span>
                    </span>
                  </button>
                );
              }}
              placeholder="Find Totyms..."
            />
          </SearchContainer>
          {session ? (
            <SectionDesktop>
              <UserButton
                edge="end"
                aria-label="user account options"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar user={session.user} width="40px" height="40px" />
                <UserLabel>{session?.user?.username}</UserLabel>
                {isMenuOpen ? (
                  <SectionArrow>
                    <ArrowIcon />
                  </SectionArrow>
                ) : (
                  <ArrowIcon />
                )}
              </UserButton>
            </SectionDesktop>
          ) : (
            <LinearGradientButton
              isButton={false}
              path="/api/auth/signin"
              buttonText="Log in"
              startColor={primary.main}
              endColor={secondary.main}
            />
          )}
          <SectionMobile>
            {session && (
              <IconButton
                aria-label="user account options"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Avatar user={session.user} width="40px" height="40px" />
              </IconButton>
            )}
          </SectionMobile>
        </StyledToolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </HeaderWrapper>
  );
}

import { useSession } from 'next-auth/client';
import SelectSearch from 'react-select-search';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Seo from '../components/Seo';
import { appUrl, siteInfo } from '../utils/config';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { useAppContext } from '../context/state';
import { pluralize, slugify } from '../utils';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const MainContainer = styled.div`
  margin: 0 auto 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin: 1rem auto;
  }
`;
const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: start;
  margin-bottom: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
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

export default function SearchPage(props) {
  const {
    data: { totyms },
    users: { users },
  } = useAppContext();
  const [session, loading] = useSession();
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (totyms.length == 0) return;
    if (users.length == 0) return;

    const initOption = {
      name: `show all results for "${searchValue}"`,
      title: searchValue,
      value: 'all',
      type: searchValue,
      image: 'https://img.icons8.com/material-outlined/32/000000/clock--v1.png',
    };

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

  if (loading || options.length == 0) return <Loader />;

  return (
    <>
      <Seo
        author=""
        description=""
        title="Totym | Search"
        image={siteInfo.image}
        url={`${appUrl}/search`}
      />
      <Layout>
        {session ? (
          <MainContainer>
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
                emptyMessage={'No results found'}
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
          </MainContainer>
        ) : (
          <h1>Please Sign In</h1>
        )}
      </Layout>
    </>
  );
}

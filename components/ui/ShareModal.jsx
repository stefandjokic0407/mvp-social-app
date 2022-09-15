import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';
import styled, { useTheme } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from './MiniCard';
import CloseIcon from '../svgs/CloseIcon';
import CheckBoxIcon from '../svgs/CheckBoxIcon';
import Avatar from './Avatar';
import SideBar from '../Sidebar';
import MoreButtonIcon from '../svgs/MoreButtonIcon';
import MessageIcon from '../svgs/MessageIcon';
import FacebookIcon from '../svgs/FacebookIcon';
import TwitterIcon from '../svgs/TwitterIcon';
import CopyLinkIcon from '../svgs/CopyLinkIcon';
import UserCard from './UserCard';
import { initializeApollo } from '../../apollo/client';
import { CREATE_REQUESTANDSHARED_MUTATION } from '../../graphql/mutations';
import { VERIFIED_USERS } from '../../graphql/queries';
import Loader from '../Loader';
import { pluralize } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledModal = styled.div`
  border-radius: 0.25rem;
  outline: none;
  position: ${({ isMore }) => (isMore ? 'sticky' : 'absolute')};
  bottom: 0;
  height: ${({ isMore }) => (isMore ? '100vh' : 'auto')};
  left: unset;
  top: unset;
  transform: none;
  width: 100%;
  padding: ${({ isMore }) => (isMore ? '0.5rem' : '0')};

  ${({ theme }) => theme.breakpoints.up('md')} {
    position: initial;
    bottom: unset;
    height: 90vh;
    overflow: auto;
    padding: 0.5rem;
    width: 37.5rem;

    @media (min-height: 800px) {
      height: 70vh;
    }
  }
`;
const MobileModalContent = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
  }
`;
const HeaderContent = styled.div`
  align-items: center;
  display: ${({ isMore }) => (isMore ? 'flex' : 'none')};
  justify-content: center;
  position: relactive;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: flex;
  }
`;
const MobileHeader = styled(HeaderContent)`
  justify-content: space-between;
`;
const CloseContent = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: absolute;
  right: 1.625rem;
`;
const MobileCloseContent = styled(CloseContent)`
  left: 1rem;
`;
const HeaderTitle = styled.span`
  color: ${({ theme }) => theme.colors.gray.base900};
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.25rem;
  padding: 1.25rem 0;
`;
const MobileHeaderTitle = styled(HeaderTitle)`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  text-align: center;
  width: 100%;
`;
const MobileShareButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.orange};
  display: flex;
  justify-content: flex-end;
  letter-spacing: -0.5px;
  outline: none;
  padding-right: 0.5rem;
  padding: 0;
  position: absolute;
  right: 1rem;
  text-transform: capitalize;
  &:hover {
    background: transparent;
    box-shadow: none;
  }
  &:disabled {
    background: transparent;
  }
`;
const TotymSection = styled.div`
  align-items: center;
  background: ${({ isMore }) => (isMore ? '#eeeeee' : 'transparent')};
  border-bottom: ${({ isMore }) => (isMore ? 'none' : '1px solid #ebebeb')};
  border-radius: 0.25rem;
  display: flex;
  jutify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    background: transparent;
    border-bottom: none;
    padding: 0;
  }
`;

const TotymImageSection = styled.div`
  width: 100%;
`;

const DesktopModalContent = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: block;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid #c7c7c7;
  display: ${({ isMore }) => (isMore ? 'block' : 'none')};
  flex-grow: 1;
  margin: 1rem 0rem;
  position: relative;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: block;
  }
`;
const StyledSearchIcon = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.base900};
  display: flex;
  height: 100%;
  justify-content: center;
  line-height: 0.313rem;
  margin-left: 0.5rem;
  pointer-events: none;
  position: absolute;
`;
const SuggestedSection = styled.div`
  display: ${({ isMore }) => (isMore ? 'flex' : 'none')};
  flex-flow: column;
  margin-bottom: 4rem;
  min-height: 17rem;
  overflow: auto;
  padding: 0 0.75rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    border-bottom: 1px solid #ebebeb;
    display: flex;
    margin-bottom: 2rem;
    max-height: 19rem;
    min-height: 19rem;
  }
`;
const SuggestedTitle = styled(HeaderTitle)`
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  text-align: left;
  width: 100%;
`;
const SuggestedPerson = styled.div`
  align-items: center;
  display: ${({ searchAble }) => (searchAble ? 'flex' : 'none')};
  justify-content: space-between;
`;
const PersonInfoName = styled(HeaderTitle)`
  font-size: 0.875rem;
  line-height: 1rem;
`;
const CheckMarkIcon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.938rem;
  padding-right: 1.875rem;
  width: 30%;
`;

const ButtonSection = styled.div`
  padding: 0.75rem;
`;
const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.orange};
  border-radius: 0.25rem;
  padding: 1rem 0;
  text-align: center;
  width: 100%;
`;
const ButtonLabel = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.313rem;
  text-transform: capitalize;
`;
const FooterSection = styled.div`
  margin-left: -0.5rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: ${({ isMore }) => (isMore ? 'flex' : 'none')};
  }
`;
const MobileSuggestedPerson = styled.div`
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ isMore }) => (isMore ? 'none' : '1px solid #ebebeb')};
  flex-flow: column;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: ${({ isMore }) => (isMore ? 'none' : 'flex')};
  }
`;
const MobileSuggestedPersonTitle = styled(PersonInfoName)`
  width: 100%;
  font-weight: 500;
  letter-spacing: -0.05px;
  text-align: center;
  padding-bottom: 0.875rem;
  padding-top: 0;
`;
const MobileSuggestedPersonInfo = styled(MobileSuggestedPerson)`
  width: 25%;
  border: 0;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: flex;
  }
`;
const MobileSuggestedPersonContent = styled(MobileSuggestedPerson)`
  width: 100%;
  flex-flow: row;
  padding-bottom: 0.75rem;
`;
const SocialContent = styled(MobileSuggestedPersonContent)`
  padding: 0.75rem 0;
  border-bottom: 0px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 0;
    display: flex;
  }
`;
const MobileSuggestedPersonName = styled(PersonInfoName)`
  font-size: 0.625rem;
  line-height: 0.75rem;
  padding: 0;
  padding-top: 0.5rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1rem;
    line-height: 1rem;
    padding: 1rem;
  }
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  inputRoot: {
    width: '100%',
    color: 'inherit',
    paddingLeft: '2.375rem',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    fontSize: '16px',
    width: '100%',
  },
  modalWrapper: {
    overflow: 'scroll',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ShareModal = ({
  fullSharableUrl,
  handleModalClose,
  isOpen,
  totym,
  user,
}) => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const [isMore, setIsMore] = useState(false);
  const { breakpoints } = useTheme();
  const [iconSize, setIconSize] = useState(0);
  const [suggestUsers, setSuggestUsers] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const [selectedUsers, setSelectedUsers] = useState([]);

  const suggestedUsers = [
    {
      user: user,
    },
    {
      user: user,
    },
    {
      user: user,
    },
  ];

  const handleSearch = (e) => {
    setSearchWord(e.target.value);
  };

  useEffect(async () => {
    if (isOpen) {
      try {
        const apolloClient = initializeApollo();
        const { data, loading } = await apolloClient.query({
          query: VERIFIED_USERS,
        });
        if (loading) return <Loader />;
        if (data) {
          setSuggestUsers(
            data.users.map((user) => ({
              user,
              isSelected: false,
              isSearch: true,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsMore(false);

    if (isMobile) {
      setIconSize(40);
    } else {
      setIconSize(75);
    }
    if (!isOpen) {
      setSelectedUsers([]);
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    let tempData = [...suggestUsers];
    setSuggestUsers(
      tempData.map((user) => {
        if (
          user.user.username?.includes(searchWord) ||
          user.user.name?.includes(searchWord) ||
          searchWord === ''
        ) {
          user.isSearch = true;
        } else {
          user.isSearch = false;
        }
        return user;
      })
    );
  }, [searchWord]);

  const handleSuggestedUserCheck = (checkedIndex) => {
    let tempData = [...suggestUsers];
    let users = [];
    tempData[checkedIndex].isSelected = !tempData[checkedIndex].isSelected;
    tempData.forEach((user) => {
      if (user.isSelected)
        users.push({
          read: false,
          userId: user.user.id,
        });
    });
    setSelectedUsers(users);
    setSuggestUsers(tempData);
  };

  const handleShare = async () => {
    if (selectedUsers.length == 0) return;
    try {
      const apolloClient = initializeApollo();
      const { data, loading } = await apolloClient.mutate({
        mutation: CREATE_REQUESTANDSHARED_MUTATION,
        variables: {
          totymTitle: 'Share',
          type: 'SHARED',
          users: {
            createMany: {
              data: selectedUsers,
            },
          },
          totym: { connect: { id: totym.id } },
          sender: { connect: { id: user.id } },
        },
      });
      if (loading) return <Loader />;
      toast.success('Successfully Shared', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        onClose: () => {
          handleModalClose();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareByUser = (selectedUser) => {
    setSelectedUsers([
      {
        read: false,
        userId: selectedUser.id,
      },
    ]);
    handleShare();
  };

  const pluralUsername = pluralize(user.username);
  const fullTitle = `${pluralUsername} ${totym.title}`;

  const socialSetion = (
    <SocialContent>
      <MobileSuggestedPersonInfo>
        <a
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
          href={`mailto:?subject=Check out ${totym.title}&body=Hello There! ${session?.user.name} wants you to check out this rad totym, yo! ${fullSharableUrl}`}
        >
          <MessageIcon width={iconSize} height={iconSize} />
          <MobileSuggestedPersonName>Mail</MobileSuggestedPersonName>
        </a>
      </MobileSuggestedPersonInfo>
      <MobileSuggestedPersonInfo>
        <a
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
          href={`https://twitter.com/intent/tweet?text=${fullTitle}&url=${fullSharableUrl}`}
          target="_blank"
        >
          <TwitterIcon width={iconSize} height={iconSize} />
          <MobileSuggestedPersonName>Twitter</MobileSuggestedPersonName>
        </a>
      </MobileSuggestedPersonInfo>
      <MobileSuggestedPersonInfo>
        <a
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
          href={`https://facebook.com/sharer.php?u=${fullSharableUrl}`}
          target="_blank"
        >
          <FacebookIcon width={iconSize} height={iconSize} />
          <MobileSuggestedPersonName>Facebook</MobileSuggestedPersonName>
        </a>
      </MobileSuggestedPersonInfo>
      <MobileSuggestedPersonInfo>
        <button
          style={{
            alignItems: 'center',
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => navigator.clipboard.writeText(`${fullSharableUrl}`)}
        >
          <CopyLinkIcon width={iconSize} height={iconSize} />
          <MobileSuggestedPersonName>Copy Link</MobileSuggestedPersonName>
        </button>
      </MobileSuggestedPersonInfo>
    </SocialContent>
  );

  const searchSection = (
    <SearchContainer isMore={isMore}>
      <StyledSearchIcon>To:</StyledSearchIcon>
      <InputBase
        placeholder="Search..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleSearch(e)}
      />
    </SearchContainer>
  );

  const suggestedSection = (
    <SuggestedSection isMore={isMore}>
      <SuggestedTitle>Suggested</SuggestedTitle>
      {suggestUsers &&
        suggestUsers.map((user, i) => (
          <SuggestedPerson searchAble={user.isSearch} key={i}>
            <UserCard
              user={user?.user}
              onClick={() => handleSuggestedUserCheck(i)}
            />
            <CheckMarkIcon onClick={() => handleSuggestedUserCheck(i)}>
              <CheckBoxIcon isCheck={user?.isSelected} />
            </CheckMarkIcon>
          </SuggestedPerson>
        ))}
    </SuggestedSection>
  );

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        className={classes.modalWrapper}
      >
        <StyledModal className={classes.paper} isMore={isMore}>
          <MobileModalContent>
            <MobileHeader isMore={isMore}>
              <MobileCloseContent onClick={handleModalClose}>
                <CloseIcon />
              </MobileCloseContent>
              <MobileHeaderTitle>Share With</MobileHeaderTitle>
              <MobileShareButton
                onClick={() => handleShare()}
                disabled={selectedUsers.length == 0}
              >
                Share
              </MobileShareButton>
            </MobileHeader>

            <TotymSection isMore={isMore}>
              <TotymImageSection>
                <Card totym={totym} isMore={isMore} />
              </TotymImageSection>
            </TotymSection>

            <MobileSuggestedPerson isMore={isMore}>
              <MobileSuggestedPersonTitle>
                Share with
              </MobileSuggestedPersonTitle>
              <MobileSuggestedPersonContent>
                {suggestUsers &&
                  suggestUsers.slice(0, 3).map((user, i) => (
                    <MobileSuggestedPersonInfo
                      key={i}
                      onClick={() => handleShareByUser(user.user)}
                    >
                      <Avatar user={user.user} width="30px" height="30px" />
                      <MobileSuggestedPersonName>
                        {user.user.username}
                      </MobileSuggestedPersonName>
                    </MobileSuggestedPersonInfo>
                  ))}
                <MobileSuggestedPersonInfo onClick={() => setIsMore(!isMore)}>
                  <MoreButtonIcon />
                  <MobileSuggestedPersonName>More</MobileSuggestedPersonName>
                </MobileSuggestedPersonInfo>
              </MobileSuggestedPersonContent>
              {socialSetion}
            </MobileSuggestedPerson>
            {searchSection}
            {suggestedSection}
            <FooterSection isMore={isMore}>
              <SideBar />
            </FooterSection>
          </MobileModalContent>
          <DesktopModalContent>
            <HeaderContent>
              <TotymSection isMore={isMore}>
                <TotymImageSection>
                  <Card totym={totym} isMore={isMore} />
                </TotymImageSection>
              </TotymSection>
              <CloseContent onClick={handleModalClose}>
                <CloseIcon />
              </CloseContent>
            </HeaderContent>
            <HeaderContent>
              <HeaderTitle>Share with Followers</HeaderTitle>
            </HeaderContent>
            {searchSection}
            {suggestedSection}
            <ButtonSection>
              <StyledButton
                onClick={() => handleShare()}
                disabled={selectedUsers.length == 0}
              >
                <ButtonLabel>Share</ButtonLabel>
              </StyledButton>
            </ButtonSection>
            {socialSetion}
          </DesktopModalContent>
        </StyledModal>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ShareModal;

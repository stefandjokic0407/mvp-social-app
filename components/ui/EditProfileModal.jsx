import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import router from 'next/router';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { initializeApollo } from '../../apollo/client';
import { CHECK_USER } from '../../graphql/queries';
import { UPDATE_USER } from '../../graphql/mutations';
import Avatar from './Avatar';
import InputCard from './InputCard';
import Loader from '../Loader';
import Modal from '../Modal';

export const StyledModal = styled.div`
  bottom: 0;
  height: 100vh;
  left: unset;
  outline: none;
  padding: 0.5rem;
  position: sticky;
  top: unset;
  transform: none;

  ${({ theme }) => theme.breakpoints.up('md')} {
    bottom: unset;
    height: auto;
    left: 50%;
    padding: 0.5rem;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  position: absolute;
  right: 2rem;
  top: 1rem;
  z-index: 10;

  &:before {
    color: ${({ theme }) => `${theme.colors.orange}`};
    content: '×';
    font-size: 2em;
    font-weight: bold;
    line-height: 1;
    opacity: 0.5;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    right: 3rem;
    top: 2rem;
  }
`;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const StyleInputSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  width: 18rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 1rem;
    width: 30rem;
  }
`;

const StyledTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledUpdateButton = styled(Button)`
  background: ${({ theme }) => `${theme.colors.white}`};
  border-radius: 0.313rem;
  border: 1px solid ${({ theme }) => `${theme.colors.orange}`};
  box-sizing: border-box;
  color: ${({ theme }) => `${theme.colors.orange}`};
  font-family: ${({ theme }) => `${theme.fontFamily.body}`};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.05px;
  line-height: 1.313rem;
  margin-top: 1.75rem;
  padding: 1rem 3.125rem;
  text-transform: capitalize;
  width: 15rem;

  &:hover {
    background: transparent;
  }

  &:disabled {
    border: 1px solid ${({ theme }) => `${theme.colors.gray.base100}`};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    width: 10rem;
  }
`;

const StyledSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const EditProfileModal = ({
  description = '',
  onClose,
  setUser,
  show,
  title = 'Modal',
  user,
}) => {
  const apolloClient = initializeApollo();
  const [session, loading] = useSession();
  const [isValid, setIsValid] = useState(true);
  const [isLoad, setIsLoad] = useState(false);

  const {
    data,
    loading: queryLoad,
    refetch,
  } = useQuery(CHECK_USER, {
    variables: {
      username: user?.username,
      userId: user?.id,
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = (type, newValue) => {
    type === 'Profile Description' ? (type = 'bio') : type;
    setUser((prevState) => {
      return {
        ...prevState,
        [type]: newValue,
      };
    });
  };

  const handlePublish = async () => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          data: {
            name: {
              set: user.name,
            },
            bio: {
              set: user.bio,
            },
            username: {
              set: user.username,
            },
          },
          where: {
            id: user.id,
          },
        },
      });
      if (!data) return <Loader />;
      else {
        setUser(data.updateUser);
        handleClose();
        router.push(`/api/auth/session?profile=${user.username}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckUsername = (newValue) => {
    if (newValue != '') refetch();
    if (!queryLoad) {
      setIsLoad(false);
      if (data.findFirstUser) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      setIsLoad(true);
    }
  };

  if (loading || user == null) return <Loader />;

  return (
    <Modal
      onClose={onClose}
      show={show}
      title={title}
      description={description}
    >
      <StyledCloseButton
        aria-label="Close"
        data-dismiss="modal"
        onClick={onClose}
        type="button"
      />
      <StyledModal>
        <StyledContainer>
          <StyleInputSection>
            <StyledTitle>Edit Profile</StyledTitle>
            <InputCard
              label="name"
              value={`${user.name ? user.name : ''}`}
              handleUpdate={handleUpdate}
            />
            <InputCard
              label="Profile Description"
              value={`${user.bio ? user.bio : ''}`}
              handleUpdate={handleUpdate}
            />
            <InputCard
              label="username"
              value={`${user.username ? user.username : ''}`}
              handleUpdate={handleUpdate}
              handleCheckUsername={handleCheckUsername}
              isValid={isValid}
              isLoad={isLoad}
            />
            <StyledSection>
              <StyledUpdateButton
                onClick={() => handlePublish()}
                disabled={
                  user.name == null ||
                  user.name == '' ||
                  user.username == null ||
                  user.username == '' ||
                  !isValid
                }
              >
                Update
              </StyledUpdateButton>
            </StyledSection>
          </StyleInputSection>
        </StyledContainer>
      </StyledModal>
    </Modal>
  );
};

export default EditProfileModal;

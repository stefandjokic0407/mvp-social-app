import React, { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { addApolloState, initializeApollo } from '../../apollo/client';
import { UPDATE_USER } from '../../graphql/mutations';
import { GET_USER_BY_EMAIL, CHECK_USER } from '../../graphql/queries';
import Seo from '../../components/Seo';
import { appUrl, siteInfo } from '../../utils/config';
import Loader from '../../components/Loader';
import InputCard from '../../components/ui/InputCard';
import Avatar, { DEFAULT_AVATAR } from '../../components/ui/Avatar';
import { getHostnameFromRegex, getCloudinaryImageUrl } from '../../utils';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const StyleInputSection = styled.div`
  border: 0;
  max-width: 500px;
  padding: 0;
  width: 90%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    border-radius: 0.25rem;
    box-shadow: 0px 0px 4px rgb(0 0 0 / 25%);
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1rem;
    width: 33.75rem;
  }
`;

const StyledTitle = styled.h1`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.05px;
  line-height: 1rem;
  margin-bottom: 1rem;
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
    width: 8.75rem;
  }
`;

const StyledSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledAvatarSection = styled(StyledSection)`
  cursor: pointer;
  margin-bottom: 1rem;
`;

const StyledCheckBoxLabel = styled.label`
  align-items: flex-start;
  display: flex;
  font-size: 0.8rem;
  margin-top: 2rem;

  a {
    color: ${({ theme }) => `${theme.colors.primary.main}`};
  }
`;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const apolloClient = initializeApollo();

  const { data: userData } = await apolloClient.query({
    query: GET_USER_BY_EMAIL,
    variables: { email: session.user.email },
  });

  return addApolloState(apolloClient, {
    props: {
      session,
      userData,
      initialApolloState: apolloClient.cache.extract(),
    },
  });
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function newUser({ userData }) {
  const apolloClient = initializeApollo();
  const [user, setUser] = useState(userData.user);
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [termsChecked, setTermsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

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
    if (!isValid) return;
    let imageUrl = user.image && (await getCloudinaryImageUrl(user.image));
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
            image: {
              set: imageUrl || DEFAULT_AVATAR,
            },
          },
          where: {
            id: user.id,
          },
        },
      });
      if (!data) return <Loader />;
      else {
        router.push('/api/auth/session?update=true');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
          defaultSource: 'image_search',
          googleApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY}`,
          multiple: false,
          sources: [
            'url',
            'local',
            'camera',
            'image_search',
            'unsplash',
            'facebook',
            'instagram',
            'google_drive',
          ],
          thumbnails: '.uploadedImages',
          uploadPreset: `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
        },
        (error, { event, info }) => {
          if (!error && event === 'success') {
            setUser((prevState) => {
              return {
                ...prevState,
                ['image']: info.secure_url,
              };
            });
          }
        }
      )
      .open();
  };

  const handleCheckUsername = (newValue) => {
    if (newValue != '') refetch();
    if (!queryLoad) {
      setIsLoad(false);
      if (!data.findFirstUser) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsLoad(true);
    }
  };

  if (user == null) return <Loader />;
  return (
    <>
      <Seo
        author=""
        description=""
        title="New User"
        image={siteInfo.image}
        url={`${appUrl}/auth/new-user`}
      />
      <StyledContainer>
        <StyleInputSection>
          <StyledTitle>User Profile</StyledTitle>
          <StyledAvatarSection onClick={() => handleUpload()}>
            <Avatar user={user} width="75px" height="75px" />
          </StyledAvatarSection>
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
          <StyledCheckBoxLabel>
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleCheckboxChange}
            />
            <span>
              Before getting started, please read and accept our Beta{' '}
              <Link href="/terms-of-use" passHref>
                <a target="_blank" rel="noreferrer">
                  Terms and Conditions
                </a>
              </Link>
            </span>
          </StyledCheckBoxLabel>

          <StyledSection>
            <StyledUpdateButton
              onClick={() => handlePublish()}
              disabled={
                user.name == null ||
                user.name == '' ||
                user.username == null ||
                user.username == '' ||
                !termsChecked ||
                !isValid
              }
            >
              Update
            </StyledUpdateButton>
          </StyledSection>
        </StyleInputSection>
      </StyledContainer>
    </>
  );
}

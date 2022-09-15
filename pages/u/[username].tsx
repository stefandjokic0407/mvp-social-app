import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { UPDATE_USER } from '../../graphql/mutations';
import {
  GET_TOTYMS_BY_USERNAME,
  GET_USER_BY_USERNAME,
} from '../../graphql/queries';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Avatar from '../../components/ui/Avatar';
import ProfileFeedCard from '../../components/ui/ProfileFeedCard';
import Seo from '../../components/Seo';
import { appUrl } from '../../utils/config';
import { addApolloState, initializeApollo } from '../../apollo/client';
import { InferGetServerSidePropsType } from 'next';
import PublishIcon from '../../components/svgs/PublishIcon';
import BlackSavedIcon from '../../components/svgs/BlackSavedIcon';
import EditProfileModal from '../../components/ui/EditProfileModal';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin: 1rem auto;
  }
`;

const FlexWrapper = styled.div`
  align-items: center;
  display: flex;
  font-family: ${({ theme }) => `${theme.fontFamily.body}`};
  justify-content: space-between;
`;

const UserDeetsWrapper = styled.div`
  padding-left: 0.625rem;
  width: calc(100% - 5.5rem);

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-left: 2rem;
    position: relative;
    width: calc(100% - 8.75rem);
  }
`;
const UploadPhotoButton = styled.button`
  background: transparent;
  border: none;
  font-size: 0.75rem;
  position: absolute;
  text-decoration: underline;
  top: 70px;
  width: 72px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1rem;
    top: 140px;
    width: 140px;
  }
`;
const UserProfileStats = styled.div`
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 8.75rem;
  }
`;
const ActionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2rem);

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: calc(100% - 4rem);
  }
`;
const UsernameSection = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 1.375rem;
  line-height: 1rem;
  letter-spacing: -0.05px;
  color: ${({ theme }) => `${theme.colors.gray.base900}`};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;
const EditButton = styled(Button)`
  margin-left: 1.25rem;
  background: ${({ theme }) => `${theme.colors.orange}`};
  border: 1px solid ${({ theme }) => `${theme.colors.orange}`};
  box-sizing: border-box;
  border-radius: 0.25rem;
  font-family: ${({ theme }) => `${theme.fontFamily.body}`};
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.25rem;
  letter-spacing: -0.05px;
  text-transform: capitalize;
  color: ${({ theme }) => `${theme.colors.white}`};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `${theme.colors.orange}`};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 0.625rem;
    font-weight: 500;
    line-height: 0.75rem;
  }
`;

// const StyledProfileSettingSection = styled.div`
//   display: flex;
//   align-items: center;
//   position: absolute;
//   right: 0;
//   cursor: pointer;
// `;

const DescriptionSection = styled.div`
  margin-top: 0;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-top: 0.5rem;
  }
`;

const StyledUserNameSection = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 0.775rem;
  line-height: 1rem;
  letter-spacing: -0.05px;
  color: ${({ theme }) => `${theme.colors.gray.base900}`};

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: normal;
  }
`;

const StyledUserDescription = styled.span`
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 0.625rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: space-between;
  padding: 1rem 0;
  margin: 0 auto 6rem;
  width: 100%;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <CardWrapper>{children}</CardWrapper>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  gap: {
    gap: '10px',
  },
  root: {
    borderBottom: '1px solid #C4C4C4',
    marginTop: '2rem',
    width: '100%',
  },
  tabRoot: {
    textTransform: 'capitalize',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1.25rem',
    lineHeight: '1rem',
    letterSpacing: '-0.05px',
    color: ' #B2B2B2',
  },
  tabSelected: {
    color: '#000000',
  },
  iconLabelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
}));

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const apolloClient = initializeApollo();
  const username = ctx.query.username;

  const { data: userData } = await apolloClient.query({
    query: GET_USER_BY_USERNAME,
    variables: { username },
  });

  const { data: totymData } = await apolloClient.query({
    query: GET_TOTYMS_BY_USERNAME,
    variables: { username },
  });

  return addApolloState(apolloClient, {
    props: {
      session,
      userData,
      totymData,
      initialApolloState: apolloClient.cache.extract(),
    },
  });
}

export default function Profile({
          session,
          userData: { user: userDataOfViewedProfilePage },
          totymData: { totyms },
        }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!userDataOfViewedProfilePage || !totyms) return <Loader />;
  const isMyProfile = session.user.email === userDataOfViewedProfilePage.email;

  const apolloClient = initializeApollo();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(userDataOfViewedProfilePage);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  useEffect(() => {
    setUser(userDataOfViewedProfilePage);
  }, [userDataOfViewedProfilePage]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageMutation = async (url) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          data: {
            image: {
              set: url,
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
        router.push(`/api/auth/session?profile=${user.username}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = () => {
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
            handleImageMutation(info.secure_url);
          }
        }
      )
      .open();
  };

  const avatarFilename = userDataOfViewedProfilePage.image.substring(
    userDataOfViewedProfilePage.image.lastIndexOf('/') + 1
  );
  const customCloudinaryImage = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/ar_2.0,c_crop/w_100,g_south_west,x_20,y_15,ar_1.0,c_fill,r_max,bo_3px_solid_white,l_web_uploads:${avatarFilename}/e_colorize,co_black,l_text:Arial_36:${userDataOfViewedProfilePage.username},g_south_west,x_140,y_50/v1642478333/logos/TYM-Logo-Tagline-whitebg-social-share_xcul5m.jpg`;

  return (
    <>
      <Seo
        author={userDataOfViewedProfilePage.username}
        description={`${userDataOfViewedProfilePage.username}'s profile page`}
        title={`${userDataOfViewedProfilePage.username}'s profile page`}
        image={customCloudinaryImage}
        url={`${appUrl}/u/${userDataOfViewedProfilePage.username}`}
      />
      <Layout>
        <StyledContainer>
          <FlexWrapper>
            <UserProfileStats>
              <Avatar
                user={user}
                width={`${isMobile ? '72px' : '140px'}`}
                height={`${isMobile ? '72px' : '140px'}`}
              />
              {isMyProfile && (
                <UploadPhotoButton onClick={() => handleImageUpload()}>
                  Update Photo
                </UploadPhotoButton>
              )}
            </UserProfileStats>
            <UserDeetsWrapper>
              <ActionSection>
                {isMobile ? (
                  <UsernameSection>{user.name}</UsernameSection>
                ) : (
                  <UsernameSection>@{user.username}</UsernameSection>
                )}
                {isMyProfile && (
                  <EditButton onClick={() => setShowModal(true)}>
                    Edit Profile
                  </EditButton>
                )}
                {/* <StyledProfileSettingSection>
                  <ProfileSettingIcon
                    width={`${isMobile ? '18' : '45'}`}
                    height={`${isMobile ? '18' : '45'}`}
                  />
                </StyledProfileSettingSection> */}
              </ActionSection>
              <DescriptionSection>
                {isMobile ? (
                  <StyledUserNameSection>
                    @{user.username}
                  </StyledUserNameSection>
                ) : (
                  <StyledUserNameSection>{user.name}</StyledUserNameSection>
                )}
                <StyledUserDescription>{user.bio}</StyledUserDescription>
              </DescriptionSection>
            </UserDeetsWrapper>
          </FlexWrapper>
          <FlexWrapper>
            <Tabs
              value={value}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              classes={{
                root: classes.root,
                flexContainer: classes.flexContainer,
              }}
            >
              <Tab
                label={`${isMobile ? '' : 'Published'}`}
                icon={
                  <PublishIcon
                    width={`${isMobile ? '18' : '33'}`}
                    height={`${isMobile ? '18' : '33'}`}
                  />
                }
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                  wrapper: classes.iconLabelWrapper,
                }}
                {...a11yProps(0)}
              />
              <Tab
                label={`${isMobile ? '' : 'Saved'}`}
                icon={
                  <BlackSavedIcon
                    width={`${isMobile ? '18' : '33'}`}
                    height={`${isMobile ? '18' : '33'}`}
                  />
                }
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                  wrapper: classes.iconLabelWrapper,
                }}
                {...a11yProps(1)}
              />
            </Tabs>
          </FlexWrapper>
          <TabPanel value={value} index={0}>
            {totyms &&
              totyms.map((totym, index) => (
                <ProfileFeedCard totym={totym} key={index} />
              ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {user &&
              user.collections &&
              user.collections.map((collection, index) => (
                <ProfileFeedCard
                  totym={collection.totym}
                  key={index}
                  type="saved"
                />
              ))}
          </TabPanel>
        </StyledContainer>
      </Layout>
      <EditProfileModal
        description="Edit your profile"
        onClose={() => setShowModal(false)}
        setUser={setUser}
        show={showModal}
        title="Edit Profile"
        user={user}
      />
    </>
  );
}

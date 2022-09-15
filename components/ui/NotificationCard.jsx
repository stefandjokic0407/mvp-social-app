import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '@material-ui/core';
import Avatar from './Avatar';
import CreateTotymNotificationIcon from '../svgs/CreateTotymNotificationIcon';
import EllipsesMenu from './EllipsesMenu';
import MiniCard from './MiniCard';
import MoreButtonIcon from '../svgs/MoreButtonIcon';
import { DELETE_NOTIFICATION, MARK_AS_READ } from '../../graphql/mutations';
import { initializeApollo } from '../../apollo/client';
import { slugify } from '../../utils';

dayjs.extend(relativeTime);

const NotificationWrapper = styled.div`
  padding: 0 1rem 1rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.gray};
`;
const FlexRowSpace = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0px;
`;
const BadgeWrapper = styled.div`
  width: 20px;
`;
const UnreadCircle = styled.div`
  background-color: ${({ isRead }) => (isRead ? 'inherit' : '#ed683c')};
  border-radius: 50%;
  height: 10px;
  width: 10px;
`;
const NotificationTitle = styled.span`
  margin: 0 1rem 0 0.5rem;
  font-size: 0.8rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1rem;
  }
`;
const UserInfoWrapper = styled.div`
  align-items: center;
  display: flex;
`;
const Username = styled.span`
  font-weight: bold;
`;
const RequestTypeText = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  margin: 0 5px;
`;
const NotificationCommentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;
const Comment = styled.p`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 30%;
  min-width: 15rem;
  max-width: 20rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  padding: 0.5rem;
  margin-right: 1.625rem;

  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    top: calc(50% - 10px);
    bottom: auto;
    left: auto;
    right: -20px;
    border-width: 10px 0 10px 20px;
    border-color: transparent ${({ theme }) => theme.colors.border.gray};
    border-style: solid;
  }
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    top: calc(50% - 9px);
    bottom: auto;
    left: auto;
    right: -18px;
    border-width: 9px 0 9px 18px;
    border-color: transparent white;
    border-style: solid;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    min-width: 11rem;
  }
`;
const MoreButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  box-shadow: none;
  padding: 0;
  margin: 0 auto;

  &:hover {
    background: transparent;
    box-shadow: none;
  }
`;
const DateSection = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #bfbfbf;
`;

export default function NotificationCard({
  data: { id, notifications, read, user },
  handleRefetch,
}) {
  const apolloClient = initializeApollo();
  const formattedUpdatedAt = dayjs(notifications.createdAt).fromNow();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const router = useRouter();

  const notificationType = notifications.type;
  const isRequest = notificationType === 'REQUEST';
  const totymId = notifications.totym ? notifications.totym.id : null;
  const totymTitle = notifications.totym
    ? notifications.totym.title
    : notifications.totymTitle;
  const username = notifications.sender?.username;

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleEvent = async (totymTitle, isRequest, totymId, username) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: MARK_AS_READ,
        variables: {
          id: id,
          read: true,
        },
      });
      if (!data) return <Loader />;
      else {
        isRequest
          ? router.push({
              pathname: '/create',
              query: { title: totymTitle, totymId: null },
            })
          : router.push({
              pathname: `/totym/${username}/${slugify(totymTitle)}/${totymId}`,
            });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkasRead = async (notificationId) => {
    handleMenuClose();
    try {
      const { data } = await apolloClient.mutate({
        mutation: MARK_AS_READ,
        variables: {
          id: notificationId,
          read: true,
        },
      });
      if (!data) return <Loader />;
      else {
        handleRefetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (notificationId) => {
    handleMenuClose();
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_NOTIFICATION,
        variables: {
          id: notificationId,
        },
      });
      if (!data) return <Loader />;
      else {
        handleRefetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotificationWrapper>
      <FlexRowSpace>
        <UserInfoWrapper>
          <BadgeWrapper>
            <UnreadCircle isRead={read} />
          </BadgeWrapper>
          <Avatar user={notifications.sender} width="60px" height="60px" />
          <NotificationTitle>
            <Username>{notifications.sender.name}</Username>
            <RequestTypeText>
              {isRequest ? 'requests' : 'shared'}
            </RequestTypeText>
            "{totymTitle}" with you
          </NotificationTitle>
        </UserInfoWrapper>
        <div>
          <DateSection>{formattedUpdatedAt}</DateSection>
          <MoreButton onClick={(e) => handleMenuOpen(e)}>
            <MoreButtonIcon />
          </MoreButton>
        </div>
      </FlexRowSpace>
      <NotificationCommentWrapper
        onClick={() => handleEvent(totymTitle, isRequest, totymId, username)}
      >
        <Comment isOpen={notifications.message}>
          {notifications.message}
        </Comment>
        {notifications.totym ? (
          <MiniCard totym={notifications.totym} type="notification" />
        ) : (
          <CreateTotymNotificationIcon
            width={`${isMobile ? '80px' : '100px'}`}
            height={`${isMobile ? '102px' : '132px'}`}
          />
        )}
      </NotificationCommentWrapper>
      <EllipsesMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMarkasRead={handleMarkasRead}
        handleRemove={handleRemove}
        ellipsesType="notification"
        notificationId={id}
      />
    </NotificationWrapper>
  );
}

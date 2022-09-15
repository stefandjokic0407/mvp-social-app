import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GET_ALL_TOTYMS, USERS } from '../../graphql/queries';
import { FOLLOW, UNFOLLOW } from '../../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  follow: {
    fontFamily: 'inherit',
    fontSize: '0.8rem',
    lineHeight: '1',
    marginLeft: theme.spacing(1),
  },
}));

export default function FollowButton({ followingId, isFollowing, userId }) {
  const classes = useStyles();
  const [followState, setFollowState] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, {
    variables: { followingId: followingId, userId: userId },
    // update(cache, { data: { updateUser } }) {
    // 	// Get the updated list of who you are following
    // 	const updatedFollowingFromResponse = updateUser.following

    // 	const { totyms } = cache.readQuery({ query: GET_ALL_TOTYMS })
    // 	cache.writeQuery({
    // 		query: GET_ALL_TOTYMS,
    // 		data: { totyms: { user: { following: updatedFollowingFromResponse } } },
    // 	})
    // },
    refetchQueries: [{ query: GET_ALL_TOTYMS }],
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: { followingId, userId },
    refetchQueries: [{ query: GET_ALL_TOTYMS }],
  });
  const handleFollow = async () => {
    if (followState) {
      setFollowState(false);
      try {
        await unfollowMutation();
      } catch (err) {
        console.error(err);
      }
    } else {
      setFollowState(true);
      try {
        await followMutation();
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Button
      className={classes.follow}
      color="primary"
      onClick={handleFollow}
      size="small"
      variant="contained"
    >
      {followState ? 'Following' : 'Follow'}
    </Button>
  );
}

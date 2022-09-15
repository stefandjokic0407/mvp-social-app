import fetch from 'cross-fetch';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VERIFIED_USERS, SUGGESTED_USERS } from '../../graphql/queries';
import { initializeApollo } from '../../apollo/client';
import UserCard from './UserCard';
import { ControlPointDuplicate } from '@material-ui/icons';

export default function RequestFromGroup({
  userlist,
  selectedUser,
  setUserList,
  setSelectedUser,
}) {
  const [open, setOpen] = React.useState(false);
  const [suggestUsers, setSuggestUsers] = React.useState([]);
  const [constSuggestUser, setConstSuggestUser] = React.useState([]);

  const loading = open && userlist.length === 0;

  React.useEffect(() => {
    (async () => {
      const apolloClient = await initializeApollo();
      const { data } = await apolloClient.query({
        query: VERIFIED_USERS,
      });
      setSuggestUsers(data.users);
      setConstSuggestUser(data.users);
    })();
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const apolloClient = await initializeApollo();
      const { data } = await apolloClient.query({
        query: VERIFIED_USERS,
      });
      if (active) {
        //Remove selected users from user list
        setUserList(data.users);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setUserList([]);
    }
  }, [open]);

  React.useEffect(() => {
    let indexs = [];
    for (let i = 0; i < selectedUser.length; i++) {
      for (let j = 0; j < constSuggestUser.length; j++) {
        if (selectedUser[i].id == constSuggestUser[j].id) {
          indexs.push(j);
          continue;
        }
      }
    }
    let temp_users = [...constSuggestUser];
    if (indexs.length > 0) {
      for (var i = indexs.length - 1; i >= 0; i--)
        temp_users.splice(indexs[i], 1);
    }
    setSuggestUsers(temp_users);
  }, [selectedUser]);

  return (
    <div>
      <Autocomplete
        multiple
        id="request_from"
        style={{ width: '100%' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selectedUser}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
        }}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={userlist}
        loading={loading}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ required: true }}
            label="Request From (Name or @Username)"
            variant="outlined"
            style={{ borderRadius: 3, fontSize: 20 }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <div
        className="suggest_users_content"
        style={{ width: '100%', padding: '0 20px', marginTop: 15 }}
      >
        <div style={{ marginBottom: 15 }}>
          <label style={{ fontSize: 20 }}>Suggested</label>
        </div>
        {suggestUsers &&
          suggestUsers.map((user, index) => {
            return index < 5 ? (
              <UserCard
                user={user}
                key={user.id}
                width="45px"
                height="45px"
                onClick={() => {
                  let exist_user = selectedUser.filter((v) => v.id == user.id);
                  if (exist_user.length == 0) {
                    setSelectedUser([...selectedUser, user]);
                  }
                }}
              />
            ) : null;
          })}
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Seo from '../components/Seo';
import { appUrl, siteInfo } from '../utils/config';
import { Formik, Field } from 'formik';
import { toast } from 'react-toastify';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import RequestFromGroup from '../components/ui/RequestFromGroup';
import Button from '@material-ui/core/Button';
import { useRequest } from '../hooks/useRequest';
import { initializeApollo } from '../apollo/client';
import { CREATE_REQUESTANDSHARED_MUTATION } from '../graphql/mutations';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestPage(props) {
  const router = useRouter();
  const [session, loading] = useSession();

  const {
    userlist,
    selectedUser,
    setUserList,
    setSelectedUser,
    title,
    setTitle,
    comment,
    setComment,
  } = useRequest();
  const { totymTitle } = router.query;
  const apolloClient = initializeApollo();
  useEffect(() => {
    if (totymTitle) {
      setTitle(totymTitle);
    }
  }, [totymTitle]);
  const handleTitleEvent = (e) => {
    setTitle(e.target.value);
  };
  const requestForm = async (values) => {
    if (selectedUser.length == 0) return;
    let users = selectedUser.map((v) => {
      return {
        read: false,
        userId: v.id,
      };
    });
    const { data: userData } = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email: session?.user?.email },
    });
    const requestData = {
      from: session.user.name,
      to: selectedUser.map((v) => v.email),
      title,
      message: values.comment || '',
    };
    await fetch('/api/request', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });

    await apolloClient.mutate({
      mutation: CREATE_REQUESTANDSHARED_MUTATION,
      variables: {
        totymTitle: title,
        message: values.comment,
        users: {
          createMany: {
            data: users,
          },
        },
        sender: { connect: { id: userData.user.id } },
      },
    });
    resetForm();
    router.push(`/`);
    toast.success('Request sent successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });

    return false;
  };

  const resetForm = () => {
    setTitle('');
    setComment('');
    setSelectedUser([]);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Seo
        author=""
        description=""
        title="Request a Totym"
        image={siteInfo.image}
        url={`${appUrl}/request`}
      />
      <Layout>
        {session ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="div"
              style={{
                width: '100%',
                height: 953,
                boxShadow: '0px 0px 4px rgb(0 0 0 / 25%)',
                boxSizing: 'border-box',
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: 17,
                  marginBottom: 22,
                }}
              >
                <label
                  style={{ color: '#ED683C', fontWeight: 600, fontSize: 20 }}
                >
                  Request a Totym from friends!
                </label>
              </div>
              <Formik
                initialValues={{
                  title: title,
                  comment: comment,
                }}
                onSubmit={requestForm}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div style={{ width: '100%', padding: '0 20px' }}>
                      <Field name="title">
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (
                          <div>
                            <TextField
                              variant="outlined"
                              label="Totym title"
                              style={{
                                width: '100%',
                                borderRadius: 3,
                                fontSize: 20,
                              }}
                              required
                              {...field}
                              name="title"
                              value={title}
                              onChange={(e) => handleTitleEvent(e)}
                            />
                            {meta.touched && meta.error && (
                              <div className="error">{meta.error}</div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        padding: '0 20px',
                        marginTop: 25,
                      }}
                    >
                      <RequestFromGroup
                        userlist={userlist}
                        selectedUser={selectedUser}
                        setUserList={setUserList}
                        setSelectedUser={setSelectedUser}
                      />
                    </div>
                    <div
                      style={{
                        width: '100%',
                        padding: '0 20px',
                        marginTop: 30,
                      }}
                    >
                      <TextField
                        value={formik.values.comment}
                        label="Comments"
                        name="comment"
                        multiline
                        rows={6}
                        variant="outlined"
                        style={{ width: '100%', borderRadius: 3, fontSize: 20 }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 30 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={
                          !formik.isValid ||
                          formik.isSubmitting ||
                          selectedUser.length == 0
                        }
                      >
                        Request
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </Box>
          </div>
        ) : (
          <h1>Please Sign In</h1>
        )}
      </Layout>
    </>
  );
}

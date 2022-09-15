import { useState } from 'react';
import { useSession } from 'next-auth/client';
import styled, { useTheme } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { appUrl, siteInfo } from '../utils/config';
import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  margin: 0 auto 5rem;
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0 auto 3rem;
    padding: 0 2rem;
  }
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.orange};
  margin: 0 auto 1rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 2rem auto 1rem;
  }
`;
const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray.base600};
  font-weight: 300;
  margin: 1rem auto 0;
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0.5rem auto 0;
    max-width: 70%;
  }

  &:last-of-type {
    font-weight: 200;
  }
`;
const TextAreaContainer = styled(TextareaAutosize)`
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  color: #7d7d7d;
  font-size: 1.25rem;
  line-height: 32px;
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    max-width: 90%;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    max-width: 70%;
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    max-width: 60%;
  }
`;
const StyledSubmitButton = styled(Button)`
  background: ${({ theme }) => `${theme.colors.orange}`};
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => `${theme.colors.secondary.main}`};
  color: ${({ theme }) => `${theme.colors.white}`};
  font-family: ${({ theme }) => `${theme.fontFamily.body}`};
  font-size: 1.2rem;
  margin-top: 1.75rem;
  padding: 1rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
  width: 10rem;

  &:hover {
    background: ${({ theme }) => `${theme.colors.secondary.main}`};

    box-shadow: 0px 0px 2px 2px
      ${({ theme }) => `${theme.colors.secondary.dark}`};
  }

  &:disabled {
    background: ${({ theme }) => `${theme.colors.gray.base300}`};
    border: 1px solid ${({ theme }) => `${theme.colors.gray.base300}`};
    text-shadow: none;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.5rem;
    padding: 1rem 3rem;
    width: 15rem;
  }
`;

export default function ContactPage(props) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [message, setMessage] = useState('');
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const resetForm = () => {
    setMessage('');
  };

  const handleSubmit = async (message: string) => {
    if (message.length > 0) {
      const contactData = {
        from: session.user?.name || session.user?.email,
        message,
      };

      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
      }).then(() => {
        resetForm();
        router.push(`/`);
        toast.success('Message sent successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
     }).catch((error) => {
       // Your error is here!
       console.log(error)

       toast.error('There was an issue submitting the contact form', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
     });

    }
    return;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Seo
        author=""
        description=""
        title="Contact Totym"
        image={siteInfo.image}
        url={`${appUrl}/contact`}
      />
      <Layout>
      {session ? (
        <MainContainer>
          <Title>Contact Us</Title>
          <SubTitle>Help Totym evolve.</SubTitle>
          <SubTitle>
            Please send us any feedback, bugs, questions or creative ideas!
          </SubTitle>
          <TextAreaContainer
            autoFocus
            placeholder="Your message..."
            minRows={isMobile ? '5' : '10'}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <StyledSubmitButton
            onClick={() => handleSubmit(message)}
            disabled={
              message === '' || message.length < 2 || message.trim() === ''
            }
          >
            Send
          </StyledSubmitButton>
        </MainContainer>
      ) : (
        <h1>Please Sign In</h1>
      )}
      </Layout>
    </>
  );
}

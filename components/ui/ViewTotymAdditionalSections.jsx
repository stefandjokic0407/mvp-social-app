import styled from 'styled-components';
import Avatar from './Avatar';
import DeleteIcon from '../svgs/DeleteIcon';
import FullImageMainCard from './FullImageMainCard';
import SendIcon from '@material-ui/icons/Send';
import { CREATE_COMMENT, DELETE_COMMENT } from '../../graphql/mutations';
import { GET_COMMENT_COUNT_BY_TOTYM } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { initializeApollo } from '../../apollo/client';

const MainCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const AdditionalSections = styled(MainCardWrapper)`
  margin: 2rem auto 6rem;
  scroll-margin-top: 100px; /* sticky header offset */
`;
const MoreCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('xl')} {
    flex-direction: row;
  }
`;
const CommentSection = styled.div`
  margin-top: 1rem;
  padding-right: 10px;
  width: 100%;
`;
const CommentCount = styled.p`
  font-size: 0.9rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.25rem;
  }
`;
const CommentFormWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const CommentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 0.35rem 0;
  position: relative;

  &:first-child {
    margin: 1rem 0;
  }
`;

const CommentText = styled.div`
  background: #efefef;
  border-radius: 5px;
  padding: ${({ isMyComment }) => isMyComment ? '0.5rem 2.2rem 0.5rem 1rem' : '0.5rem 1rem'};
  width: 100%;
`;
const CommentInput = styled.input`
  background: #efefef;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 100%;

  &:first-child {
    border-radius: 5px 0 0 5px;
  }
`;
const StyledAddCommentButton = styled.button`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  height: 40px;

  :disabled {
    background: #efefef;
    border: 1px solid ${({ theme }) => theme.colors.gray.base600};
    color: ${({ theme }) => theme.colors.gray.base600};
    cursor: not-allowed;
  }

  svg {
    font-size: 1.5rem;
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    svg {
      font-size: 1.75rem;
    }
  }

  label {
    font-size: 0.8rem;
  }
`;
const DeleteButton = styled.button`
  align-items: center;
  background: #efefef;
  border: none;
  display: flex;
  justify-content: center;
  margin-right: 4px;
  position: absolute;
  right: 5px;
`;

export default function ViewTotymAdditionalSections({
  commentCount,
  relatedTotyms,
  session,
  setCommentCount,
  totymComments,
  totymId,
}) {
  const apolloClient = initializeApollo();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(totymComments);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setComments(totymComments);
  }, [totymComments]);

  useEffect(() => {
    setCommentCount(commentCount);
  }, [commentCount]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      handleComment(comment);
    }
  }, [formErrors]);

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(comment));
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  //form validation handler
  const validate = (comment) => {
    let errors = {};

    if (!comment || comment.trim() === '') {
      errors.comment = 'Cannot be blank';
    } else if (comment.length < 2) {
      errors.comment = 'Comment must be more than 2 characters';
    }

    return errors;
  };

  const toggleSuccessMessage = () => {
    let successMessage = document.getElementsByClassName('success-msg');
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      successMessage[0].style.display = 'block';
      setTimeout(() => {
        successMessage[0].style.display = 'none';
      }, 3000);
    }
  };

  const handleComment = async (message) => {
    try {
      if (!message) return;
      const {
        data: { createComment },
      } = await apolloClient.mutate({
        mutation: CREATE_COMMENT,
        variables: {
          message,
          userId: Number(session.user.id),
          totymId: Number(totymId),
        },
        refetchQueries: [
          {
            query: GET_COMMENT_COUNT_BY_TOTYM,
            variables: {
              totymId: Number(totymId),
            },
          },
        ],
      });
      toggleSuccessMessage();
      setIsSubmitting(false);
      setComment('');
      setComments([createComment, ...comments]);
      setCommentCount(commentCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const {
        data: { deleteComment },
        refetch,
      } = await apolloClient.mutate({
        mutation: DELETE_COMMENT,
        variables: {
          id: commentId,
        },
      });
      setComments(
        comments.filter((comment) => comment.id !== deleteComment.id)
      );
      setCommentCount(commentCount - 1);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdditionalSections id="comments">
      <div style={{ width: '100%', marginTop: '-1.5rem' }}>
        <CommentSection>
          <CommentCount>
            {commentCount === 1 ? '1 Comment' : `${commentCount} Comments`}
          </CommentCount>
          <CommentFormWrapper>
            {session ? (
              <form onSubmit={handleSubmit} noValidate autocomplete="off">
                <span className="success-msg" style={{ display: 'none' }}>
                  Form submitted successfully
                </span>

                {formErrors.comment && (
                  <span className="error">{formErrors.comment}</span>
                )}
                <CommentRow>
                  <Avatar user={session?.user} height={'38px'} width={'38px'} />
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <CommentInput
                      id="comment"
                      name="comment"
                      placeholder="Add a comment..."
                      type="text"
                      onChange={handleChange}
                      value={comment}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleSubmit(event);
                        }
                      }}
                    />

                    <StyledAddCommentButton
                      type="submit"
                      disabled={
                        isSubmitting ||
                        Object.keys(formErrors).length > 0 ||
                        !comment
                      }
                    >
                      <SendIcon />
                    </StyledAddCommentButton>
                  </div>
                </CommentRow>
              </form>
            ) : null}

            {comments &&
              comments.map((comment, i) => {
                const isMyComment = session?.user.id === comment.user.id;

                return (
                  <CommentRow key={i}>
                    <Avatar
                      user={comment.user}
                      height={'38px'}
                      width={'38px'}
                    />
                    <CommentText isMyComment={isMyComment}>{comment.message}</CommentText>
                    {isMyComment && (
                      <DeleteButton
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <DeleteIcon />
                      </DeleteButton>
                    )}
                  </CommentRow>
                );
              })}
          </CommentFormWrapper>
        </CommentSection>
      </div>
      <div style={{ width: '100%' }}>
        <h3>More like this</h3>
        <MoreCards>
          {relatedTotyms.map((t) => (
            <FullImageMainCard key={t.id} totym={t} />
          ))}
        </MoreCards>
      </div>
    </AdditionalSections>
  );
}

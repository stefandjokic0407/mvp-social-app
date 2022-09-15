import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styled, { css, useTheme } from 'styled-components';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { useMediaQuery } from '@material-ui/core';

import { addApolloState, initializeApollo } from '../../../../apollo/client';
import {
  CREATE_COLLECTION,
  CREATE_COMMENT,
  DELETE_COLLECTION,
  DELETE_COMMENT,
} from '../../../../graphql/mutations';
import {
  GET_TOTYM,
  GET_RELATED_TOTYMS,
  GET_DEFAULT_RELATED_TOTYMS,
  GET_COMMENT_COUNT_BY_TOTYM,
} from '/graphql/queries';
import { useCarousel } from '../../../../hooks/useCarousel';
import Layout from '../../../../components/Layout';
import Loader from '../../../../components/Loader';
import Seo from '../../../../components/Seo';
import FullImageMainCard from '../../../../components/ui/FullImageMainCard';
import { appUrl } from '../../../../utils/config';
import { pluralize, slugify, truncateString } from '../../../../utils';

const ViewTotymAdditionalSections = dynamic(() =>
  import('../../../../components/ui/ViewTotymAdditionalSections')
);

const DEFAULT_IMAGE =
  'https://res.cloudinary.com/di9t1lu8j/image/upload/v1616126742/logos/TYM-Logo-Mark_Type-CMYK-Tagline_ed7jyn.svg';

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

const baseAnchorStyles = css`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;
const Title = styled.h1`
  ${baseAnchorStyles}
  display: flex;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 16px;
  justify-content: center;
  padding: 0 10px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.base600};
  }
`;
const StyledItemName = styled.h4`
  bottom: 0;
  color: white;
  font-size: 1.25rem;
  padding: 2rem 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;
const StyledBookMark = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 2rem;
  position: absolute;
  right: 0.5rem;
  bottom: 7.75rem;
  cursor: pointer;
`;
const StyledComment = styled(StyledBookMark)`
  bottom: 4rem;
`;
const StyledLabel = styled.span`
  display: flex;
  font-size: 0.75rem;
  font-style: normal;
  line-height: 1rem;
  justify-content: center;
  padding-top: 0.125rem;
  color: ${({ theme }) => theme.colors.white};
`;
const FlexRowSpace = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 10px 5px;
`;
const UserInfoWrapper = styled.div`
  align-items: center;
  display: flex;
`;
const Username = styled(Link)`
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;
const StyledUsernameAnchor = styled.a`
  ${baseAnchorStyles}
  display: flex;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 1.1px;
  margin-left: -5px;
  padding: 0 5px;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.base600};
  }
`;
const ActionItemsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const baseButtonStyles = css`
  display: flex;
  margin: 0 2px;
`;
const CollectionButton = styled.span`
  ${baseButtonStyles}
  margin-left: 0;
`;
const StatsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownWrapper = styled.span`
  ${baseButtonStyles}
  margin-right: 0;
  height: 25px;
  width: 25px;
  cursor: pointer;
  align-items: center;
`;
const ListItemsContainer = styled.div`
  width: 100%;

  @media (min-width: 600px) {
    margin-left: 0.25rem;
    margin-top: 10px;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin-left: 1rem;
  }
`;
const ListItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 0 0.5rem 0;
`;
const ListItemName = styled.h3`
  margin-top: -0.25em;
`;
const ListItemImage = styled.img`
  aspect-ratio: 3/2;
  background: ${({
    isCurrent,
  }) => `linear-gradient(#0f0f0f, #a0a0a0) padding-box,
  linear-gradient(to bottom, ${
    isCurrent ? '#ffbc49, #ca330f' : '#fff, #fff'
  }) border-box`};
  border-radius: 5px;
  border: 3px solid transparent;
  height: 70px;
  object-fit: cover;
  width: 100px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 100px;
    width: 143px;
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    height: 150px;
    width: 215px;
  }
`;
const ListItemDescription = styled.p`
  white-space: pre-line;
  word-break: break-word;
`;
const ItemMiniName = styled.span`
  color: ${({ theme }) => theme.colors.gray.base900};
  font-style: normal;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: -0.05px;
  white-space: pre-line;
  word-break: break-word;
  width: 40%;
`;
const Description = styled(ItemMiniName)`
  width: 58%;
  font-weight: 200;
  text-overflow: ellipsis;
`;
const UpdatedText = styled(Description)`
  font-size: 0.7rem;
  font-weight: normal;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 0.9rem;
  }
`;
const AvatarSection = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  const { data: totymData } = await apolloClient.query({
    query: GET_TOTYM,
    variables: { id: Number(ctx.query.id) },
  });

  const { data: relatedTotyms } = await apolloClient.query({
    query: GET_RELATED_TOTYMS,
    variables: {
      id: Number(ctx.query.id),
      searchTerm1: ctx.query.title.split('-')[0],
      searchTerm2: ctx.query.title.split('-')[1] || '',
    },
  });

  const { data: defaultRelatedTotyms } = await apolloClient.query({
    query: GET_DEFAULT_RELATED_TOTYMS,
    variables: {
      id: Number(ctx.query.id),
    },
  });

  const { data: totalComments } = await apolloClient.query({
    query: GET_COMMENT_COUNT_BY_TOTYM,
    variables: { totymId: Number(ctx.query.id) },
  });

  return addApolloState(apolloClient, {
    props: {
      totymData,
      relatedTotyms,
      defaultRelatedTotyms,
      totalComments: totalComments.aggregateComment._count._all,
      initialApolloState: apolloClient.cache.extract(),
    },
  });
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Totym({
  totymData: totym,
  relatedTotyms,
  defaultRelatedTotyms,
  totalComments,
}) {
  if (!totym) return <Loader />;

  const {
    totym: {
      id,
      title,
      description = '',
      items,
      user,
      collection,
      comments: totymComments,
    },
  } = totym;

  const {
    carouselState: { position, shouldSlide, direction },
    handlers,
    getOrder,
    jumpToSlide,
  } = useCarousel({ elements: items });

  const apolloClient = initializeApollo();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ellipsesType, setEllipsesType] = useState(false);
  const [bookMarks, setBookMarks] = useState(collection);

  const [commentCount, setCommentCount] = useState(totalComments);
  const [showMore, setShowMore] = useState(false);

  relatedTotyms =
    relatedTotyms.totyms.length !== 0
      ? relatedTotyms.totyms
      : defaultRelatedTotyms.totyms;

  useEffect(() => {
    setCommentCount(commentCount);
  }, [commentCount]);

  const handleProfileMenuOpen = (event) => {
    if (session.user.id === user.id) {
      setEllipsesType(true);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBookMark = async (data) => {
    try {
      if (!data) return;
      if (data.collections.length == 0) {
        const {
          data: { createCollection },
        } = await apolloClient.mutate({
          mutation: CREATE_COLLECTION,
          variables: {
            totym: { connect: { id: id } },
            user: { connect: { id: session.user.id } },
          },
        });
        setBookMarks([...bookMarks, createCollection]);
        refetch();
      } else {
        const {
          data: { deleteCollection },
        } = await apolloClient.mutate({
          mutation: DELETE_COLLECTION,
          variables: {
            id: data.collections[0].id,
          },
        });
        refetch();
        let deletedIndex = -1;
        let temp = [...bookMarks];
        temp.forEach((element, index) => {
          if (element.id == deleteCollection.id) {
            deletedIndex = index;
          }
        });
        if (deletedIndex > -1) {
          temp.splice(deletedIndex, 1);
          setBookMarks(temp);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const username = user.username;
  const generatedSlug = slugify(title);
  const pluralUsername = pluralize(username);
  const fullTitle = `${pluralUsername} ${title}`;
  const firstImage = items[0].image || DEFAULT_IMAGE;
  const firstImageFilename = firstImage.substring(
    firstImage.lastIndexOf('/') + 1
  );
  const avatarFilename = user.image.substring(user.image.lastIndexOf('/') + 1);

  const customCloudinaryImage = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/ar_2.0,c_crop/w_140,o_140,r_20,x_10,y_10,g_north_east,l_logos:totym-logo-bg-blur/w_140,l_logos:totym-logo-for-bg,g_north_east,x_10,y_10/w_100,g_south_west,x_20,y_15,ar_1.0,c_fill,r_max,bo_3px_solid_white,l_web_uploads:${avatarFilename}/e_colorize,co_white,l_text:Arial_36:${username},g_south_west,x_140,y_50/v1610333567/web_uploads/${firstImageFilename}`;

  const metaTags = {
    author: username,
    description: description || fullTitle,
    image: customCloudinaryImage,
    title: fullTitle,
    url: `${appUrl}/totym/${username}/${generatedSlug}/${id}`,
  };

  return (
    <>
      <Seo
        author={metaTags.author}
        description={metaTags.description}
        title={metaTags.title}
        image={metaTags.image}
        url={metaTags.url}
      />
      <Layout>
        <MainCardWrapper>
          <FullImageMainCard
            propPosition={position}
            shouldShowCarousel={false}
            totym={totym.totym}
            totalComments={commentCount}
          />
          <ListItemsContainer>
            {items.map((item, i) => {
              const isCurrent = item.id === items[position].id;

              return (
                <ListItem key={item.id}>
                  <ListItemImage
                    src={item.image}
                    isCurrent={isCurrent}
                    onClick={() => jumpToSlide(i)}
                  />
                  <div style={{ padding: '0 0.5rem' }}>
                    <ListItemName>{item.name}</ListItemName>
                    <ListItemDescription onClick={() => setShowMore(!showMore)}>
                      {truncateString(item.description, 50, showMore)}
                    </ListItemDescription>
                  </div>
                </ListItem>
              );
            })}
          </ListItemsContainer>
        </MainCardWrapper>
        <ViewTotymAdditionalSections
          commentCount={commentCount}
          relatedTotyms={relatedTotyms}
          session={session}
          setCommentCount={setCommentCount}
          totymComments={totymComments}
          totymId={id}
        />
      </Layout>
    </>
  );
}

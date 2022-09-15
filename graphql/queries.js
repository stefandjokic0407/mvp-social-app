import { gql } from '@apollo/client';

export const GET_ALL_TOTYMS = gql`
  query allTotyms {
    totyms(orderBy: { updatedAt: desc }) {
      id
      title
      value: id
      description
      coverPhoto
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        name
        username
        image
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_TOTYM = gql`
  query totym($id: Int!) {
    totym(where: { id: $id }) {
      id
      title
      coverPhoto
      createdAt
      updatedAt
      description
      location
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        image
        name
        username
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
      comments(orderBy: { createdAt: desc }) {
        id
        message
        user {
          id
          name
          username
          image
        }
        updatedAt
      }
    }
  }
`;

export const GET_TOTYMS_BY_USERNAME = gql`
  query userTotyms($username: String) {
    totyms(
      where: { user: { is: { username: { equals: $username } } } }
      orderBy: { updatedAt: desc }
    ) {
      id
      title
      coverPhoto
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        name
        username
        image
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query userByUsername($username: String!) {
    user(where: { username: $username }) {
      id
      name
      email
      bio
      username
      image
      createdAt
      updatedAt
      collections(orderBy: { totymId: desc }) {
        id
        totym {
          id
          title
          description
          items {
            id
            name
            description
            image
          }
          user {
            id
            name
            username
            image
          }
        }
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    user(where: { email: $email }) {
      id
      name
      username
      image
      bio
      createdAt
      updatedAt
      collections(orderBy: { totymId: desc }) {
        id
        totym {
          id
          title
          description
          items {
            id
            name
            description
            image
          }
          user {
            id
            name
            username
            image
          }
        }
      }
    }
  }
`;

export const MESSAGE = gql`
  query message {
    message @client
    severity @client
  }
`;

export const USERS = gql`
  query users {
    users {
      id
      username
      name
      email
      value: username
      image
    }
  }
`;
export const VERIFIED_USERS = gql`
  query users {
    users(where: {
      name: {
        not: {
          equals: null
        }
      },
      username: {
        not: {
          equals: null
        }
      }
    }) {
      id
      username
      name
      email
      value: username
      image
    }
  }
`;
// suggeted users
export const SUGGESTED_USERS = gql`
  query users {
    users(take: 5, skip: 0, where: {
      name: {
        not: {
          equals: null
        }
      },
      username: {
        not: {
          equals: null
        }
      }
    }) {
      id
      username
      name
      image
      email
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query requestAndSharedUsers($userId: IntFilter) {
    requestAndSharedUsers(
      where: { userId: $userId }
      orderBy: { notificationId: desc }
    ) {
      id
      read
      user {
        id
        name
        username
      }
      notifications {
        id
        sender {
          id
          name
          username
          image
        }
        totymTitle
        type
        message
        createdAt
        totym {
          id
          coverPhoto
          title
          items(orderBy: { orders: asc }) {
            id
            image
            orders
            link
          }
          collection {
            id
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const NOTIFICATIONS_COUNT = gql`
  query notification_count($userId: IntFilter!, $read: BoolFilter!) {
    aggregateRequestAndSharedUser(where: { userId: $userId, read: $read }) {
      _count {
        id
      }
    }
  }
`;

export const GET_COLLECTIONS_BY_USER = gql`
  query getCollectionByUser($userId: Int, $totymId: Int) {
    collections(
      where: { userId: { equals: $userId }, totymId: { equals: $totymId } }
    ) {
      id
    }
  }
`;

export const CHECK_USER = gql`
  query checkUsername($username: String, $userId: Int) {
    findFirstUser(
      where: {
        username: { equals: $username }
        id: { not: { equals: $userId } }
      }
    ) {
      id
      email
      username
    }
  }
`;

export const SEARCH_TOTYM = gql`
  query searchTotyms($search: String) {
    totyms(
      orderBy: { updatedAt: desc }
      where: {
        OR: [
          { title: { contains: $search, mode: insensitive } }
          {
            items: { some: { name: { contains: $search, mode: insensitive } } }
          }
          {
            user: {
              is: {
                OR: [
                  { name: { contains: $search, mode: insensitive } }
                  { username: { contains: $search, mode: insensitive } }
                ]
              }
            }
          }
        ]
      }
    ) {
      id
      title
      description
      coverPhoto
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        name
        username
        image
        followers {
          id
          username
        }
        following {
          id
          username
        }
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_USER = gql`
  query searchUsers($search: String) {
    users(
      where: {
        OR: [
          { name: { contains: $search, mode: insensitive } }
          { username: { contains: $search, mode: insensitive } }
        ]
      }
    ) {
      id
      name
      username
      value: username
      image
    }
  }
`;

export const GET_RELATED_TOTYMS = gql`
  query getRelatedTotyms(
    $id: Int!
    $searchTerm1: String!
    $searchTerm2: String!
  ) {
    totyms(
      where: {
        id: { not: { equals: $id } }
        OR: [
          { title: { contains: $searchTerm1, mode: insensitive } }
          { title: { contains: $searchTerm2, mode: insensitive } }
        ]
      }
      take: 2
      orderBy: { updatedAt: desc }
    ) {
      id
      title
      coverPhoto
      createdAt
      updatedAt
      items {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        image
        name
        username
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
    }
  }
`;

export const GET_DEFAULT_RELATED_TOTYMS = gql`
  query getDefaultRelatedTotyms($id: Int!) {
    totyms(
      where: { id: { not: { equals: $id } } }
      take: 2
      orderBy: { updatedAt: desc }
    ) {
      id
      title
      coverPhoto
      createdAt
      updatedAt
      items {
        id
        name
        description
        image
        orders
        link
        address
      }
      user {
        id
        image
        name
        username
      }
      collection {
        id
        user {
          id
          name
          username
          image
        }
      }
    }
  }
`;

export const GET_COMMENT_COUNT_BY_TOTYM = gql`
  query getCommentCountByTotyms($totymId: Int!) {
    aggregateComment(where: { totymId: { equals: $totymId } }) {
      _count {
        _all
      }
    }
  }
`;

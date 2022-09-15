import { gql } from '@apollo/client';

export const UPDATE_TOTYM = gql`
  mutation updateTotym(
    $title: StringFieldUpdateOperationsInput
    $description: NullableStringFieldUpdateOperationsInput
    $location: NullableStringFieldUpdateOperationsInput
    $coverPhoto: NullableStringFieldUpdateOperationsInput
    $createdAt: DateTimeFieldUpdateOperationsInput
    $updatedAt: DateTimeFieldUpdateOperationsInput
    $items: ItemUpdateManyWithoutTotymInput
    $notifications: RequestAndSharedUpdateManyWithoutTotymInput
    $user: UserUpdateOneRequiredWithoutTotymsInput
    $id: Int
  ) {
    updateTotym(
      data: {
        title: $title
        description: $description
        location: $location
        coverPhoto: $coverPhoto
        createdAt: $createdAt
        updatedAt: $updatedAt
        items: $items
        notifications: $notifications
        user: $user
      }
      where: { id: $id }
    ) {
      id
      title
      description
      location
      coverPhoto
      createdAt
      updatedAt
      user {
        id
        name
        username
        email
        image
      }
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
        link
        address
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

export const ADD_ITEM = gql`
  mutation addItem(
    $name: String!
    $description: String
    $image: String
    $link: String
    $address: String
    $orders: String
    $totym: TotymCreateNestedOneWithoutItemsInput!
  ) {
    createItem(
      data: {
        name: $name
        description: $description
        image: $image
        link: $link
        address: $address
        orders: $orders
        totym: $totym
      }
    ) {
      id
      name
      description
      image
      link
      address
      orders
    }
  }
`;
export const CREATE_TOTYM_MUTATION = gql`
  mutation publishTotym(
    $title: String!
    $description: String
    $location: String
    $coverPhoto: String
    $createdAt: DateTime
    $updatedAt: DateTime
    $items: ItemCreateNestedManyWithoutTotymInput
    $notifications: RequestAndSharedCreateNestedManyWithoutTotymInput
    $user: UserCreateNestedOneWithoutTotymsInput!
  ) {
    createTotym(
      data: {
        title: $title
        description: $description
        location: $location
        coverPhoto: $coverPhoto
        createdAt: $createdAt
        updatedAt: $updatedAt
        items: $items
        notifications: $notifications
        user: $user
      }
    ) {
      id
      title
      description
      user {
        id
        name
      }
      items(orderBy: { orders: asc }) {
        id
        name
        description
        image
        orders
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

export const FOLLOW = gql`
  mutation follow($followingId: Int!, $userId: Int!) {
    updateUser(
      data: { following: { connect: { id: $followingId } } }
      where: { id: $userId }
    ) {
      id
      username
      name
      image
      following {
        id
        username
      }
    }
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($followingId: Int!, $userId: Int!) {
    updateUser(
      data: { following: { disconnect: { id: $followingId } } }
      where: { id: $userId }
    ) {
      id
      username
      name
      image
      following {
        id
        username
      }
    }
  }
`;

export const CREATE_REQUESTANDSHARED_MUTATION = gql`
  mutation requestToUsers(
    $totymTitle: String
    $message: String
    $type: NotificationType
    $users: RequestAndSharedUserCreateNestedManyWithoutNotificationsInput
    $sender: UserCreateNestedOneWithoutNotificationsInput!
    $totym: TotymCreateNestedOneWithoutNotificationsInput
  ) {
    requestToUsers(
      data: {
        totymTitle: $totymTitle
        message: $message
        type: $type
        users: $users
        sender: $sender
        totym: $totym
      }
    ) {
      id
      users {
        id
        read
        user {
          id
          username
          name
          image
        }
      }
      sender {
        id
        username
        name
        image
      }
      totym {
        id
        description
        title
        items(orderBy: { orders: asc }) {
          id
          name
          description
          image
          orders
        }
      }
      totymTitle
      type
      message
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($id: Int!) {
    deleteCollection(where: { id: $id }) {
      id
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation collection(
    $user: UserCreateNestedOneWithoutCollectionsInput!
    $totym: TotymCreateNestedOneWithoutCollectionInput!
  ) {
    createCollection(data: { totym: $totym, user: $user }) {
      id
      user {
        id
        name
        username
        image
      }
      totym {
        id
        title
        description
        items {
          id
          name
          description
          image
          orders
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
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(where: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_USER_NAME = gql`
  mutation UpdateUserName($username: String, $userId: Int) {
    updateUser(data: { username: { set: $username } }, where: { id: $userId }) {
      id
      name
      email
      emailVerified
      username
      image
      role
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      name
      bio
      email
      emailVerified
      username
      image
      role
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TOTYM = gql`
  mutation deleteTotym($id: Int!) {
    deleteTotym(where: { id: $id }) {
      id
    }
  }
`;

export const DELETE_ALL_ITEMS = gql`
  mutation deleteAllItems($totymId: Int) {
    deleteManyItem(where: { totymId: { equals: $totymId } }) {
      count
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkasRead($id: Int, $read: Boolean) {
    updateRequestAndSharedUser(
      data: { read: { set: $read } }
      where: { id: $id }
    ) {
      id
      read
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: Int) {
    deleteRequestAndSharedUser(where: { id: $id }) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($message: String!, $userId: Int!, $totymId: Int!) {
    createComment(
      data: {
        message: $message
        user: { connect: { id: $userId } }
        totym: { connect: { id: $totymId } }
      }
    ) {
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
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(where: { id: $id }) {
      id
    }
  }
`;

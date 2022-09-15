import { gql } from '@apollo/client';

export const NOTIFICATIONS = gql`
  subscription notifications($userId: Float!) {
    notification(userId: $userId) {
      id
      read
      userId
      notificationId
    }
  }
`;

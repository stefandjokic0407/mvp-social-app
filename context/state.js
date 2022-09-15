import { createContext, useContext } from 'react';

const AppContext = createContext();
export const defaultValue = {
  data: {
    totyms: [
      {
        __typename: 'Totym',
        id: 28,
        title: 'Favorite Restaurants in the World',
        value: 28,
        description: null,
        coverPhoto: null,
        items: [
          {
            __typename: 'Item',
            id: 94,
            name: 'Paco Meralgo (Barcelona)',
            description: '',
            image:
              'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641391233/web_uploads/pnk2bq3cbwbrhsnkrfbh.jpg',
            orders: 'order-0',
            link: null,
            address: null,
          },
          {
            __typename: 'Item',
            id: 95,
            name: 'Terakawa (Nara)',
            description: '',
            image:
              'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641391272/web_uploads/qzjmsadelvtoturokttx.jpg',
            orders: 'order-1',
            link: null,
            address: null,
          },
          {
            __typename: 'Item',
            id: 96,
            name: 'Nautika (Dubrovnik)',
            description: '',
            image:
              'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641392908/web_uploads/yqn9ggzlpvnnu284axvf.jpg',
            orders: 'order-2',
            link: null,
            address: null,
          },
          {
            __typename: 'Item',
            id: 97,
            name: 'Bavel (Los Angeles)',
            description: '',
            image:
              'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641844440/web_uploads/r6fxqg4zwn8pdf6cod1p.png',
            orders: 'order-3',
            link: null,
            address: null,
          },
        ],
        user: {
          __typename: 'User',
          id: 30,
          name: 'Brian Knight',
          username: 'BKnight',
          image:
            'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641391057/web_uploads/gllpo9jah8nggspw5has.jpg',
          followers: [],
          following: [],
        },
        collection: [
          {
            __typename: 'Collection',
            id: 76,
            user: {
              __typename: 'User',
              id: 31,
              name: 'Chris Baucom',
              username: 'cb',
              image:
                'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641404068/web_uploads/bee7fnqzg2dk48axt0xv.jpg',
            },
          },
        ],
        createdAt: '2022-01-05T14:30:46.695Z',
        updatedAt: '2022-01-10T19:54:49.887Z',
      },
    ],
  },
  users: {
    users: [
      {
        __typename: 'User',
        id: 30,
        username: 'BKnight',
        name: 'Brian Knight',
        value: 'BKnight',
        image:
          'https://res.cloudinary.com/di9t1lu8j/image/upload/v1641391057/web_uploads/gllpo9jah8nggspw5has.jpg',
        followers: [],
        following: [],
      },
    ],
  },
};

export function AppWrapper({ children, value = defaultValue }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

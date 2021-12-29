import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApolloBase from 'next-with-apollo';
import { apiUrl } from '@cfs/api/utils';

const mainLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
  credentials: 'include',
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: message: ${message}, location: ${JSON.stringify(
          locations
        )}, path: ${JSON.stringify(path)}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const withApollo = withApolloBase(
  ({ initialState }): any => {
    return new ApolloClient({
      link: ApolloLink.from([onErrorLink, mainLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            queryType: true,
            fields: {
              getCfsByCat: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,
              },
              getCfsByCatSlug: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,
              },
              comments: {
                // Don't cache separate results based on
                // any of this field's arguments.
                keyArgs: false,
              },
            },
          },
        },
      }).restore(initialState || {}),
    });
  },
  {
    getDataFromTree,
  }
);

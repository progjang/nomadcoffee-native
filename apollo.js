import {ApolloClient, createHttpLink, InMemoryCache, makeVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async() => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

const authLink = setContext((_, {headers}) => {
    const token = tokenVar();
    return {
        headers: {
            ...headers,
            token,
        },
    };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(`GraphQL Error`, graphQLErrors);
    }
    if (networkError) {
      console.log("Network Error", networkError);
    }
  });

const uploadHttpLink = createUploadLink({
    //uri: "https://nomadcoffee-bk.herokuapp.com/graphql",
    uri: "https://pink-chipmunk-77.loca.lt/graphql",
});

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeCoffeeShops: offsetLimitPagination(),
        },
      },
    },
  });

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache,
});

export default client;
import {ApolloClient, createHttpLink, InMemoryCache, makeVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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


const httpLink = createHttpLink({
    //uri: "https://nomadcoffee-bk.herokuapp.com/graphql",
    uri: "https://splendid-cougar-8.loca.lt",
    //uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, {headers}) => {
    const token = tokenVar();
    return {
        headers: {
            ...headers,
            token,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
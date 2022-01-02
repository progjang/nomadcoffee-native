import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, Text, TextInput, Image, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { isLoggedInVar, logUserOut } from "../apollo";
import DismissKeyboard from "../components/auth/DismissKeyboard";

const SEARCH_COFFEESHOPS_QUERY = gql`
    query searchCoffeeShops($keyword: String!) {
        searchCoffeeShops(keyword: $keyword) {
            id
            name
            photos {
                id
                url
            }
        }
    }
`;

const SearchingContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const SearchingText = styled.Text`
    margin-top: 10px;
    color: white;
    font-weight: 600;
`;

const SearchInput = styled.TextInput`
    background-color: rgba(255,255,255,1);
    color: black;
    width: ${props => props.width /1.5}px;
    padding: 5px 10px;
    border-radius: 7px;
`;

function Search({navigation}) {
    const numColumns =2;
    const {width, height} = useWindowDimensions();
    const {setValue, register, watch, handleSubmit} = useForm();
    const [startSearchFn, {loading, data, called}] = useLazyQuery(SEARCH_COFFEESHOPS_QUERY);

    const onFormValid = ({keyword}) => {
       startSearchFn({
        variables: {
            keyword
        }
       }); 
    }
    const SearchBox = () => (
        <SearchInput
            width={width}
            style={{backgroundColor: "white"}}
            placeholderTextColor="black"
            placeholder="Search photos"
            autoCapitalize="none"
            returnKeyLabel="Search"
            onChangeText={(text) => setValue("keyword", text)}
            autoCorrect={false}
            onSubmitEditing={handleSubmit(onFormValid)}
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword",{
            required: true,
            minLength: 3,
        });
    },[]);
    console.log(data);
    const renderPhoto = (photo) => {
        return (
            <View key={photo.id}>
                <Image
                    style={{
                        width: width/2,
                        height: height/2
                    }}
                    source={{uri : photo.url}}
                />
            </View>
        )
    }
    const renderItem = ({item:shop}) => (
        <View>
        <Text style={{color: "white"}}>{shop.name}</Text>
        {shop.photos.length > 0 ? (shop.photos.map(renderPhoto)) : null }
        </View>
    )
    return (
        <DismissKeyboard>
            <View style={{ flex: 1, backgroundColor: "black"}}>
            {loading ? (
                <SearchingContainer>
                    <ActivityIndicator color="white" size="large" />
                    <SearchingText>Searching...</SearchingText>
                </SearchingContainer>
                 ) : null
            }
            {called ? null : (
                <SearchingContainer>
                    <SearchingText>Write CoffeeShop name for searching.</SearchingText>
                </SearchingContainer>
                 )
            }
            {data?.searchCoffeeShops !== undefined ? (
                data?.searchCoffeeShops?.length === 0 ? (
                    <SearchingContainer>
                        <SearchingText>Could not find anything.</SearchingText>
                    </SearchingContainer>
                ) : (
                <FlatList 
                    numColumns={numColumns}
                    data={data?.searchCoffeeShops}
                    keyExtractor={(shop) => "" + shop.id}
                    renderItem={renderItem}
                />
                ) 
            ) : null
            }
            </View>

        </DismissKeyboard>
    )
}

export default Search;
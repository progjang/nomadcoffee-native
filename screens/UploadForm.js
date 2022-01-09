import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const NameText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;

`;

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $photos: [Upload]) {
    createCoffeeShop(name: $name, photos: $photos) {
      ok
      error
    }
  }
`;

export default function UploadForm({ route, navigation }) {
  const updateCreateCoffeeShop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
    }
    console.log(cache, result);
    navigation.navigate("Tabs");
  };

  const [createCoffeeShopMutation, {loading, error}] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      update: updateCreateCoffeeShop,
    }
    
  );

  const onValid = ({ name }) => {
    let files = [];
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    files.push(file);
    if(!loading) {
      createCoffeeShopMutation({
        variables: {
          name,
          photos:files,
        },
      });
    }
    console.log(error);
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={handleSubmit(onValid)}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("name");
  }, [register]);
  useEffect(() => {
      navigation.setOptions({
        headerRight: loading ? HeaderRightLoading : HeaderRight,
        ...(loading && {headerLeft: () => null}),
    });
  }, [loading]);

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <NameText>Cafe Name</NameText>
          <Caption
            returnKeyType="done"
            placeholder="Write your CoffeeShop name"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("name", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
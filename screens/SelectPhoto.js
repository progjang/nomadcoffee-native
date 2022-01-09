import React from "react";
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Top = styled.View`
    flex: 1;
    background-color: black;
`;

const Bottom = styled.View`
    flex: 1;
    background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
function SelectPhoto({navigation}) {
    const [ok, setOk] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [chosenPhoto, setChosenPhoto] = useState("");
    const getPhotos = async() => {
        if(ok) {
            const {assets:photos} = await MediaLibrary.getAssetsAsync({first:10, sortBy:['creationTime']});
            setPhotos(photos);
            setChosenPhoto(photos[0]?.uri);
        }
    };

    const getPermissoins = async() => {
        const {status, canAskAgain} = await MediaLibrary.getPermissionsAsync();
        console.log(status);

        if(status === "undetermined" && canAskAgain) {
            const {status} = await MediaLibrary.requestPermissionsAsync();
            if(status !== "undetermined") {
                setOk(true);
                getPhotos();
            }
        } else if(status !== "undetermined"){
            setOk(true);
            getPhotos();
        }
    };
    useEffect(() => {
        getPermissoins();
    },[ok]);

    const HeaderRight = () => (
        <TouchableOpacity
            onPress={() =>
            navigation.navigate("UploadForm", {
                file: chosenPhoto,
            })
            }
        >
          <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
      );

    useEffect(() => {
        navigation.setOptions({
          headerRight: HeaderRight,
        });
      }, [chosenPhoto]);
    
    const { width } = useWindowDimensions();
    const choosePhoto = (uri) => {
        setChosenPhoto(uri);
      };
    const renderItem = ({item:photo}) => (
        <ImageContainer onPress={() => choosePhoto(photo.uri)}>
            <Image
                source={{uri: photo.uri}}
                style={{ width: width/4, height:100}}
            />
            <IconContainer>
                <Ionicons
                name="checkmark-circle"
                size={18}
                color={photo.uri === chosenPhoto ? colors.blue : "white"}
                />
            </IconContainer>
        </ImageContainer>
    )

    return (
        <Container>
            <StatusBar hidden={false} />
            <Top>
                {chosenPhoto !== "" ? (
                <Image
                    source={{ uri: chosenPhoto }}
                    style={{ width, height: "100%" }}
                />
                ) : null}
            </Top>
            <Bottom>
                <FlatList
                    data={photos}
                    numColumns={4}
                    keyExtractor={(photo) => photo.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    )
}

export default SelectPhoto;
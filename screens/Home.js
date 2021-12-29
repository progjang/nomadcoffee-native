import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, useWindowDimensions, View, Image } from "react-native";
import ScreenLayout from "../components/auth/ScreenLayout";

const COFFEESHOPS_QUERY = gql`
    query seeCoffeeShops(lastId:Int) {
        seeCoffeeShops(lastId:$lastId) {
            id
            name
            photos {
                url
            }
            categories {
                name
            }
        }
    }
`; 


export default function Home() {
    const {width, height} = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);
    const {data, refetch, fetchMore, loading, updateQuery} = useQuery(COFFEESHOPS_QUERY, {
        variables: {lastId: 0},
    });
    
    if(!loading){
        console.log(data);
    }
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    
    const renderPhoto = (photo) => {
        return (
            <View>
                <Image
                    key={photo.id}
                    style={{
                        width,
                        height: height-600
                    }}
                    source={{uri : photo.url}}
                />
            </View>
        )
    }
    const renderCoffeeShop = ({item:coffeeShop}) => {
        return (
            <View style={{ flex:1 }}>
                <Text style={{color:"white"}}>{coffeeShop.id}-{coffeeShop.name}</Text>
                {coffeeShop.categories.length > 0 ? (coffeeShop.categories.map((category) => <Text key={category.id} style={{color:"white"}}>{category.name}</Text>)) : null }
                {coffeeShop.photos.length > 0 ? (coffeeShop.photos.map(renderPhoto)) : null }
            </View>
        );
    };
    
    return (
        <ScreenLayout loading={loading}>
            
            <FlatList
            data={data?.seeCoffeeShops}
            keyExtractor={(coffeeShop) => "" + coffeeShop.id}
            renderItem={renderCoffeeShop}
            onEndReachedThreshold={0.5}
            onEndReached={() =>
              fetchMore({
                variables: {
                  lastId: data?.seeCoffeeShops?.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    seeCoffeeShops: [
                      ...prev.seeCoffeeShops,
                      ...fetchMoreResult.seeCoffeeShops,
                    ],
                  });
                },
              })
            }
            refreshing={refreshing}
            onRefresh={refresh}
            showsVerticalScrollIndicator={false}

            />
        </ScreenLayout>
    )


};

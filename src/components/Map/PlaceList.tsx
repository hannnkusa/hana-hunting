import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export function PlaceList({ places, navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginLeft: 10,
        marginRight: 10,
        height: 116,
        width: 241,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 13,
        borderRadius: 24,
      }}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('Cafe Detail', { itemId: item.id })}
    >
      <Image
        // size={95}
        source={{ uri: item.thumbnail }}
        style={{
          height: 90,
          width: 85,
          left: 13,
          borderRadius: 16,
          position: "absolute",
        }}
        // containerStyle={{ marginRight: 0, paddingRight: 0}}
      />
      <View
        style={{
          backgroundColor: "rgba(172, 206, 217, 0.15)",
          paddingLeft: 97,
          height: 90,
          width: "100%",
          borderRadius: 16,
          justifyContent: "center",
          paddingRight: 18
        }}
      >
        <Text
          style={{ color: "#004359", fontSize: 18, fontFamily: "Inter-Medium" }}
          numberOfLines={1}
        >
          {item.nama_cafe}
        </Text>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Icon name="map-marker-alt" size={13} color="#004359" />
          <Text
            style={{
              color: "#6E929D",
              fontSize: 12,
              fontFamily: "Inter-Light",
              marginLeft: 4,
            }}
          >
            {item.alamat.split(",")[0]}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Icon name="star" size={13} color="#FAB005" solid />
          <Text
            style={{
              color: "#004359",
              fontSize: 12,
              fontFamily: "Inter-Bold",
              marginLeft: 4,
            }}
          >
            {item.rating}
          </Text>
        </View>
      </View>
      {/* <ListItem.Chevron /> */}
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={places}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

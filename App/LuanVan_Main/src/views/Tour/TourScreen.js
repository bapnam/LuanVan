import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  RefreshControl,
} from "react-native";
import COLORS from "../../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import axiosClient from "../../api/axiosClient";
import image from "../../assets/Bear.jpg";

const { width } = Dimensions.get("screen");
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const TourScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    axiosClient
      .get("/tour/getall")
      .then((res) => {
        setPosts(res.data);
        setFilter(res.data);
      })
      .catch((err) => {
        console.log("LỖI TourScreen: ", err);
      });
  }, []);

  const tourCategories = [
    {
      id: 1,
      name: "Tour thiên nhiên",
    },
    {
      id: 2,
      name: "Tour biển",
    },
    {
      id: 3,
      name: "Tour tham quan - văn hóa",
    },
    {
      id: 4,
      name: "Tour gia đình",
    },
    {
      id: 5,
      name: "Tour sinh thái",
    },
    {
      id: 6,
      name: "Tour nghĩ dưỡng",
    },
  ];

  const [selected, setSelected] = useState(0);

  const handleClick = (id) => {
    setSelected(id);
  };

  // Chọn theo loại
  const TourTopicList = ({ item }) => {
    return (
      <View key={item.id} style={styles.categoryContainer}>
        <Pressable activeOpacity={0.8} onPress={() => handleClick(item.id)}>
          <View
            style={{
              ...styles.tourList,
              backgroundColor:
                selected === item.id ? COLORS.orange : COLORS.primary,
            }}
          >
            <Text>{item.name}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  // Card info
  const Card = ({ post, index }) => {
    return (
      <View key={index} style={{ marginVertical: 20 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("DetailsTour", {
              post,
            })
          }
        >
          <ImageBackground style={styles.cardImage} source={image}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 22,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {post.DiaDiem}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="place" size={20} color={COLORS.white} />
                <Text
                  style={{
                    marginLeft: 5,
                    color: COLORS.white,
                  }}
                >
                  {post.ThanhPho}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: 80,
                }}
              >
                <Icon name="star" size={20} color={COLORS.white} />
                <Text
                  style={{
                    marginLeft: 5,
                    color: COLORS.white,
                  }}
                >
                  5.0
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.details}>
            <Text
              style={[styles.textDetails, styles.tourName]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {post.TieuDe}
            </Text>
            <Text style={[styles.textDetails, { color: COLORS.orange }]}>
              {post.Gia}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Search
  const searchFilter = (text) => {
    if (text) {
      const newData = posts.filter((item) => {
        const itemData = item.TieuDe
          ? item.TieuDe.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilter(newData);
      setSearch(text);
    } else {
      setFilter(posts);
      setSearch(text);
    }
  };

  // Refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar translucent={false} backgroundColor={COLORS.white} /> */}
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={24}
          color={COLORS.white}
          onPress={navigation.goBack}
        />
        <Text>Xin chào, Anh Thư</Text>
        <Icon name="notifications-none" size={24} color={COLORS.white} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="search" size={24} />
        {/* <TextInput
          placeholder="Tìm kiếm"
          style={{ color: COLORS.grey, paddingLeft: 5 }}
          // value={search}
          onChangeText={(text) => searchFilter(text)}
        /> */}
        <TextInput
                placeholder="Tìm kiếm"
                style={{ color: COLORS.grey }}
                onChangeText={(text) => searchFilter(text)}
              />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>
          {/* Vị trí hiện tại của bạn: Ninh Kiều */}
        </Text>

        <View>
          <FlatList
            // snapToAlignment={50}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tourCategories}
            renderItem={({ item }) => <TourTopicList item={item} />}
            keyExtractor={(item) => item.key}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            // horizontal
            showsHorizontalScrollIndicator={false}
            data={filter}
            renderItem={({ item }) => {
              return <Card post={item} />;
            }}
            keyExtractor={(post) => {
              post._id;
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TourScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  inputContainer: {
    height: 50,
    width: "88%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 70,
    flexDirection: "row",
    paddingLeft: 20,
    marginHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 50,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tourList: {
    height: 40,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  cardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  details: {
    width: width - 200,
    marginTop: 10,
  },
  tourName: {
    overflow: "hidden",
    height: 20,
    color: "#666666",
  },
  textDetails: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

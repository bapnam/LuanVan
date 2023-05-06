import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  // StatusBar,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../consts/CustomIcon";
import axiosClient from "../api/axiosClient";

import image from "../assets/Bear.jpg";
import { URL_IMAGES } from "../api/urlGetDataAPI";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../consts/CustomButton";
import { Button } from "native-base";
import { updatePoint } from "../redux/slice/pointNotification";

const { width } = Dimensions.get("screen");

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();


  const [dataTourFavorite, setDataTourFavorite] = useState([]);
  const listFavorite = useSelector((s) => s.storeInforYeuThich.Tour);
  const pointNotifi = useSelector((s) => s.storePoint.point);
//   console.log(pointNotifi);

  const nameKH = useSelector((s) => s.storeInforUser.HoTen);
  const userName = nameKH.slice(nameKH.lastIndexOf(" "));
  console.log(userName);
  const dataKhachHang = useSelector((s) => s.storeInforUser);

  const [selected, setSelected] = useState(0);

  const handleClick = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    getDataToAPI();
    getListFavorite();
  }, [listFavorite, pointNotifi]);

  const getDataToAPI = async () => {
    await axiosClient
      .get("/tour/getall")
      .then((res) => {
        setPosts(res.data);
        setFilter(res.data);
      })
      .catch((err) => {
        console.log("LỖI HomeScreen: ", err);
      });
  };

  const getListFavorite = () => {
    axiosClient
      .post("/tour/getbylist", listFavorite)
      .then((res) => {
        if (res.data.length > 0) setDataTourFavorite(res.data);
        else setDataTourFavorite([]);
      })
      .catch((err) => {
        console.log("ERR favorite: ", err);
      });
  };

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

  // Chọn theo loại
  const TourTopicList = ({ item }) => {
    return (
      <View key={item.id} style={styles.categorySelecter}>
        <Pressable activeOpacity={0.8} onPress={() => handleClick(item.id)}>
          {/* onPress={() => handleClick(item.id)} */}
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

  // const ListCategories = (name) => {
  //   return (
  //     <View key={name} style={styles.categoryContainer}>
  //       <View>
  //         <FlatList
  //           // snapToAlignment={50}
  //           contentContainerStyle={{ paddingLeft: 20 }}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           data={tourCategories}
  //           renderItem={({ item }) => <TourTopicList item={item} />}
  //           keyExtractor={(item) => item.key}
  //         />
  //       </View>

  //     </View>
  //   );
  // };

  const Card = ({ post, index }) => {
    return (
      <View key={post._id} style={{ marginVertical: 5 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("DetailsTour", post)}
        >
          <ImageBackground
            style={styles.cardImage}
            // source={{ uri: post.thumbnail.url }}
            source={{ uri: URL_IMAGES + post.HinhAnh }}
          >
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
              ></View>
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

  const RenderSelecter = ({ post, index }) => {
    return (
      <View key={post._id} style={{ marginVertical: 5 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("DetailsTour", post)}
        >
          <ImageBackground
            style={styles.cardImage}
            // source={{ uri: post.thumbnail.url }}
            source={{ uri: URL_IMAGES + post.HinhAnh }}
          >
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
              ></View>
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
    getDataToAPI();
    dispatch(updatePoint(!pointNotifi));
  }, []);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.header}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
          }}
        >
          Xin chào, {userName}
        </Text>
      </View>

      <ScrollView
        key={"ScrollView1"}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text style={styles.headerTitle}>Cùng khám phá</Text>
            <Text style={styles.headerTitle}>top địa điểm ở Việt Nam</Text>
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Tìm kiếm"
                style={{ color: COLORS.grey }}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
        </View>

        {dataTourFavorite.length > 0 && dataKhachHang.Quyen == "MUA" && (
          <View>
            <Text style={styles.sectionTitle}>Địa điểm yêu thích của bạn</Text>
            <FlatList
              contentContainerStyle={{ paddingLeft: 20 }}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              data={dataTourFavorite}
              // renderItem={({ item }) => <Card place={item} />}
              renderItem={({ item }) => {
                return <RenderSelecter post={item} />;
              }}
              // keyExtractor={(post) => {
              //   post._id;
              // }}
              keyExtractor={(item) => `${item._id}`}
            />

            <View style={{ alignItems: "center" }}>
              <CustomButton
                text="Xem thêm"
                type="Secondary"
                widthBtn="50%"
                onPress={() => navigation.navigate("Favorite")}
              />
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle2}>Khám phá thêm</Text>

        {/* <ListCategories /> */}
        <ScrollView horizontal={true} scrollEnabled={true}>
          <View>
            {/* <ScrollView
                        scrollEnabled={false}
                        horizontal
                        key={"ScrollView2"}
                    > */}
            <FlatList
              contentContainerStyle={{ paddingLeft: 20 }}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={filter}
              renderItem={({ item }) => {
                return <Card post={item} />;
              }}
              keyExtractor={(item) => `${item._id}`}
            />
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

{
  /* <Text style={styles.sectionTitle}>Khách sạn</Text>
         <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filter}
            // renderItem={({ item }) => <Card place={item} />}
            renderItem={({ item }) => {
              return <CardHotel hotel={item} />;
            }}
            keyExtractor={(hotel) => {
              hotel._id;
            }}
          />
        </View> */
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 23,
  },

  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categorySelecter: {
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

  categoryContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,

    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionTitle2: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  cardImage: {
    height: 200,
    width: width - 40,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  details: {
    width: width - 50,
    marginTop: 10,
  },
  tourName: {
    overflow: "hidden",
    height: 28,
    color: "#666666",
  },
  textDetails: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

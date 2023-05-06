import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  TextArea,
  Select,
  CheckIcon,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import CustomSwitch from "../../consts/CustomSwitch";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";

function ThongBaoClient({ navigation }) {
  const [finished, setFinished] = useState(1);
  const pointNotifi = useSelector((s) => s.storePoint.point);
  //   console.log(pointNotifi);

  const onSelectSwitch = (value) => {
    setFinished(value);
  };

  const [list, setList] = useState([]);
  const [listSetup, setListSetup] = useState([]);

  const dataStoreUser = useSelector((s) => s.storeInforUser);

  const [inforUser, setInforUser] = useState({
    id: "id",
    HoTen: "name",
    Quyen: "1",
  });

  useEffect(() => {
    const getYeuCau = async () => {
      await axiosClient
        .get("/yeucautour/getall/")
        .then((res) => {
          if (res.data.length > 0) setList(res.data);
          // else setList([]);
          //   console.log("Get yeu cau: ", res.data._id);
        })
        .catch((err) => console.log("Lỗi thông báo: ", err));
    };
    const getSetup = async () => {
      await axiosClient
        .get("/setuptour/getall")
        .then((res) => {
          if (res.data.length > 0) setListSetup(res.data);
          // else setList([]);
          //   console.log("Get yeu cau: ", res.data._id);
        })
        .catch((err) => console.log("Lỗi thông báo: ", err));
    };

    getYeuCau();
    getSetup();
  }, [pointNotifi]);

  const YeuCau = () => {
    return (
      <ScrollView>
        {list.length > 0 ? (
          list.map((item) => {
            if (item.TrangThai == "DangYeuCau" ) {
              console.log( item.IDKhachHang + "-" + dataStoreUser.id);
              return (
                <View style={styles.yeucau} key={item._id}>
                  <View style={styles.info}>
                    <Text style={styles.text}>
                      Khách hàng: {item.IDKhachHang.HoTen}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.text}>Địa điểm: {item.DiaDiem}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.info}
                    onPress={() => navigation.navigate("ChiTietYeuCau", item)}
                  >
                    <Text style={{ color: COLORS.orange }}>Xem chi tiết</Text>
                  </TouchableOpacity>
                  <View style={styles.chitiet}></View>

                  {/* ))} */}
                </View>
              );
            }
            // else
            //   return (
            //     <View style={styles.yeucau} key={item._id}>
            //       <View style={styles.info}>
            //         <Text style={styles.text}>Chưa có yêu cầu nào</Text>
            //       </View>
            //     </View>
            //   );
          })
        ) : (
          <View style={styles.yeucau}>
            <View style={styles.info}>
              <Text style={styles.text}>Chưa có yêu cầu nào</Text>
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  //   navigation.navigate("SetUpTour")

  const DaNhan = () => {
    return (
      <ScrollView>
        {listSetup.length > 0 ? (
          listSetup.map((item) => {
            if (item.IDChuTour._id == dataStoreUser.id)
              return (
                <View style={styles.yeucau} key={item._id}>
                  <View style={styles.info}>
                    <Text style={styles.text}>
                      Khách hàng: {item.IDKhachHang.HoTen}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.text}>
                      Địa điểm: {item.IDYeuCauTour.DiaDiem}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.info}
                    onPress={() => navigation.navigate("SetUpTour", item)}
                  >
                    <Text style={{ color: COLORS.orange }}>Xem chi tiết</Text>
                  </TouchableOpacity>
                  <View style={styles.chitiet}></View>

                  {/* ))} */}
                </View>
              );
            //   else
            //     return (
            //       <View style={styles.yeucau} key={item._id}>
            //         <View style={styles.info}>
            //           <Text style={styles.text}>Chưa có yêu cầu nào</Text>
            //         </View>
            //       </View>
            //     );
          })
        ) : (
          <View style={styles.yeucau}>
            <View style={styles.info}>
              <Text style={styles.text}>Chưa có yêu cầu nào</Text>
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={COLORS.white}
          onPress={navigation.goBack}
        />
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          Yêu cầu đặt tour
        </Text>
        <Icon name="notifications" size={28} color={COLORS.primary} />
      </View>
      <View>
        <CustomSwitch
          selectionMode={1}
          option1="Yêu cầu"
          option2="Đã nhận"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      {finished == 1 && <YeuCau />}
      {finished == 2 && <DaNhan />}
    </View>
  );
}

export default ThongBaoClient;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    height: 70,
  },
  yeucau: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 20,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

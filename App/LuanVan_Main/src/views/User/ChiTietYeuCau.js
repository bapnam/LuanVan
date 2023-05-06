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
  Alert,
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
import axiosClient from "../../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updatePoint } from "../../redux/slice/pointNotification";

function ChiTietYeuCau({ navigation, route }) {
  const yeucauTour = route.params;
  const dataKhachHang = useSelector((s) => s.storeInforUser);
  const dispatch = useDispatch();
  const pointNotifi = useSelector((s) => s.storePoint.point);
  console.log(pointNotifi);

  //   console.log("yeu cau tour: ", yeucauTour);

  const DongY = async () => {
    Alert.alert("Thông báo", "Bạn đồng ý nhận tour!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          Alert.alert("Thông Báo", "Bạn đã nhận tour thành công!", [
            {
              text: "OK",
              onPress: async () => {
                await axiosClient
                  .put("/yeucautour/update/" + yeucauTour._id, {
                    TrangThai: "DaNhan",
                  })
                  .then((res) => {
                    console.log(">>: ", res.data);
                  });
                await axiosClient
                  .post("/setuptour/add", {
                    IDKhachHang: yeucauTour.IDKhachHang._id,
                    IDChuTour: dataKhachHang.id,
                    IDYeuCauTour: yeucauTour._id,
                    ChiTietLichTrinh: "",
                    GhiChu: "",
                  })
                  .then((res) => {
                    console.log(">>: ", res.data);
                    dispatch(updatePoint(!pointNotifi));
                  });
                navigation.navigate("TabNavigation");
              },
            },
          ]);
        },
      },
    ]);
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
          Chi tiết yêu cầu
        </Text>
        <Icon name="notifications" size={28} color={COLORS.primary} />
      </View>
      <ScrollView>
        <View style={styles.info}>
          <Text
            style={{
              marginVertical: 20,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Thông tin khách hàng
          </Text>
          <View style={styles.infoKH}>
            <Icon name="email" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Họ tên: {yeucauTour.IDKhachHang.HoTen}
            </Text>
          </View>
          <View style={styles.infoKH}>
            <Icon name="phone" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Số điện thoại: {yeucauTour.IDKhachHang.SDT}
            </Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text
            style={{
              marginVertical: 20,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Yêu cầu
          </Text>
          <View style={styles.infoKH}>
            <Icon name="place" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Địa điểm: {yeucauTour.DiaDiem}
            </Text>
          </View>
          <View style={styles.infoKH}>
            <Icon name="person" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Số lượng người: {yeucauTour.SoLuongKhach}
            </Text>
          </View>
          <View style={styles.infoKH}>
            <Icon name="today" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Ngày khởi hành: {yeucauTour.NgayKhoiHanh}
            </Text>
          </View>
          <View style={styles.infoKH}>
            <Icon name="today" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>
              Số ngày: {yeucauTour.SoNgayDi}
            </Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text
            style={{
              marginVertical: 20,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Ghi chú của khách hàng
          </Text>
          <View style={styles.infoKH}>
            <Icon name="notes" color={COLORS.primary} size={20} />
            <Text style={{ marginLeft: 5 }}>Ghi chú: {yeucauTour.GhiChu}</Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <CustomButton
            text="Đồng ý nhận tour"
            onPress={DongY}
            type="Primary"
            widthBtn="50%"
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ChiTietYeuCau;

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
  info: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoKH: {
    flexDirection: "row",
    // marginTop: 10,
    // marginBottom: 10,
    margin: 10,
  },
});

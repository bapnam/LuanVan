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
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updatePoint } from "../../redux/slice/pointNotification";
import axiosClient from "../../api/axiosClient";

function SetUpTour({ navigation, route }) {
  const yeucauTour = route.params;
  console.log(">>>>>>>>>>: ", yeucauTour);
  const pointNotifi = useSelector((s) => s.storePoint.point);
  const dispatch = useDispatch();

  const dataKhachHang = useSelector((s) => s.storeInforUser);
  const nameKH = dataKhachHang.HoTen.slice(
    dataKhachHang.HoTen.lastIndexOf(" ")
  );
  const [setup, setSetup] = useState({
    ChiTietLichTrinh: "",
    GhiChu: "",
    TrangThai: "DaSetup",
  });

  useEffect(() => {
    setSetup({ ...setup, ChiTietLichTrinh: yeucauTour.ChiTietLichTrinh });
  }, []);

  const handleSetUp = () => {
    const submit = async () => {
    //   console.log("YEU CAU: ", setup);
      await axiosClient
        .put("/setuptour/update/" + yeucauTour._id, setup)
        .then((res) => {
        //   console.log(res.data);
          Alert.alert("Thông Báo", "Bạn đã chỉnh sửa thành công!", [
            {
              text: "OK",
              onPress: async () => {
                dispatch(updatePoint(!pointNotifi));
                navigation.navigate("TabNavigation");
              },
            },
          ]);
        })
        .catch((err) => console.log("Lỗi yêu cầu: ", err));
    };
    submit();
  };
  return (
    <NativeBaseProvider>
      <View style={styles.AndroidSafeArea}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Text style={{ fontSize: 18 }}>Xin chào, {nameKH}</Text>
          <Icon name="notifications" size={28} color={COLORS.primary} />
        </View>

        <ScrollView>
          <>
            <View style={styles.infoWrapper}>
              <View
                style={[styles.infoItemLeftWrapper, { flexDirection: "row" }]}
              >
                <Icon
                  name="label"
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                />
                <Text style={styles.infoItemTitle}>Địa điểm:</Text>
              </View>
              <View style={styles.infoItemRightWrapper}>
                <Text>{yeucauTour.IDYeuCauTour.DiaDiem}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View
                style={[styles.infoItemLeftWrapper, { flexDirection: "row" }]}
              >
                <Icon
                  name="person"
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                />
                <Text style={styles.infoItemTitle}>Số lượng khách:</Text>
              </View>
              <View style={styles.infoItemRightWrapper}>
                <Text>{yeucauTour.IDYeuCauTour.SoLuongKhach}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View
                style={[styles.infoItemLeftWrapper, { flexDirection: "row" }]}
              >
                <Icon
                  name="today"
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                />
                <Text style={styles.infoItemTitle}>Chọn ngày khởi hành:</Text>
              </View>
              <View style={styles.infoItemRightWrapper}>
                <Text>{yeucauTour.IDYeuCauTour.NgayKhoiHanh}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View
                style={[styles.infoItemLeftWrapper, { flexDirection: "row" }]}
              >
                <Icon
                  name="today"
                  style={{
                    color: COLORS.primary,
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                />
                <Text style={styles.infoItemTitle}>Số ngày đi:</Text>
              </View>
              <View style={styles.infoItemRightWrapper}>
                <Text>{yeucauTour.IDYeuCauTour.SoNgayDi}</Text>
              </View>
            </View>


            <View style={styles.action}>
              <Box alignItems="flex-start" w="100%" ml={4}>
                <TextArea
                  h={80}
                  placeholder="Ghi chú"
                  w="500"
                  maxW="90%"
                  value={setup.ChiTietLichTrinh}
                  onChangeText={(text) =>
                    setSetup({ ...setup, ChiTietLichTrinh: text })
                  }
                />
              </Box>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.btnBookNow}
                onPress={() => {
                  handleSetUp();
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

export default SetUpTour;

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
    height: 80,
  },
  infoWrapper: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
  },
  infoItemLeftWrapper: {
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoItemRightWrapper: {
    marginRight: 10,
  },
  action: {
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  btnBookNow: {
    height: 50,
    width: 160,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

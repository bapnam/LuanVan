import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Alert,
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

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";

function YeuCau({ navigation }) {
  const [date, setDate] = useState();

  const dataKhachHang = useSelector((s) => s.storeInforUser);
  const nameKH = dataKhachHang.HoTen.slice(
    dataKhachHang.HoTen.lastIndexOf(" ")
  );
  const userName = nameKH.slice(nameKH.lastIndexOf(" "));

  const [yeucau, setYeucau] = useState({
    IDKhachHang: "",
    DiaDiem: "",
    SoLuongKhach: 1,
    NgayKhoiHanh: date,
    SoNgayDi: 1,
    MoTa: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const d = new Date();

  useEffect(() => {
    const t = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    setDate(t);
    // console.log(dataKhachHang);
    setYeucau({
      ...yeucau,
      IDKhachHang: dataKhachHang.id,
      NgayKhoiHanh: t,
    });
  }, []);

  // SETUP NGAY KHOI HANH ----------------
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateClick) => {
    const dd = dateClick.getDate();
    const mm = dateClick.getMonth();
    const yy = dateClick.getFullYear();

    const t = new Date(yy, mm, dd + 1);
    if (t < d) {
      Alert.alert("Ngày khởi hành của bạn không hợp lệ!");
    } else {
      const dateDone = dd + "-" + (mm + 1) + "-" + yy;
      setDate(dateDone);
      setYeucau({ ...yeucau, NgayKhoiHanh: dateDone });
    }

    hideDatePicker();
  };

  // SETUP SO LUONG-------------------------------------
  // const handleDecrease = () => {
  //     if (hoaDonUser.SoLuongKhach > 1) {
  //         let t = hoaDonUser.SoLuongKhach - 1;
  //         let g = t * post.Gia;
  //         setHoaDonUser({ ...hoaDonUser, SoLuongKhach: t, TongTien: g });
  //     }
  // };
  // const handleIncrease = () => {
  //     let t = hoaDonUser.SoLuongKhach + 1;
  //     let g = t * post.Gia;
  //     setHoaDonUser({ ...hoaDonUser, SoLuongKhach: t, TongTien: g });
  // };

  

  const handleYeuCau = () => {
    const submit = async () => {
      await axiosClient
        .post("/yeucautour/add", yeucau)
        .then((res) => {
          Alert.alert("Thông báo", "Bạn xác nhận yêu cầu tour!", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                Alert.alert("Thông Báo", "Bạn đã yêu cầu thành công!", [
                  {
                    text: "OK",
                    onPress: async () => {
                      navigation.navigate("TabNavigation");
                    },
                  },
                ]);
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
            <Text style={{ color: "#5f6368" }}>
              Chọn những địa điểm khách hàng mong muốn.
            </Text>
            <CustomInput
              placeholder="Địa điểm"
              iconName="label"
              value={yeucau.DiaDiem}
              onChangeText={(text) => setYeucau({ ...yeucau, DiaDiem: text })}
            />
            <Text style={{ color: "#5f6368" }}>Số lượng người đi.</Text>
            <CustomInput
              placeholder="Số lượng khách"
              iconName="person"
              keyboardType="number-pad"
              value={yeucau.SoLuongKhach}
              onChangeText={(text) =>
                setYeucau({ ...yeucau, SoLuongKhach: text })
              }
            />

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
                <TouchableOpacity onPress={showDatePicker}>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  {/* <Text>{d.getDate()}</Text> */}
                  <Text>{date}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: "#5f6368" }}>
              Số ngày khách hàng muốn đi.
            </Text>
            <CustomInput
              placeholder="Số ngày"
              iconName="today"
              keyboardType="number-pad"
              value={yeucau.SoNgayDi}
              onChangeText={(text) => setYeucau({ ...yeucau, SoNgayDi: text })}
            />

            <View style={styles.action}>
              <Box alignItems="flex-start" w="100%" ml={4}>
                <TextArea
                  h={20}
                  placeholder="Ghi chú"
                  w="500"
                  maxW="320"
                  value={yeucau.GhiChu}
                  onChangeText={(text) => setYeucau({ ...yeucau, GhiChu: text })}
                />
              </Box>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.btnBookNow}
                onPress={() => {
                  handleYeuCau();
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Xác nhận yêu cầu
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

export default YeuCau;

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

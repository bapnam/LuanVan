import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Logo from "../assets/orangeLogo.png";
import CustomButton from "../consts/CustomButton";
import CustomInput from "../consts/CustomInput";
// import SignUpScreen from "../screens/SignUpScreen";
import {
  isValidEmail,
  isValidObjectField,
  updateError,
} from "../utils/methods";
import axiosClient from "../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updateInforUser } from "../redux/slice/inforUser";
import { createHoaDon } from "../redux/slice/hoaDon";
import { createYeuThich } from "../redux/slice/yeuThich";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    // email: "nam@gmail.com",
    // password: "abc1234",
    //     // email: "",
    //     // password: "",
  });
  const dispatch = useDispatch();
  const hhhhhhh = useSelector((s) => s.storeInforUser);
  const inforUser = {
    stateLogin: false,
    id: "id",
    HoTen: "",
    NgaySinh: "",
    SDT: "",
    GioiTinh: "",
    DiaChi: [
      {
        TinhTP: "",
        QuanHuyen: "",
        XaPhuong: "",
        ChiTiet: "",
      },
    ],
    Email: "ykgk",
    CMND: "",
    YeuThich: {
      Tour: [""],
      KhachSan: [""],
    },
    LichSu: {
      LSTour: [
        {
          Tour: "",
          TrangThai: "x",
        },
      ],
      LSKhachSan: [
        {
          KhachSan: "",
          TrangThai: "x",
        },
      ],
    },
    Quyen: "",
  };

  const { email, password } = userInfo;

  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjectField(userInfo))
      return updateError("Điền vào ô trống", setError);

    if (!isValidEmail(email)) return updateError("Email không đúng", setError);

    // nữa nhớ check lại đk
    // if (!password.trim() || password.length < 8)
    //   return updateError("Mật khẩu không đúng", setError);

    return true;
  };

  const setupHoaDon = async (idUser) => {
    await axiosClient
      .get("/hoadon/getbyidkhachhang/" + idUser)
      .then((res) => {
        if (res.data.length > 1) {
          console.log("HOADON: ", res.data);
          dispatch(createHoaDon(res.data));
        }
        if (res.data.length == 1) {
          console.log("HOADON111: ", res.data);
          let data = res.data;
          dispatch(createHoaDon(data));
        }
      })
      .catch((err) => console.log("ERR HOADON LOGIN: ", err));
  };

  const setupYeuThich = async (data) => {
    if (data.length > 1) {
      console.log("YeuThich: ", data);
      dispatch(createYeuThich(data));
    }
    if (data.length == 1) {
      console.log("YeuThich1: ", data);
      // let data = [res.data]
      dispatch(createYeuThich(data));
    }
  };

  const onSignInPress = async () => {
    if (isValidForm()) {
      try {
        const user = {
          Email: email,
          // MatKhau: password,

          // Email: "minh@gmail.com",
          MatKhau: "abc123456",
        };
        await axiosClient
          .post("/nguoidung/dangnhap", user)
          .then((res) => {
            if (res.data.stateLogin == "NoUser") {
              Alert.alert("Không tìm thấy người dùng");
            } else {
              if (res.data.stateLogin == "NoPassword") {
                Alert.alert("Sai mật khẩu");
              } else {
                inforUser.stateLogin = true;
                inforUser.id = res.data.id;
                inforUser.HoTen = res.data.HoTen;
                inforUser.NgaySinh = res.data.NgaySinh;
                inforUser.SDT = res.data.SDT;
                inforUser.DiaChi = res.data.DiaChi;
                inforUser.GioiTinh = res.data.GioiTinh;
                inforUser.CMND = res.data.CMND;
                inforUser.Email = res.data.Email;
                inforUser.YeuThich = res.data.YeuThich;
                inforUser.LichSu = res.data.LichSu;
                inforUser.Quyen = res.data.Quyen;
                dispatch(updateInforUser(inforUser));
                console.log("LOGIN: ", inforUser.LichSu.length);
                setupHoaDon(inforUser.id); // lay hoa don
                setupYeuThich(res.data.YeuThich);
                console.log(">>>>>>: ", res.data);
                if (res.data.success) {
                  setUserInfo({ email: "", password: "" });
                }
                navigation.navigate("TabNavigation");
              }
            }
          })
          .catch((err) => {
            console.log("ERR AXIOS: ", err);
          });
      } catch (err) {
        console.log("Error SignIn: ", err);
      }
    }
    // setIsLoggedIn(true);
  };

  const onForgotPassword = () => {
    console.log("Quên mật khẩu");
  };

  const onSignInFB = () => {
    inforUser.stateLogin = false;
    inforUser.userID = "id";
    inforUser.userName = "Name";

    dispatch(updateInforUser(inforUser));
    console.log("LOGIN: ", hhhhhhh);
    // console.log("Facebook");
  };

  const onSignInEmail = () => {
    console.log("Email");
  };

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Text>
            <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          </View>

          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}
          <View>
            <CustomInput
              placeholder="Email"
              iconName="account-circle"
              onChangeText={(value) => handleOnChangeText(value, "email")}
              autoCapitalize="none"
              value={email}
              // error={error.email}
            />
            <CustomInput
              placeholder="Mật khẩu"
              iconName="lock"
              onChangeText={(value) => handleOnChangeText(value, "password")}
              autoCapitalize="none"
              password
              value={password}
              // error={error.password}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <CustomButton
              text="Đăng nhập"
              onPress={onSignInPress}
              type="Primary"
              widthBtn="50%"
            />
          </View>

          <CustomButton
            text="Quên mật khẩu?"
            onPress={onForgotPassword}
            type="Secondary"
          />
          {/* <CustomButton
            text="Đăng nhập với Facebook"
            onPress={onSignInFB}
            bgColor="#e5efff"
            textColor="#4765A9"
            type="Primary"
          /> */}
          {/* <CustomButton
            text="Đăng nhập với Email"
            onPress={onSignInEmail}
            bgColor="#FAE9EA"
            textColor="#DD4D44"
            type="Primary"
          /> */}
          <CustomButton
            text="Bạn chưa có tài khoản?"
            onPress={onSignUp}
            type="Secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    padding: 20,
    marginVertical: 50,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    height: 150,
    marginVertical: 20,
  },
});

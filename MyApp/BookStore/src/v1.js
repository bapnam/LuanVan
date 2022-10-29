import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import axios from "axios";

export default function App() {
  const loginUri = "http://localhost:9000/v1/nhanvien/allnhanvien";

  axios
    .post("http://localhost:9000/v1/nhanvien/dangnhap", {
      CMND: "710205096917",
      MatKhau: "123456",
    })
    .then(function (res) {
      const resData = res.data;
      if (resData == "1") {
        console.log("Khong tim thay nguoi dung!!!");
      }
      if (resData == "0") {
        console.log("Sai mat khau!!!");
      }
      if (resData == "2") {
        console.log("Dang nhap thanh cong!!!");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

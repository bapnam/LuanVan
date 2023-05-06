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

import Logo from "../../assets/orangeLogo.png";
import CustomButton from "../../consts/CustomButton";
import CustomInput from "../../consts/CustomInput";

const ChangePassword = ({navigation: { goBack }}) => {
  const [userInfo, setUserInfo] = useState({
    email: "nam@gmail.com",
    password: "123456",
  });

  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [rePass, setRePass] = useState();

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const onChangePass = async () => {
    if (currentPass == newPass) {
      Alert.alert("Mật khẩu Giống nhau");
    } else if (newPass != rePass) {
      Alert.alert("Mật khẩu không khớp");
    } else {
      
      Alert.alert("Thay đổi mật khẩu thành công");
      goBack()
    }
  };

  const navigation = useNavigation();
  const onSignUp = () => {
    // navigation.navigate("SignUpScreen");
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
              Thay Đổi Mật Khẩu
            </Text>
            <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          </View>

          <View>
            <CustomInput
              placeholder="Mật khẩu hiện tại"
              iconName="lock"
              onChangeText={(value) => setCurrentPass(value)}
              password
              value={currentPass}
            />
            <CustomInput
              placeholder="Mật khẩu mới"
              iconName="lock"
              onChangeText={(value) => setNewPass(value)}
              password
              value={newPass}
            />
            <CustomInput
              placeholder="Nhập lại mật khẩu"
              iconName="lock"
              onChangeText={(value) => setRePass(value)}
              password
              value={rePass}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <CustomButton
              text="Đổi mật khẩu"
              onPress={onChangePass}
              type="Primary"
              widthBtn="50%"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

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

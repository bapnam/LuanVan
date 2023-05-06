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
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updateInforUser } from "../../redux/slice/inforUser";
import { Select, NativeBaseProvider, Box } from "native-base";

function EditAccount({ navigation }) {
    const storeUser = useSelector((s) => s.storeInforUser);
    const dispatch = useDispatch();
    // console.log(storeUser);
    const [user, setUser] = useState({
        HoTen: "a",
        NgaySinh: "a",
        SDT: "a",
        DiaChi: [
            {
                TinhTP: "",
                QuanHuyen: "",
                XaPhuong: "",
                ChiTiet: "",
            },
        ],
        GioiTinh: "a",
        Email: "a",
        CMND: "a",
    });
    const [diaChi, setDiaChi] = useState("");

    useEffect(() => {
        let u = {
            HoTen: storeUser.HoTen,
            NgaySinh: storeUser.NgaySinh,
            SDT: storeUser.SDT,
            DiaChi: storeUser.DiaChi,
            GioiTinh: storeUser.GioiTinh,
            Email: storeUser.Email,
            CMND: storeUser.CMND,
        };
        setDiaChi(storeUser.DiaChi[0].ChiTiet);
        setUser(u);
        console.log("LLLLLLLLLLLL++++: ", diaChi);
    }, [storeUser]);

    const getUserAPI = async () => {
        await axiosClient
            .get("/nguoidung/getuser/" + storeUser.id)
            .then((res) => {
                const inforUser = {
                    stateLogin: true,
                    id: res.data.id,
                    HoTen: res.data.HoTen,
                    NgaySinh: res.data.NgaySinh,
                    SDT: res.data.SDT,
                    DiaChi: res.data.DiaChi,
                    GioiTinh: res.data.GioiTinh,
                    CMND: res.data.CMND,
                    Email: res.data.Email,
                    YeuThich: res.data.YeuThich,
                    LichSu: res.data.LichSu,
                    Quyen: res.data.Quyen,
                };
                dispatch(updateInforUser(inforUser));
                navigation.navigate("TabNavigation");
            })
            .catch((err) => console.log(err));
    };

    const UpdatePost = async () => {
        // user.DiaChi = diaChi

        console.log(user);
        await axiosClient
            .put("/nguoidung/update/" + storeUser.id, user)
            .then((res) => {
                Alert.alert(
                    "Thông báo",
                    "Bạn đã cập nhật thông tin thành công",
                    [{ text: "OK", onPress: () => getUserAPI() }]
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <NativeBaseProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.AndroidSafeArea}>
                    <View style={styles.header}>
                        <Icon
                            name="arrow-back-ios"
                            size={28}
                            color={COLORS.white}
                            onPress={navigation.goBack}
                        />

                        <Text style={{ fontSize: 18, paddingLeft: 55 }}>
                            Cập nhật thông tin
                        </Text>
                    </View>
                    <ScrollView>
                        <>
                            <CustomInput
                                placeholder="Họ tên"
                                iconName="label"
                                value={user.HoTen}
                                onChangeText={(text) => {
                                    // console.log(text);
                                    setUser({ ...user, HoTen: text });
                                }}
                            />
                            <CustomInput
                                placeholder="Email"
                                iconName="email"
                                value={user.Email}
                                onChangeText={(text) =>
                                    setUser({ ...user, Email: text })
                                }
                            />
                            <CustomInput
                                placeholder="Số điện thoại"
                                iconName="phone"
                                keyboardType="number-pad"
                                value={user.SDT}
                                onChangeText={(text) =>
                                    setUser({ ...user, SDT: text })
                                }
                            />
                            <CustomInput
                                placeholder="Ngày sinh"
                                iconName="cake"
                                value={user.NgaySinh}
                                onChangeText={(text) =>
                                    setUser({ ...user, NgaySinh: text })
                                }
                            />
                            {/* <CustomInput
              placeholder="Giới tính"
              iconName="face"
              value={user.GioiTinh}
              onChangeText={(text) => setUser({ ...user, GioiTinh: text })}
            /> */}
                            <Box
                                minW="300"
                                ml="2"
                                mr="2"
                                height="50"
                                bgColor="white"
                            >
                                <Select
                                    selectedValue={"position"}
                                    // mx={{
                                    //   base: 0,
                                    //   md: "auto",
                                    // }}
                                    height="50"
                                    onValueChange={(nextValue) => {
                                        console.log(nextValue);
                                    }}
                                    accessibilityLabel="Giới tính"
                                    placeholder="Giới tính"
                                    size="16"
                                >
                                    <Select.Item
                                        label="Nữ"
                                        value={"Nữ"}
                                    ></Select.Item>
                                    <Select.Item
                                        label="Nam"
                                        value={"Nam"}
                                    ></Select.Item>
                                </Select>
                            </Box>
                            <CustomInput
                                placeholder="CMND"
                                iconName="fact-check"
                                keyboardType="number-pad"
                                value={user.CMND}
                                onChangeText={(text) =>
                                    setUser({ ...user, CMND: text })
                                }
                            />
                            <CustomInput
                                placeholder="Địa chỉ"
                                iconName="home"
                                value={user.DiaChi[0].ChiTiet}
                                onChangeText={(text) => {
                                    setUser({
                                        ...user,
                                        DiaChi: [
                                            {
                                                TinhTP: user.DiaChi[0].TinhTP,
                                                QuanHuyen:
                                                    user.DiaChi[0].QuanHuyen,
                                                XaPhuong:
                                                    user.DiaChi[0].XaPhuong,
                                                ChiTiet: text,
                                            },
                                        ],
                                    });
                                }}
                            />

                            <View style={{ alignItems: "center" }}>
                                <CustomButton
                                    text="Cập nhật"
                                    type="Primary"
                                    widthBtn="80%"
                                    onPress={() => UpdatePost()}
                                />
                            </View>
                        </>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
}

export default EditAccount;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
});

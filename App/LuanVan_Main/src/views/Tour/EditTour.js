import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { NativeBaseProvider, Box, TextArea, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";

function EditTour({ navigation, route }) {
    const { post } = route.params;

    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    // const [posts, setPosts] = useState({
    //     TieuDe: post.TieuDe,
    //     LoaiTour: post.LoaiTour,
    //     MoTa: post.MoTa,
    //     DiaDiem: post.DiaDiem,
    //     ThanhPho: post.ThanhPho,
    //     LichTrinh: post.LichTrinh,
    //     KhachSan: post.KhachSan,
    //     NguoiHuongDan: post.NguoiHuongDan,
    //     SoNgay: post.SoNgay,
    //     Gia: post.Gia,
    //     email: post.email,
    //     SDT: post.SDT,
    //     quantity: post.quantity,
    // });
    const [TieuDe, setTieuDe] = useState(post.TieuDe);
    const [MoTa, setMoTa] = useState(post.MoTa);
    const [DiaDiem, setDiaDiem] = useState(post.DiaDiem);
    const [ThanhPho, setThanhPho] = useState(post.ThanhPho);
    const [NguoiHuongDan, setNguoiHuongDan] = useState(post.NguoiHuongDan);
    const [Email, setEmail] = useState(post.email);
    const [SDT, setSDT] = useState(post.SDT);
    const [SoNgay, setSoNgay] = useState(post.SoNgay);
    const [Gia, setGia] = useState(post.Gia);
    // const [LoaiTour, setLoaiTour] = useState(post.LoaiTour);
    const [LichTrinh, setLichTrinh] = useState(post.LichTrinh);
    const [posts, setPosts] = useState([]);

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
                        <Text style={{ fontSize: 18, paddingLeft: 35 }}>
                            Cập nhật thông tin tour
                        </Text>
                    </View>
                    <ScrollView>
                        <>
                            <CustomInput
                                placeholder="Tiêu đề bài viết"
                                iconName="label"
                                value={TieuDe}
                                onChangeText={(text) => setTieuDe(text)}
                            />
                            <CustomInput
                                placeholder="Email"
                                iconName="email"
                                value={Email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <CustomInput
                                placeholder="Số điện thoại"
                                iconName="phone"
                                value={SDT}
                                keyboardType="number-pad"
                                onChangeText={(text) => setSDT(text)}
                            />
                            <CustomInput
                                placeholder="Người hướng dẫn"
                                iconName="person"
                                value={NguoiHuongDan}
                                onChangeText={(text) => setNguoiHuongDan(text)}
                            />
                            <CustomInput
                                placeholder="Độ dài chuyến đi"
                                iconName="date-range"
                                value={SoNgay}
                                onChangeText={(text) => setSoNgay(text)}
                            />
                            <CustomInput
                                placeholder="Địa điểm khởi hành"
                                iconName="place"
                                value={DiaDiem}
                                onChangeText={(text) => setDiaDiem(text)}
                            />
                            <CustomInput
                                placeholder="Thành phố"
                                iconName="place"
                                value={ThanhPho}
                                onChangeText={(text) => setThanhPho(text)}
                            />

                            <CustomInput
                                placeholder="Giá tour"
                                iconName="euro"
                                value={Gia}
                                onChangeText={(text) => setGia(text)}
                            />

                            <View style={styles.action}>
                                <Icon
                                    name="source"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Box alignItems="flex-start" w="100%" ml={3}>
                                    <TextArea
                                        h={40}
                                        placeholder="Thông tin địa điểm"
                                        w="500"
                                        maxW="300"
                                        value={MoTa}
                                        onChangeText={(text) => setMoTa(text)}
                                    />
                                </Box>
                            </View>

                            <View style={styles.action}>
                                <Icon
                                    name="flag"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Box alignItems="flex-start" w="100%" ml={3}>
                                    <TextArea
                                        h={40}
                                        placeholder="Lịch trình tour"
                                        w="500"
                                        maxW="300"
                                        value={LichTrinh}
                                        onChangeText={(text) =>
                                            setLichTrinh(text)
                                        }
                                    />
                                </Box>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <CustomButton
                                    text="Cập nhật"
                                    type="Primary"
                                    widthBtn="80%"
                                    // onPress={() => UpdatePost()}
                                />
                            </View>
                        </>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </NativeBaseProvider>
    );
}

export default EditTour;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
    action: {
        marginVertical: 10,
    },
});

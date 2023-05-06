import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    TextInput,
    Button,
    Alert,
    StatusBar,
    Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Title, Caption } from "react-native-paper";
import ChiTietHoaDon from "./ChiTietHoaDon";
import CustomInput from "../../consts/CustomInput";
import axiosClient from "../../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";

function ThongKe({ navigation }) {
    const dispatch = useDispatch();
    const [finished, setFinished] = useState(1);
    const [inforUser, setInforUser] = useState({
        stateLogin: false,
        id: "id",
        HoTen: "name",
        NgaySinh: "2000",
        SDT: "sdt",
        DiaChi: [
            {
                TinhTP: "t",
                QuanHuyen: "h",
                XaPhuong: "p",
                ChiTiet: "ct",
            },
        ],
        Email: "email",
        YeuThich: ["id"],
        LichSu: [
            {
                Tour: "",
                TrangThai: "x",
            },
        ],
        Quyen: "1",
    });
    const [inforHoaDon, setInforHoaDon] = useState([
        {
            MaHoaDon: "TuDong",
            IDKhachHang: "id",
            IDTour: {
                TieuDe: "“KHÁM PHÁ VÀ NÂNG NIU VẺ ĐẸP CỦA BIỂN” 3N2Đ",
                HinhAnh: "danang.jpg",
            },
            NgayKhoiHanh: "12",
            SoLuongKhach: 1,
            TongTien: 1,
        },
    ]);

    const [listTour, setListTour] = useState([]);

    const dataKhachHang = useSelector((s) => s.storeInforUser);
    const nameKH = dataKhachHang.HoTen.slice(
        dataKhachHang.HoTen.lastIndexOf(" ")
    );
    const dataStoreUser = useSelector((s) => s.storeInforUser);
    const d = new Date();
    const dateNow =
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    const [dataThongKe, setDataThongKe] = useState({});

    useEffect(() => {
        getDataThongKe();
    }, [dataStoreUser]);

    const dataStoreHoaDon = useSelector((s) => s.storeInforHoaDon);
    useEffect(() => {
        setInforUser(dataStoreUser);
        if (dataStoreHoaDon.HD[0].IDTour != "0") {
            setInforHoaDon(dataStoreHoaDon.HD);
            const t = dataStoreHoaDon.HD.map((i) => {
                return i[0];
            });
            setListTour(dataStoreHoaDon.HD);

            console.log("LICHSU HOA DON: ", listTour);
        }
    }, [dataStoreUser, dataStoreHoaDon]);

    const getDataThongKe = async () => {
        await axiosClient
            .post("/thongke/thongkeallchutour/" + dataStoreUser.id, {
                Ngay: dateNow,
            })
            .then((res) => {
                console.log(res.data);
                setDataThongKe(res.data);
            })
            .catch((err) => console.log("ERR AccountScreen: ", err));
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
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Xin chào, {nameKH}
                </Text>
                <Icon name="notifications" size={28} color={COLORS.primary} />
            </View>

            <ScrollView>
                <View style={styles.sectionDoanhthu}>
                    <View style={styles.Tien}>
                        <View
                            style={{
                                height: "31%",
                                flexDirection: "row",
                                // justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Icon
                                name="monetization-on"
                                color={COLORS.orange}
                                style={{
                                    paddingLeft: 10,
                                    paddingTop: 5,
                                    fontSize: 30,
                                }}
                            />

                            <Text
                                style={{
                                    paddingTop: 5,
                                    paddingLeft: 10,
                                    color: COLORS.orange,
                                    fontSize: 20,
                                }}
                            >
                                Lợi nhuận
                            </Text>
                        </View>

                        <View
                            style={{
                                height: "69%",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Title
                                style={{ color: COLORS.orange, fontSize: 30 }}
                            >
                                {dataStoreUser.Quyen == "MUA"
                                    ? "1m"
                                    : dataThongKe.TongDoanhThu}
                            </Title>
                        </View>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>Doanh thu hôm nay</Text>
                        <Title style={{ fontWeight: "bold", fontSize: 16 }}>
                            {dataStoreUser.Quyen == "MUA"
                                ? "1m"
                                : dataThongKe.TongHomNay}
                        </Title>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>
                            Số lượng tour đã bán
                        </Text>
                        <Title style={{ fontWeight: "bold", fontSize: 16 }}>
                            {dataStoreUser.Quyen == "MUA"
                                ? "0"
                                : dataThongKe.TongTourDaBanL}
                        </Title>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>Số lượng bài đăng</Text>
                        <Title style={{ fontWeight: "bold", fontSize: 16 }}>
                            {dataStoreUser.Quyen == "MUA"
                                ? "0"
                                : dataThongKe.SoLuongBaiDang}
                        </Title>
                    </View>
                </View>

                <View style={styles.sectionDaban}>
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: COLORS.orange,
                            }}
                        >
                            Lịch sử doanh thu
                        </Text>
                    </View>

                    <View style={styles.Ban}>
                        <View>
                            <Icon
                                name="local-atm"
                                size={30}
                                style={{ paddingRight: 15 }}
                                color="#127d89"
                            />
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: COLORS.orange,
                                }}
                            >
                                1000
                            </Text>
                            <Text style={{ fontSize: 16 }}>tên tour</Text>
                            <Text style={{ fontSize: 16 }}>Ngày</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ThongKe;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // backgroundColor: "white",
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
    sectionDoanhthu: {
        backgroundColor: "white",
        height: 300,
        marginVertical: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    Tien: {
        height: "40%",
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
    },
    Loai: {
        height: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
    },
    sectionDaban: {
        backgroundColor: "white",
        minHeight: 500,
        marginVertical: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    Ban: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderColor: COLORS.gray,
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});

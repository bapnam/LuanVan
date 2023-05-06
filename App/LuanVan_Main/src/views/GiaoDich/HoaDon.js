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
import ChiTietHoaDon from "./ChiTietHoaDon";
import CustomInput from "../../consts/CustomInput";
import axiosClient from "../../api/axiosClient";
import { useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { createHoaDon, updateHoaDon } from "../../redux/slice/hoaDon";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function HoaDon({ route, navigation }) {
    const { post } = route.params;
    const dataKhachHang = useSelector((s) => s.storeInforUser);
    const dataStoreHoaDon = useSelector((s) => s.storeInforHoaDon);
    const dispatch = useDispatch();

    const d = new Date();
    const nameKH = dataKhachHang.HoTen.slice(
        dataKhachHang.HoTen.lastIndexOf(" ")
    );

    const [date, setDate] = useState();
    const [infoKhachHang, setInfoKhachHang] = useState({});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [hoaDonUser, setHoaDonUser] = useState({
        MaHoaDon: "TuDong",
        IDKhachHang: dataKhachHang.id,
        IDTour: post._id,
        NgayKhoiHanh: date,
        SoLuongKhach: 1,
        TongTien: post.Gia,
    });

    useEffect(() => {
        setInfoKhachHang(dataKhachHang);

        const t =
            d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        setDate(t);
    }, [dataKhachHang, dataStoreHoaDon]);

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
            setHoaDonUser({ ...hoaDonUser, NgayKhoiHanh: dateDone });
        }

        hideDatePicker();
    };

    // SETUP SO LUONG-------------------------------------
    const handleDecrease = () => {
        if (hoaDonUser.SoLuongKhach > 1) {
            let t = hoaDonUser.SoLuongKhach - 1;
            let g = t * post.Gia;
            setHoaDonUser({ ...hoaDonUser, SoLuongKhach: t, TongTien: g });
        }
    };
    const handleIncrease = () => {
        let t = hoaDonUser.SoLuongKhach + 1;
        let g = t * post.Gia;
        setHoaDonUser({ ...hoaDonUser, SoLuongKhach: t, TongTien: g });
    };

    //
    const toast = useToast;
    const showToast = (msg) => {
        toast.show({ description: msg });
    };

    // SETUP HOA DON-----------------------------------
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

    // SUBMIT ---------------------------------
    const payment = async () => {
        const hd = [hoaDonUser];

        await axiosClient
            .post("/hoadon/add", hoaDonUser)
            .then((res) => {
                // console.log(res.data);
                setupHoaDon(hoaDonUser.IDKhachHang);
            })
            .catch((err) => {
                console.log(err);
            });

        Alert.alert("Thông báo", "Bạn xác nhận đặt vé!", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    Alert.alert("Thông Báo", "Bạn đã đặt vé thành công!", [
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

        // navigation.navigate("DetailsTour");
    };

    ///------------------------
    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text>Xin chào, {nameKH}</Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>

            <ScrollView>
                {/* Tour info */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN TOUR</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Tên tour:</Text>
                    </View>
                    <View
                        style={[styles.infoItemRightWrapper, { width: "80%" }]}
                    >
                        <Text
                            style={[
                                styles.infoItemText,
                                { numberOfLines: 2, ellipsizeMode: "tail" },
                            ]}
                        >
                            {post.TieuDe}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Địa điểm:</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>{post.DiaDiem}</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>
                            Hướng dẫn viên:
                        </Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.NguoiHuongDan}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Chọn ngày:</Text>
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
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số lượng người</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginRight: 20,
                                    padding: 4,
                                    opacity: 0.5,
                                }}
                                onPress={handleDecrease}
                            >
                                <Icon
                                    name="remove-circle-outline"
                                    style={{
                                        fontSize: 20,
                                        color: COLORS.orange,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text>{hoaDonUser.SoLuongKhach}</Text>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 20,
                                    padding: 4,
                                    opacity: 0.5,
                                }}
                                onPress={handleIncrease}
                            >
                                <Icon
                                    name="add-circle-outline"
                                    style={{
                                        fontSize: 20,
                                        color: COLORS.orange,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#f2f2f2",
                    }}
                    // onPress={() => navigation.navigate("DetailsTour")}
                >
                    <Text style={styles.infoItemTitle}>Xem chi tiết</Text>
                </TouchableOpacity>
                {/* Thông tin người đặt */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN NGƯỜI ĐẶT</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Họ và tên</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {dataKhachHang.HoTen}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số điện thoại</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {dataKhachHang.SDT}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Email</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {dataKhachHang.Email}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: COLORS.white,
                            fontSize: 18,
                        }}
                    >
                        {hoaDonUser.TongTien} VND
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.btnBookNow}
                    // onPress={() =>
                    //     navigation.navigate("ChiTietHoaDon", { post })
                    // }
                    onPress={() => {
                        payment();
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Xác nhận đặt vé
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HoaDon;

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
    titlesWrapper: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    title: {
        fontFamily: "Verdana-Italic",
        fontSize: 32,
        color: "black",
        width: "50%",
    },
    priceWrapper: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    priceText: {
        color: COLORS.orange,
        fontSize: 30,
    },
    textTitleWrapper: {
        backgroundColor: COLORS.gray,
        justifyContent: "center",
        height: 50,
        paddingLeft: 10,
    },
    textTitle: {
        color: COLORS.dark,
        fontSize: 16,
        // fontWeight: "500",
    },
    infoWrapper: {
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    infoItemLeftWrapper: {
        paddingLeft: 10,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    infoItemRightWrapper: {
        // paddingRight: 20,
        marginRight: 10,
    },
    infoItemTitle: {
        fontSize: 16,
        color: "#6e7781",
    },
    infoItemText: {
        fontSize: 16,
    },
    footer: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    btnBookNow: {
        height: 50,
        width: 160,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

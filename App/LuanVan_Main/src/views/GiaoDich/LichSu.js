import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    // StatusBar,
    ScrollView,
    Dimensions,
    Button,
    StatusBar,
    Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import CustomSwitch from "../../consts/CustomSwitch";
import image from "../../assets/Bear.jpg";
import Finished from "./Finished";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { URL_IMAGES } from "../../api/urlGetDataAPI";

function LichSu({ route, navigation }) {
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

    const dataStoreUser = useSelector((s) => s.storeInforUser);
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

        // if (inforHoaDon[0].IDTour != 0)
        //   inforHoaDon.map((i) => {
        //     getDataTourandSetUseState(i.IDTour);
        //   });
    }, [dataStoreUser, dataStoreHoaDon]);

    const onSelectSwitch = (value) => {
        setFinished(value);
    };

    const DaDat = ({ navigation }) => {
        console.log("LIST Tour: ", listTour);
        if (listTour.length == 0) {
            return (
                <View>
                    <View style={styles.infoTitle}>
                        <Text style={{ fontSize: 16 }}>
                            Hóa đơn đặt tour {inforHoaDon.IDKhachHang}
                        </Text>
                    </View>

                    <View style={styles.info}>
                        <Text>{inforHoaDon.IDKhachHang}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <View style={{ paddingRight: 10 }}>
                        {listTour &&
                            listTour.map((items) => (
                                <TouchableOpacity
                                    key={items._id}
                                    // onPress={() => navigation.navigate("ChiTietHoaDon")}
                                >
                                    <View style={styles.info}>
                                        <Image
                                            style={styles.cardImage}
                                            source={{
                                                uri:
                                                    URL_IMAGES +
                                                        items.IDTour.HinhAnh ||
                                                    "",
                                            }}
                                        />
                                        <View
                                            style={{
                                                paddingRight: 10,
                                                marginRight: 10,
                                                width: "60%",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                }}
                                                numberOfLines={3}
                                                ellipsizeMode="tail"
                                            >
                                                {items.IDTour.TieuDe}
                                            </Text>
                                            <Text>
                                                Ngày đi: {items.NgayKhoiHanh}
                                            </Text>
                                            <Text>
                                                Số lượng hành khách:{" "}
                                                {items.SoLuongKhach}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoPrice}>
                                        <Icon
                                            name="monetization-on"
                                            style={{
                                                fontSize: 18,
                                                marginRight: 5,
                                            }}
                                        />
                                        <Text>Tổng thanh toán: </Text>
                                        <Text>{items.TongTien}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>

                    {/* <View>
            <Text>loi</Text>
            {console.log("LOI: 176: ", dataStoreHoaDon.HD)}
          </View> */}
                </ScrollView>
            );
        }
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
                    Đơn hàng của tôi
                </Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>

            <View>
                <CustomSwitch
                    selectionMode={1}
                    option1="Đã thanh toán"
                    option2="Đã hoàn thành"
                    onSelectSwitch={onSelectSwitch}
                />
            </View>

            {finished == 1 && <DaDat />}
            {finished == 2 && <Finished />}
        </View>
    );
}

export default LichSu;

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
    containerTop: {
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get("window").width,
    },
    top: {
        height: 50,
        width: "50%",
        backgroundColor: COLORS.gray,
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: COLORS.dark,
        borderRightWidth: 0.5,
    },
    infoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.gray,
        height: 40,
        paddingHorizontal: 10,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardImage: {
        height: 150,
        width: 150,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
    },
    infoPrice: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 10,
    },
});

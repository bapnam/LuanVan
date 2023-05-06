import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    // StatusBar,
    Dimensions,
    ScrollView,
    DevSettings,
    StatusBar,
    Platform,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";

import COLORS from "../../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateInforUser } from "../../redux/slice/inforUser";
import axiosClient from "../../api/axiosClient";

const imgWidth = Dimensions.get("screen").width * 0.33333;

const AccountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
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
    console.log("hhhhhh: ", inforUser);
    const dataStoreUser = useSelector((s) => s.storeInforUser);
    const d = new Date();
    const dateNow =
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    const [dataThongKe, setDataThongKe] = useState({});

    useEffect(() => {
        setInforUser(dataStoreUser);
        console.log("LOG account: ", inforUser);
        getDataThongKe();
    }, [dataStoreUser]);

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: "https://c8.alamy.com/compfr/2eda5ta/adorable-avatar-de-vache-adorable-animal-de-ferme-dessin-a-la-main-illustration-vectorielle-isolee-2eda5ta.jpg",
                            }}
                            size={80}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title
                                style={[
                                    styles.title,
                                    {
                                        marginTop: 15,
                                        marginBottom: 5,
                                    },
                                ]}
                            >
                                {inforUser.HoTen}
                            </Title>
                            <View style={styles.row}>
                                <Icon name="cake" color="#777777" size={20} />
                                <Text style={{ color: "#777777" }}>
                                    {inforUser.NgaySinh}
                                </Text>
                            </View>
                            {/* <Caption style={styles.caption}>anhthu</Caption> */}
                        </View>
                    </View>

                    <View style={styles.userInfoSection}>
                        {/* <View style={styles.row}>
                            <Icon name="place" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {inforUser.DiaChi[0].TinhTP &&
                                    inforUser.DiaChi[0].TinhTP}
                            </Text>
                        </View> */}
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {inforUser.SDT}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {inforUser.Email}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="home" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {inforUser.DiaChi.length != 0
                                    ? inforUser.DiaChi[0].ChiTiet
                                    : ""}
                                {console.log(
                                    "HVVVVVVVVVVVVVVVVc",
                                    inforUser.DiaChi.length
                                )}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoBoxWrapper}>
                        <View
                            style={[
                                styles.infoBox,
                                {
                                    borderRightColor: "#dddddd",
                                    borderRightWidth: 1,
                                },
                            ]}
                        >
                            <Title>
                                {dataStoreUser.Quyen == "MUA"
                                    ? "1m"
                                    : dataThongKe.TongDoanhThu}
                            </Title>
                            <Caption>
                                {dataStoreUser.Quyen == "MUA"
                                    ? "Ví"
                                    : "Doanh thu"}
                            </Caption>
                        </View>
                        <View style={styles.infoBox}>
                            <Title>
                                {}{" "}
                                {dataStoreUser.Quyen == "MUA"
                                    ? inforUser.LichSu.length
                                    : dataThongKe.SoLuongBaiDang}
                            </Title>
                            <Caption>
                                {dataStoreUser.Quyen == "MUA"
                                    ? "Đơn hàng"
                                    : "Bài đăng"}
                            </Caption>
                        </View>
                    </View>

                    <View style={styles.menuWrapper}>
                        {dataStoreUser.Quyen == "MUA" ? (
                            <View>
                                <TouchableRipple
                                    onPress={() =>
                                        navigation.navigate("Favorite")
                                    }
                                >
                                    <View style={styles.menuItem}>
                                        <Icon
                                            name="favorite"
                                            color="#FF6347"
                                            size={25}
                                        />
                                        <Text style={styles.menuItemText}>
                                            Your Favorites
                                        </Text>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    onPress={() =>
                                        navigation.navigate("YeuCau")
                                    }
                                >
                                    <View style={styles.menuItem}>
                                        <Icon
                                            name="question-answer"
                                            color="#FF6347"
                                            size={25}
                                        />
                                        <Text style={styles.menuItemText}>
                                            Đặt tour mới theo yêu cầu
                                        </Text>
                                    </View>
                                </TouchableRipple>

                                <TouchableRipple
                                    onPress={() =>
                                        navigation.navigate("ThongBaoclient")
                                    }
                                >
                                    <View style={styles.menuItem}>
                                        <Icon
                                            name="question-answer"
                                            color="#FF6347"
                                            size={25}
                                        />
                                        <Text style={styles.menuItemText}>
                                            Tour đã yêu cầu
                                        </Text>
                                    </View>
                                </TouchableRipple>

                            </View>
                        ) : (
                            <></>
                        )}
                        <View style={styles.menuWrapper}>
                            {dataStoreUser.Quyen == "BAN" ? (
                                <View>
                                    <TouchableRipple
                                        onPress={() =>
                                            navigation.navigate("TourPost")
                                        }
                                    >
                                        <View style={styles.menuItem}>
                                            <Icon
                                                name="post-add"
                                                color="#FF6347"
                                                size={25}
                                            />
                                            <Text style={styles.menuItemText}>
                                                Đăng bài
                                            </Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            ) : (
                                <></>
                            )}

                            <TouchableRipple
                                onPress={() =>
                                    navigation.navigate("EditAccount")
                                }
                            >
                                <View style={styles.menuItem}>
                                    <Icon
                                        name="edit"
                                        color="#FF6347"
                                        size={25}
                                    />
                                    <Text style={styles.menuItemText}>
                                        Cập nhật thông tin
                                    </Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple
                                onPress={() =>
                                    navigation.navigate("ChangePassword")
                                }
                            >
                                <View style={styles.menuItem}>
                                    <Icon
                                        name="credit-card"
                                        color="#FF6347"
                                        size={25}
                                    />
                                    <Text style={styles.menuItemText}>
                                        Đổi mật khẩu
                                    </Text>
                                </View>
                            </TouchableRipple>
                            {/* <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="support-agent" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple> */}
                            <TouchableRipple
                                onPress={() => {
                                    const resetUser = {
                                        stateLogin: false,
                                        id: "id",
                                        HoTen: "",
                                        NgaySinh: "",
                                        SDT: "",
                                        DiaChi: [
                                            {
                                                TinhTP: "",
                                                QuanHuyen: "",
                                                XaPhuong: "",
                                                ChiTiet: "",
                                            },
                                        ],
                                        Email: "ykgk",
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
                                    // dispatch(updateInforUser(resetUser));

                                    DevSettings.reload();
                                }}
                            >
                                <View style={styles.menuItem}>
                                    <Icon
                                        name="settings"
                                        color="#FF6347"
                                        size={25}
                                    />
                                    <Text style={styles.menuItemText}>
                                        Đăng xuất
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    userInfoSection: {
        paddingHorizontal: 20,
        marginBottom: 25,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 80,
    },

    infoBox: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItemText: {
        color: "#777777",
        marginLeft: 20,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 26,
    },
});

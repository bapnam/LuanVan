import React, { useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChiTietHoaDon({ route, navigation }) {
    const { post } = route.params;
    const [product, setProduct] = useState();

    const handleDecrease = () => {
        if (post.post.quantity > 0) {
            setProduct((post.post.quantity -= 1));
        }
    };
    const handleIncrease = () => {
        setProduct((post.post.quantity += 1));
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
                <Text style={{ fontSize: 18 }}>Chi tiết đơn hàng của bạn</Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>
            <ScrollView>
                {/* Tour info */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN CHI TIẾT</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Tên tour</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.TieuDe}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Địa điểm</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.DiaDiem}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Hướng dẫn viên</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.NguoiHuongDan}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Ngày bắt đầu</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>123</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số lượng người</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>Thư</Text>
                    </View>
                </View>

                {/* Thông tin người đặt */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN NGƯỜI ĐẶT</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Họ và tên</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>Thư</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số điện thoại</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>0123456789</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Email</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>thu@gmail.com</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ChiTietHoaDon;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    infoItemLeftWrapper: {
        paddingLeft: 20,
    },
    infoItemRightWrapper: {
        paddingRight: 20,
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

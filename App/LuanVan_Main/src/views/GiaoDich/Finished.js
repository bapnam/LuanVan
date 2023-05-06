import React from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import image from "../../assets/Bear.jpg";

const Finished = () => {
    return (
        <ScrollView>
            <View>
                <View style={styles.infoTitle}>
                    <Text style={{ fontSize: 16 }}>Hóa đơn đặt tour</Text>
                </View>
                <View style={styles.info}>
                    <Image style={styles.cardImage} source={image} />
                    <View>
                        <Text>Tiêu đề</Text>
                        <Text>Ngày đi</Text>
                        <Text>Số lượng hành khách</Text>
                    </View>
                </View>
                <View style={styles.infoPrice}>
                    <Icon
                        name="monetization-on"
                        style={{ fontSize: 18, marginRight: 5 }}
                    />
                    <Text>Tổng thanh toán: </Text>
                    <Text>Giá</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            height: 50,
                            width: 100,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            marginVertical: 10,
                        }}
                    >
                        <Text style={{ color: "white" }}>Mua lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Finished;

const styles = StyleSheet.create({
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
        // justifyContent: "space-around",
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

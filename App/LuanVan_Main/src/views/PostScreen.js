import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";

const PostScreen = ({ navigation }) => {

    const nameKH = useSelector((s) => s.storeInforUser.HoTen);
  const userName = nameKH.slice(nameKH.lastIndexOf(" "));
  console.log(userName);

    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text style={{ fontSize: 18, paddingLeft: 55 }}>
                    Xin chào, {userName}
                </Text>
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("TourPost")}
                >
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>
                        Tour
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 100,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 25,
        borderRadius: 100,
    },
});

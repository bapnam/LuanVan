import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import COLORS from "./color";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomButton = ({
    onPress,
    text,
    widthBtn,
    bgColor,
    textColor,
    type,
    iconName,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {},
                widthBtn ? { width: widthBtn } : {},
            ]}
        >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Icon
                    name={iconName}
                    color={COLORS.white}
                    size={20}
                    style={{ marginRight: 8 }}
                />
                <Text
                    style={[
                        styles.text,
                        styles[`text_${type}`],
                        textColor ? { color: textColor } : {},
                    ]}
                >
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 10,
    },
    container_Primary: {
        backgroundColor: COLORS.primary,
    },
    container_Secondary: {},
    text: {
        fontWeight: "bold",
        fontSize: 16,
        color: COLORS.white,
    },
    text_Secondary: {
        color: "gray",
    },
});

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "./color";

const CustomIcon = ({ iconName, onPress, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
            <Icon name={iconName} size={25} color={COLORS.orange} />
            <Text style={styles.textIcon}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomIcon;

const styles = StyleSheet.create({
    iconContainer: {
        height: 60,
        width: "40%",
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 10,
    },
    textIcon: {
        fontSize: 16,
        paddingTop: 5,
    },
});

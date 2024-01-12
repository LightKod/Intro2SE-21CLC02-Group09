import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { white, dark_gray, borderColor } from "../../constants/colors";

const Card = ({ question, answer }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.cardText}>
                {question}: {answer}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        borderRadius: 10,
        width: Dimensions.get("window").width - 40,
        height: Dimensions.get("window").height - 150,
        backgroundColor: dark_gray,
        justifyContent: "center",
        alignItems: "center",
        borderColor: borderColor,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        fontFamily: "Montserrat_400Regular",
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
    }
});

export default Card;

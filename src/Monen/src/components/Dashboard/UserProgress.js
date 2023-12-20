import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "../Text/CustomText/CustomText.index";
import { dark_gray } from "constants/colors";
import { white, yellow } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import StreakCard from "./StreakCard";
import StatCard from "./StatCard";

const UserProgress = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <StreakCard day={420} />
        <View style={styles.secondRow}>
          <StatCard
            topText={"30 minutes"}
            bottomText={"Average learning time"}
            iconName="fa-calendar"
          />
          <StatCard
            topText={"69"}
            bottomText={"New terms learned this week"}
            iconName="fa-book"
          />
          <StatCard
            topText={"120"}
            bottomText={"Total achievement earned"}
            iconName="fa-trophy"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: dark_gray,
    height: 180,
  },
  leftSide: {
    flex: 3,
  },
  secondRow: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserProgress;

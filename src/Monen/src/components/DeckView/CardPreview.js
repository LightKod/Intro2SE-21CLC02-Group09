import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useDerivedValue,
} from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../Text/CustomText";
import { dark_gray, borderColor } from "../../constants/colors";

const CardPreview = ({ cardFront, cardBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const toggleFlip = () => {
    rotation.value = withTiming(
      isFlipped ? 0 : 180,
      {
        duration: 500,
        easing: Easing.ease,
      },
      () => {
        runOnJS(setIsFlipped)(!isFlipped);
      }
    );
  };

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotation.value + 180}deg` },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            toggleFlip();
          }
        }}
      >
        <Animated.View style={[styles.card, frontCardStyle]}>
          <View style={styles.side}>
            <CustomText style={styles.cardText}>{cardFront}</CustomText>
          </View>
        </Animated.View>
      </TapGestureHandler>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            toggleFlip();
          }
        }}
      >
        <Animated.View style={[styles.cardBack, backCardStyle, styles.card]}>
          <View style={styles.side}>
            <CustomText style={styles.cardText}>{cardBack}</CustomText>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
  card: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    backgroundColor: dark_gray,
    borderRadius: 10,
    margin: 3,
    padding: 10,
    borderColor: borderColor,
    alignSelf: "center",
    marginBottom: 10,
    backfaceVisibility: "hidden",
  },
  side: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
  },
  cardText: {
    fontSize: 22,
    fontFamily: "Montserrat_700Bold",
    color: "white",
    margin: 10,
  },
});

export default CardPreview;

// DeckView.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
import { useRef } from "react";
import Card from "../components/Learn/Card";
import { white, dark_gray, borderColor } from "../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('screen');
const SWIPE_THRESHOLD = 0.25 * width;



const Learn = ({ route }) => {
  const { deckData } = route.params;
  const navigation = useNavigation();
  const length = deckData.cards.length;

  const [data, setData] = React.useState(deckData.cards);

  const handBackPress = () => {
    // Add your logic for handling menu button press
    console.log("Back button pressed!");
    navigation.navigate("DeckView", { deckData });
  };



  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleRightDecay = () => {
    console.log("Done")
    // navigation.navigate("DeckView", { deckData });
  }

  const handleLeftDecay = () => {
    console.log("Fail");
  }

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: { x: velocity, y: vy },
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          if (velocity > 0) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            handleRightDecay();
          } else {
            setCurrentIndex(prevIndex => prevIndex + 1);

            handleLeftDecay();
          }
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    })).current;

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData((data) => {
        if (data.length === 2)
          data = [...data, ...deckData.cards];
        return data.slice(1);
      })
    });
  };

  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({ x: 0, y: 0 });
  }, [data]);


  useEffect(() => {
    if (currentIndex === length) {
      setCurrentIndex(0);
      // setData(
      //   (data) => {
      //     return [...data, ...deckData.cards];
      //   }
      // );
    }
  }, [currentIndex]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handBackPress}>
          <FontAwesomeIcon icon="fa-arrow-left" color={white} size={26} />
        </TouchableOpacity>
        <Text style={styles.deckName}>{deckData.deckName}</Text>
        <Text style={styles.deckIndex}>{length === 0 ? 0 : currentIndex + 1} / {deckData.cards.length}</Text>
      </View>
      <View style={styles.cardHolder}>
        {
          data
            .slice(0, 2)
            .reverse()
            .map((item, index, items) => {
              // check if it's top card
              const isLastItem = index === items.length - 1;
              // apply panHandlers if it's top card
              const panHandlers = isLastItem ? { ..._panResponder.panHandlers } : {};
              // check if it's next card
              const isSecondToLast = index === items.length - 2;
              // rotate from -30 degree to +30 degree for swipe distance of -200 to +200
              const rotate = animation.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ['-30deg', '0deg', '30deg'],
                extrapolate: 'clamp', // make sure the rotation doesn't go beyong 30 degrees.
              });
              // prepare card styles
              const animatedCardStyles = {
                transform: [{ rotate }, ...animation.getTranslateTransform()],
                opacity,
              };
              const cardStyle = isLastItem ? animatedCardStyles : undefined;
              const nextStyle = isSecondToLast
                ? { transform: [{ scale: scale }], borderRadius: 5, }
                : undefined;
              return (
                <Animated.View
                  {...panHandlers}
                  style={[styles.card, cardStyle, nextStyle]}
                  key={index}>
                  <Card {...item} />
                </Animated.View>
              );
            })
        }
      </View>
    </SafeAreaView >
  );
};

export default Learn;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    width: width - 40,
    height: 100,
  },
  deckName: {
    color: white,
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  deckIndex: {
    color: white,
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardHolder: {
    marginTop: 120,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    position: 'absolute',
  }
});
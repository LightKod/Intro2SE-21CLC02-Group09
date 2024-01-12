import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { black, dark_gray, white } from "../../constants/colors";

const CardDataWidget = ({ question, answer, index, onChange }) => {
  const [editedQuestion, setQuestion] = useState(question);
  const [editedAnswer, setAnswer] = useState(answer);

  const handleQuestionChange = (text) => {
    setQuestion(text);
    onChange({ question: editedQuestion, answer: editedAnswer });
  };

  const handleAnswerChange = (text) => {
    setAnswer(text);
    onChange({ question: editedQuestion, answer: editedAnswer });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardIndex}>Card #{index}</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your question here"
          placeholderTextColor={white}
          value={editedQuestion}
          onChangeText={handleQuestionChange}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Answer:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your answer here"
          placeholderTextColor={white}
          value={editedAnswer}
          onChangeText={handleAnswerChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: dark_gray,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    color: white,
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 4,
  },
  cardIndex: {
    color: white,
    fontSize: 22,
    marginBottom: 8,
    fontFamily: "Montserrat_800ExtraBold",
  },
  input: {
    paddingVertical: 8,
    borderColor: white,
    borderBottomWidth: 1,
    color: white,
    backgroundColor: dark_gray,
  },
});

export default CardDataWidget;

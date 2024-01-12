import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { white, dark_gray } from "constants/colors";

const InputModal = ({ isVisible, message, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    // Call the onConfirm function with the current input value and the message
    onConfirm(inputValue);

    // Clear the input value
    setInputValue("");
  };

  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>{message}</Text>
          <TextInput
            style={styles.inputField}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: dark_gray,
    borderRadius: 10,
    padding: 20,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderColor: white,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 18,
    color: white,
    fontFamily: "Montserrat_300Light",
    marginBottom: 10,
  },
  inputField: {
    borderBottomColor: white,
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 18,
    color: white,
    fontFamily: "Montserrat_300Light",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: white,
    fontFamily: "Montserrat_700Bold",
  },
});

export default InputModal;

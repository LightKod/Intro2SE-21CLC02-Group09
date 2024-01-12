import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { white, dark_gray } from "constants/colors";

const CustomModal = ({ isVisible, message, onConfirm }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
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

export default CustomModal;

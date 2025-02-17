import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ListEmptyProps {
  message: string;
}

export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <View>
      <Text style={styles.firstMessage}>1. {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  firstMessage: {
    padding: 30,
    fontSize: 20,
    fontFamily: 'Barlow-Condensed',
  },
});

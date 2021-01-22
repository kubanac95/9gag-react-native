import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const HomePage = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flexGrow: 1 },
});

export default HomePage;

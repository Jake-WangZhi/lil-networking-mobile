import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lil’ Networking App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1A24",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
  },
});

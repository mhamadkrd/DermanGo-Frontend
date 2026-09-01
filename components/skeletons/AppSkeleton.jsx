import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
} from "react-native";

export default function AppSkeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Animated.View
            style={[styles.smallText, { opacity }]}
          />

          <Animated.View
            style={[styles.nameText, { opacity }]}
          />
        </View>

        <Animated.View
          style={[styles.circle, { opacity }]}
        />
      </View>

      {/* Main card */}
      <Animated.View
        style={[styles.mainCard, { opacity }]}
      />

      {/* Title */}
      <Animated.View
        style={[styles.title, { opacity }]}
      />

      {/* Items */}
      {[1, 2, 3].map((item) => (
        <Animated.View
          key={item}
          style={[styles.item, { opacity }]}
        >
          <Animated.View
            style={[styles.itemIcon, { opacity }]}
          />

          <View style={styles.itemContent}>
            <Animated.View
              style={[styles.itemTitle, { opacity }]}
            />

            <Animated.View
              style={[styles.itemText, { opacity }]}
            />
          </View>
        </Animated.View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallText: {
    width: 70,
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 8,
  },

  nameText: {
    width: 140,
    height: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 7,
  },

  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E5E7EB",
  },

  mainCard: {
    width: "100%",
    height: 150,
    backgroundColor: "#E5E7EB",
    borderRadius: 18,
    marginTop: 30,
  },

  title: {
    width: 130,
    height: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 7,
    marginTop: 30,
    marginBottom: 20,
  },

  item: {
    width: "100%",
    height: 85,
    backgroundColor: "#F1F3F5",
    borderRadius: 16,
    marginBottom: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },

  itemContent: {
    flex: 1,
    marginLeft: 15,
  },

  itemTitle: {
    width: "55%",
    height: 15,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginBottom: 10,
  },

  itemText: {
    width: "80%",
    height: 11,
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
  },
});
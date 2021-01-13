import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPost } = useContext(Context);

  /**
   * garante que oque está dentro desta função só é executado uma vez ao
   * criar o componente
   */
  useEffect(() => {
    /**
     * busca os post uma vez quando é criado o componente
     */
    getBlogPost();

    /**
     * listener que é disparado sempre que o componente
     * entra em foco
     */
    const listener = navigation.addListener("didFocus", () => {
      getBlogPost();
    });

    /**
     * se o componente for destruido/fechado
     * é executado tudo dentro do return
     * evita de ficar coisas zumbis pelo app
     */
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        keyExtractor={(blogPost) => blogPost.id.toString()}
        data={state}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

export default IndexScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

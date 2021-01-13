import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        value={title}
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        value={content}
        style={styles.input}
        onChangeText={(text) => setContent(text)}
      />
      <Button title={"Submit"} onPress={() => onSubmit(title, content)} />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

export default BlogPostForm;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    padding: 5,
  },
});

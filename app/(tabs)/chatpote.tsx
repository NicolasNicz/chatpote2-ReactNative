import React, { useState } from "react";
import axios from "axios";
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;
    
    const userMessage: Message = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:7453/chatbot", // Appel au backend proxy
        { input }
      );
      
      const botMessage: Message = {
        sender: "bot",
        text: response.data[0].generated_text || "Je n'ai pas compris."
      };
      
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <View key={index} style={[
            styles.messageContainer,
            msg.sender === "user" ? styles.userMessage : styles.botMessage
          ]}>
            <Markdown>{msg.text}</Markdown>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={input} 
          onChangeText={setInput} 
          placeholder="Écrivez un message..."
        />
        <Button onPress={sendMessage} title={loading ? "..." : "Envoyer"} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 8,
    borderRadius: 5,
    marginVertical: 4,
  },
  userMessage: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
});

export default Chatbot;
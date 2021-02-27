import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Icon } from 'native-base';

const App = () => {

  const [message, setMessage] = React.useState('');
  const [history, setHistory] = React.useState([
    {
      id: 0,
      IsMy: false,
      text: "Hello =))"
    }
  ]);

  const chatRef = React.useRef(null);
  
  React.useEffect(
    () => {
      setTimeout(() => chatRef.current.scrollToEnd(), 1)
    }, 
  [message, history])

  const addMessage = () => {
    setHistory([...history, {
      id: history.length,
      IsMy: true,
      text: message
    }]);
    setMessage('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name='arrow-back' style={styles.iconBack}/>
        <Text style={styles.name}>Margot Robbie</Text>
        <Image 
          style={styles.avatar}
          source={{uri: 'https://i.pinimg.com/originals/67/93/dc/6793dc56621aeaa59ffe4056aaced064.png'}} />
      </View>
      <View style={styles.historyContainer}>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <View
              style={item.IsMy? styles.myMessage : styles.margotMessage}>
              <Text style={styles.messageHistory}>{item.text}</Text>
            </View>
          )}
          keyExtractor={message => message.id.toString()}
          ref={chatRef}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => {
            setMessage(text);
            console.log("message => ", text); 
          }}
          style={styles.messageInput}
        />
        <TouchableOpacity
          onPress={() => {
            if(message.length > 0){
              addMessage()
            }
          }}>
            <Icon name='send' style={styles.iconSend}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headerContainer: {
    height: 50,
    backgroundColor: 'purple',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  iconBack: {
    fontSize: 30, 
    color: 'white',
  },
  name: {
    color: '#ffffff',
    fontSize: 15
  },
  avatar: {
    width: 40, 
    height: 40,
    borderRadius: 50
  },
  historyContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  margotMessage: {
    backgroundColor: 'gray',
    padding: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12
  },
  myMessage: {
    backgroundColor: 'purple',
    padding: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12
  },
  messageHistory: {
    color: '#ffffff'
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    backgroundColor: '#d2d2d2',
    paddingVertical: 3,
    paddingEnd: 5,
    marginLeft: 10,
    flex: 1,
    borderRadius: 5
  },
  iconSend: {
    fontSize: 30, 
    color: 'gray',
    marginEnd: 10,
    marginLeft: 10
  },
});

export default App;


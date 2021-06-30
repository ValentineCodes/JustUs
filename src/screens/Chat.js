import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import uuid from 'react-native-uuid';

import styles from '../styles/chat';

import SentMsg from '../components/SentMsg';

const Chat = ({visible, toggleModal}) => {
  const msgs = useSelector(state => state.msgs);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const search = txt => {
    setText(txt);
    if (!txt.trim()) {
      setSearchResults([]);
    } else {
      const results = msgs.filter(note =>
        note.text.toLowerCase().includes(txt.toLowerCase().trim()),
      );
      setSearchResults(results);
    }
  };

  const toggleSearch = () => {
    setIsSearching(current => !current);

    if (!isSearching) {
      search(text);
    } else {
      setSearchResults([]);
    }
  };

  const addText = txt => {
    setText(txt);
  };

  function getTimestamp() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${hour}:${minutes} ${day}-${month}-${year}`;
  }

  const dispatchNote = () => {
    let id = uuid.v4();
    let timestamp = getTimestamp();

    dispatch({
      type: 'addMsg',
      payload: {
        id,
        text: text.trim(),
        timestamp,
      },
    });
    Keyboard.dismiss();
    setText('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const renderNotes = ({item, index}) => (
    <SentMsg index={index} text={item.text} timestamp={item.timestamp} />
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Our Thoughts
          </Text>

          <TouchableOpacity onPress={toggleModal}>
            <Icon
              reverse
              name="chevron-down-outline"
              type="ionicon"
              size={20}
              color="#444"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={searchResults.length == 0 ? msgs : searchResults}
          keyExtractor={msg => msg.id}
          style={styles.msgsScrollView}
          renderItem={renderNotes}
        />

        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder={
              isSearching ? 'What are you looking for?' : 'Express yourself...'
            }
            maxLength={500}
            value={text}
            onChangeText={isSearching ? search : addText}
            style={styles.inputField}
          />

          <Text
            style={{
              fontSize: 12,
              color:
                text.length > 549 && text.length < 500
                  ? 'yellow'
                  : text.length == 500
                  ? 'red'
                  : 'white',
            }}>
            {text.length}/500
          </Text>
        </View>

        <View style={styles.iconsContainer}>
          {/* Close Modal */}
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              reverse
              name="chevron-down-outline"
              type="ionicon"
              size={20}
              color="rgba(0, 0, 0, 0.38)"
            />
          </TouchableOpacity>

          {/* Invite A Friend */}
          <TouchableOpacity activeOpacity={0.5} style={styles.invite}>
            <Icon
              reverse
              name="person-outline"
              type="ionicon"
              size={20}
              color="rgba(0, 0, 0, 0.38)"
            />
          </TouchableOpacity>

          {/* Search */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={toggleSearch}
            style={styles.search}>
            <Icon
              reverse
              name="search-outline"
              type="ionicon"
              size={20}
              color={isSearching ? '#4e33ff' : 'rgba(0, 0, 0, 0.38)'}
            />
          </TouchableOpacity>

          {/* Send Note */}
          <TouchableOpacity activeOpacity={0.5} onPress={dispatchNote}>
            <Icon
              reverse
              name="paper-plane-outline"
              type="ionicon"
              size={20}
              color="#4e33ff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Chat;

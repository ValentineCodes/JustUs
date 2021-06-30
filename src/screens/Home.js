import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import uuid from 'react-native-uuid';

import styles from '../styles/home';

import Chat from './Chat';

import Note from '../components/Note';

const Home = () => {
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  const [noteToEditID, setNoteToEditID] = useState('');
  const [text, setText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const search = txt => {
    setText(txt);
    if (!txt.trim()) {
      setSearchResults([]);
    } else {
      const results = notes.filter(note =>
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

  const editNote = () => {
    let timestamp = getTimestamp();

    dispatch({
      type: 'editNote',
      payload: {
        id: noteToEditID,
        text: text.trim(),
        timestamp,
      },
    });
    Keyboard.dismiss();
    setText('');
    setIsSearching(false);
    setSearchResults([]);
    setNoteToEditID('');
  };

  const addNote = () => {
    let id = uuid.v4();
    let timestamp = getTimestamp();

    dispatch({
      type: 'addNote',
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

  const setupEditNote = (id, noteText) => {
    setText(noteText);
    setNoteToEditID(id);
  };

  const renderNotes = ({item, index}) => (
    <TouchableOpacity>
      <Note
        index={index}
        id={item.id}
        text={item.text}
        timestamp={item.timestamp}
        setupEditNote={setupEditNote}
      />
    </TouchableOpacity>
  );

  const toggleModal = () => {
    setIsModalVisible(current => !current);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 20,
            marginTop: 20,
          }}>
          My Thoughts
        </Text>
      </View>

      <FlatList
        numColumns={2}
        data={searchResults.length == 0 ? notes : searchResults}
        keyExtractor={note => note.id}
        style={styles.notesScrollView}
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
        {/* Invite A Friend */}
        <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.5}
          style={styles.invite}>
          <Icon
            reverse
            name="people-outline"
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={noteToEditID === '' ? addNote : editNote}
          onLongPress={setNoteToEditID.bind(this, '')}>
          <Icon
            reverse
            name={noteToEditID !== '' ? 'brush-outline' : 'paper-plane-outline'}
            type="ionicon"
            size={20}
            color="#4e33ff"
          />
        </TouchableOpacity>
      </View>

      {/* Our Thoughts Modal */}

      <Chat visible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

export default Home;

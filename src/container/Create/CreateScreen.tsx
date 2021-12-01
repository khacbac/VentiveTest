/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {useCustomTheme} from '../../hooks/themeHooks';
import {Note} from '../../models';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {addNoteFnc, editNoteFnc} from '../../redux/note/action';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CreateScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const {top} = useSafeAreaInsets();
  const route = useRoute<any>();
  const {colors} = useCustomTheme();
  const flow: string = route.params?.flow;
  const note: Note = route.params?.note;
  const isEdit = flow === 'EDIT';
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState(isEdit ? note.title : '');
  const [description, setDescription] = useState(isEdit ? note.body : '');
  const inValid = !title || !description;

  const createOrUpdateNote = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      if (isEdit) {
        dispatch(editNoteFnc(note, {title, description}));
        navigation.goBack();
      } else {
        navigation.navigate('Home');
        dispatch(addNoteFnc({title, description}));
      }
    }, 250);
  };

  return (
    <View
      style={[s.container, {backgroundColor: colors.card, paddingTop: top}]}>
      <Text style={[s.title, {color: colors.text}]}>
        {isEdit ? 'Edit Note' : 'Create Note'}
      </Text>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={s.scrollView}
        keyboardShouldPersistTaps="handled">
        <Text style={[s.inputLabel, {color: colors.text}]}>Title</Text>
        <TextInput
          onChangeText={setTitle}
          placeholder=""
          placeholderTextColor={colors.text}
          style={[s.input, {color: colors.text, borderColor: colors.border}]}
          autoFocus
          value={title}
        />
        <Text style={[s.inputLabel, {color: colors.text}]}>Description</Text>
        <TextInput
          onChangeText={setDescription}
          placeholder=""
          placeholderTextColor={colors.text}
          style={[s.input, {color: colors.text, borderColor: colors.border}]}
          value={description}
          multiline
        />

        <TouchableOpacity
          disabled={inValid}
          style={[
            s.btn,
            {
              opacity: inValid ? 0.5 : 1,
            },
          ]}
          activeOpacity={0.8}
          onPress={createOrUpdateNote}>
          {!loading && (
            <Text style={s.createTxt}>{isEdit ? 'EDIT' : 'CREATE'}</Text>
          )}
          {loading && <ActivityIndicator size="small" color="white" />}
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={[s.closeBtn, {top: top + 10}]}
        onPress={navigation.goBack}>
        <FontAwesome5 name={'times'} color={colors.text} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {flex: 1},
  title: {
    fontSize: 28,
    fontWeight: '800',
    padding: 20,
  },
  scrollView: {
    padding: 20,
  },
  inputLabel: {
    marginTop: 10,
    opacity: 0.7,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'orange',
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});

export default CreateScreen;

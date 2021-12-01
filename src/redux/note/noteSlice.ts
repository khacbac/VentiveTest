import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note} from '../../models';
import {RootState} from '../store';

// Define a type for the slice state
interface INoteState {
  data: Array<Note>;
}

// Define the initial state using that type
const initialState: INoteState = {
  data: [],
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.data = [action.payload, ...state.data];
    },
    updateNotes: (state, action: PayloadAction<Array<Note>>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addNote, updateNotes} = noteSlice.actions;

export const selectNotes = (state: RootState) =>
  state.note.data.filter(nt => !nt.is_archived);
export const selectArchivedNotes = (state: RootState) =>
  state.note.data.filter(dt => dt.is_archived);
export const selectFavoriteNotes = (state: RootState) =>
  state.note.data.filter(dt => dt.is_favorite);

export default noteSlice.reducer;

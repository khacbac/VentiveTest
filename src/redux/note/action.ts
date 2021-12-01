import {Note} from '../../models';
import {AppDispatch, RootState} from '../store';
import {addNote, updateNotes} from './noteSlice';

export const addNoteFnc =
  (item: {title: string; description: string}) => (dispatch: AppDispatch) => {
    const note: Note = {
      _id: Date.now(),
      title: item.title,
      body: item.description,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
      is_favorite: false,
      is_archived: false,
    };
    dispatch(addNote(note));
  };

export const editNoteFnc =
  (note: Note, item: {title: string; description: string}) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const data = getState().note.data;
    dispatch(
      updateNotes(
        data.map(dt => {
          if (dt._id === note._id) {
            return {
              ...dt,
              title: item.title,
              body: item.description,
              updated_at: new Date().toUTCString(),
            };
          }
          return dt;
        }),
      ),
    );
  };

export const toggleNoteFavoriteFnc =
  (item: Note) => (dispatch: AppDispatch, getState: () => RootState) => {
    const data = getState().note.data;
    dispatch(
      updateNotes(
        data.map(note => {
          if (note._id === item._id) {
            return {
              ...note,
              is_favorite: !note.is_favorite,
            };
          }
          return note;
        }),
      ),
    );
  };

export const archiveNoteFnc =
  (item: Note) => (dispatch: AppDispatch, getState: () => RootState) => {
    const data = getState().note.data;
    dispatch(
      updateNotes(
        data.map(note => {
          if (note._id === item._id) {
            return {
              ...note,
              is_archived: true,
            };
          }
          return note;
        }),
      ),
    );
  };

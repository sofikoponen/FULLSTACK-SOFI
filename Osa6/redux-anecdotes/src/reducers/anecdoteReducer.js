import { createSlice } from "@reduxjs/toolkit";
import doteService from "../services/anecdotes";

const doteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createNewDote(state, action) {
      const content = action.payload;
      state.push({ ...content, votes: 0 });
    },
    voteForDote(state, action) {
      const updatedDote = action.payload;
      return state.map((dote) =>
        dote.id !== updatedDote.id ? dote : updatedDote
      );
    },
  },
});

const { setAnecdotes, createNewDote, voteForDote } = doteSlice.actions;

export const initializeDotes = () => {
  return async (dispatch) => {
    const dotes = await doteService.getAll();
    dispatch(setAnecdotes(dotes));
  };
};

export const newDote = (content) => {
  return async (dispatch) => {
    const newDote = await doteService.createNew(content);
    dispatch(createNewDote(newDote));
  };
};

export const voteDote = (content) => {
  return async (dispatch) => {
    const updatedDote = await doteService.vote(content);
    dispatch(voteForDote(updatedDote));
  };
};

export default doteSlice.reducer;

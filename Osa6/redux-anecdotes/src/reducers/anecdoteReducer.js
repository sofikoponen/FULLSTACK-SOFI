import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const doteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createNewDote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: getId(),
        votes: 0,
      });
    },
    voteForDote(state, action) {
      const id = action.payload;
      const doteToVote = state.find((n) => n.id === id);
      const changedDote = {
        ...doteToVote,
        votes: doteToVote.votes + 1,
      };
      return state.map((dote) => (dote.id !== id ? dote : changedDote));
    },
  },
});

export const { createNewDote, voteForDote } = doteSlice.actions;
export default doteSlice.reducer;

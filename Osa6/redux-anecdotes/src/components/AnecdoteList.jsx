import { voteForDote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sorted = anecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteForDote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

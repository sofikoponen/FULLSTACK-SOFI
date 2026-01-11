import { voteDote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { openNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const handleVote = async (anecdote) => {
    dispatch(voteDote(anecdote));
    dispatch(openNotification(`Voted for: ${anecdote.content}`, 5));
  };

  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }

    return state.anecdotes.filter((dote) =>
      dote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

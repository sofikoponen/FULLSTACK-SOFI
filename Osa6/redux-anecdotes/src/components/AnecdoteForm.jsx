import { useDispatch } from "react-redux";
import { createNewDote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addDote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createNewDote(content));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addDote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

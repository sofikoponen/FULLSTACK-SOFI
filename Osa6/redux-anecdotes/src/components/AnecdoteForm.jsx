import { useDispatch } from "react-redux";
import { newDote } from "../reducers/anecdoteReducer";
import { openNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addDote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newDote(content));
    dispatch(openNotification(`Created new anecdote: ${content}`, 5));
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

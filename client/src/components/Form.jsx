import { useState } from "react";

export default function Form({ addItem }) {
  const [text, setText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {description : text};
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
       console.log(text);
      if (response.ok) {
        const newTask = await response.json();
        console.log(newTask);
        addItem({id : newTask.todo_id, text});
        setText(""); 
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control rounded-0"
          placeholder="Add Item Text Here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-success text-white rounded-0 fw-bold"
          type="submit" 
          disabled={text.length === 0}
        >
          Submit
        </button>
      </div>
      <hr />
    </form>
  );
}

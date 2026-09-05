import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Buy milk", done: false },
      { id: 2, text: "Walk the dog", done: true },
      
    ];
  });

  const [draft, setDraft] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const remaining = tasks.filter((task) => !task.done).length;

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task)
    )
  }
  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(e) {
    e.preventDefault();
    if (draft.trim() === "") return;
    const newTask = { id: Date.now(), text: draft, done: false }
    setTasks([...tasks, newTask]);
    setDraft("");
  }

  return (
    <div>
      <h1>My tasks</h1>
      <p>{remaining} Remaining</p>
      <ul>
        {tasks.map((task) =>
          <li key={task.id}>
            <label >
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              {task.text}
            </label>
            <button onClick={() => removeTask(task.id)}>remove</button>
          </li>
        )}
      </ul>
      <form onSubmit={addTask}>
        <input value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App;
import { useState } from 'react'
import './App.css'

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  function addTask() {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: nextId++, text: trimmed, done: false }])
    setInput('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力..."
        />
        <button onClick={addTask}>追加</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.done ? 'task done' : 'task'}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

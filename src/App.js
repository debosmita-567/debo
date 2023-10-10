import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [searchTodo, setSearchTodo] = useState([]);
  const [searchText, setSearchText] = useState("");
  const getTodos = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
      setSearchTodo(res.data);
    });
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setTodos(searchTodo);
    } else {
      const searchResults = searchTodo.filter((todo) =>
        todo.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTodos(searchResults);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <h1>Todos Table</h1>
      <div className="searchDiv">
        <input
          type="search"
          placeholder="Search Todo..."
          value={searchText}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      {todos.length > 0 ? (
        <table>
          <tr id={0}>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
            <th>completed</th>
          </tr>
          {todos.map((todo) => {
            const { userId, id, title, completed } = todo;
            return (
              <>
                <tr key={id}>
                  <td>{userId}</td>
                  <td>{id}</td>
                  <td>{title}</td>
                   <td>{completed ? "true" : "false"}</td>
                </tr>
              </>
            );
          })}
        </table>
      ) : (
        <div>
          <h2>No Data Found</h2>
          <h3>Hey Debo</h3>
        </div>
      )}
    </div>
  );
}

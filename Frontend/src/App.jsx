import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./context/index";
import TodoItem from "./components/TodoItem";
import Navbar from "./components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function App() {
  //todos is a list of array which consists of obbject
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/", {
          credentials: "include", // Important to send cookies
        });

        if (res.status === 401) {
          navigate("/user/login");
        } else {
          const data = await res.json();
          // console.log("Logged in user:", data.user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/user/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const [todos, setTodos] = useState([]);
  //now we havve to define the functions given in todoprovider

  useEffect(() => {
    const fetchtodos = async () => {
      const res = await fetch("http://localhost:8000/todo", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await res.json(); // Parse response
      const mappedtodo = data.map((todo) => ({
        id: todo._id,
        todo: todo.content,
        completed: todo.isCompleted,
      }));
      setTodos(mappedtodo);
    };
    fetchtodos();
  }, []);

  const addTodo = async (todoContent) => {
    const tempTodo = {
      id: Date.now(),
      todo: todoContent,
      completed: false,
    };
    setTodos((prev) => [...prev, tempTodo]);
    console.log(todos);
    try {
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: todoContent }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo on server");
      }
      const dbTodo = await response.json();
      const savedTodo = {
        id: dbTodo._id,
        todo: dbTodo.content,
        completed: dbTodo.isCompleted,
      };
      setTodos((prev) =>
        prev.map((t) => (t.id === tempTodo.id ? savedTodo : t))
      );
    } catch (error) {
      console.error("Error adding todo:", error);
      setTodos((prev) => prev.filter((t) => t.id !== tempTodo.id));
    }
  };



  const editTodo = async (id,todo) => {
    //here todo is the value to be updated and we will get this value from forms
    try {
      const response=await fetch(`http://localhost:8000/todo/${id}`,{
        method:"PATCH",
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({content:todo})
      });
    } catch (error) {
      console.log(error);
    }


    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    try {
      const response = await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log(response);
    } catch (error) {
      console.log("delete error", error);
    }
  };

  const toggleComplete = async (id) => {
    //basically i am curently just chnaging the context api
    try {
      const response = await fetch(`http://localhost:8000/todo/toggle/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setTodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      )
    );
  };
  //using local storage to
  // useEffect(()=>{
  //   const todos=JSON.parse(localStorage.getItem("todos"))
  //   if(todos && todos.length > 0){
  //     setTodos(todos)
  //   }
  // },[])

  // useEffect(()=>{
  //    localStorage.setItem("todos",JSON.stringify(todos))
  // },[todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, editTodo, deleteTodo, toggleComplete }}
    >
      <Navbar />
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

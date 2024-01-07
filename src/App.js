import { ToastContainer } from "react-toastify";
import CreateTask from "./Components/CreateTask";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import ListTask from "./Components/ListTask";

const taskStatus = {
  added: {
    name: "Added",
    items: []
  },
  started: {
    name: "Started",
    items: []
  },
  completed: {
    name: "Completed",
    items: []
  }
};

function App() {
  const [columns, setColumns] = useState(taskStatus);
  const taskData = localStorage.getItem("tasks");

  useEffect(() => {
    if (taskData) {
      setColumns(JSON.parse(taskData));
    }
  }, [taskData]);

  return (
    <div className='bg-slate-200 w-screen min-h-screen flex flex-col items-center pt-10 gap-14 select-none'>
      <h1 className="text-3xl font-semibold">Task Management App</h1>
      <CreateTask columns={columns} setColumns={setColumns} />
      <ListTask columns={columns} setColumns={setColumns} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

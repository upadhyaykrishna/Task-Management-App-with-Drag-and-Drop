import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const CreateTask = ({ columns, setColumns }) => {
  const initialState = {
    id: "",
    content: "",
  };
  const [task, setTask] = useState(initialState);

  const handleOnChange = (e) =>
    setTask({ id: uuid(), content: e.target.value });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (task.content?.length < 2) {
      toast.error("A task must have more than 1 character");
      return;
    }

    const updatedAddedList = [...columns.added.items, task];
    const updatedColumns = {
      ...columns,
      added: { ...columns.added, items: updatedAddedList },
    };

    localStorage.setItem("tasks", JSON.stringify(updatedColumns));

    setTask(initialState);

    toast.success("Task Created Successfully!!");
    setColumns(updatedColumns);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        className="border border-black bg-white rounded-sm mr-5 w-60 px-2 py-1 outline-violet-400"
        onChange={handleOnChange}
        value={task?.content}
      />
      <button
        type="submit"
        className="bg-violet-600 rounded-sm px-4 py-1 text-white hover:bg-violet-500"
      >
        Create
      </button>
    </form>
  );
};

export default memo(CreateTask);

import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (destination === undefined || destination === null) return null;

  if (
    source.droppableId === destination.droppableId &&
    destination.index === source.index
  )
    return null;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    const updatedColumn = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    };
    localStorage.setItem("tasks", JSON.stringify(updatedColumn));
    setColumns(updatedColumn);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    const updatedColumn = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };
    localStorage.setItem("tasks", JSON.stringify(updatedColumn));
    setColumns(updatedColumn);
  }
};

const ListTask = ({ columns, setColumns }) => {
  return (
    <div className="flex justify-center h-full">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns)?.map(([columnId, column]) => {
          return (
            <div className="flex flex-col items-center" key={columnId}>
              <div
                className={`${
                  column.name === "Added" ? "bg-gray-500" : "bg-purple-500"
                } ${
                  column.name === "Completed" && "bg-green-500"
                } w-72 mb-2 py-3 rounded-sm text-white`}
              >
                <h2 className="text-center">{column.name}</h2>
              </div>
              <div className="m-2">
                <Column columnId={columnId} column={column} />
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default ListTask;

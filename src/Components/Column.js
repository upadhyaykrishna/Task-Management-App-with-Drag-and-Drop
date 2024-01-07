import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { memo } from "react";

const Columnn = ({ columnId, column }) => {
  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-2 w-72 min-h-72 rounded-sm shadow-md ${snapshot.isDraggingOver ? "bg-orange-300" : "bg-white"}`}
          >
            {column.items?.map((item, index) => {
              return (
                <div key={index}>
                  <TaskItem index={index} item={item} />
                </div>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  )
}

export default memo(Columnn);
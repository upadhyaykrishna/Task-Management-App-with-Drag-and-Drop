import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`select-none p-4 mb-2 min-h-14 rounded-sm text-white ${
              snapshot.isDragging ? "bg-teal-600" : "bg-indigo-500"
            }`}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            {item.content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default memo(TaskItem);

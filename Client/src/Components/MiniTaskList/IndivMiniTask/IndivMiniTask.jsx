import React, { useState } from "react";
import "./IndivMiniTask.css";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import { DoneTask } from "../../../api/request";

function IndivMiniTask({ task, updateTask, onRemoveTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = () => {
    const formData = new FormData();
    formData.append('taskID',task.id)
    DoneTask.DONE_TASK(formData)
    .then(res =>{
      const task = res.data;
      if(task){
        const notDone = res.data?.filter(data => data.isTaskComplete === 'no');
        const val = notDone?.map((data) =>{
          return({
            name: data.taskName,
            description: data.taskDesc,
            deadline: data.taskDeadline,
            id: data.taskID
          })
        })
        setTimeout(() => onRemoveTask(task.id), 400);
      }
    })

  };
  console.log(onRemoveTask)
  return (
    <div className="imt-wrapper">
      <div className="imt-container">
        <input
          type="checkbox"
          className="imt-checkbox"
          onChange={handleCheckboxChange}
          checked={task.completed}
        />
        {isEditing ? (
          <EditTaskForm
            task={task}
            onSave={updateTask}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="imt-content" onClick={() => setIsEditing(true)}>
            <div className="imt-task-details">
              <div className="imt-name-desc">
                <h2 className={`imt-name ${task.completed ? "completed" : ""}`}>
                  {task.name}
                </h2>
                <p className="imt-desc">{task.description}</p>
              </div>
              <div className="imt-deadline">
                <p>{task.deadline}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="imt-bottom-divider"></div>
    </div>
  );
}

export default IndivMiniTask;

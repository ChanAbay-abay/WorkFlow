import React, { useEffect, useState } from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import { CreatingTask,ListTask,DoneTask,UpdateTask } from "../../api/request";

function MiniTaskList() {
  const [tasks, setTasks] = useState([
    {
      name: "Task 1",
      description: "Description 1",
      deadline: "2023-12-07",
      id: 1,
    },
    {
      name: "Task 2",
      description: "Description 2",
      deadline: "2023-12-08",
      id: 2,
    },
    {
      name: "Task 3",
      description: "Description 3",
      deadline: "2023-12-09",
      id: 3,
    },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (name, description, deadline) => {
    const newTask = { name, description, deadline, id: Date.now() };
    const formData = new FormData();
    formData.append("taskName", name);
    formData.append("taskDesc", description);
    formData.append("taskDeadline", deadline);
    CreatingTask.CREATE_TASK(formData)
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
        setTasks(val);
      }
    })
    // setTasks([...tasks, newTask]);
    setShowAddTask(false);
  };
  async function Fetch(){
    const res = await ListTask.LIST_TASK();
    const notDone = res.data?.filter(data => data.isTaskComplete === 'no');
    const val = notDone?.map((data) =>{
      return({
        name: data.taskName,
        description: data.taskDesc,
        deadline: data.taskDeadline,
        id: data.taskID
      })
    })
    setTasks(val);
  }
  
  const removeTask = (taskId) => {
    Fetch()
  };

  const updateTask = (updatedInfo) => {
    const formData = new FormData();
    formData.append('taskID',updatedInfo.taskID)
    formData.append('taskName',updatedInfo.taskName)
    formData.append('taskDesc',updatedInfo.taskDesc)
    formData.append('taskDeadline',updatedInfo.taskDeadline)
    UpdateTask.UPDATE_TASK(formData)
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
        setTasks(val);
      }
    })
  };

  // Define the handleCancel function
  const handleCancel = () => {
    setShowAddTask(false);
  };

  useEffect(() =>{
      Fetch()
  },[])



  return (
    <div className="mtl-container">
      <h2 className="mtl-title">Personal Tasks</h2>
      <div className="mtl-content">
        {tasks.map((task) => (
          <IndivMiniTask
            key={task.taskID}
            task={task}
            updateTask={updateTask}
            onRemoveTask={removeTask}
          />
        ))}
        {showAddTask ? (
          <AddTaskForm onAddTask={addTask} onCancel={handleCancel} />
        ) : (
          <div className="mtl-button-div">
            <button
              onClick={() => setShowAddTask(true)}
              className="mtl-show-add-form-btn"
              title="Add Task"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniTaskList;

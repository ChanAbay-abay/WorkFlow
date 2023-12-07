import React, { PureComponent } from "react";
import "./TaskReport.css";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TaskReport() {
  const data = [
    {
      name: "Monday",
      tasksCompleted: 2,
    },
    {
      name: "Tuesday",
      tasksCompleted: 4,
    },
    {
      name: "Wednesday",
      tasksCompleted: 0,
    },
    {
      name: "Thursday",
      tasksCompleted: 2,
    },
    {
      name: "Friday",
      tasksCompleted: 1,
    },
    {
      name: "Saturday",
      tasksCompleted: 5,
    },
    {
      name: "Sunday",
      tasksCompleted: 4,
    },
  ];
  return (
    <div className="TR-container">
      <h1 className="TR-title">Progression Chart</h1>
      {/* maybe we can make a tracker for how many tasks a user finishes in 
      a day pina streak streak */}
      <div className="TR-linechart-container">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              // right: 30,
              // left: 20,
              bottom: 35,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              dataKey="tasksCompleted"
              fill="#006edc"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskReport;

// https://www.youtube.com/watch?v=zmKIJqNCcWY
//pie chart also in video (time stamp: 3:34)

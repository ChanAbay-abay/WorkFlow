import React from "react";
import "./TaskReport.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TaskReport() {
  const data = [
    { name: "G1", value: 200 },
    { name: "G2", value: 441 },
    { name: "G3", value: 660 },
    { name: "G4", value: 850 },
    { name: "G5", value: 1010 },
  ];
  return (
    <div className="TR-container">
      <h1 className="TR-title">Progression Chart</h1>
      {/* maybe we can make a tracker for how many tasks a user finishes in 
      a day pina streak streak */}
      <div className="TR-linechart-container">
        <LineChart
          width={1000}
          height={120}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}

export default TaskReport;

// https://www.youtube.com/watch?v=zmKIJqNCcWY
//pie chart also in video (time stamp: 3:34)

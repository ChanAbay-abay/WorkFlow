import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./TLPieChart.css";

function TLPieChart({ tasks }) {
  const calculateCompletionData = () => {
    const completedTasks = tasks.filter((task) => task.isTaskComplete);
    const incompleteTasks = tasks.filter((task) => !task.isTaskComplete);

    return [
      { name: "Completed", value: completedTasks.length },
      { name: "Incomplete", value: incompleteTasks.length },
    ];
  };

  const completionData = calculateCompletionData();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle);
    const y = cy + radius * Math.sin(-midAngle);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="tl-piechart-wrapper">
      <div className="piechart-container">
        <ResponsiveContainer>
          <PieChart width={400} height={400}>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {completionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TLPieChart;

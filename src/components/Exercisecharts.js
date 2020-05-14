import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";

export default function Exercisecharts() {
  const [training, setTraining] = useState([]);
  const chartData = [];

  useEffect(() => {
    getTraining();
    //getClients();
  }, []);

  const getTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((response) => setTraining(response.content))
      .catch((err) => console.error(err));
  };

  /*for (var i = 0; i < training.length; i++) {
    // console.log(chartData);
    chartData.push({
      activityType: training[i].activity,
      length: training[i].duration,
    });
  }*/

  /*let data = _.sumBy(
    _.groupBy(chartData, chartData.activityType),
    chartData.duration
  );*/
  //let data = _.groupBy(chartData, "activityType");
  let data = _.groupBy(training, "activity");
  let time = _.forEach(data, function (value, key) {
    let y = 0;
    _.forEach(value, function (value, key) {
      //y += _.sumBy(key, "duration");
      //console.log(value.duration);
      y += value.duration;
      //console.log(value.duration);
    });
    /*console.log(key);
    console.log("new value " + y);
    console.log("break");*/
    chartData.push({
      activityType: key,
      duration: y,
    });
    //console.log(value[0]);
    //
  }); //_.sumBy(data, "duration"));

  for (var i = 0; i < data.length; i++) {
    // console.log(chartData);
    console.log(data.fitness[i]);
    chartData.push({
      activityType: data[i].activity,
      duration: _.sumBy(data[i], "duration"),
    });
  }

  let newData = _.sumBy(data, "object.duration");
  //let chartData = _.sumBy(data, data.duration);
  // add data as key and new data as content in anew array then pass that array to the chart
  console.log(chartData);
  //console.log(time);
  return (
    <div>
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          width={800}
          height={700}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activityType" />
          <YAxis
            label={{
              value: "Duration(mins)",
              position: "insideLeft",
              angle: -90,
              dy: -10,
            }}
          />
          <Tooltip />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

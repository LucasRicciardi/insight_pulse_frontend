import { Box, Typography, Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import type Metric from "../models/Metric";

interface ChartProps {
  title: string;
  metric: Metric;
}

export default function Chart({ title, metric }: ChartProps) {
  const chartData = metric.values.map((value, index) => {
    return {
      index,
      value,
    };
  });

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="div">
        {title} {metric.unit && `(${metric.unit})`}
      </Typography>
      <Box sx={{ height: 200, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="index" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

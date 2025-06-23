import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type Metric from "../models/Metric";

const DECIMAL_PLACES = 5;

interface StatisticalSummaryProps {
  metric: Metric;
}

export default function StatisticalSummary({ metric }: StatisticalSummaryProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {metric.title} {metric.unit && `(${metric.unit})`}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack>
          <Box>Average: {metric.average.toFixed(DECIMAL_PLACES)}</Box>
          <Box>Median: {metric.median.toFixed(DECIMAL_PLACES)}</Box>
          <Box>Min: {metric.min.toFixed(DECIMAL_PLACES)}</Box>
          <Box>Max: {metric.max.toFixed(DECIMAL_PLACES)}</Box>
          <Box>Standard Deviation: {metric.standardDeviation.toFixed(DECIMAL_PLACES)}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

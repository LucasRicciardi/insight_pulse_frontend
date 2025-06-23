import React from "react";

import { Box, Grid, Stack } from "@mui/material";

import Chart from "./components/Chart";
import ApplicationHeader from "./components/ApplicationHeader";
import Section from "./components/Section";
import StatisticalSummary from "./components/StatisticalSummary";
import FileUploadComponent from "./components/FileUploadComponent";
import type Report from "./models/Report";

function App() {
  const [report, setReport] = React.useState<Report | null>(null);
  return (
    <>
      <ApplicationHeader />
      <Stack spacing={2}>
        <Section title="Load report file">
          <FileUploadComponent onDataLoaded={setReport} />
        </Section>
        {report && (
          <>
            <Section title="Report Overview">
              <Stack>
                <Box>Total items: {report.totalItems}</Box>
                <Box>Total time (Seconds): {report.totalTime.toFixed(5)}</Box>
              </Stack>
            </Section>
            <Section title="Statistical Summary">
              <Grid container spacing={2}>
                {report.metrics.map((metric) => {
                  return (
                    <Grid size={4}>
                      <StatisticalSummary key={metric.name} metric={metric} />
                    </Grid>
                  );
                })}
              </Grid>
            </Section>
            <Section title="Data Visualization">
              <Grid container spacing={2}>
                {report.metrics.map((metric) => {
                  return (
                    <Grid size={12}>
                      <Chart title={metric.title} metric={metric} />
                    </Grid>
                  );
                })}
              </Grid>
            </Section>
          </>
        )}
      </Stack>
    </>
  );
}

export default App;

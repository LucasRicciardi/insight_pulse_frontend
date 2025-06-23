import Metric from "./Metric";
import type ReportData from "./ReportData";

export default class Report {
  public totalItems: number;
  public totalTime: number;
  public metrics: Metric[];

  constructor(data: ReportData[]) {
    this.totalItems = this.calculateTotalItems(data);
    this.totalTime = this.calculateTotalTime(data);
    this.metrics = this.createMetrics(data);
  }

  private calculateTotalItems(data: ReportData[]): number {
    return data[data.length - 1]["total_items" as keyof ReportData];
  }

  private calculateTotalTime(data: ReportData[]): number {
    return data.reduce((accumulator, item) => accumulator + item["total_elapsed_time" as keyof ReportData], 0);
  }

  private createMetrics(data: ReportData[]): Metric[] {
    return [
      new Metric("throughput", "Items/Second", data),
      new Metric("average_memory_usage", "MB", data),
      new Metric("average_cpu_usage", "%", data),
      new Metric("generator_elapsed_time", "Seconds", data),
      new Metric("processor_elapsed_time", "Seconds", data),
    ];
  }
}

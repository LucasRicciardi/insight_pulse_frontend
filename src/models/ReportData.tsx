export default interface ReportData {
  total_items: number;
  items_since_last_report: number;
  throughput: number;
  average_memory_usage: number;
  average_cpu_usage: number;
  total_elapsed_time: number;
  generator_elapsed_time: number;
  processor_elapsed_time: number;
}

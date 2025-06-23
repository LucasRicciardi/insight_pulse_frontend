import type ReportData from "./ReportData";

function snakeCaseToTitleCase(name: string): string {
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default class Metric {
  public name: string;
  public title: string;
  public unit: string;
  public data: ReportData[];

  constructor(name: string, unit: string, data: ReportData[]) {
    this.name = name;
    this.title = snakeCaseToTitleCase(name);
    this.unit = unit;
    this.data = data;
  }

  get values(): number[] {
    return this.data.map((item) => item[this.name as keyof ReportData] as number);
  }

  get average(): number {
    return this.values.reduce((sum, value) => sum + value, 0) / this.values.length;
  }

  get median(): number {
    const sorted = [...this.values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  get min(): number {
    return Math.min(...this.values);
  }

  get max(): number {
    return Math.max(...this.values);
  }

  get standardDeviation(): number {
    const mean = this.average;
    const variance = this.values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / this.values.length;
    return Math.sqrt(variance);
  }
}

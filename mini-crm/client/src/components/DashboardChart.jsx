import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ leads }) {
  const isDark = document.body.classList.contains("dark-mode");

  const statusCounts = {
    New: leads.filter(l => l.status === "New").length,
    Contacted: leads.filter(l => l.status === "Contacted").length,
    Qualified: leads.filter(l => l.status === "Qualified").length,
    Lost: leads.filter(l => l.status === "Lost").length
  };

  const data = {
    labels: ["New", "Contacted", "Qualified", "Lost"],
    datasets: [
      {
        label: "Lead Pipeline",
        data: [
          statusCounts.New,
          statusCounts.Contacted,
          statusCounts.Qualified,
          statusCounts.Lost
        ],
        backgroundColor: isDark? ["#60a5fa", "#fbbf24", "#34d399", "#f87171"] : ["#4f8ef7", "#f6b44b", "#34c38f", "#f46a6a"],  
        hoverBackgroundColor: isDark? ["#93c5fd", "#fde68a", "#6ee7b7", "#fca5a5"]: ["#2563eb", "#d97706", "#059669", "#dc2626"],
        borderRadius: 8
      }
    ]
  };

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Lead Pipeline Overview",
        color: isDark ? "#f1f5f9" : "#0f172a",
        font: {
          size: 16,
          weight: "600"
        }
      },
      tooltip: {
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        titleColor: isDark ? "#f1f5f9" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#334155",
        borderColor: isDark ? "#334155" : "#e2e8f0",
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0"
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#334155"
        }
      },
      y: {
        grid: {
          color: isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0"
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#334155"
        }
      }
    }
  }), [isDark]);

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default DashboardChart;
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  LinearProgress,
  Box,
} from "@mui/material";
import { formatRupiah } from "@/utils/renderRupiah";

// Mapping status CR ke progress percentage (sama seperti di chart)
const statusProgressMapping = {
  "PLAN CR": 0,
  "APPROVE IT": 25,
  "APPROVE BPO": 50,
  "CR IMPLEMENTATION": 75,
  CLOSED: 100,
};

// Mapping status ke warna chip
const getStatusColor = (status) => {
  switch (status) {
    case "PLAN CR":
      return "default";
    case "APPROVE IT":
      return "primary";
    case "APPROVE BPO":
      return "secondary";
    case "CR IMPLEMENTATION":
      return "warning";
    case "CLOSED":
      return "success";
    default:
      return "default";
  }
};

// Component untuk menampilkan status approval BPO
const ApprovalStatus = ({ isBpo1Approve, isBpo2Approve }) => {
  // Function to get status display and styling
  const getStatusDisplay = (approveStatus) => {
    if (approveStatus === "APPROVED") {
      return {
        icon: "✓",
        className: "bg-green-100 border-green-500 text-green-700",
      };
    } else if (approveStatus === "REJECTED") {
      return {
        icon: "✕",
        className: "bg-red-100 border-red-500 text-red-700",
      };
    } else {
      return {
        icon: "○",
        className: "bg-gray-100 border-gray-300 text-gray-500",
      };
    }
  };

  const bpo1Display = getStatusDisplay(isBpo1Approve);
  const bpo2Display = getStatusDisplay(isBpo2Approve);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${bpo1Display.className}`}
      >
        {bpo1Display.icon}
      </span>
      <span className="text-xs text-gray-600">BPO1</span>
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${bpo2Display.className}`}
      >
        {bpo2Display.icon}
      </span>
      <span className="text-xs text-gray-600">BPO2</span>
    </div>
  );
};

export default function CrTrackingTable({ data }) {
  // Transform data untuk menghitung progress dari status
  const processedData =
    data?.map((item, index) => ({
      ...item,
      number: index + 1,
      applicationName: item.ticket?.subject || "Unknown Application",
      progress: statusProgressMapping[item.status_cr] || 0,
      contractNumber: item.ticket?.contract_number || "-",
      contractValue: item.ticket?.contract_value || "-",
    })) || [];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Detail CR Tracking
      </Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 650 }} aria-label="CR tracking table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>BPO Approval</TableCell>
              <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
                Progress
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Kontrak</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nilai Kontrak</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedData.length > 0 ? (
              processedData.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.number}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.applicationName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <ApprovalStatus
                      isBpo1Approve={item.is_bpo1_approve}
                      isBpo2Approve={item.is_bpo2_approve}
                    />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: "#65C7D5",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: "40px" }}>
                        {item.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.contractNumber || "Unknown Contract"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.contractValue && item.contractValue !== "-"
                        ? formatRupiah(item.contractValue)
                        : "Nilai tidak tersedia"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ py: 3 }}
                  >
                    Tidak ada data CR Tracking
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

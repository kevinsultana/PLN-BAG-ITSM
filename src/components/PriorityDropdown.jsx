import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function PriorityDropdown({
  value,
  onChange,
  dataPriorities = [],
  error,
  disabled = false,
  label = "Priority",
  required = true,
  initMenu = "Pilih Priority",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <FormControl fullWidth size="small" error={!!error}>
        <Select
          name="priority_id"
          value={value || ""}
          onChange={onChange}
          displayEmpty
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          disabled={disabled}
          renderValue={(selected) => {
            if (!selected) return <em>{initMenu}</em>;
            const p = dataPriorities.find(
              (p) => String(p.id) === String(selected)
            );
            return (
              <span style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    marginRight: 8,
                    backgroundColor:
                      p?.level === "Kritis"
                        ? "#ef4444"
                        : p?.level === "Tinggi"
                        ? "#f97316"
                        : p?.level === "Sedang"
                        ? "#eab308"
                        : p?.level === "Rendah"
                        ? "#22c55e"
                        : "#d1d5db",
                  }}
                ></span>
                {p?.level}
              </span>
            );
          }}
        >
          <MenuItem value="">
            <em>{initMenu}</em>
          </MenuItem>
          {dataPriorities.map((p, index) => (
            <MenuItem key={index} value={String(p.id ?? "")}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    marginRight: 8,
                    backgroundColor:
                      p.level === "Kritis"
                        ? "#ef4444"
                        : p.level === "Tinggi"
                        ? "#f97316"
                        : p.level === "Sedang"
                        ? "#eab308"
                        : p.level === "Rendah"
                        ? "#22c55e"
                        : "#d1d5db",
                  }}
                ></span>
                {p.level}
              </span>
            </MenuItem>
          ))}
        </Select>
        {!!error && (
          <span className="text-xs text-red-500 mt-1">
            {typeof error === "string" ? error : "Field ini wajib diisi"}
          </span>
        )}
      </FormControl>
    </div>
  );
}

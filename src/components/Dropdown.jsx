import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function Dropdown({
  label,
  dataMenus = [],
  name,
  value,
  handleChange,
  errors,
  isRequired = true,
  initMenu = "Pilih",
  disabled = false,
  className = "",
}) {
  // Helper to get value/id
  const getValue = (menu) => {
    if (menu.id !== undefined) return menu.id;
    if (menu.value !== undefined) return menu.value;
    return menu.name;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="font-semibold text-sm">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <FormControl fullWidth size="small" error={!!errors}>
        <Select
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          displayEmpty
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          disabled={disabled}
        >
          <MenuItem value="">
            <em>{initMenu}</em>
          </MenuItem>
          {dataMenus.map((menu, idx) => (
            <MenuItem key={menu.id ?? menu.value ?? idx} value={getValue(menu)}>
              {menu.name ?? menu.value ?? ""}
            </MenuItem>
          ))}
        </Select>
        {!!errors && (
          <span className="text-xs text-red-500 mt-1">
            {typeof errors === "string" ? errors : "Field ini wajib diisi"}
          </span>
        )}
      </FormControl>
    </div>
  );
}

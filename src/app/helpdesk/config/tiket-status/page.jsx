"use client";
import TicketStatusTable from "@/components/Helpdesk/config/TiketStatus/TicketStatusTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProxyUrl } from "@/api/BaseUrl";

export default function Page() {
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewTiketStats = () => {
    router.push("/helpdesk/config/tiket-status/new");
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await ProxyUrl.get("/ticket-statuses");
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    router.push(`/helpdesk/config/tiket-status/edit/${row.ID}`);
  };

  const handleEditSave = async () => {
    await ProxyUrl.put(`/ticket-statuses/${editRow.ID}`, {
      Name: editName,
      Code: editCode,
    });
    setEditOpen(false);
    getData();
  };

  const handleDelete = (row) => {
    setDeleteRow(row);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await ProxyUrl.delete(`/ticket-statuses/${deleteRow.ID}`);
    setDeleteOpen(false);
    setDeleteRow(null);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi Status Tiket</h1>
        <TicketStatusTable
          data={data.data}
          onClickNewTiketStats={handleNewTiketStats}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
          loading={loading}
        />
      </HelpdeskLayout>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Hapus Status Tiket</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus status tiket{" "}
          <b>{deleteRow?.Name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

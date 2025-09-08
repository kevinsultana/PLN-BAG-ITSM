"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import TicketTypeTable from "@/components/Helpdesk/config/TicketType/TicketTypeTable";
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

export default function page() {
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const router = useRouter();

  const handleNewTicketType = () => {
    router.push("/helpdesk/config/ticket-type/new");
  };

  const getData = async () => {
    try {
      const response = await ProxyUrl.get("/ticket-types");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (row) => {
    router.push(`/helpdesk/config/ticket-type/edit/${row.ID}`);
  };

  const handleDelete = (row) => {
    setDeleteRow(row);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await ProxyUrl.delete(`/ticket-types/${deleteRow.ID}`);
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
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <TicketTypeTable
          data={data.data}
          onClickNewTicketType={handleNewTicketType}
          onClickEdit={handleEdit}
          onClickDelete={handleDelete}
        />
      </HelpdeskLayout>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Hapus Tipe Tiket</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus tipe tiket <b>{deleteRow?.Name}</b>?
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

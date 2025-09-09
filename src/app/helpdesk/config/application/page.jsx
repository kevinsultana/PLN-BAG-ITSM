"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import ApplicationTable from "@/components/Helpdesk/config/Aplikasi/ApplicationTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleNewApplication = () => {
    router.push("/helpdesk/config/application/new");
  };

  const getData = async () => {
    try {
      const response = await ProxyUrl.get("/applications");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  const handleDeleteApplication = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const confirmDeleteApplication = async () => {
    if (!selectedRow) return;
    try {
      await ProxyUrl.delete(`/applications/${selectedRow.ID}`);
      setDeleteModalOpen(false);
      setSelectedRow(null);
      getData();
    } catch (error) {
      console.error("Error deleting application:", error);
      setDeleteModalOpen(false);
      setSelectedRow(null);
    }
  };

  const handleEditApplication = (row) => {
    router.push(`/helpdesk/config/application/edit/${row.ID}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <ApplicationTable
          data={data}
          onClickNewApps={handleNewApplication}
          onClickDelete={handleDeleteApplication}
          onClickEdit={handleEditApplication}
          loading={!data.length}
        />
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            Apakah Anda yakin ingin menghapus aplikasi{" "}
            <b>{selectedRow?.Name}</b>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
              Batal
            </Button>
            <Button
              onClick={confirmDeleteApplication}
              color="error"
              variant="contained"
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </HelpdeskLayout>
    </div>
  );
}

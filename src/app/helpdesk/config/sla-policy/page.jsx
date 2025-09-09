"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import SlaPolicyTable from "@/components/Helpdesk/config/SlaPolicy/SlaPolicyTable";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log(data);
  const router = useRouter();

  const handleNewSLAPolicy = () => {
    router.push("/helpdesk/config/sla-policy/new");
  };

  const handleEditSLAPolicy = (row) => {
    router.push(`/helpdesk/config/sla-policy/edit/${row.ID}`);
  };

  const handleDeleteSLAPolicy = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const confirmDeleteSLAPolicy = async () => {
    if (!selectedRow) return;
    try {
      await ProxyUrl.delete(`/sla-policies/${selectedRow.ID}`);
      setDeleteModalOpen(false);
      setSelectedRow(null);
      toast.success("SLA Policy berhasil dihapus");
      getData();
    } catch (error) {
      console.error("Error deleting SLA Policy:", error);
      setDeleteModalOpen(false);
      setSelectedRow(null);
      toast.error("Gagal menghapus SLA Policy");
    }
  };

  const getData = async () => {
    try {
      const res = await ProxyUrl.get("/sla-policies");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching SLA policies:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Konfigurasi</h1>
        <SlaPolicyTable
          data={data}
          onClickNewSLAPolicy={handleNewSLAPolicy}
          onClickDelete={handleDeleteSLAPolicy}
          onClickEdit={handleEditSLAPolicy}
          loading={!data.length}
        />
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            Apakah Anda yakin ingin menghapus SLA Policy{" "}
            <b>{selectedRow?.Name}</b>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
              Batal
            </Button>
            <Button
              onClick={confirmDeleteSLAPolicy}
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

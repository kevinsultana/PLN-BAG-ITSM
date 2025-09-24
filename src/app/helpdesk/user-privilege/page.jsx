"use client";
import { ProxyUrl } from "@/api/BaseUrl";
import HelpdeskLayout from "@/components/Helpdesk/layout/HelpdeskLayout";
import PrivilegeUserTable from "@/components/Helpdesk/User-Privilege/PrivilegeUserTable";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleEdit = (role) => {
    router.push(`/helpdesk/user-privilege/edit/${role.id}`);
  };

  const getData = async () => {
    try {
      const res = await ProxyUrl.get("/roles");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 h-full">
      <HelpdeskLayout>
        <h1 className="text-2xl font-bold">Privilege User</h1>
        <PrivilegeUserTable onClickEdit={handleEdit} data={data} />
      </HelpdeskLayout>
    </div>
  );
}

// src/pages/Customers.jsx
import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export default function CustomersPage() {
  // seed data (replace with API)
  const [rows, setRows] = useState([
    {
      id: "c1",
      clientName: "John Doe",
      companyName: "Acme Corp",
      designation: "Manager",
      address: "123 Main St, City",
      phone: "1234567890",
      email: "john@example.com",
      gst: "GST12345",
      tags: ["Priority", "Web"],
    },
    {
      id: "c2",
      clientName: "Jane Smith",
      companyName: "Beta Ltd",
      designation: "CEO",
      address: "456 Elm St, Town",
      phone: "9876543210",
      email: "jane@example.com",
      gst: "GST67890",
      tags: ["Hosting"],
    },
    {
        id: "c3",
        clientName: "Alice Johnson",
        companyName: "Gamma Inc",
        designation: "CTO",
        address: "789 Oak St, Village",
        phone: "5551234567",
        email: "aliceJohnson@email.com",
        gst: "GST11223",
        tags: ["Priority", "Retainer"],
    },
    {
        id: "c4",
        clientName: "Bob Williams",
        companyName: "Delta Co",
        designation: "CFO",
        address: "321 Pine St, Metropolis",
        phone: "4449876543",
        email: "bobwilliams235@gmail.com",
        gst: "GST44556",
        tags: ["Web"],
    },
    {
        id: "c5",
        clientName: "Eve Davis",
        companyName: "Epsilon LLC",
        designation: "COO",
        address: "654 Cedar St, Capital City",
        phone: "3335678901",
        email: "evedavis@email.com",
        gst: "GST77889",
        tags: ["Priority", "Hosting"],
    },
    {
        id: "c6",
        clientName: "Frank Miller",
        companyName: "Zeta Partners",
        designation: "Director",
        address: "987 Spruce St, Smalltown",
        phone: "2223456789",
        email: "frankmillar@email.com",
        gst: "GST99001",
        tags: ["App"],
    },
    {
        id: "c7",
        clientName: "Grace Lee",
        companyName: "Eta Solutions",
        designation: "Founder",
        address: "159 Maple St, Bigcity",
        phone: "1112345678",
        email: "gracelee365@email.com",
        gst: "GST22334",
        tags: ["Retainer", "Web"],
    }
  ]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        r.clientName.toLowerCase().includes(q) ||
        r.companyName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.gst.toLowerCase().includes(q)
    );
  }, [rows, search]);

  // simple client-side pagination
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const onCopy = async (val, label = "Copied") => {
    try {
      await navigator.clipboard.writeText(val);
      toast.success(label);
    } catch {
      toast.error("Unable to copy");
    }
  };

  const onDelete = (id) => {
    if (!confirm("Delete this customer?")) return;
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Customer deleted");
  };

  const onSave = (payload) => {
    if (editing) {
      setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...payload, id: editing.id } : r)));
      toast.success("Customer updated");
    } else {
      setRows((prev) => [{ ...payload, id: crypto.randomUUID() }, ...prev]);
      toast.success("Customer added");
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] rounded-2xl p-3 sm:p-5 text-white bg-gradient-to-b from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[clamp(22px,2.5vw,32px)] font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage all your clients in one place</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search client / company / email / GST"
              className="pl-8 w-[260px] sm:w-[320px]"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-violet-600 hover:bg-violet-800 text-white">
                <UserPlus className="h-4 w-4 " /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-700/40 shadow-xl rounded-2xl">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Customer" : "Add Customer"}</DialogTitle>
              </DialogHeader>
              <CustomerForm
                defaultValues={editing || undefined}
                onCancel={() => { setOpen(false); setEditing(null); }}
                onSave={onSave}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card className="rounded-xl border border-slate-200/70 bg-white/75 dark:bg-slate-900/60 backdrop-blur shadow-sm">
        <CardHeader className="px-3 sm:px-4">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-600" />
            Client List
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-4 pb-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b">
                  <th className="py-2 pr-3">Client</th>
                  <th className="py-2 pr-3">Company</th>
                  <th className="py-2 pr-3">Designation</th>
                  <th className="py-2 pr-3">Phone</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">GST</th>
                  <th className="py-2 pr-3">Tags</th>
                  <th className="py-2 pr-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/30  dark:hover:bg-slate-800 transition-colors">
                    <td className="py-2 pr-3">
                      <div className="font-medium">{r.clientName}</div>
                      <div className="text-xs text-muted-foreground">{r.address}</div>
                    </td>
                    <td className="py-2 pr-3">{r.companyName}</td>
                    <td className="py-2 pr-3">{r.designation}</td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{r.phone}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => onCopy(r.phone, "Phone copied")}
                          title="Copy phone"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[180px]">{r.email}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => onCopy(r.email, "Email copied")}
                          title="Copy email"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-2 pr-3">{r.gst}</td>
                    <td className="py-2 pr-3">
                      <div className="flex flex-wrap gap-1">
                        {(r.tags || []).map((t, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          title="Edit"
                          onClick={() => { setEditing(r); setOpen(true); }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-rose-600"
                          title="Delete"
                          onClick={() => onDelete(r.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Form ---------------- */
function CustomerForm({ defaultValues, onCancel, onSave }) {
  const [form, setForm] = useState(
    defaultValues || {
      clientName: "",
      companyName: "",
      designation: "",
      address: "",
      phone: "",
      email: "",
      gst: "",
      tags: "",
    }
  );

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: typeof form.tags === "string" ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : form.tags,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-4 border-b">
        <div className="space-y-1.5">
          <Label>Client Name</Label>
          <Input value={form.clientName} onChange={(e) => update("clientName", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Company Name</Label>
          <Input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Designation</Label>
          <Input value={form.designation} onChange={(e) => update("designation", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Address</Label>
          <Input value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>GST</Label>
          <Input value={form.gst} onChange={(e) => update("gst", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Tags (comma separated)</Label>
          <Input
            placeholder="Priority, Web, Retainer"
            value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{defaultValues ? "Save Changes" : "Add Customer"}</Button>
      </div>
    </form>
  );
}

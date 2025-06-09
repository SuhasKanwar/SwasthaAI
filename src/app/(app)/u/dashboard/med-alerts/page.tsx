"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { userApi } from "@/lib/api";
import BackToLogin from "@/components/BackToLogin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
};

type Reminder = {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  form: string;
  timeSlot: any[];
  isActive: boolean;
  isPaused: boolean;
  category: Category;
};

export default function MedAlertsPage() {
  const { isLoggedIn } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  });
  const [reminderForm, setReminderForm] = useState<any>({
    categoryId: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: "",
    form: "tablet",
    timeSlot: [],
  });

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    Promise.all([
      userApi.get("/api/medalert/categories"),
      userApi.get("/api/medalert/reminders"),
    ])
      .then(([catRes, remRes]) => {
        setCategories(catRes.data.data || catRes.data || []);
        setReminders(remRes.data.data || remRes.data || []);
      })
      .catch(() => toast.error("Failed to load MedAlert data"))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleCreateCategory = async () => {
    try {
      const res = await userApi.post("/api/medalert/categories", categoryForm);
      setCategories((prev) => [...prev, res.data.data || res.data]);
      setShowCategoryModal(false);
      setCategoryForm({ name: "", description: "", color: "#3b82f6" });
      toast.success("Category created");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to create category");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      const res = await userApi.put(
        `/api/medalert/categories/${editingCategory.id}`,
        categoryForm
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? res.data.data || res.data : cat
        )
      );
      setEditingCategory(null);
      setShowCategoryModal(false);
      setCategoryForm({ name: "", description: "", color: "#3b82f6" });
      toast.success("Category updated");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await userApi.delete(`/api/medalert/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to delete category");
    }
  };

  const handleCreateReminder = async () => {
    try {
      const res = await userApi.post("/api/medalert/reminders", reminderForm);
      setReminders((prev) => [...prev, res.data.data || res.data]);
      setShowReminderModal(false);
      setReminderForm({
        categoryId: "",
        medicineName: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        notes: "",
        form: "tablet",
        timeSlot: [],
      });
      toast.success("Reminder created");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to create reminder");
    }
  };

  const handleUpdateReminder = async () => {
    if (!editingReminder) return;
    try {
      const res = await userApi.put(
        `/api/medalert/reminders/${editingReminder.id}`,
        reminderForm
      );
      setReminders((prev) =>
        prev.map((rem) => (rem.id === editingReminder.id ? res.data.data || res.data : rem))
      );
      setEditingReminder(null);
      setShowReminderModal(false);
      setReminderForm({
        categoryId: "",
        medicineName: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        notes: "",
        form: "tablet",
        timeSlot: [],
      });
      toast.success("Reminder updated");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to update reminder");
    }
  };

  const handleDeleteReminder = async (id: string) => {
    if (!window.confirm("Delete this reminder?")) return;
    try {
      await userApi.delete(`/api/medalert/reminders/${id}`);
      setReminders((prev) => prev.filter((rem) => rem.id !== id));
      toast.success("Reminder deleted");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to delete reminder");
    }
  };

  if (!isLoggedIn) return <BackToLogin />;
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  return (
    <section className="min-h-screen w-full pl-27 pt-12 space-y-10">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={() => {
              setEditingCategory(null);
              setCategoryForm({ name: "", description: "", color: "#3b82f6" });
              setShowCategoryModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Create Category
          </Button>
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm"
                style={{ borderTop: `4px solid ${cat.color || "#3b82f6"}` }}
              >
                <span className="font-semibold">{cat.name}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingCategory(cat);
                    setCategoryForm({
                      name: cat.name,
                      description: cat.description || "",
                      color: cat.color || "#3b82f6",
                    });
                    setShowCategoryModal(true);
                  }}
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteCategory(cat.id)}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={() => {
              setEditingReminder(null);
              setReminderForm({
                categoryId: categories[0]?.id || "",
                medicineName: "",
                dosage: "",
                frequency: "",
                startDate: "",
                endDate: "",
                notes: "",
                form: "tablet",
                timeSlot: [],
              });
              setShowReminderModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Create MedAlert
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reminders.map((rem) => (
            <Card
              key={rem.id}
              className="relative p-4 shadow-lg border"
              style={{ borderTop: `6px solid ${rem.category?.color || "#3b82f6"}` }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg">{rem.medicineName}</div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingReminder(rem);
                      setReminderForm({
                        categoryId: rem.category?.id || "",
                        medicineName: rem.medicineName,
                        dosage: rem.dosage,
                        frequency: rem.frequency,
                        startDate: rem.startDate?.slice(0, 10),
                        endDate: rem.endDate?.slice(0, 10) || "",
                        notes: rem.notes || "",
                        form: rem.form,
                        timeSlot: rem.timeSlot || [],
                      });
                      setShowReminderModal(true);
                    }}
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteReminder(rem.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Category:</span> {rem.category?.name}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Dosage:</span> {rem.dosage}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Frequency:</span> {rem.frequency}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Form:</span> {rem.form}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Start:</span> {rem.startDate?.slice(0, 10)}
                {rem.endDate && (
                  <>
                    {" "}
                    <span className="font-semibold">End:</span> {rem.endDate?.slice(0, 10)}
                  </>
                )}
              </div>
              <div className="text-sm mb-1">
                <span className="font-semibold">Active:</span> {rem.isActive ? "Yes" : "No"}
                {" | "}
                <span className="font-semibold">Paused:</span> {rem.isPaused ? "Yes" : "No"}
              </div>
              {rem.notes && (
                <div className="text-xs text-slate-500 mt-2">
                  <span className="font-semibold">Notes:</span> {rem.notes}
                </div>
              )}
              {rem.timeSlot && rem.timeSlot.length > 0 && (
                <div className="text-xs text-slate-500 mt-2">
                  <span className="font-semibold">Time Slots:</span>{" "}
                  {rem.timeSlot
                    .map((slot: any, idx: number) =>
                      typeof slot === "object"
                        ? `${slot.hour}:${slot.minute} ${slot.period}`
                        : slot
                    )
                    .join(", ")}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Create Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Color</Label>
              <Input
                type="color"
                value={categoryForm.color}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, color: e.target.value }))
                }
                className="w-16 h-8 p-0 border-0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
            >
              {editingCategory ? "Update" : "Create"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Drawer open={showReminderModal} onOpenChange={setShowReminderModal}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {editingReminder ? "Edit MedAlert" : "Create MedAlert"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <select
                className="w-full border rounded px-2 py-1"
                value={reminderForm.categoryId}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, categoryId: e.target.value }))
                }
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Medicine Name</Label>
              <Input
                value={reminderForm.medicineName}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, medicineName: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Dosage</Label>
              <Input
                value={reminderForm.dosage}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, dosage: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Frequency</Label>
              <Input
                value={reminderForm.frequency}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, frequency: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Form</Label>
              <Input
                value={reminderForm.form}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, form: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={reminderForm.startDate}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, startDate: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={reminderForm.endDate}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, endDate: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Notes</Label>
              <Input
                value={reminderForm.notes}
                onChange={(e) =>
                  setReminderForm((f: any) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>
                Time Slots (comma separated, e.g. 09:00 AM, 08:00 PM)
              </Label>
              <Input
                value={reminderForm.timeSlot
                  .map((slot: any) =>
                    typeof slot === "object"
                      ? `${slot.hour}:${slot.minute} ${slot.period}`
                      : slot
                  )
                  .join(", ")}
                onChange={(e) => {
                  const slots = e.target.value.split(",").map((s) => {
                    const match = s.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
                    if (match) {
                      return {
                        hour: match[1].padStart(2, "0"),
                        minute: match[2],
                        period: match[3].toUpperCase(),
                      };
                    }
                    return s.trim();
                  });
                  setReminderForm((f: any) => ({ ...f, timeSlot: slots.filter(Boolean) }));
                }}
              />
            </div>
          </div>
          <DrawerFooter>
            <div className="flex w-full gap-4">
              <Button
                className="flex-1"
                onClick={editingReminder ? handleUpdateReminder : handleCreateReminder}
              >
                {editingReminder ? "Update" : "Create"}
              </Button>
              <DrawerClose asChild>
                <Button className="flex-1" variant="ghost">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
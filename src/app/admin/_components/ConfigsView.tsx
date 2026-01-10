"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { FIELD_NAMES } from "./constants";

export default function ConfigsView({
  configs,
  createConfig,
  deleteConfig,
  updateConfig,
  loading,
}: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [currentConfig, setCurrentConfig] = useState({
    name: "",
    config: {} as Record<string, "required" | "shown" | "hidden">,
  });

  const handleOpenCreate = () => {
    setEditingConfig(null);
    setCurrentConfig({ name: "", config: {} });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (config: any) => {
    setEditingConfig(config);
    setCurrentConfig({
      name: config.name,
      config: { ...config.config },
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentConfig.name) {
      toast.error("Config name is required");
      return;
    }

    if (editingConfig) {
      updateConfig({
        id: editingConfig.id,
        name: currentConfig.name,
        config: currentConfig.config,
      });
    } else {
      createConfig(currentConfig);
    }

    setIsDialogOpen(false);
  };

  const updateField = (
    fieldKey: string,
    value: "required" | "shown" | "hidden",
  ) => {
    setCurrentConfig((prev) => ({
      ...prev,
      config: { ...prev.config, [fieldKey]: value },
    }));
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">Loading configs...</div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Application Form Configurations</CardTitle>
            <CardDescription>
              Manage reusable templates for job application forms
            </CardDescription>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Template
          </Button>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">
          Saved Templates ({configs.length})
        </h3>
        {configs.length === 0 && (
          <p className="py-4 text-gray-500 italic">No templates created yet.</p>
        )}
        {configs.map((config: any) => (
          <Card key={config.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50/50 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{config.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEdit(config)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      if (confirm(`Delete config "${config.name}"?`)) {
                        deleteConfig(config.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-green-600">
                    <CheckCircle className="h-3 w-3" /> Required
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "required")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="default"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "required",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-blue-600">
                    <Clock className="h-3 w-3" /> Optional
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "shown")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="secondary"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "shown",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="mb-2 flex items-center gap-1 font-semibold text-gray-500">
                    <XCircle className="h-3 w-3" /> Hidden
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(config.config)
                      .filter(([_, v]) => v === "hidden")
                      .map(([k]) => (
                        <Badge
                          key={k}
                          variant="outline"
                          className="px-1.5 py-0 text-[10px] text-gray-400"
                        >
                          {FIELD_NAMES.find((f) => f.key === k)?.label || k}
                        </Badge>
                      ))}
                    {Object.entries(config.config).filter(
                      ([_, v]) => v === "hidden",
                    ).length === 0 && (
                      <span className="text-xs text-gray-400 italic">None</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle>
                {editingConfig ? "Edit Template" : "New Form Template"}
              </DialogTitle>
              <DialogDescription>
                Define which fields should be required or optional in the
                application form.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Template Name</label>
                <Input
                  placeholder="e.g. Sales Executive Form, IT Dev Application"
                  value={currentConfig.name}
                  onChange={(e) =>
                    setCurrentConfig({ ...currentConfig, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Field Settings</label>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {FIELD_NAMES.map((field) => {
                    const currentValue =
                      currentConfig.config[field.key] || "hidden";
                    return (
                      <div
                        key={field.key}
                        className="flex items-center justify-between rounded-lg border bg-white p-3"
                      >
                        <span className="text-sm font-medium">
                          {field.label}
                        </span>
                        <div className="flex rounded-md bg-gray-100 p-0.5">
                          {(["required", "shown", "hidden"] as const).map(
                            (mode) => (
                              <button
                                key={mode}
                                onClick={() => updateField(field.key, mode)}
                                className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                                  currentValue === mode
                                    ? "text-primary bg-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                              >
                                {mode === "shown" ? "Optional" : mode}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t bg-white p-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingConfig ? "Save Changes" : "Create Template"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

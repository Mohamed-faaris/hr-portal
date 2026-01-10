"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import ConfigsView from "../_components/ConfigsView";

export default function ConfigsPage() {
  const utils = api.useUtils();
  const { data: configs = [], isLoading: configsLoading } =
    api.jobConfigs.getAll.useQuery();

  const createConfigMutation = api.jobConfigs.create.useMutation({
    onSuccess: () => {
      toast.success("Config created successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteConfigMutation = api.jobConfigs.delete.useMutation({
    onSuccess: () => {
      toast.success("Config deleted successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateConfigMutation = api.jobConfigs.update.useMutation({
    onSuccess: () => {
      toast.success("Config updated successfully!");
      void utils.jobConfigs.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Application Form Configs
        </h1>
      </div>
      <ConfigsView
        configs={configs}
        createConfig={(data: any) => createConfigMutation.mutate(data)}
        deleteConfig={(id: string) => deleteConfigMutation.mutate({ id })}
        updateConfig={(data: any) => updateConfigMutation.mutate(data)}
        loading={configsLoading}
      />
    </>
  );
}

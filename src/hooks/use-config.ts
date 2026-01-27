"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type InstallationType = "cli" | "manual";

export interface Config {
  packageManager: PackageManager;
  installationType: InstallationType;
}

const configAtom = atomWithStorage<Config>("config", {
  packageManager: "pnpm",
  installationType: "cli",
});

export function useConfig() {
  return useAtom(configAtom);
}

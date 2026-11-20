import type { ComponentProps } from "react";

import type { Icon } from "../ui";

type IconName = ComponentProps<typeof Icon>["name"];

export type HomeNavigationItem = {
  icon: IconName;
  label: "Tòa Nhà" | "Tin Nhắn" | "Trang Chủ" | "Hợp Đồng" | "Quản Lý";
  active?: boolean;
};

// Destination screens are intentionally not inferred until their use cases are approved.
export const homeNavigationItems: readonly HomeNavigationItem[] = [
  { icon: "bank", label: "Tòa Nhà" },
  { icon: "message", label: "Tin Nhắn" },
  { active: true, icon: "home", label: "Trang Chủ" },
  { icon: "file-text", label: "Hợp Đồng" },
  { icon: "user", label: "Quản Lý" }
];

import { describe, expect, it } from "vitest";

import { homeNavigationItems } from "../src/navigation/homeNavigation";

describe("home navigation contract", () => {
  it("uses the approved full footer labels in canonical order", () => {
    expect(homeNavigationItems.map((item) => item.label)).toEqual(["Tòa Nhà", "Tin Nhắn", "Trang Chủ", "Hợp Đồng", "Quản Lý"]);
  });

  it("keeps Trang Chủ as the only active destination", () => {
    expect(homeNavigationItems.filter((item) => item.active)).toEqual([{ active: true, icon: "home", label: "Trang Chủ" }]);
  });

  it("uses the Ant Design message glyph for Tin Nhắn", () => {
    expect(homeNavigationItems.find((item) => item.label === "Tin Nhắn")?.icon).toBe("message");
  });
});

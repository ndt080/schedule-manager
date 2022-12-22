import { RouterPaths } from "@/core/consts/router-paths";

export const NavbarItems = [
  { icon: "house-fill", url: `/${RouterPaths.HOME}`, modal: "" },
  { icon: "calendar2-date-fill", url: "#", modal: "" },
  { icon: "plus-circle-fill", url: "", modal: "workspace-create-modal" },
  { icon: "gear-fill", url: `/${RouterPaths.SETTINGS}`, modal: "" },
  { icon: "person-fill", url: `/${RouterPaths.PROFILE}`, modal: "" },
];

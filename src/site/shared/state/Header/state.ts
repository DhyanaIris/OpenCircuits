import {DigitalHeaderPopups} from "digital/src/state/Header/state";

export type HeaderMenus = "none" | "download" | "settings" | "tutorial";
export type HeaderPopups = "none" | "login" | "quick_start" | "keyboard_shortcuts" | DigitalHeaderPopups;

export type HeaderState = {
    curMenu: HeaderMenus;
    curPopup: HeaderPopups;
}

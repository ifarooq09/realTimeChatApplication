import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";

export const userAppStore = create()((...a) => ({
    ...createAuthSlice(...a)
}))
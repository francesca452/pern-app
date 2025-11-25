import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("preferred-theme") || "cupcake",
    setTheme: (theme) => {
        localStorage.setItem("preferred-theme", theme);
        set({ theme });
    },
}));

/*export const useThemeStore = create((set) => ({
    theme:"cupcake",
    setTheme: (theme) => set({theme}),
}))*/
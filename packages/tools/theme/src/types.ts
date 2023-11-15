export const THEMECHANGE_NAME = "pap-theme-change";
export const THEMEADD_NAME = "pap-theme-add";

export type ThemeConfig = {
  href: string;
  representColor: string;
  name: string;
};

declare global {
  interface Window {
    oTheme: {
      map: Map<string, ThemeConfig>;
      current: string;
      change(name:string): void;
      add(theme: ThemeConfig): void;
    }
  }
}
import { MuiTheme, ThemeProvider, CssBaseline } from "@repo/ui/themeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik, Playfair_Display } from "next/font/google";
import { Header } from "../components/header";
import Script from "next/script";

const rubik = Rubik({ subsets: ["latin"], variable: "--fontRubik" });
const plafair = Playfair_Display({
  subsets: ["latin"],
  variable: "--fontPlafair",
});

export const metadata: Metadata = {
  title: "Sole - Tours",
  description: "By Muhammad Usama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={
          rubik.variable + " " + rubik.className + " " + plafair.variable
        }
      >
        {children}
      </body>
    </html>
  );
}

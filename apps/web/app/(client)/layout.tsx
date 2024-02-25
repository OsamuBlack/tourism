import { MuiTheme, ThemeProvider, CssBaseline } from "@repo/ui/themeProvider";
import "../globals.css";
import { Header } from "../../components/header";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        <Header />
        {children}
      </ThemeProvider>
      <Script
        strategy="lazyOnload"
        src={`https://embed.tawk.to/${process.env.PROPERTYID}/${process.env.WIDGETID}`}
      />
    </>
  );
}

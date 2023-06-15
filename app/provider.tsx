"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export function QCProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export function MuiCssProvider({ children }: React.PropsWithChildren) {
  let theme = createTheme({
    typography: {
      fontFamily: "Metropolis, sans-serif",
      h1: {
        fontSize: 33,
        fontWeight: 600,
        lineHeight: "40px",
        color: "white",
        "@media (min-width:768px)": {
          fontSize: 40,
        },
        "@media (min-width:1024px)": {
          fontSize: 48,
        },
      },
      h2: {
        fontSize: 23,
        fontWeight: 600,
        lineHeight: "32px",
        color: "white",
        "@media (min-width:768px)": {
          fontSize: 25,
        },
        "@media (min-width:1024px)": {
          fontSize: 27,
        },
      },
      h3: {
        fontSize: 19,
        fontWeight: 400,
        lineHeight: "24px",
        color: "white",
        "@media (min-width:768px)": {
          fontSize: 21,
        },
        "@media (min-width:1024px)": {
          fontSize: 23,
        },
      },
      h4: {
        fontSize: 40,
        fontWeight: 600,
        lineHeight: "40px",
        color: "#38ACE2",
        "@media (min-width:768px)": {
          fontSize: 42,
        },
        "@media (min-width:1024px)": {
          fontSize: 44,
        },
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "24px",
        color: "white",
        "@media (min-width:768px)": {
          fontSize: 18,
        },
        "@media (min-width:1024px)": {
          fontSize: 20,
        },
      },
      body1: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "20px",
        color: "white",
        "@media (min-width:768px)": {
          fontSize: 16,
        },
        "@media (min-width:1024px)": {
          fontSize: 18,
        },
      },
      subtitle2: {
        fontSize: 11,
        fontWeight: 400,
        lineHeight: "16px",
        color: "#F42010",
        "@media (min-width:768px)": {
          fontSize: 13,
        },
        "@media (min-width:1024px)": {
          fontSize: 15,
        },
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            position: "relative",
            backgroundColor: "#0F1A24",
            marginTop: "24px !important",
            padding: "8px 16px",
            "&::after": {
              borderRadius: "4px",
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            },
          },
          arrow: {
            background: "#0F1A24",
            color: "rgba(255, 255, 255, 0.16)",
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.32)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            margin: "16px",
            position: "relative",
            backgroundColor: "#0F1A24",
            "&::after": {
              borderRadius: "4px",
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

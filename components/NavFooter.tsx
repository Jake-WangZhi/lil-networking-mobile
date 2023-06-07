"use client";

import { Home, Users, Settings } from "react-feather";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";

export const NavFooter = () => {
  const { currentPath, setCurrentPath } = useCurrentPath();
  const [value, setValue] = useState(currentPath);
  const router = useRouter();
  const pathname = usePathname();

  const shouldShowFooter =
    pathname !== "/contacts/create" &&
    !pathname?.match(/^\/contacts\/.*\/edit$/);

  return (
    <>
      {shouldShowFooter && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setCurrentPath(newValue);
              router.push(newValue);
            }}
            sx={{
              backgroundColor: "#0F1A24",
              margin: "auto",
              justifyContent: "space-between",
              "& .MuiBottomNavigationAction-root.Mui-selected": {
                color: "white",
              },
              "@media (min-width: 768px)": {
                maxWidth: "576px",
              },
              "@media (min-width: 1024px)": {
                maxWidth: "768px",
              },
            }}
          >
            <BottomNavigationAction
              label="Dashboard"
              icon={<Home />}
              value={"/dashboard"}
              sx={{
                color: "#C5C6C7",
                padding: 0,
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "11px !important",
                },
              }}
            />
            <BottomNavigationAction
              label="Contacts"
              icon={<Users />}
              value={"/contacts"}
              sx={{
                color: "#C5C6C7",
                mx: "48px",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "11px !important",
                },
              }}
            />
            <BottomNavigationAction
              label="Settings"
              icon={<Settings />}
              value={"/settings"}
              sx={{
                color: "#C5C6C7",
                padding: 0,
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "11px !important",
                },
              }}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

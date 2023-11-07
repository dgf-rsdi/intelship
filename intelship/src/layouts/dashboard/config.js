import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { SvgIcon } from "@mui/material";
import React, { useState } from "react";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: "Create Vessel",
  //   path: "/createvessel",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <PlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: "Register User",
  //   path: "/auth/register",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: "Customers",
  //   path: "/customers",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: "Companies",
  //   path: "/companies",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // }
];

// const pathSegments = window.location.pathname.split("/");
// const newId = pathSegments[2];
// console.log(newId);

export const itemsDetail = [
  {
    title: "Vessel Monitor",
    path: `/vesselmonitor`
  },
  {
    title: "Info Kapal",
    path: `/details`
  },
  {
    title: "Stock Bahan Bakar",
    path: `/fuelstock`
  },
  {
    title: "History Pemakaian Bahan Bakar",
    path: `/fuelconsumption`
  },
  {
    title: "History Main Power",
    path: `/mainpower`
  },
  {
    title: "History Tanki",
    path: `/tankhistory`
  },
  {
    title: "History RPM Mesin Kanan",
    path: `/rpmright`
  },
  {
    title: "History RPM Mesin Kiri",
    path: `/rpmleft`
  },
  {
    title: "DFM Kanan",
    path: `/dfmright`
  },
  {
    title: "DFM Kiri",
    path: `/dfmleft`
  },
  {
    title: "History Kecepatan",
    path: `/speedhistory`
  },
  {
    title: "Grafik Summary",
    path: `/graphicsummary`
  },
  {
    title: "CCTV",
    path: `/details`
  }
];

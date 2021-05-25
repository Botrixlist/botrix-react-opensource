import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    cName: "nav__link",
  },
  {
    title: "Profile",
    path: "/me",
    icon: <FaIcons.FaRocket></FaIcons.FaRocket>,
    cName: "nav__link",
  },
  {
    title: "Search",
    path: "/search",
    icon: <FaIcons.FaSearchLocation></FaIcons.FaSearchLocation>,
    cName: "nav__link",
  },
  {
    title: "Bots",
    path: "/bots",
    icon: <FaIcons.FaRobot></FaIcons.FaRobot>,
    cName: "nav__link",
  },
  {
    title: "Servers",
    path: "/servers",
    icon: <FaIcons.FaDiscord></FaIcons.FaDiscord>,
    cName: "nav__link",
  },
  {
    title: "TOS",
    path: "/tos",
    icon: <FaIcons.FaPaperPlane></FaIcons.FaPaperPlane>,
    cName: "nav__link",
  },
  {
    title: "Privacy",
    path: "/privacy",
    icon: <FaIcons.FaTools></FaIcons.FaTools>,
    cName: "nav__link",
  },
];

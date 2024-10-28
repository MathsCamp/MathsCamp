import React from "react";
import Navbar from "../components/Navbar/NavbarPracticeMode";
import ThemePractice from "../components/ThemePractice/ThemePractice";
import { useLocation } from "react-router-dom";

export default function ThemePage() {
  const location = useLocation();

  const test = location.state; //this holds the name of the theme

  return (
    <>
      <Navbar />
      <ThemePractice/>
    </>
  );
}

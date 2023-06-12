import React from "react";

function formatDate(date: string) {
  if (!date) return "Invalid date";
  return new Date(date).toLocaleDateString("en-in", { dateStyle: "full" });
}

export default formatDate;

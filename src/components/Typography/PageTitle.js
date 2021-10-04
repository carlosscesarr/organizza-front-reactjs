import React from "react";

export default function PageTitle({ children, props }) {
  return (
    <h1
      {...props}
      className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
    >
      {children}
    </h1>
  );
}

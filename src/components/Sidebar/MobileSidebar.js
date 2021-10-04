import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

import SidebarContent from "./SidebarContent";

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  if (!isSidebarOpen) {
    return <></>
  }
  return (
    <div className="">

      <div onClick={closeSidebar} className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
      </div>
      <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden appear-done enter-done">
        <SidebarContent />
      </aside>
    </div>
  );
}

export default MobileSidebar;

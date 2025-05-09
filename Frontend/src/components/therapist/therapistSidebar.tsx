import React from "react";
import {
  Home,
  History,
  Calendar as CalendarIcon,
  FileText,
  Inbox,
  Clock
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger
} from "../ui/sidebar";

import { useIsMobile } from "../../hooks/use-mobile";
import { useNavigate } from "react-router";

// Define sidebar navigation items
const sidebarItems = [
  { title: "Home", icon: Home },
  { title: "History", icon: History },
  { title: "Current Bookings", icon: CalendarIcon },
  { title: "Session Notes", icon: FileText },
  { title: "Inbox", icon: Inbox },
  { title: "Redeem", icon: Clock },
];

const TherapistSidebar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <Sidebar className="border-gray-700">
      <SidebarHeader className="py-4 px-4 md:py-6 md:px-4 border-b border-gray-700 flex items-center justify-between">
        <h1
        className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent hover:cursor-pointer"
        onClick={()=>{navigate('/')}}
        >
          OpenUp Portal
        </h1>
        {isMobile && (
          <SidebarTrigger className="text-gray-400" />
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <item.icon className="h-5 w-5 text-teal-400 mr-3" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-700 py-3 px-4 md:py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-teal-400/20 flex items-center justify-center">
            {/* <span className="text-teal-400 font-medium">RS</span> */}
            <img src="/Doc1.png" alt="RS" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <div>
            <p className="text-sm">Dr. Rhea Sharma</p>
            <p className="text-xs text-gray-400">Clinical Psychologist</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default TherapistSidebar;
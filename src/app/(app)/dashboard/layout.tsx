import Sidebar from "@/components/Sidebar";
import { IconHome } from "@tabler/icons-react";
import { AlertCircle, HelpCircle } from "lucide-react";
import { MdAddCircle } from "react-icons/md";

const sidebarLinks = [
    {
        name: "Home",
        icon: <IconHome />,
        link: "/",
    },
    {
        name: "MedAlerts",
        icon: <AlertCircle />,
        link: "/dashboard/medalerts",
    },
    {
        name: "Book Appointment",
        icon: <MdAddCircle />,
        link: "/dashboard/book-appointment",
    },
    {
        name: "Help",
        icon: <HelpCircle />,
        link: "/dashboard/help",
    },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar items={sidebarLinks} />
      {children}
    </main>
  );
}
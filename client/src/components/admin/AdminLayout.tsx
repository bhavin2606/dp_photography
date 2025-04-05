
import { Navigate } from "react-router-dom";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Boxes, ImageIcon, PackageIcon, Calendar, MessageSquare, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

interface SidebarNavItem {
  title: string;
  href: string;
  icon: any;
}

const AdminLayout = ({ children, isLoggedIn }: AdminLayoutProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const navItems: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Boxes,
    },
    {
      title: "Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      title: "Packages",
      href: "/admin/packages",
      icon: PackageIcon,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquare,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <div className="py-4 px-2 flex items-center justify-center">
            <Link to="/" className="font-serif text-xl font-medium">
              DP Photography
            </Link>
          </div>
          <nav className="mt-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center px-4 py-2 mt-auto">
            <UserCircle className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">Admin</span>
          </div>
        </Sidebar>
        <main className="flex-1 p-6 md:p-8 pt-4 md:pt-6 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

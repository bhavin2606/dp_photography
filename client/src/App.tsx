
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { useState } from "react";
import AdminLayout from "./components/admin/AdminLayout";
import AdminGallery from "./pages/admin/Gallery";
import AdminPackages from "./pages/admin/Packages";
import AdminBookings from "./pages/admin/Bookings";
import AdminTestimonials from "./pages/admin/Testimonials";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <WhatsAppButton />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="packages" element={<Packages />} />
              <Route path="booking" element={<Booking />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/admin/dashboard" element={
              <AdminLayout isLoggedIn={isLoggedIn}>
                <AdminDashboard />
              </AdminLayout>
            } />
            <Route path="/admin/gallery" element={
              <AdminLayout isLoggedIn={isLoggedIn}>
                <AdminGallery />
              </AdminLayout>
            } />
            <Route path="/admin/packages" element={
              <AdminLayout isLoggedIn={isLoggedIn}>
                <AdminPackages />
              </AdminLayout>
            } />
            <Route path="/admin/bookings" element={
              <AdminLayout isLoggedIn={isLoggedIn}>
                <AdminBookings />
              </AdminLayout>
            } />
            <Route path="/admin/testimonials" element={
              <AdminLayout isLoggedIn={isLoggedIn}>
                <AdminTestimonials />
              </AdminLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import { useEffect, useState } from "react";
import {
  fetchBookings,
  updateBookingStatus as apiUpdateStatus,
} from "@/services/bookingService";
import { sendEmailApi } from "@/services/emailService";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Eye, Mail, MessageSquare } from "lucide-react";
import { Booking } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// const mockBookings: Booking[] = [
//   {
//     id: "B1001",
//     name: "Priya Sharma",
//     email: "priya@example.com",
//     phone: "9876543210",
//     eventType: "Wedding",
//     date: "2023-07-28",
//     location: "Mumbai, Maharashtra",
//     message: "Looking forward to having you capture our special day!",
//     status: "confirmed",
//     createdAt: "2023-06-15"
//   },
//   {
//     id: "B1002",
//     name: "Rahul Malhotra",
//     email: "rahul@example.com",
//     phone: "9876543211",
//     eventType: "Engagement",
//     date: "2023-07-25",
//     location: "Delhi, NCR",
//     message: "We're excited about our engagement shoot.",
//     status: "pending",
//     createdAt: "2023-06-18"
//   },
//   {
//     id: "B1003",
//     name: "Neha Patel",
//     email: "neha@example.com",
//     phone: "9876543212",
//     eventType: "Family",
//     date: "2023-07-24",
//     location: "Ahmedabad, Gujarat",
//     status: "confirmed",
//     createdAt: "2023-06-20"
//   },
//   {
//     id: "B1004",
//     name: "Vikram Singh",
//     email: "vikram@example.com",
//     phone: "9876543213",
//     eventType: "Corporate",
//     date: "2023-07-20",
//     location: "Bangalore, Karnataka",
//     message: "This is our annual company event. We need comprehensive coverage.",
//     status: "cancelled",
//     createdAt: "2023-06-10"
//   },
//   {
//     id: "B1005",
//     name: "Ananya Desai",
//     email: "ananya@example.com",
//     phone: "9876543214",
//     eventType: "Birthday",
//     date: "2023-08-05",
//     location: "Pune, Maharashtra",
//     message: "It's my daughter's first birthday.",
//     status: "confirmed",
//     createdAt: "2023-06-25"
//   },
// ];

const AdminBookings = () => {
  // const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const { toast } = useToast();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (err: any) {
        toast({
          title: "Failed to load bookings",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredBookings = activeTab === "all"
    ? bookings
    : bookings.filter(booking => booking.status === activeTab);

  // const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
  //   const updatedBookings = bookings.map(booking =>
  //     booking.id === id ? { ...booking, status } : booking
  //   );

  //   setBookings(updatedBookings);

  //   toast({
  //     title: "Status Updated",
  //     description: `Booking ${id} has been ${status}.`,
  //   });
  // };
  const updateBookingStatus = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    try {
      const updated = await apiUpdateStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
      );
      toast({
        title: "Status Updated",
        description: `Booking has been marked as ${status}.`,
      });
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };


  // const sendEmail = () => {
  //   if (!viewBooking) return;

  //   if (!emailSubject || !emailMessage) {
  //     toast({
  //       title: "Error",
  //       description: "Please fill all email fields",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   // This would normally connect to an email service
  //   console.log("Sending email to:", viewBooking.email);
  //   console.log("Subject:", emailSubject);
  //   console.log("Message:", emailMessage);

  //   setIsEmailModalOpen(false);
  //   setEmailSubject("");
  //   setEmailMessage("");

  //   toast({
  //     title: "Email Sent",
  //     description: `Email has been sent to ${viewBooking.name}.`,
  //   });
  // };

  const sendEmail = async () => {
    if (!viewBooking) return;

    if (!emailSubject || !emailMessage) {
      toast({
        title: "Error",
        description: "Please fill all email fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendEmailApi({
        to: viewBooking.email,
        subject: emailSubject,
        message: emailMessage,
      });

      toast({
        title: "Email Sent",
        description: `Email has been sent to ${viewBooking.name}.`,
      });

      setIsEmailModalOpen(false);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error: any) {
      toast({
        title: "Email Failed",
        description: error.message || "Could not send email.",
        variant: "destructive",
      });
    }
  };

  const handleContactClick = (booking: Booking) => {
    setViewBooking(booking);
    setEmailSubject(`Regarding your photography booking (${booking._id})`);
    setEmailMessage(`Dear ${booking.name},\n\nThank you for booking with DP Photography for your ${booking.eventType} on ${format(new Date(booking.date), "MMMM d, yyyy")}.\n\n`);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Booking Management</h2>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">{booking._id}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.eventType}</TableCell>
                  <TableCell>{format(new Date(booking.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setViewBooking(booking)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleContactClick(booking)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bookings found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Booking Dialog */}
      <Dialog open={!!viewBooking && !isEmailModalOpen} onOpenChange={(open) => !open && setViewBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              ID: {viewBooking?._id}
            </DialogDescription>
          </DialogHeader>

          {viewBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">{viewBooking.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Event Type</Label>
                  <p className="font-medium">{viewBooking.eventType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{viewBooking.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  <p className="font-medium">{viewBooking.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Date</Label>
                  <p className="font-medium">{format(new Date(viewBooking.date), "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{viewBooking.status}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Location</Label>
                <p className="font-medium">{viewBooking.location}</p>
              </div>

              {viewBooking.message && (
                <div>
                  <Label className="text-sm text-muted-foreground">Message</Label>
                  <p className="text-sm pt-1">{viewBooking.message}</p>
                </div>
              )}

              <div className="border-t pt-4 mt-6">
                <Label className="text-sm font-medium">Update Status</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant={viewBooking.status === 'pending' ? "default" : "outline"}
                    onClick={() => updateBookingStatus(viewBooking._id, 'pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={viewBooking.status === 'confirmed' ? "default" : "outline"}
                    onClick={() => updateBookingStatus(viewBooking._id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant={viewBooking.status === 'cancelled' ? "default" : "outline"}
                    onClick={() => updateBookingStatus(viewBooking._id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewBooking(null)}>
              Close
            </Button>
            <Button onClick={() => handleContactClick(viewBooking!)}>
              <Mail className="mr-2 h-4 w-4" />
              Contact Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Client</DialogTitle>
            <DialogDescription>
              Send an email to {viewBooking?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="email-to">To</Label>
              <Input id="email-to" value={viewBooking?.email} disabled />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Enter your message"
                rows={8}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendEmail}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;

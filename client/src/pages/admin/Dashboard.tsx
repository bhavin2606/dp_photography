
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CalendarDays, User, Users, Camera, Activity, Package } from "lucide-react";
import { packages } from "@/data/packagesData";
import { galleryImages } from "@/data/galleryData";

// Mock data for the dashboard
const bookingData = [
  { name: "Jan", total: 4 },
  { name: "Feb", total: 6 },
  { name: "Mar", total: 10 },
  { name: "Apr", total: 8 },
  { name: "May", total: 12 },
  { name: "Jun", total: 15 },
  { name: "Jul", total: 16 },
];

const visitorData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 240 },
  { name: "Mar", total: 380 },
  { name: "Apr", total: 420 },
  { name: "May", total: 550 },
  { name: "Jun", total: 480 },
  { name: "Jul", total: 600 },
];

const Dashboard = () => {
  // Calculate stats
  const totalPackages = packages.length;
  const totalImages = galleryImages.length;
  const totalBookings = 38; // Mock data
  const totalVisitors = 1240; // Mock data

  const recentBookings = [
    { id: "B1001", name: "Priya Sharma", date: "2023-07-28", package: "Premium Wedding", status: "Confirmed" },
    { id: "B1002", name: "Rahul Malhotra", date: "2023-07-25", package: "Engagement Session", status: "Pending" },
    { id: "B1003", name: "Neha Patel", date: "2023-07-24", package: "Family Portrait", status: "Confirmed" },
    { id: "B1004", name: "Vikram Singh", date: "2023-07-20", package: "Corporate Event", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImages}</div>
            <p className="text-xs text-muted-foreground">+{totalImages > 10 ? totalImages - 10 : 0} new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPackages}</div>
            <p className="text-xs text-muted-foreground">All packages active</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings Over Time</CardTitle>
              <CardDescription>Number of bookings received per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={bookingData}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Bar dataKey="total" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Visitors</CardTitle>
              <CardDescription>Unique visitors to the website per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={visitorData}>
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Line type="monotone" dataKey="total" stroke="#D4AF37" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                <div>ID</div>
                <div>Name</div>
                <div>Date</div>
                <div>Status</div>
              </div>
              <div className="space-y-2">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="grid grid-cols-4 text-sm">
                    <div className="font-medium">{booking.id}</div>
                    <div>{booking.name}</div>
                    <div>{new Date(booking.date).toLocaleDateString()}</div>
                    <div>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
            <CardDescription>Most popular photography categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart layout="vertical" data={[
                { name: "Wedding", total: 18 },
                { name: "Engagement", total: 12 },
                { name: "Birthday", total: 8 },
                { name: "Family", total: 5 },
                { name: "Corporate", total: 3 },
              ]}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Bar dataKey="total" fill="#D4AF37" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

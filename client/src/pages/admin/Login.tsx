
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating authentication
    setTimeout(() => {
      // For demo purposes, accept any non-empty credentials
      if (username && password) {
        onLogin();
        navigate("/admin/dashboard");
        toast({
          title: "Logged in successfully",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <UserCircle className="h-12 w-12 text-gold" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <p className="text-center mt-4 text-sm text-gray-500">
          <a href="/" className="text-gold hover:underline">
            &larr; Back to website
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

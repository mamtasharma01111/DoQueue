import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

 
const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!userName || !password) {
    toast.error('Please enter both username and password.');
    return;
  }
  console.log('username:', userName);
  console.log('password:',password)

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API}/auth/login`,
      {
        userName,
        password,
      },
      { }
    );
console.log(res)
    const role = res.data?.data?.role;

    if (role === 'admin') {
      navigate('/adminDashboard');
    } else if (role === 'emp') {
      navigate('/V2/Details');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || err.message || 'An error occurred.');
    } else {
      console.error(err);
      toast.error('Something went wrong.');
    }
  }
};


  return (
<div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
  <Card className="w-full max-w-md shadow-lg bg-white rounded-xl">
    <CardHeader className="text-center space-y-1">
      <CardTitle className="text-3xl font-bold text-blue-700">Sign In</CardTitle>
      <CardDescription className="text-sm text-gray-600">
        Enter your username and password below
      </CardDescription>
    </CardHeader>

    {/* Add form here */}
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div
            className="absolute right-3 top-6 cursor-pointer text-gray-500"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {/* Change button type to submit */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-6"
        >
          Sign In
        </Button>
      </CardFooter>
    </form>
  </Card>
</div>
  )
}

export default Login

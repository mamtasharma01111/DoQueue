import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Simulated authentication (you can replace this with actual logic)
    if (username && password) {
      console.log('Logging in with:', { username, password })
      alert('Login successful!')
    } else {
      alert('Please enter both username and password.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <Card className="w-full max-w-sm shadow-lg border-0 bg-white rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-700">Sign In</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter your Username and Password below
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user" className="text-sm text-gray-700">
              Username
            </Label>
            <Input
              id="user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login

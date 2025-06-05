"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Heart,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { toast } from "sonner"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  })

  const validateForm = () => {
    if (formData.password.length < 8) {
      toast.error("Password too short", {
        description: "Password must be at least 8 characters long.",
        icon: <AlertCircle className="w-4 h-4" />,
      })
      return false
    }

    if (!formData.email.includes("@")) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address.",
        icon: <AlertCircle className="w-4 h-4" />,
      })
      return false
    }

    if (formData.name.trim().length < 2) {
      toast.error("Name too short", {
        description: "Please enter your full name (at least 2 characters).",
        icon: <AlertCircle className="w-4 h-4" />,
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true);

    const loadingToast = toast.loading("Creating your account...", {
      description: "Please wait while we set up your SwasthaAI account.",
    })

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const isSuccess = Math.random() > 0.2

      toast.dismiss(loadingToast)

      if (isSuccess) {
        toast.success("Account created successfully!", {
          description: `Welcome to SwasthaAI, ${formData.name}! Please check your email to verify your account.`,
          icon: <CheckCircle className="w-4 h-4" />,
          duration: 6000,
          action: {
            label: "Resend Email",
            onClick: () => {
              toast.info("Verification email sent", {
                description: "Please check your inbox and spam folder.",
              })
            },
          },
        })
        console.log("Signup successful:", formData)
      } else {
        toast.error("Account creation failed", {
          description: "An error occurred while creating your account. Please try again.",
          icon: <XCircle className="w-4 h-4" />,
          action: {
            label: "Retry",
            onClick: () => handleSubmit(e),
          },
        })
      }
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
        icon: <XCircle className="w-4 h-4" />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoogleSignup = () => {
    toast.info("Redirecting to Google", {
      description: "You will be redirected to Google to create your account.",
      duration: 3000,
    })
    console.log("Google signup")
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />

      <Link href="/" className="absolute top-6 left-6 z-20">
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <Card className="w-full max-w-md glassmorphism border-0 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Join SwasthaAI
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">Create your account to get started</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400 pr-10"
                  disabled={isLoading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Account Type</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                className="grid grid-cols-2 gap-4"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient" className="flex items-center cursor-pointer flex-1">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">Patient</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-teal-50 transition-colors">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor" className="flex items-center cursor-pointer flex-1">
                    <Stethoscope className="w-4 h-4 mr-2 text-teal-500" />
                    <span className="text-sm font-medium">Doctor</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-slate-200 hover:bg-slate-50"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Zap, Users } from "lucide-react"
import { FloatingElements } from "@/components/FloatingElements"
export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 mesh-animation opacity-50" />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-3xl bg-white/20 shadow-xl">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full text-blue-700 font-medium">
            AI-Powered Healthcare Platform
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Smarter, Faster,
            <br />
            Personalized Healthcare
          </h1>

          <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Harness the power of AI to revolutionize healthcare delivery. From symptom analysis to predictive
            diagnostics, experience the future of medicine today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-6 text-lg pulse-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try Now
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-6 text-lg">
              <Users className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">10M+</div>
              <div className="text-slate-600">Patients</div>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-teal-600">95%</div>
              <div className="text-slate-600">Accuracy</div>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-cyan-600">24/7</div>
              <div className="text-slate-600">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
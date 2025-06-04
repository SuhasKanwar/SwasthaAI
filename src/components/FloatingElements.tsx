"use client"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full float-animation"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-teal-400/20 rounded-full float-animation"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-3 h-3 bg-cyan-400/20 rounded-full float-animation"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-5 h-5 bg-blue-500/20 rounded-full float-animation"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-200/30 to-transparent" />

      <div className="absolute top-1/3 left-0 w-full h-px wave-animation" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/3 left-0 w-full h-px wave-animation" style={{ animationDelay: "1.5s" }} />
    </div>
  )
}
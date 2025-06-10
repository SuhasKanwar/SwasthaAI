"use client";

import React, { useRef, useState } from "react";
import BackToLogin from "@/components/BackToLogin";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, Send, UploadCloud, User, Bot, X } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

const SUGGESTIONS = [
	{
		title: "Medication Guidance",
		desc: "Ask about your prescriptions, dosages, or side effects.",
	},
	{
		title: "Symptom Checker",
		desc: "Describe your symptoms and get AI-powered insights.",
	},
	{
		title: "Diet & Lifestyle",
		desc: "Get advice on healthy eating and daily routines.",
	},
	{
		title: "Mental Health",
		desc: "Talk about stress, anxiety, or sleep issues.",
	},
];

export default function SwasthaAIChatbotPage() {
	const { isLoggedIn } = useAuth();
	const [messages, setMessages] = useState<any[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [voiceActive, setVoiceActive] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSend = async () => {
		if (!input.trim()) return;
		setLoading(true);
		setError(null);

		// Add user message
		const userMsg = { id: Date.now(), sender: "user", text: input };
		setMessages((prev) => [...prev, userMsg]);
		setInput("");

		//TODO: Make API call to backend with input and selected file

		setLoading(false);
		setSelectedFile(null);
	};

	const handleVoice = () => {
		if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
			toast.error("Speech recognition is not supported in this browser.");
			return;
		}
		setVoiceActive(true);
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onresult = (event: any) => {
			const transcript = event.results[0][0].transcript;
			setInput(transcript);
			setVoiceActive(false);
		};
		recognition.onerror = () => {
			toast.error("Voice input failed. Please try again.");
			setVoiceActive(false);
		};
		recognition.onend = () => {
			setVoiceActive(false);
		};
		recognition.start();
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
			toast.success(`File "${e.target.files[0].name}" selected!`);
		}
	};

	const removeSelectedFile = () => {
		setSelectedFile(null);
		toast.info("File deselected.");
	};

	if (!isLoggedIn) return <BackToLogin />;

	return (
		<section className="min-h-screen w-full pl-20 pr-5 pt-10 flex flex-col items-center">
			<div className="w-full max-w-3xl flex-1 flex flex-col justify-center items-center mx-auto">
				{/* Initial Centered Content */}
				{messages.length === 0 && !loading && (
					<div className="flex flex-col items-center mt-20 mb-10 w-full">
						<h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
							<span className="text-slate-800">Swastha</span>
							<span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent ml-2">
								AI Chatbot
							</span>
							<span className="ml-2">
								<Bot className="inline w-10 h-10 text-blue-400 align-middle" />
							</span>
						</h1>
						<p className="text-lg text-slate-600 text-center mb-8">
							Hi there! I'm SwasthaAI, ready to assist with your health needs.
						</p>
						<div className="flex flex-wrap justify-center gap-4 mb-10">
							{SUGGESTIONS.map((s, i) => (
								<div
									key={i}
									className="rounded-xl border border-slate-200 shadow-sm p-5 w-64 bg-white hover:shadow-md transition group"
									style={{ minHeight: 120 }}
									onClick={() => setInput(s.title)}
									role="button"
									tabIndex={0}
								>
									<div className="flex items-center justify-between mb-2">
										<span className="font-semibold text-lg text-slate-700">
											{s.title}
										</span>
										<span className="text-blue-500 group-hover:translate-x-1 transition">
											<svg
												width="20"
												height="20"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24"
											>
												<line x1="5" y1="12" x2="19" y2="12" />
												<polyline points="12 5 19 12 12 19" />
											</svg>
										</span>
									</div>
									<div className="text-slate-500 text-sm">
										{s.desc}
									</div>
								</div>
							))}
						</div>
						<div className="text-xs text-slate-400 text-center mt-2">
							<span className="font-semibold text-blue-500">
								RAG-based chatbot
							</span>{" "}
							&mdash; Upload your health report and ask questions for personalized answers.
						</div>
					</div>
				)}

				<div
					className={clsx(
						"flex-1 w-full max-w-2xl mx-auto mb-4 overflow-y-auto transition-all",
						messages.length === 0 ? "hidden" : "block"
					)}
					style={{ minHeight: 200, maxHeight: 400 }}
				>
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={clsx(
								"flex items-start gap-3 my-4",
								msg.sender === "user" ? "justify-end" : "justify-start"
							)}
						>
							{msg.sender === "bot" && (
								<div className="rounded-full bg-blue-100 p-2">
									<Bot className="w-5 h-5 text-blue-500" />
								</div>
							)}
							<div
								className={clsx(
									"rounded-xl px-4 py-2 max-w-[70%] whitespace-pre-line",
									msg.sender === "user"
										? "bg-gradient-to-r from-blue-500 to-teal-500 text-white ml-auto"
										: "bg-slate-100 text-slate-800"
								)}
							>
								{msg.text}
							</div>
							{msg.sender === "user" && (
								<div className="rounded-full bg-slate-200 p-2">
									<User className="w-5 h-5 text-slate-500" />
								</div>
							)}
						</div>
					))}
					{loading && (
						<div className="flex items-center gap-2 my-4">
							<Loader2 className="w-5 h-5 animate-spin text-blue-400" />
							<span className="text-slate-400 text-sm">
								SwasthaAI is typing...
							</span>
						</div>
					)}
					{error && (
						<div className="text-red-500 text-sm my-2">{error}</div>
					)}
				</div>
			</div>

			<div className="w-full max-w-2xl mx-auto mb-8">
				{selectedFile && (
					<div className="flex items-center justify-between bg-slate-100 rounded-lg px-3 py-2 mb-2">
						<span className="text-sm text-slate-700 truncate max-w-[80%]">
							{selectedFile.name}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="text-slate-500"
							onClick={removeSelectedFile}
							title="Remove file"
						>
							<X className="w-4 h-4" />
						</Button>
					</div>
				)}
				<div className="rounded-2xl border border-slate-200 shadow-md flex items-center px-4 py-2 gap-2 bg-white">
					<Button
						variant="ghost"
						size="icon"
						className="text-slate-500"
						onClick={() => fileInputRef.current?.click()}
						title="Upload health report"
						disabled={loading}
					>
						<UploadCloud className="w-5 h-5" />
					</Button>
					<input
						type="file"
						accept=".pdf,.jpg,.jpeg,.png"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileUpload}
					/>
					<input
						type="text"
						className="flex-1 outline-none border-none bg-transparent px-2 py-1 text-base"
						placeholder="Tell us about your health"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !loading) handleSend();
						}}
						disabled={loading}
					/>
					<Button
						variant={voiceActive ? "default" : "ghost"}
						size="icon"
						className={clsx(
							"text-blue-500",
							voiceActive && "animate-pulse"
						)}
						onClick={handleVoice}
						title="Voice input"
						disabled={loading || voiceActive}
					>
						<Mic className="w-5 h-5" />
					</Button>
					<Button
						variant="default"
						size="icon"
						className="bg-gradient-to-r from-blue-500 to-teal-500 text-white"
						onClick={handleSend}
						disabled={loading || !input.trim()}
						title="Send"
					>
						<Send className="w-5 h-5" />
					</Button>
				</div>
				<div className="text-xs text-slate-400 text-center mt-2">
					This is a{" "}
					<span className="font-semibold text-blue-500">
						RAG-based chatbot
					</span>
					. Upload your health report and ask questions for personalized answers.
				</div>
			</div>
		</section>
	);
}
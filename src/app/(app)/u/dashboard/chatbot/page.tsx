"use client";

import BackToLogin from "@/components/BackToLogin";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { userApi } from "@/lib/api";

export default function MedAlertsPage() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <BackToLogin />;

    return (
        <section className="min-h-screen w-full pl-20 pr-5 pt-15">
            Chatbot page
        </section>
    );
}
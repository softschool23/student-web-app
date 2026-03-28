"use client";

import { School, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <School className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome to SoftSchool
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Student Portal
          </p>
        </div>

        {/* Instruction card */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-left space-y-4">
          <h2 className="font-semibold text-foreground text-lg">
            How to access your school portal
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            To log in, you need to visit the URL that includes your school's
            unique code:
          </p>

          {/* URL example */}
          <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2 font-mono text-sm overflow-x-auto">
            <span className="text-muted-foreground shrink-0">
              {typeof window !== "undefined"
                ? window.location.origin
                : "https://your-domain.com"}
              /
            </span>
            <span className="text-primary font-semibold shrink-0">
              your-school-code
            </span>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              Your school administrator should have provided this link. Please
              contact them if you are unsure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

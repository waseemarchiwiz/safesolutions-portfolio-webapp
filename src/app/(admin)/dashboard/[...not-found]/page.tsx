"use client";

import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center p-4 mt-20 lg:mt-20">
      <div className="max-w-2xl w-full shadow-lg p-8 bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col items-center text-center">
          {/* SVG Illustration */}
          <div className="mb-5 ">
            <svg
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-md"
            >
              {/* Background circles */}
              <circle cx="200" cy="150" r="120" fill="#F0F9FF" opacity="0.5" />
              <circle cx="200" cy="150" r="90" fill="#E0F2FE" opacity="0.6" />

              {/* Main 404 */}
              <text
                x="200"
                y="160"
                fontSize="120"
                fontWeight="800"
                fill="#0EA5E9"
                textAnchor="middle"
                opacity="0.15"
              >
                404
              </text>

              {/* Magnifying glass */}
              <g transform="translate(280, 200)">
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  stroke="#0EA5E9"
                  strokeWidth="4"
                  fill="white"
                />
                <line
                  x1="21"
                  y1="21"
                  x2="40"
                  y2="40"
                  stroke="#0EA5E9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* X mark inside magnifying glass */}
                <line
                  x1="-10"
                  y1="-10"
                  x2="10"
                  y2="10"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="10"
                  y1="-10"
                  x2="-10"
                  y2="10"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Document with question mark */}
              <g transform="translate(100, 100)">
                <rect
                  x="0"
                  y="0"
                  width="60"
                  height="80"
                  rx="4"
                  fill="white"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                <path
                  d="M15 0 L15 20 L35 20"
                  fill="#F1F5F9"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                <text
                  x="30"
                  y="55"
                  fontSize="32"
                  fontWeight="600"
                  fill="#94A3B8"
                  textAnchor="middle"
                >
                  ?
                </text>
              </g>

              {/* Floating dots */}
              <circle cx="80" cy="80" r="4" fill="#0EA5E9" opacity="0.4" />
              <circle cx="320" cy="100" r="6" fill="#0EA5E9" opacity="0.3" />
              <circle cx="340" cy="240" r="5" fill="#0EA5E9" opacity="0.4" />
              <circle cx="60" cy="220" r="4" fill="#0EA5E9" opacity="0.3" />
            </svg>
          </div>

          {/* Content */}
          <div className="w-full">
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.25}
              as="h1"
              className="text-5xl md:text-6xl font-semibold text-slate-900 mb-4 tracking-tight"
            >
              Page not found
            </TextEffect>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.25}
              delay={0.2}
              as="p"
              className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto"
            >
              We couldn't find the page you're looking for. It might have been
              removed, renamed, or doesn't exist.
            </TextEffect>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

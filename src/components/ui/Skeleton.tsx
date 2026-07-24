"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.04] ${className || ""}`}
    />
  );
}

export function GitHubSkeleton() {
  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section heading skeleton */}
        <div className="mb-20 text-center">
          <SkeletonPulse className="mx-auto mb-5 h-7 w-24 rounded-full" />
          <SkeletonPulse className="mx-auto mb-5 h-12 w-64" />
          <SkeletonPulse className="mx-auto h-5 w-80" />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <SkeletonPulse className="mx-auto mb-2 h-4 w-4 rounded-full" />
                  <SkeletonPulse className="mx-auto mb-2 h-6 w-16" />
                  <SkeletonPulse className="mx-auto h-3 w-20" />
                </motion.div>
              ))}
            </div>

            {/* Graph skeleton */}
            <div className="glass rounded-xl p-6">
              <SkeletonPulse className="mb-4 h-4 w-40" />
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 84 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[2px] bg-white/[0.02]"
                  />
                ))}
              </div>
            </div>

            {/* Repo skeleton */}
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <SkeletonPulse className="h-3.5 w-3.5 rounded-full" />
                    <SkeletonPulse className="h-4 w-28" />
                  </div>
                  <div className="flex gap-4">
                    <SkeletonPulse className="h-3 w-10" />
                    <SkeletonPulse className="h-3 w-10" />
                    <SkeletonPulse className="h-5 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column skeleton */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 h-full">
              <SkeletonPulse className="mb-4 h-4 w-32" />
              <SkeletonPulse className="mb-2 h-6 w-40" />
              <SkeletonPulse className="mb-6 h-4 w-full" />
              <SkeletonPulse className="mb-6 h-2 w-full rounded-full" />
              <div className="flex gap-2 mb-6">
                <SkeletonPulse className="h-6 w-20 rounded-full" />
                <SkeletonPulse className="h-6 w-20 rounded-full" />
              </div>
              <SkeletonPulse className="mb-3 h-4 w-24" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <SkeletonPulse className="h-2.5 w-2.5 rounded-full" />
                  <SkeletonPulse className="h-3 flex-1" />
                  <SkeletonPulse className="h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

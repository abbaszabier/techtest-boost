"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Home, CreditCard, User, Check } from "lucide-react";
import { useWizardStore } from "@/store/useWizardStore";

interface Step {
  id: number;
  label: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  { id: 1, label: "Step 1", icon: User },
  { id: 2, label: "Step 2", icon: Home },
  { id: 3, label: "Step 3", icon: CreditCard },
  { id: 4, label: "Step 4", icon: User },
];

export default function Wizard({ children }: { children: ReactNode }) {
  const step = useWizardStore((s) => s.step);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between w-full relative">
        {steps.map((s, i) => {
          const isCompleted = step > s.id;
          const isActive = step === s.id;

          return (
            <div
              key={s.id}
              className="flex flex-col items-center flex-1 relative"
            >
              {i !== 0 && (
                <div
                  className={`absolute top-5 -left-1/2 w-full h-[2px] z-10 ${
                    step >= s.id ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}

              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor:
                    isCompleted || isActive ? "#1b1718" : "#E5E7EB",
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-30`}
              >
                {isCompleted ? (
                  <Check
                    size={18}
                    color={`${isCompleted || isActive ? "#ffffff" : "#1b1718"}`}
                  />
                ) : (
                  <s.icon
                    size={18}
                    color={isCompleted || isActive ? "#ffffff" : "#1b1718"}
                  />
                )}
              </motion.div>

              <span
                className={`mt-2 text-sm text-center ${
                  isActive ? "font-semibold" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}

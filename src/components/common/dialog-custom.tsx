"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const dialogSizes = {
  sm: "max-w-[337px]",
  md: "max-w-[664px]",
  lg: "max-w-[978px]",
} as const;

type DialogSize = keyof typeof dialogSizes;

interface DialogCustomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  size?: DialogSize;
  description?: React.ReactNode;
  children?: React.ReactNode;
  disableOutsideClose?: boolean;
  classNameBody?: string;
  hideCloseIcon?: boolean;
}

export default function DialogCustom({
  open,
  onOpenChange,
  title = "Dialog Title",
  size = "lg",
  description,
  children,
  disableOutsideClose = false,
  classNameBody = "",
  hideCloseIcon = false,
}: DialogCustomProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          dialogSizes[size],
          "rounded-sm p-5 max-h-[calc(100vh-1rem)]"
        )}
        {...(disableOutsideClose && {
          onInteractOutside: (e: Event) => e.preventDefault(),
          onEscapeKeyDown: (e: Event) => e.preventDefault(),
        })}
        showCloseButton={!hideCloseIcon}
      >
        <DialogHeader className="gap-4 z-10">
          <DialogTitle className="text-start mb-4">{title}</DialogTitle>
          {description ? (
            <DialogDescription asChild>
              <div className="flex flex-col justify-start items-start text-base leading-[24px] font-semibold text-neutral-40">
                {description}
              </div>
            </DialogDescription>
          ) : (
            <DialogDescription className="hidden" />
          )}
        </DialogHeader>
        <div className={cn("flex flex-col", classNameBody)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

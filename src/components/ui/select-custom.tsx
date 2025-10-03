import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCustomProps {
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

function SelectCustom({
  label,
  required,
  error,
  placeholder = "Select an option",
  className,
  children,
  value,
  onValueChange,
}: SelectCustomProps) {
  const selectId = React.useId();

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-foreground"
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={selectId}
          className={cn(
            "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm",
            error &&
              "border-destructive focus:ring-destructive/30 focus:ring-[3px]",
            className
          )}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { SelectCustom, SelectItem };

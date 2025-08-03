"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes, JSX } from "react";

// Define the props interface
interface TextAreaBoxProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Icon component to display on the left side */
  startIcon?: JSX.Element;
  /** Icon component to display on the right side */
  endIcon?: JSX.Element;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Whether the textarea is in an error state */
  error?: boolean;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const TextAreaBox = forwardRef<HTMLTextAreaElement, TextAreaBoxProps>(
  (
    {
      label,
      startIcon,
      endIcon,
      helperText,
      error = false,
      required = false,
      value,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const handleEndIconClick = (): void => {
      // Add any custom logic for end icon click if needed
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-3 text-gray-400">
              {startIcon}
            </div>
          )}

          <Textarea
            ref={ref}
            className={cn(
              "transition-colors",
              startIcon && "pl-10",
              endIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />

          {endIcon && (
            <div
              className={cn(
                "absolute right-3 top-3 text-gray-400",
                "cursor-pointer hover:text-gray-600 transition-colors"
              )}
              onClick={handleEndIconClick}
            >
              {endIcon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={cn("text-sm", error ? "text-red-500" : "text-gray-600")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextAreaBox.displayName = "TextAreaBox";

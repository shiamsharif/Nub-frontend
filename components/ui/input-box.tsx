import { Eye, EyeOff } from "lucide-react";
import {
  forwardRef,
  InputHTMLAttributes,
  JSX,
  useEffect,
  useState,
} from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

// Define the input types that are supported
type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local";

// Define the props interface
interface InputBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text displayed above the input */
  label?: string;
  /** Icon component to display on the left side */
  startIcon?: JSX.Element;
  /** Icon component to display on the right side (overridden for password fields) */
  endIcon?: JSX.Element;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Input type - restricted to supported types */
  type?: InputType;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      label,
      startIcon,
      endIcon,
      helperText,
      error = false,
      type = "text",
      required = false,
      value,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>(type);

    // Handle password toggle
    const isPasswordField: boolean = type === "password";

    useEffect(() => {
      if (isPasswordField) {
        setInputType(showPassword ? "text" : "password");
      } else {
        setInputType(type);
      }
    }, [showPassword, type, isPasswordField]);

    const togglePasswordVisibility = (): void => {
      setShowPassword(!showPassword);
    };

    // Determine the actual end icon
    const passwordFieldIconElement = showPassword ? <EyeOff /> : <Eye />;

    const handleEndIconClick = (): void => {
      if (isPasswordField) {
        togglePasswordVisibility();
      }
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}

          <Input
            ref={ref}
            type={inputType}
            className={cn(
              "transition-colors",
              startIcon && "pl-10",
              (endIcon || isPasswordField) && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />

          {(endIcon || isPasswordField) && (
            <div
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                isPasswordField &&
                  "cursor-pointer hover:text-gray-600 transition-colors"
              )}
              onClick={handleEndIconClick}
            >
              {passwordFieldIconElement || endIcon}
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

InputBox.displayName = "InputBox";

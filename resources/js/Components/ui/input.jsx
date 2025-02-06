import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

const Input = forwardRef(
    (
        {
            className,
            type = "text",
            isFocused = false,
            hasError = false,
            ...props
        },
        ref
    ) => {
        const localRef = useRef(null);

        useImperativeHandle(ref, () => ({
            focus: () => localRef.current?.focus(),
        }));

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                type={type}
                className={cn(
                    "flex focus-visible:border-input w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className,
                    hasError &&
                        "ring-2 ring-destructive ring-offset-2 focus-visible:ring-destructive"
                )}
                ref={localRef}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

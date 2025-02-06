import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex items-center"
);

const Label = React.forwardRef(
    ({ className, optional = false, children, ...props }, ref) => {
        const renderAsterisk = <span className="text-red-600 ml-1">*</span>;

        const renderOptionalText = (
            <span className="italic text-gray-500 ml-1 text-xs">
                (Optional)
            </span>
        );

        return (
            <LabelPrimitive.Root
                ref={ref}
                className={cn(labelVariants(), className)}
                {...props}
            >
                {children}
                {!optional && renderAsterisk} {optional && renderOptionalText}{" "}
            </LabelPrimitive.Root>
        );
    }
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

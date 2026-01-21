'use client';
import { ComponentProps, useState } from "react";
import { Button, Spinner } from "@radix-ui/themes";
import { toast } from "sonner";

type BetterAuthActionButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
    action: () => Promise<{ error: null | { message?: string } }>;
    successMessage?: string;
    errorMessage?: string;
    loadingIcon?: React.ReactNode;
};

export function BetterAuthActionButton({
    action,
    successMessage,
    errorMessage = "Action failed",
    loadingIcon,
    children,
    disabled,
    ...props
}: BetterAuthActionButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        
        try {
            const { error } = await action();
            if (error) {
                toast.error(errorMessage, {
                    description: error.message || "An error occurred",
                });
            } else if (successMessage) {
                toast.success("Success", {
                    description: successMessage,
                });
            }
        } catch (error) {
            toast.error(errorMessage, {
                description: "An unexpected error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (loadingIcon ?? <Spinner size="1" />) : null}
            {children}
        </Button>
    );
}

export default BetterAuthActionButton;

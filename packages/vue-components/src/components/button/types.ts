type ButtonType = "primary" | "info" | "success" | "warning" | "error";

interface ButtonProps {
    type: ButtonType;
    disabled: boolean;
}

export type { ButtonProps };

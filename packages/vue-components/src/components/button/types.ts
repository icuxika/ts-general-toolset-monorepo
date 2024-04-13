type ButtonType = "primary" | "info" | "success" | "warning" | "error";

interface ButtonProps {
    type: ButtonType;
    disabled: boolean;
    loading: boolean;
}

export type { ButtonProps };

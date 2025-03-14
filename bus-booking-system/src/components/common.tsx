import { commonStyles } from "../styles/common";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const buttonStyles = {
    base: {
      padding: `${commonStyles.spacing.sm} ${commonStyles.spacing.lg}`,
      borderRadius: commonStyles.borderRadius.md,
      fontSize: commonStyles.typography.body.fontSize,
      fontWeight: 500,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: commonStyles.transitions.default,
      width: fullWidth ? "100%" : "auto",
    },
    variants: {
      primary: {
        backgroundColor: commonStyles.colors.primary,
        color: commonStyles.colors.white,
        border: "none",
        "&:hover": {
          backgroundColor: commonStyles.colors.primaryHover,
        },
      },
      secondary: {
        backgroundColor: commonStyles.colors.secondary,
        color: commonStyles.colors.white,
        border: "none",
        "&:hover": {
          opacity: 0.9,
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: commonStyles.colors.primary,
        border: `2px solid ${commonStyles.colors.primary}`,
        "&:hover": {
          backgroundColor: commonStyles.colors.primary,
          color: commonStyles.colors.white,
        },
      },
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...buttonStyles.base,
        ...buttonStyles.variants[variant],
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
} 
import { ButtonProps } from "@nextui-org/react";
import { ReactNode, MouseEventHandler } from "react";

export type CustomBtnType = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;   // (опционально) класс для стилизации
    disabled?: boolean;
    props?: ButtonProps;
    type?: "button" | "submit" | "reset";
};
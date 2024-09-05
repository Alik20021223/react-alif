import { ReactNode, MouseEventHandler } from "react";

export type CustomBtnType = {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;   // (опционально) класс для стилизации
    disabled?: boolean;   // (опционально) для состояния кнопки
};
import React from 'react'
import { Button } from "@nextui-org/react";
import { CustomBtnType } from './types';


const CustomBtn: React.FC<CustomBtnType> = ({ children, onClick, className, disabled }) => {
  return (
    <Button
      disableRipple
      disabled={disabled}
      onClick={onClick}
      className={`relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-primary-400/100 text-white after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-primary-400 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 ${className}`}
      size="lg"
    >
      {children}
    </Button>
  )
}

export default CustomBtn

import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { ModalType } from './types';
import FormModalAddAndEdit from '../form/component';


const ModalCustom: React.FC<ModalType> = ({ onOpenChange, isOpen, onSubmit, edit, payload }) => {

    

    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#26bb79]/10 backdrop-opacity-40",
                    base: "bg-[#fff] text-[#26bb79]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{edit ? 'Изменить пользователя' : 'Добавить пользователя'}</ModalHeader>
                            <ModalBody>
                                <FormModalAddAndEdit payload={payload} onOpenChange={onOpenChange} formSubmit={onSubmit}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalCustom

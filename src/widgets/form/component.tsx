import React, { useMemo } from 'react';
import { FormModalAddAndEditType, formType } from './types';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { formSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, SharedSelection } from '@nextui-org/react';
import { statusUser } from '@shared/mocks/statusUser';
import { UserTypeForm } from './types';

const className = {
    label: '!text-black/80 font-semibold',
    errorMessage: 'text-red-500 font-semibold',
}

const FormModalAddAndEdit: React.FC<FormModalAddAndEditType> = ({ payload, onOpenChange, formSubmit }) => {
    const status = useMemo(() => payload?.status && !Array.isArray(payload?.status) ? [payload?.status] : [], [payload?.status])
    const {
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            role: '',
            team: '',
            status,
            avatar: '',
            email: '',
        },
        values: {
            name: payload?.name || '',
            role: payload?.role || '',
            team: payload?.team || '',
            status,
            avatar: payload?.avatar || '',
            email: payload?.email || '',
        },
    });

    console.log(status)

    const disabled = Object.keys(errors).length > 0 || isSubmitting;

    const handleSelectionChange = (keys: SharedSelection) => {
        console.log(keys);

        const selectedValue = Array.isArray(keys) ? keys[0] : keys; // В случае выбора нескольких значений
        setValue('status', selectedValue);
    };

    const onSubmit: SubmitHandler<UserTypeForm> = (data) => {
        formSubmit(data)
        onOpenChange(false)
        reset()
    }


    return (
        <>
            <form className='space-y-10' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input
                        {...field}
                        label="Имя"
                        variant="underlined"
                        labelPlacement="outside"
                        color="primary"
                        isInvalid={!!errors.name}
                        placeholder="Введите ваше имя"
                        errorMessage={errors.name?.message}
                        classNames={className}
                    />} />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => <Input
                        {...field}// Подключаем поле к форме
                        label="Должность"
                        variant="underlined"
                        labelPlacement="outside"
                        color="primary"
                        isInvalid={!!errors.role}
                        placeholder="Какая у вас должность"
                        errorMessage={errors.team?.message}
                        classNames={className}
                    />}
                />
                <Controller
                    name="team"
                    control={control}
                    render={({ field }) => <Input
                        {...field}// Подключаем поле к форме
                        label="Команда"
                        variant="underlined"
                        labelPlacement="outside"
                        color="primary"
                        isInvalid={!!errors.team}
                        placeholder="Введите в какой команде вы работаете"
                        errorMessage={errors.team?.message}
                        classNames={className}
                    />}
                />
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => <Input
                        {...field}
                        label="Фото профиля"
                        variant="underlined"
                        color="primary"
                        labelPlacement="outside"
                        isInvalid={!!errors.avatar}
                        placeholder="Введите ссылку на фотографию"
                        errorMessage={errors.avatar?.message}
                        classNames={className}
                    />}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => {
                        console.log(field.value);

                        return (
                            <Select
                                label="Ваш статус работы"
                                variant="bordered"
                                {...field}
                                defaultSelectedKeys={[...status || 'active']}
                                labelPlacement="outside"
                                placeholder="Выберите статус работы"
                                onSelectionChange={(value) => {
                                    field.onChange(value);
                                    handleSelectionChange(value);
                                }}
                                classNames={className}
                                isInvalid={!!errors.status}
                                errorMessage={errors.status?.message}
                            >
                                {statusUser.map((status) => (
                                    <SelectItem className="text-black" key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )
                    }
                    }
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input
                        {...field}
                        label="Почта"
                        variant="underlined"
                        color="primary"
                        isInvalid={!!errors.email}
                        labelPlacement="outside"
                        placeholder="Введите вашу почту"
                        errorMessage={errors.email?.message}
                        classNames={className}
                    />}
                />
                <Button disableRipple={disabled} disabled={disabled} color='primary' className='text-white disabled:bg-slate-500 disabled:cursor-default disabled:hover:bg-none' type="submit">Сохранить</Button>
            </form>
        </>
    );
};

export default FormModalAddAndEdit;

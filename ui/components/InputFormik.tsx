"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'
import { useField, useFormikContext } from 'formik'
import { IMaskInput } from "react-imask"
type InputFormikFormikProps = React.ComponentProps<'input'> & { name: string, mask?: any }

function InputFormik ( { className, type, name, mask, ...props }: InputFormikFormikProps ) {
    const [field, meta] = useField( name )
    const { setFieldValue } = useFormikContext()
    if ( mask ) {
        return (
            <IMaskInput
                {...field}
                {...props}
                mask={mask}
                onAccept={( value, maskRef ) => {
                    setFieldValue( name, maskRef.unmaskedValue )
                }}
                className={cn(
                    'file:text-foreground placeholder:text-black selection:bg-primary selection:text-primary-foreground dark:bg-inputFormik/30 border-inputFormik h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

                    className,
                )}
            />
        )
    }
    return <input type={type} className={cn(
        'file:text-foreground placeholder:text-black selection:bg-primary selection:text-primary-foreground dark:bg-inputFormik/30 border-inputFormik h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

        className,
    )} {...props} {...field} />

}

export { InputFormik }

import type {PropsWithChildren} from "react";

export interface BaseEditorInputProps {
  label: string;
  errorMessage?: string;
}

export const baseInputClassName = 'p-1.5 border-5 border-gray200 hover:border-[#d9dfe5] focus:border-[#d9dfe5] focus:outline-none rounded-xl'

export const BaseEditorInput = (props: PropsWithChildren<BaseEditorInputProps>) => {
  return <div className='flex flex-col gap-2'>
    <label className='font-semibold text-sm'>{props.label}</label>
    {props.children}
    {props.errorMessage && (
      <span className='text-red text-sm'>{props.errorMessage}</span>
    )}
  </div>
}
import {BaseEditorInput, type BaseEditorInputProps, baseInputClassName} from "./BaseEditorInput.tsx";

type Props = BaseEditorInputProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const EditorInput = (props: Props) => {
  return <BaseEditorInput {...props}>
    <input
      type='text'
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={baseInputClassName}
    />
  </BaseEditorInput>
}
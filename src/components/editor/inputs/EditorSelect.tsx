import {BaseEditorInput, type BaseEditorInputProps, baseInputClassName} from "./BaseEditorInput.tsx";

type Props = BaseEditorInputProps & {
  options: {id: string, label?: string}[]
  value: string;
  onChange: (value: string) => void;
}

export const EditorSelect = (props: Props) => {
  return <BaseEditorInput {...props}>
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={baseInputClassName}
    >
      <option value=''>--</option>
      {props.options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label ?? o.id}
        </option>
      ))}
    </select>
  </BaseEditorInput>
}
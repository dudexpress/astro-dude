import {useEffect, useRef, useState} from "react";
import {BaseEditorInput, type BaseEditorInputProps, baseInputClassName} from "./BaseEditorInput.tsx";

type TagInputProps = BaseEditorInputProps & {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions: string[]
  placeholder: string
}

export function EditorTags(props: TagInputProps) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const value = props.value ?? []

  useEffect(() => {
    if (input) {
      const filtered = props.suggestions.filter(
        (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setSelectedIndex(0)
    } else {
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
  }, [input, props.suggestions, value])

  const addTag = (tag: string) => {
    if (tag && !value.includes(tag)) {
      props.onChange([...value, tag])
      setInput('')
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    props.onChange(value.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (showSuggestions && filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[selectedIndex])
      } else if (input.trim()) {
        addTag(input.trim())
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <BaseEditorInput {...props}>
      <div className='relative'>
        <div
          className={'flex flex-wrap gap-1 ' + baseInputClassName + (value.length > 0 ? ' py-1' : '')}>
          {value.map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center pl-2 bg-blue text-white rounded-xl text-sm'
            >
              {tag}
              <button
                type='button'
                onClick={() => removeTag(tag)}
                className='size-4 flex items-center justify-center cursor-pointer'
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input && setShowSuggestions(filteredSuggestions.length > 0)}
            placeholder={value.length === 0 ? props.placeholder : ''}
            className='flex-1 min-w-[120px] outline-none bg-transparent'
          />
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto'
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type='button'
                onClick={() => addTag(suggestion)}
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                  index === selectedIndex ? 'bg-blue-100' : ''
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      {input && !filteredSuggestions.some(s => s.toLowerCase() === input.toLowerCase()) && (
        <span className='text-xs text-gray-500'>Premi <strong>INVIO</strong> per creare <strong>"{input}"</strong></span>
      )}
    </BaseEditorInput>
  )
}
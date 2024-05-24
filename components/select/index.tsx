'use client'

import { Dispatch, SetStateAction } from 'react'
import { Combobox, Input, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core'
import { IconDropDownChevron } from '@/ui'

import classes from './index.module.css'

export function Select({
  data,
  placeholder,
  label,
  value,
  setValue,
}: {
  data: { value: string; label: string }[]
  placeholder: string
  label: string
  value: string | null
  setValue: Dispatch<SetStateAction<string | null>>
}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      combobox.updateSelectedOptionIndex('active')
    },
  })

  const options = data.map((item, index) => (
    <Combobox.Option
      value={item.value}
      key={index}
      className={classes.option}
      active={item.value === value}
      data-active={combobox.selectedOptionIndex === index}
    >
      <Text data-active={combobox.selectedOptionIndex === index} className={classes.optionText}>
        {item.label}
      </Text>
    </Combobox.Option>
  ))

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val)
        combobox.closeDropdown()
      }}
    >
      <Combobox.DropdownTarget>
        <InputBase
          classNames={{
            root: classes.root,
            input: classes.input,
            label: classes.label,
          }}
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<IconDropDownChevron dropdownOpened={combobox.dropdownOpened} />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {data.find((item) => item.value === value)?.label || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className={classes.dropdown}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={188} type="scroll">
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

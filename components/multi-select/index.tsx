'use client'
import { Combobox, Group, Input, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core'

import { IconDropDownChevron } from '@/ui'
import classes from './index.module.css'
import { Dispatch, SetStateAction } from 'react'
export const MultiSelect = ({
  setValues,
  valuesData,
  values,
}: {
  setValues: Dispatch<SetStateAction<string[] | null>>
  valuesData: { value: string; label: string }[] | undefined
  values: string[]
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })

  const handleValueSelect = (val: string) => {
    const newGenres = values.includes(val) ? values.filter((v) => v !== val) : [...values, val]

    setValues(newGenres)
  }

  const getLabelArray = values.map((item) => {
    const itemData = valuesData?.find((i) => i.value === item)
    return itemData?.label
  })
  const textValues = <Text className={classes.valueText}>{getLabelArray.join(', ')}</Text>

  const options = valuesData?.map((item, index) => {
    return (
      <Combobox.Option
        className={classes.option}
        value={item.value}
        key={index}
        active={values.includes(item.value)}
        data-active={values.includes(item.value)}
      >
        <Text data-active={values.includes(item.value)} className={classes.optionText}>
          {item.label}
        </Text>
      </Combobox.Option>
    )
  })

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <InputBase
          classNames={{
            root: classes.root,
            input: classes.input,
            label: classes.label,
          }}
          rightSectionPointerEvents={'none'}
          rightSection={<IconDropDownChevron dropdownOpened={combobox.dropdownOpened} />}
          component="button"
          type="button"
          pointer
          label="Genres"
          onClick={() => combobox.toggleDropdown()}
        >
          <Group>{values.length > 0 ? textValues : <Input.Placeholder>Select genre</Input.Placeholder>}</Group>
        </InputBase>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className={classes.dropdown}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={216} type="scroll">
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

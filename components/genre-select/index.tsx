'use client'
import { Combobox, Group, Input, InputBase, PillsInput, ScrollArea, Text, useCombobox } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FilterForm } from '@/types/Form'
import { IconDropDownChevron } from '@/ui'
import classes from './index.module.css'
export const SelectGenres = ({
  form,
  genreOptions,
}: {
  form: UseFormReturnType<FilterForm>
  genreOptions: { value: string; label: string }[] | undefined
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })

  const handleValueSelect = (val: string) => {
    const newGenres = form.values.genres.includes(val)
      ? form.values.genres.filter((v) => v !== val)
      : [...form.values.genres, val]

    form.setFieldValue('genres', newGenres)
  }

  const genreLabels = form.values.genres.map((item) => {
    const genre = genreOptions?.find((genre) => genre.value === item)
    return genre?.label
  })
  const values = <Text className={classes.valueText}>{genreLabels.join(', ')}</Text>

  const options = genreOptions?.map((item, index) => {
    return (
      <Combobox.Option
        className={classes.option}
        value={item.value}
        key={index}
        active={form.values.genres.includes(item.value)}
        data-active={form.values.genres.includes(item.value)}
      >
        <Text data-active={form.values.genres.includes(item.value)} className={classes.optionText}>
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
          <Group>{form.values.genres.length > 0 ? values : <Input.Placeholder>Select genre</Input.Placeholder>}</Group>
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

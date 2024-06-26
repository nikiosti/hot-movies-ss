'use client'

import { SORT_BY_DATA } from '@/constants/filter-constants'
import { FilterForm } from '@/types/Form'
import { Box, Group, NumberInput, Text, UnstyledButton } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { Select } from '@/components/select'
import { MultiSelect } from '@/components/multi-select'

import classes from './index.module.css'
interface FiltersProps {
  form: UseFormReturnType<FilterForm>
  genres: { value: string; label: string }[] | undefined
}

export const Filters = ({ form, genres }: FiltersProps) => {
  return (
    <Box mt={40}>
      <Group gap={16} align="flex-end" grow preventGrowOverflow={false}>
        <MultiSelect
          values={form.values.genres}
          setValues={form.getInputProps('genres').onChange}
          valuesData={genres}
        />

        <Select
          setValue={form.getInputProps('releaseYear').onChange}
          value={form.values.releaseYear}
          placeholder="Select release year"
          data={Array.from({ length: 125 }, (_, i) => ({ value: (i + 1900).toString(), label: (i + 1900).toString() }))}
          label="Release year"
        />

        <Group wrap="nowrap" w={283} align="flex-end" gap={8}>
          <NumberInput
            clampBehavior="strict"
            {...form.getInputProps('voteAverageGte')}
            classNames={{
              input: classes.input,
              controls: classes.controls,
              control: classes.control,
              label: classes.label,
            }}
            label="Ratings"
            placeholder="From"
            min={0}
            max={10}
            step={1}
          />

          <NumberInput
            clampBehavior="strict"
            classNames={{
              input: classes.input,
              controls: classes.controls,
              control: classes.control,
              label: classes.label,
            }}
            placeholder="To"
            {...form.getInputProps('voteAverageLte')}
            min={0}
            max={10}
          />
        </Group>

        <UnstyledButton onClick={() => form.reset()}>
          <Text data-active={form.isDirty()} className={classes.textReset}>
            Reset&nbsp;filters
          </Text>
        </UnstyledButton>
      </Group>

      <Group justify="right" my={24}>
        <Select
          data={SORT_BY_DATA}
          setValue={form.getInputProps('sortBy').onChange}
          value={form.values.sortBy}
          label="Sort by"
          placeholder="sort by"
        />
      </Group>
    </Box>
  )
}

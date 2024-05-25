'use client'

import { SORT_BY_DATA } from '@/constants/filter-constants'
import { FilterForm } from '@/types/Form'
import { Box, Group, NumberInput, Text, UnstyledButton } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { SelectGenres } from '@/components/genre-select'

import classes from './index.module.css'
import { Select } from '@/components/select'

interface FiltersProps {
  form: UseFormReturnType<FilterForm>
  genres: { value: string; label: string }[] | undefined
}

export const Filters = ({ form, genres }: FiltersProps) => {
  return (
    <Box pos="relative" mb={120} mt={40}>
      <Group gap={16} align="flex-end" grow preventGrowOverflow={false}>
        <SelectGenres form={form} genreOptions={genres} />

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
          <Text>Reset&nbsp;filters</Text>
        </UnstyledButton>
      </Group>

      <Box pos="absolute" my={24} right={0}>
        <Select
          data={SORT_BY_DATA}
          setValue={form.getInputProps('sortBy').onChange}
          value={form.values.sortBy}
          label="Sort by"
          placeholder="sort by"
        />
      </Box>
    </Box>
  )
}

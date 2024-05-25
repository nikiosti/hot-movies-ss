import { IconSearch } from '@/ui'
import { TextInput, Button } from '@mantine/core'

import classes from './index.module.css'

interface SearchBarProps {
  searchValue: string
  setSearchValue: (value: string) => void
  onSearch: () => void
}

const SearchBar = ({ searchValue, setSearchValue, onSearch }: SearchBarProps) => {
  return (
    <TextInput
      classNames={{
        root: classes.root,
        input: classes.input,
      }}
      leftSection={<IconSearch />}
      rightSectionWidth={100}
      rightSection={
        <Button className={classes.button} onClick={onSearch}>
          Search
        </Button>
      }
      placeholder="Search movie title"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value)
      }}
    />
  )
}

export default SearchBar

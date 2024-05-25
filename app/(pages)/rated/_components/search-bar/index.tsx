import { IconSearch } from '@/ui'
import { TextInput, Button } from '@mantine/core'

interface SearchBarProps {
  searchValue: string
  setSearchValue: (value: string) => void
  onSearch: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, onSearch }) => {
  return (
    <TextInput
      radius={8}
      styles={{
        root: {},
        input: {
          height: 48,
          border: '1px solid var(--mantine-color-grey-3)',
        },
      }}
      maw={658}
      w="100%"
      leftSection={<IconSearch />}
      rightSectionWidth={100}
      rightSection={
        <Button color="purple.5" w={88} h={32} radius={8} onClick={onSearch}>
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

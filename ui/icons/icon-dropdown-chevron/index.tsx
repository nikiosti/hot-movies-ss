import { Chevron } from './_chevron'

export const IconDropDownChevron = ({ dropdownOpened }: { dropdownOpened: boolean }) => {
  return (
    <Chevron
      style={{
        stroke: dropdownOpened ? 'var(--mantine-color-purple-5)' : 'var(--mantine-color-grey-5)',
      }}
      transform={{ transform: dropdownOpened ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  )
}

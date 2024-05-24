import { Button, Group, Modal, Rating, Text, UnstyledButton } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export const ModalRating = ({
  closeModalRating,
  openedModalRating,
  setCurrentFavorite,
  currentFavorite,
  handleFavoriteClick,
}: any) => {
  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })
  return (
    <Modal
      centered
      w={380}
      radius={8}
      onClose={closeModalRating}
      opened={openedModalRating}
      styles={{
        header: {
          height: 54,
          padding: 16,
          borderBottom: '1px solid var(--mantine-color-grey-1)',
        },
        body: {
          padding: 16,
        },
      }}
      title={
        <Text fw={400} fz={16} lh="140%" fs="normal">
          Your rating
        </Text>
      }
    >
      <Text my={16} fz={16} fw={700} lh="140%" fs="normal">
        {currentFavorite.name}
      </Text>
      <Rating
        c="yellow"
        w="100%"
        size="100%"
        count={10}
        value={currentFavorite?.rating}
        onChange={(value) => setCurrentFavorite({ id: currentFavorite.id, rating: value })}
      />
      <Group gap={16} mt={16}>
        <Button
          color="purple.5"
          radius={8}
          onClick={() => {
            handleFavoriteClick()
            closeModalRating()
          }}
        >
          Save
        </Button>

        <UnstyledButton
          onClick={() => {
            closeModalRating()
            setFavoritesLC(
              favoritesLC.filter((favorite: { id: number; rating: number }) => favorite.id !== currentFavorite.id)
            )
          }}
        >
          <Text c="purple.5" fw={400} fz={14} lh="140%" fs="normal">
            Remove rating
          </Text>
        </UnstyledButton>
      </Group>
    </Modal>
  )
}

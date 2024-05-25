'use client'
import { Button, Group, Modal, Rating, Text, UnstyledButton } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import classes from './index.module.css'

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

  const handleSaveRating = () => {
    handleFavoriteClick()
    closeModalRating()
  }

  const handleRemoveRating = () => {
    closeModalRating()
    setFavoritesLC(favoritesLC.filter((favorite: { id: number; rating: number }) => favorite.id !== currentFavorite.id))
  }
  return (
    <Modal
      centered
      onClose={closeModalRating}
      opened={openedModalRating}
      classNames={{
        root: classes.root,
        content: classes.content,
        body: classes.body,
        header: classes.header,
      }}
      title={<Text className={classes.ratingText}>Your rating</Text>}
    >
      <Text my={16} className={classes.titleText}>
        {currentFavorite.name}
      </Text>
      <Rating
        c="yellow"
        w="100%"
        size="100%"
        count={10}
        value={currentFavorite?.rating}
        onChange={(value) => setCurrentFavorite({ id: currentFavorite.id, rating: value, name: currentFavorite.name })}
      />
      <Group gap={16} mt={16}>
        <Button color="purple.5" radius={8} onClick={handleSaveRating}>
          Save
        </Button>

        <UnstyledButton onClick={handleRemoveRating}>
          <Text c="purple.5" className={classes.text}>
            Remove rating
          </Text>
        </UnstyledButton>
      </Group>
    </Modal>
  )
}

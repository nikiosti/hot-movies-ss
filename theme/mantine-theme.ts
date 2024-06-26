'use client'
import { Button, createTheme, ScrollArea } from '@mantine/core'
import classes from './index.module.css'
export const theme = createTheme({
  primaryColor: 'purple',
  white: '#FFFFFF',
  black: '#232134',

  components: {
    ScrollArea: ScrollArea.extend({
      classNames: classes,
    }),

    Button: Button.extend({
      defaultProps: {
        classNames: {
          root: classes.button,
        },
      },
    }),
  },
  colors: {
    purple: [
      '#F2ECFA',
      '#F2ECFA',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D',
    ],

    //shade of grey
    grey: [
      '#FFFFFF',
      '#F5F5F6',
      '#EAEBED',
      '#D5D6DC',
      '#CED4DA',
      '#ACADB9',
      '#7B7C88',
      '#232134',
      '#232134',
      '#232134',
      '#232134',
    ],

    //shade of yellow
    yellow: [
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
      '#FAB005',
    ],
  },

  fontFamily: 'Inter, sans-serif',
})

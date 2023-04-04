/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable,
  },
  defaults: {
    VDataTable: {
      noDataText: 'Results not found',
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Owner',
          align: 'start',
          value: 'owner.login',
        },
        {
          text: 'Created',
          align: 'center',
          value: 'created_at',
        },
        {
          text: 'Actions', value: 'actions',
          align: 'center',
        },]
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          background: '#282C35'
        }
      }
    },
  },
})

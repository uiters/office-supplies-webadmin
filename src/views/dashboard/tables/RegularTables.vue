<template>
  <v-container>
    <v-card>
      <v-card-title>
        Manager Accounts
        <v-spacer />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="accounts"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-icon
            v-if="item.status===1"
            color="green"
          >
            mdi-check-bold
          </v-icon>
          <v-icon
            v-else
            color="red"
          >
            mdi-alert-box
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Id',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Email', value: 'email', sortable: true },
          { text: 'Name', value: 'name', sortable: true },
          { text: 'Phone number', value: 'phoneNumber' },
          { text: 'Status', value: 'status' },
          { text: '', value: 'banned' },
        ],
        accounts: [],
      }
    },
    computed: {
      ...mapGetters(['users']),
    },
    async mounted () {
      await this.$store.dispatch('getUsers')
      this.accounts = [...this.users]
    },
    methods: {},
  }
</script>

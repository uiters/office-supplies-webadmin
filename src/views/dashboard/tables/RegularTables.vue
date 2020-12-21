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
        :loading="loading"
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
        <template v-slot:item.banned="{item}">
          <v-btn
            text
            @click="changeStatus(item.id,item.status)"
          >
            <v-icon>
              mdi-pencil-outline
            </v-icon>
          </v-btn>
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
        loading: false,
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
      this.loading = true
      await this.$store.dispatch('getUsers')
      this.accounts = [...this.users]
      this.loading = false
    },
    methods: {
    },
  }
</script>

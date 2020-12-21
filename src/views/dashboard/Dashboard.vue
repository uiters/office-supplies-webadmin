<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="4"
        lg="4"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-text-box-multiple-outline"
          title="Total Products"
          :value="''+totalProducts"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="4"
        lg="4"
      >
        <base-material-stats-card
          color="amber accent-3"
          icon="mdi-bitcoin"
          title="Revenue goods"
          :value="money+'VND'"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        lg="4"
      >
        <base-material-stats-card
          color="pink accent-3"
          icon="mdi-account"
          title="Users"
          :value="''+users.length"
          sub-icon="mdi-account-check"
          sub-text="Active"
        />
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Products
            </div>

            <div class="subtitle-1 font-weight-light">
              <!--              New employees on 15th September, 2016-->
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              :loading="loading"
              :server-items-length="totalItems"
              :options="pagination"
              @update:options="changePage($event)"
            >
              <template v-slot:item.productImage="{ item }">
                <v-img
                  :src="item.productImage[0]"
                  max-height="150"
                  max-width="100"
                  class="ma-2"
                />
              </template>
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
              <template v-slot:item.check="{item}">
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
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        loading: false,
        totalItems: 0,
        pagination: {
          page: 1,
          itemsPerPage: 10,
          sortDesc: [],
        },
        // table
        headers: [
          {
            sortable: true,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Name',
            value: 'userId',
          },
          {
            sortable: true,
            text: 'Product name',
            value: 'productName',
            align: 'left',
          },
          {
            sortable: true,
            text: 'Product type',
            value: 'typeId',
            align: 'left',
          },
          {
            text: 'Product image',
            value: 'productImage',
            align: 'left',
          },
          {
            sortable: true,
            text: 'Status',
            value: 'status',
            align: 'left',
          },
          {
            text: '',
            value: 'check',
          },
        ],
        items: [],
        tabs: 0,
      }
    },

    computed: {
      ...mapGetters(['products', 'users', 'money', 'totalProducts']),
    },
    async mounted () {
      await this.$store.dispatch('statisticProducts')
      await this.$store.dispatch('getUsers')
      this.$store.commit('SET_MONEY')
    },
    methods: {
      async changeStatus (id, status) {
        const payload = {
          page: this.pagination.page,
        }
        await this.$store.dispatch('onCensored', { id, status })
        await this.$store.dispatch('getProducts', payload)
        this.items = [...this.products]
        console.log(this.items)
      },
      async changePage (e) {
        this.loading = true
        const payload = {
          page: e.page,
        }
        await this.$store.dispatch('getProducts', payload)
        this.totalItems = this.totalProducts
        this.items = [...this.products]
        this.pagination = {
          itemsPerPage: this.items.length,
          page: e.page,
        }
        this.loading = false
      },
    },
  }
</script>

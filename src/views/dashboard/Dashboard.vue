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
          :value="''+items.length"
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
            >
              <template v-slot:item.productImage="{ item }">
                <v-img
                  :src="item.productImage[0]"
                  max-height="150"
                  max-width="150"
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
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
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
      ...mapGetters(['products', 'users', 'money']),
    },
    async mounted () {
      await this.$store.dispatch('getProducts')
      await this.$store.dispatch('getUsers')
      this.$store.commit('SET_MONEY')
      this.items = [...this.products]
    },
    methods: {
      async changeStatus (id, status) {
        await this.$store.dispatch('onCensored', { id, status })
        await this.$store.dispatch('getProducts')
        this.items = [...this.products]
        console.log(this.items)
      },
    },
  }
</script>

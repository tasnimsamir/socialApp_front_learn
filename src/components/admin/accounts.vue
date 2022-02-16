<template>
  <v-data-table
    :headers="headers"
    :items="accounts"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Registered Accounts</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.is_accepted"
                      label="IS_ACCEPTED"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.is_accepted_message"
                      label="MESSAGE"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'adminpanel',
  components: {
    
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers:[],
      editedIndex: -1,
      editedItem:{
        'Date_of_Birth': null,
        'email': null,
        'friends': null,
        'gender': null,
        'id': null,
        'is_accepted': null,
        'is_accepted_message': null,
        'is_active': null,
        'is_admin': null,
        'is_staff': null,
        'is_super_teacher': null,
        'is_superuser': null,
        'is_teacher': null,
        'last_login': null,
        'name': null,
        'password': null,
        'username': null,
        'zipcode': null,
        'length': 0},
    defaultItem:{
        'Date_of_Birth': null,
        'email': null,
        'friends': null,
        'gender': null,
        'id': null,
        'is_accepted': null,
        'is_accepted_message': null,
        'is_active': null,
        'is_admin': null,
        'is_staff': null,
        'is_super_teacher': null,
        'is_superuser': null,
        'is_teacher': null,
        'last_login': null,
        'name': null,
        'password': null,
        'username': null,
        'zipcode': null,
        'length': 0}
      }},
 
  created: function () {
    this.$store.dispatch("GetallAccounts");
    // console.log('Inside Create Admin panel', Object.keys(this.accounts[0]))
    this.getHeaders()
    // console.log('Edited Items:',this.headers)
  },

  computed: {
    ...mapGetters({accounts: "StateAccounts"}),
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

    // editedItem(){
    //     let dict = [];
    //     var a = Object.keys(this.accounts[0])
    //     for (let i=0; i < a.length; i++){
    //         dict[a[i]] = null
    //     }
    //     console.log(dict)
    //     return dict
    // },
    // defaultItem(){
    //     let dict = [];
    //     var a = Object.keys(this.accounts[0])
    //     for (let i=0; i < a.length; i++){
    //         dict[a[i]] = null
    //     }
    //     return dict
       
    // },
  
  },
  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

  methods: {
    ...mapActions(["GetallAccounts" , 'AcceptAccountOrNot' , "deleteAccount"]),
    getHeaders(){
        var a = Object.keys(this.accounts[0])
        a.forEach((entry) => {
            var singleObj = {};
            singleObj['text'] = entry;
            singleObj['value'] = entry;
            this.headers.push(singleObj);
        });
        this.headers.push({ text: 'Actions', value: 'actions', sortable: false })
    },
    editItem (item) {
        this.editedIndex = this.accounts.indexOf(item)
        //assign: copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
        this.editedItem = Object.assign(this.accounts[this.editedIndex], item)
        this.dialog = true
        },

    deleteItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.editedItem = Object.assign(this.accounts[this.editedIndex], item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.deleteAccount(this.accounts[this.editedIndex].id )// +1 : because userids start from 1 while java counter starts from 0
      this.accounts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {// EDIT ITEM
        try {
        //   console.log('============',this.accounts[this.editedIndex].id)
          // approvaldetails: [to edit account detail , is_accepted , is_accepted_message]
          let approvaldetails = [this.accounts[this.editedIndex].id , this.editedItem.is_accepted , this.editedItem.is_accepted_message]
          this.AcceptAccountOrNot(approvaldetails);
        //   Object.assign(this.editedItem , this.accounts[this.editedIndex]) 
        //   console.log(this.editedItem)
      } catch (error) {
          throw "Sorry you can't edit approval msg now!"
      }

      } else {//ADD NEW ITEM
        // this.accounts.push(this.editedItem)
      }
      this.close()
    },
  },
  };

</script>
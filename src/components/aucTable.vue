<template>
  <div id="auc-table">
    <b-container fluid>
      <b-row>
        <b-col md="3">
          <b-input-group md="1">
            <b-form-input v-model="createItems"></b-form-input>
            <b-input-group-append>
              <b-button
                variant="outline-primary"
                @click="createRows(createItems)"
              >Create {{ createItems | selectedRows }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col md="9">
          <div class="float-right">
            <b-input-group md="1">
              <b-form-input v-model.number="createColumns"></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="success"
                  @click="addFields(headerColumns, createColumns)"
                >Add {{ ( createColumns + " Deliverable") | plural }}</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
      </b-row>
      <br />
      <!-- Main table element     :per-page="100"-->
      <b-table
        show-empty
        stacked="md"
        :items="items"
        :fields="headerColumns"
        :current-page="currentPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :foot-clone="footClone"
        @filtered="onFiltered"
      >
        <template slot="item_selection" slot-scope="row">
          <b-form-checkbox v-model="row.item.ui_selected" @input="selectItems(items)"></b-form-checkbox>
        </template>

        <template slot="FOOT_info" slot-scope="data">
          <b-table
            class="mt-table"
            striped
            hover
            small
            stacked="md"
            :items="innerItems"
            :fields="innerFields"
          >
            <template slot="label" slot-scope="row">
              <div class="mt-cell">{{row.item.label}}</div>
            </template>
          </b-table>
          <strong>{{ data.label }}</strong>
        </template>

        <template slot="FOOT_totals" slot-scope="data">
          <b-table striped hover small stacked="md" :items="innerItems" :fields="innerFields">
            <template slot="label" slot-scope="row">
              <div class="mt-cell">
                <div v-show="row.item.type!=='static'">
                  <span
                    v-if="row.item.display_type==='currency'"
                  >{{totals['total'][row.item.mapsTo]| currency}}</span>
                  <span v-else>{{totals['total'][row.item.mapsTo]}}</span>
                </div>
              </div>
            </template>
          </b-table>
          <strong>{{ data.label }}</strong>
        </template>

        <template
          :slot="'FOOT_'+ field.key"
          v-for="(field, index) in customFields"
          slot-scope="data"
        >
          <b-table
            striped
            hover
            small
            stacked="md"
            :items="innerItems"
            :fields="innerFields"
            :key="field.key"
          >
            <template slot="label" slot-scope="row">
              <div class="mt-cell">
                <span
                  :model="totals['col~'+(index+1)][row.item.mapsTo]"
                >{{totals["col~"+(index+1)][row.item.mapsTo]}}</span>
              </div>
            </template>
          </b-table>
          <strong :key="(index + 1)">{{ data.label }}</strong>
        </template>

        <template
          :slot="'HEAD_'+ field.key"
          v-for="(field, index) in customFields"
          slot-scope="data"
        >
          <div :key="index" @dblclick="field.edit = true;">
            <b-row>
              <b-col>
                <span v-if="!field.edit">{{field.label}}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-input
                  v-if="field.edit"
                  v-model="field.label"
                  @blur="field.edit = false; $emit('update')"
                  @keyup.enter="field.edit=false; $emit('update')"
                  v-focus
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-textarea
                  v-if="field.edit"
                  v-model="field.description"
                  @blur="field.edit = false; $emit('update')"
                  @keyup.enter="field.edit=false; $emit('update')"
                  v-focus
                  size="sm"
                ></b-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button v-if="field.edit" variant="danger" @click="removeCol(field.key)">Delete</b-button>
              </b-col>
              <b-col>
                <b-button v-if="field.edit" variant="success">Save</b-button>
              </b-col>
            </b-row>
          </div>
        </template>

        <template v-for="(field, index) in customFields" :slot="field.key" slot-scope="data">
          <b-table
            striped
            hover
            small
            stacked="md"
            :items="innerItems"
            :fields="innerFields"
            :key="field.key"
          >
            <template slot="label" slot-scope="row">
              <div class="mt-cell">
                <template v-if="inputType(row.item, data.item)=='read_write'">
                  <b-form-input
                    @input="calculate()"
                    v-model.number="data.item[data.field.key][row.item.mapsTo]"
                    size="sm"
                  ></b-form-input>
                </template>
                <template v-else-if="row.item.formula">
                  <span
                    v-if="row.item.display_type==='currency'"
                  >{{data.item[data.field.key][row.item.mapsTo] | currency}}</span>
                  <span v-else>{{data.item[data.field.key][row.item.mapsTo]}}</span>
                </template>

                <template v-else>
                  <span
                    v-if="row.item.display_type==='currency'"
                  >{{data.item[row.item.mapsTo] | currency}}</span>
                  <span v-else>{{data.item[row.item.mapsTo]}}</span>
                </template>
              </div>
            </template>
          </b-table>
        </template>

        <template slot="totals" slot-scope="data">
          <b-table striped hover small stacked="md" :items="innerItems" :fields="innerFields">
            <template slot="label" slot-scope="row">
              <div class="mt-cell">
                <div v-show="row.item.type!=='static'">
                  <span
                    v-if="row.item.display_type==='currency'"
                  >{{totals["row~"+data.item.index][row.item.mapsTo] | currency}}</span>
                  <span v-else>{{totals["row~"+data.item.index][row.item.mapsTo]}}</span>
                </div>
              </div>
            </template>
          </b-table>
          <!-- <b-button variant="success" @click="rowTotal(data.item)">Item Todal</b-button> -->
        </template>

        <template slot="info">
          <b-table
            class="mt-table"
            striped
            hover
            small
            stacked="md"
            :items="innerItems"
            :fields="innerFields"
          >
            <template slot="label" slot-scope="row">
              <div class="mt-cell">{{row.item.label}}</div>
            </template>
          </b-table>
        </template>

        <template slot="region" slot-scope="row">
          <vue-select
            :options="regions"
            v-model="row.item.region"
            @change="changeRegion(row.item, row.item.region)"
          />
        </template>

        <template slot="role" slot-scope="row">
          <vue-select
            label="name"
            :reduce="role => role.id"
            :options="roles"
            v-model="row.item.uid"
            @input="changeRole(row.item, row.item.uid)"
          />
        </template>

        <template slot="role_name" slot-scope="row">
          <b-form-input type="text" :placeholder="row.item.role_name" />
        </template>

        <template slot="task" slot-scope="row">
          <b-form-input type="text" :model="row.item.task" />
        </template>

        <template slot="isActive" slot-scope="row">{{ row.value ? 'Yes :)' : 'No :(' }}</template>

        <template slot="actions" slot-scope="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >Info modal</b-button>
          <b-button
            size="sm"
            @click="row.toggleDetails"
          >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
        </template>

        <template slot="row-details" slot-scope="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-row>
        <b-col>
          <b-button-toolbar>
            <b-button
              class="mx-1"
              @click="copyRows()"
            >Copy {{ selectedItems.length | selectedRows }}</b-button>
            <b-button
              class="mx-1"
              variant="danger"
              @click="removeRows()"
            >Remove {{ selectedItems.length | selectedRows }}</b-button>
          </b-button-toolbar>
        </b-col>
      </b-row>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
    <!--  -->
    <h1>Items</h1>
    {{items}}
    <h1>Fields</h1>
    {{headerColumns}}
    <h1>Totals</h1>
    {{totals}}
    <h1>Deliverables</h1>
    {{ newCustomColumns }}
    <section>
      <ol class="list-group">
        <li class="list-group-item" v-for="todo of scustomColumns" :key="todo.key">{{ todo.key}}</li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">
//import VueJsonPretty from "vue-json-pretty";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

//import VeeValidate from "vee-validate";
//import Vuex from 'vuex'

import jsonpath from "jsonpath";
import BootstrapVue from "bootstrap-vue";
import { VueSelect } from "vue-select";
import _ from "lodash";

import { Parser } from "expr-eval";
//import { __assign } from "tslib";

import store from "@/store";

// @ts-ignore
import VueCurrencyFilter from "vue-currency-filter";
import CustomColumnModel from "../models/CustomColumnModel";

//Vue.use(Vuex)
Vue.use(BootstrapVue);
//Vue.use(VeeValidate);

Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});

@Component({
  name: "aucTable",
  filters: {
    selectedRows: function(selected: any) {
      return selected + " row" + (selected > 1 ? "s" : "");
    },
    plural: function(value: any) {
      let val = Number(value.split(" ")[0]);
      return value + (val > 1 ? "s" : "");
    }
  },
  components: {
    VueSelect
    //VueJsonPretty
  }
})
export default class aucTable extends Vue {
  @Prop() private aucData!: string;

  private innerItems: any = [];
  private headerColumns: Array<any> = [];
  private infoModal: any;
  private selectedItems: any = [];
  private items: any = [];
  private totalRows: number = 1;
  private currentPage: number = 1;
  private perPage: number = 5;
  private pageOptions: Array<number> = [5, 10, 15];
  private sortBy: any = null;
  private sortDesc: boolean = false;
  private sortDirection: string = "asc";
  private footClone: boolean = true;
  private filter: any = null;

  private addRowsNumber: number = 1;
  private addColumnsNumber: number = 1;

  private createItems: number = 1;
  private createColumns: number = 1;
  private regions: any = [];
  private roles: any = [];
  private customFields: Array<any> = [];
  private totals: any = {};

  private source: Array<any> = [];

  private innerFields: any;

  private formulaParser: any;

  private newCustomColumns: Array<CustomColumnModel>;

  private inputData: any = JSON.parse(this.aucData);
  constructor() {
    super();

    //this.initiateData(JSON.parse(this.aucData));
  }

  private initiateData(jsonData: any) {
    let inputData = jsonData;

    this.innerItems = inputData.innerItems;
    //this.headerColumns = inputData.fields;
    this.infoModal = inputData.infoModal;
    this.selectedItems = inputData.selectedItems;
    //this.totalRows = inputData.totalRows;

    this.innerFields = inputData.innerFields;
    this.createItems = inputData.createItems;
    this.regions = inputData.regions;
    this.roles = inputData.roles;
    this.totals = inputData.totals;
    this.source = inputData.source;

    this.items = this.applyIndex(inputData.items);

    this.totalRows = this.items.length;
    this.selectedItems = this.selectItems(this.items);

    this.headerColumns = this.applyIndex(inputData.fields);
    this.customFields = this.filterCustomFields(inputData.fields);

    this.formulaParser = Parser;

    this.newCustomColumns = [];
    this.addCustomColumn();
  }

  get sortOptions() {
    // Create an options list from our fields
    return this.headerColumns
      .filter((f: any) => f.sortable)
      .map((f: any) => {
        return {
          text: f.label,
          value: f.key
        };
      });
  }

  get scustomColumns(): Array<CustomColumnModel> {
    let customColumns = this.$store.state.customColumns;
    return customColumns;
  }

  addCustomColumn() {
    this.$store.dispatch("addCustomColumn", {
      key: "caca~2",
      label: "Dezel 2",
      type: "custom",
      edit: false
    });
  }

  mounted() {
    this.initialize();
  }

  initialize() {
    this.initiateTotals();
    this.initiateCustomFields();
    this.regions = this.getRegions();
    this.roles = this.getRoles();
    this.calculate();
  }

  @Watch("aucData", { immediate: true, deep: true })
  dataChanged(val: any, oldVal: any) {
    //let inputData = JSON.parse(this.aucData);
    debugger;
    this.initiateData(JSON.parse(val));
    this.initialize();
    this.$forceUpdate();
  }

  getRegions() {
    let regions = _.uniq(jsonpath.query(this.source, '$..["region"]')).sort();
    //debugger;
    return regions;
  }

  getRoles() {
    const array = this.source;
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.uid)) {
        map.set(item.uid, true); // set any value to Map
        result.push({
          id: item.uid,
          name: item.role_name
        });
      }
    }
    //let roles = _.uniq(jsonpath.query(this.source, '$..["role_name"]')).sort();
    //debugger;
    return result;
  }

  changeRole(item: any, uid: any) {
    let newItem = jsonpath.query(
      this.source,
      '$..[?(@.uid=="' + uid + '")]'
    )[0];
    _.assign(item, newItem);
  }

  requiresUserInput(item: any) {
    return (
      item.type &&
      item.type.includes("user_input") &&
      !item.type.includes("total")
    );
  }

  inputType(row: any, column: any) {
    let type = "read_only";

    let rowType = row.type ? row.type : type;
    let fieldType = column.type ? column.type : type;

    //console.log(field);
    if (rowType.includes("user_input")) {
      type = "read_write";
    }

    if (fieldType.includes("total")) {
      type = "read_only";
    }
    return type;
  }

  createRows(howMany: number) {
    _.range(howMany).forEach(el => {
      let newObj = {
        ui_selected: false,
        uid: "",
        role_name: "",
        region: "ANY",

        quantity: 1,
        units: 1
      };
      this.items.splice(this.items.length, 0, newObj);
      this.items = this.applyIndex(this.items);
    });
    this.initiateCustomFields();
    this.initiateTotals();
    this.calculate();
  }

  removeRows() {
    for (let index = this.items.length - 1; index >= 0; index--) {
      if (this.items[index].ui_selected === true) {
        this.items[index].ui_selected = false;
        this.$forceUpdate();
        this.items.splice(index, 1);
        Vue.delete(this.totals, "row~" + index);
      }
    }
    this.calculate();
    this.$forceUpdate();
  }

  copyRows() {
    this.items
      .filter((item: any) => item.ui_selected === true)
      .forEach((item: any) => {
        item.ui_selected = false;

        let obj = _.cloneDeep(item);
        this.items.push(obj);
      });

    this.calculate();
    this.$forceUpdate();
  }

  removeCol(colId: string) {
    for (let index = this.items.length - 1; index >= 0; index--) {
      Vue.delete(this.items[index], colId);
    }
    this.calculate();
    this.$forceUpdate();
  }

  createInitialInnersToObject(obj: any, key: string) {
    let inner = this.createInitialInners();
    if (!obj[key]) {
      obj[key] = inner;
    } else {
      Object.keys(inner).forEach(innerKey => {
        if (!obj[key][innerKey]) {
          obj[key][innerKey] = inner[innerKey];
        }
      });
    }
    return obj;
  }

  initiateCustomFields() {
    this.items.forEach((item: any) => {
      this.customFields.forEach((field: any) => {
        this.createInitialInnersToObject(item, field.key);
      });
    });
  }

  initiateTotals() {
    let totals = this.totals;
    let cols = this.innerItems;

    this.items.forEach((item: any) => {
      let key = "row~" + item.index;
      this.createInitialInnersToObject(totals, key);
    });

    this.customFields
      .filter(e => (e.type = "custom"))
      .forEach((field: any) => {
        let key = "col~" + field.key.split("~")[1];
        this.createInitialInnersToObject(totals, key);
      });

    this.createInitialInnersToObject(totals, "total");

    this.totals = totals;

    this.$forceUpdate();
  }

  sumByInnerKeys(jsArr: Array<any>) {
    let jsObj = this.createInitialInners();
    Object.keys(jsObj).forEach(key => {
      jsObj[key] = jsArr.reduce((a, b) => a + (b[key] || 0), 0);
    });
    return jsObj;
  }

  calculate() {
    this.initiateTotals();

    let formulas = this.innerItems.filter((inner: any) =>
      inner.formula ? true : false
    );

    let customFields = this.filterCustomFields(this.headerColumns);

    let innerKeys = Object.keys(this.createInitialInners());

    let total = this.createInitialInners();

    this.items.forEach((item: any) => {
      let initialRow = this.createInitialInners();

      const rowKey = "row~" + item.index;
      this.totals[rowKey] = this.createInitialInners();

      customFields.forEach((field: any) => {
        formulas.forEach((formula: any) => {
          let innerItem = item[field.key];
          //innerItem.item = item.clone();

          item[field.key][formula.mapsTo] = Parser.parse(
            formula.formula
          ).evaluate({ item: item, inner: item[field.key] });
        });

        this.totals[rowKey] = this.addInners(
          this.totals[rowKey],
          item[field.key]
        );
      });
      total = this.addInners(total, this.totals[rowKey]);
    });
    //col calc
    customFields.forEach((field: any) => {
      const colKey = "col~" + field.key.split("~")[1];
      this.totals[colKey] = jsonpath
        .query(this.items, '$..["' + field.key + '"]')
        .reduce(
          (acc: any, obj: any) => this.addInners(acc, obj),
          this.createInitialInners()
        );
    });

    //total calc
    this.totals.total = total;
  }

  createInitialInners() {
    let obj: any = {};
    this.innerItems
      .flatMap((p: any) => p.mapsTo)
      .forEach((key: string) => (obj[key] = 0.0));
    return obj;
  }

  addInners(obj1: any, obj2: any) {
    let keys = _.union(_.keys(obj1), _.keys(obj2));
    let result: any = {};
    keys.forEach(key => {
      result[key] =
        (obj1[key] ? obj1[key] : 0.0) + (obj2[key] ? obj2[key] : 0.0);
    });
    return result;
  }

  info(item: any, index: number, button: any) {
    this.infoModal.title = `Row index: ${index}`;
    this.infoModal.content = JSON.stringify(item, null, 2);
    this.$root.$emit("bv::show::modal", this.infoModal.id, button);
  }

  resetInfoModal() {
    this.infoModal.title = "";
    this.infoModal.content = "";
  }

  onFiltered(filteredItems: any) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    //this.currentPage = 1
  }
  selectItems(items: any) {
    this.selectedItems = jsonpath.query(items, "$..[?(@.ui_selected==true)]");
    return this.selectedItems;
  }

  filterCustomFields(fields: any) {
    this.customFields = jsonpath.query(fields, '$..[?(@.type === "custom")]');
    return this.customFields;
  }

  addFields(fieldsArray: Array<any>, newFields: number) {
    const val = {
      index: 0,
      key: "",
      label: "",
      type: "custom",
      edit: false
    };
    debugger;
    let customFields = this.filterCustomFields(this.headerColumns);

    let customField = customFields[customFields.length - 1];
    let lastIndex = customField.index;

    let startIndex = lastIndex;
    let endIndex = startIndex + newFields;
    let customFieldIndex = customFields.length;

    let indices = _.range(startIndex, endIndex);
    indices.forEach((index: number) => {
      const newval = _.clone(val);

      newval.key = "customField~" + ++customFieldIndex;
      newval.label = "D " + customFieldIndex;
      fieldsArray.splice(index, 0, newval);

      //update totals
      this.createInitialInnersToObject(this.totals, "col~" + customFieldIndex);

      //update items
      this.items.forEach((item: any) => {
        this.createInitialInnersToObject(item, newval.key);
      });
    });

    //console.log("new Fields");
    //console.log(fieldsArray);
    //this.headerColumns = this.headerColumns;
    console.log("1");
    this.headerColumns = this.applyIndex(fieldsArray);
    console.log("2");
    console.log(this.headerColumns);

    // To re-render the columns
    this.filterCustomFields(this.headerColumns);
  }

  applyIndex(objectArr: any) {
    objectArr.forEach((e: any, i: number) => (e.index = i + 1));
    return objectArr;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import url('../../node_modules/bootstrap/dist/css/bootstrap.css');
@import url('../../node_modules/bootstrap-vue/dist/bootstrap-vue.css');
@import url('../../node_modules/vue-select/dist/vue-select.css');

#auc-table {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
}

#auc-table tbody .form-control-sm {
  font-size: 12px;
  height: 15px;
}

#auc-table tbody .form-control {
  font-size: 12px;
}

#auc-table table td {
  font-size: 12px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

table.mt-table td>div, .mt-cell {
  min-height: 15px;
  max-height: 15px;
  font-size: 12px;
}
</style>

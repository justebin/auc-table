<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div>
<input id = 'non_pers' type="text" value='{
  "innerItems": [
      {
          "id": "qty",
          "order": 0,
          "label": "Quantity",
          "mapsTo": "quantity",
          "default_value": 1,
          "type": "user_input_number"
      },
      {
          "id": "execution",
          "order": 1,
          "label": "Execution",
          "mapsTo": "units",
          "type": "user_input_number"
      },
      {
          "id": "hours",
          "order": 2,
          "label": "Hours",
          "mapsTo": "total_hours",
          "formula": "(inner.quantity * inner.units)"
      },
      {
          "id": "cost_per_hour",
          "order": 3,
          "label": "Cost/hr",
          "mapsTo": "cost_hourly",
          "type": "static",
          "display_type": "currency"
      },
      {
          "id": "cost_total",
          "order": 3,
          "label": "Cost",
          "mapsTo": "cost_total",
          "formula": "((inner.quantity * inner.units) * item.cost_hourly)",
          "display_type": "currency"
      },
      {
          "id": "margin_percent",
          "order": 4,
          "label": "GM %",
          "mapsTo": "gm",
          "value": 2.0,
          "type": "user_input_number"
      },
      {
          "id": "price_per_hour",
          "order": 5,
          "label": "Price/hr",
          "mapsTo": "price",
          "type": "static",
          "display_type": "currency"
      },
      {
          "id": "price",
          "order": 6,
          "label": "Price",
          "mapsTo": "price",
          "formula": "(inner.quantity * inner.total_hours * inner.units * item.price)",
          "display_type": "currency"
   
      },
      {
          "id": "margin",
          "order": 4,
          "label": "Margin",
          "mapsTo": "margin",
          "value": 2.0
      },
      {
          "id": "vbp",
          "order": 7,
          "label": "VBP",
          "mapsTo": "vbp",
          "value": 2.0
      }
  ],
  "createItems": 1,
  "selectedItems": [],
  "regions": [
      "ANY",
      "IL",
      "ON"
  ],
  "innerFields": [
      {
          "key": "label",
          "label": ""
      }
  ],
  "roles": [
      {
          "uid": "3000-3051",
          "name": "Vice"
      }
  ],
  "items": [
      {
          "ui_selected": false,
          "uid": "3000-3051",
          "role_name": "Vice President Client Service",
          "region": "ANY",
          "price_content": "230.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "225.0",
          "price_xm": "172.98",
          "price_b2b": "172.98",
          "cost_hourly": "86.65",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "22.53",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "10.92",
          "cost_total": "126.32",
          "rate_exists": false,
          "quantity": 1,
          "units": 1,
          "cost": 126.32,
          "price": 172.98,
          "rate": 172.98,
          "total_hours": 18,
          "total_weeks": 1,
          "total_cost": 2273.76,
          "total_costperhour": 126.32,
          "total_wage": 1559.7,
          "annual_wage": 180232,
          "benefit_percent": 26,
          "benefit_amount": 405.522,
          "total_millage_cost": 0.02925,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.012115384615384615,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.012461538461538461,
          "annual_phone_cost": 1.44,
          "total_price": 2273.76,
          "applied_price": 126.32,
          "task":"",
          "customField~1": { "quantity": 1, "units": 1},
          "customField~2": { "quantity": 1, "units": 1}
      },
      {
          "ui_selected": false,
          "uid": "3000-3044",
          "role_name": "Sr. Account Director",
          "region": "ANY",
          "price_content": "215.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "0.0",
          "price_xm": "130.06",
          "price_b2b": "130.06",
          "cost_hourly": "63.78",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "16.58",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "8.04",
          "cost_total": "94.62",
          "rate_exists": false,
          "cost": 94.62,
          "price": 0,
          "rate": 0,
          "total_hours": 95,
          "total_weeks": 3,
          "total_cost": 8988.9,
          "total_costperhour": 94.62,
          "total_wage": 6059.1,
          "annual_wage": 132662.4,
          "benefit_percent": 26,
          "benefit_amount": 1575.366,
          "total_millage_cost": 0.154375,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.06394230769230769,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.06576923076923077,
          "annual_phone_cost": 1.44,
          "total_price": 8988.9,
          "applied_price": 94.62,
          "quantity": 1,
          "units": 100,
          "task":"",
          "customField~1": { "quantity": 1},
          "customField~2": { "quantity": 1}
      }
  ],
  "totals": {},
  "fields": [
      {
          "key": "item_selection",
          "label": "Select"
      },
      {
          "key": "region",
          "label": "Region",
          "sortable": true,
          "sortDirection": "desc"
      },
      {
          "key": "role",
          "label": "Role"
      },
      {
          "key": "uid",
          "label": "UID",
          "sortable": true
      },
      {
          "key": "role_name",
          "label": "Description",
          "sortable": true,
          "class": "text-center"
      },
      {
          "key": "task",
          "label": "Task",
          "class": "text-center"
      },
      {
          "key": "info",
          "label": "Info"
      },
      {
          "key": "customField~1",
          "label": "D 1",
          "type": "custom",
          "edit": false
      },
      {
          "key": "customField~2",
          "label": "D 2",
          "type": "custom",
          "edit": false
      },
      {
          "key": "totals",
          "type": "totals",
          "label": "Totals"
      }
  ],
  "source": [
      {
          "ui_selected": true,
          "uid": "3000-3051",
          "role_name": "Vice President Client Service",
          "region": "ANY",
          "price_content": "230.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "225.0",
          "price_xm": "172.98",
          "price_b2b": "172.98",
          "cost_hourly": "86.65",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "22.53",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "10.92",
          "cost_total": "126.32",
          "rate_exists": false,
          "quantity": 1,
          "units": 1,
          "cost": 126.32,
          "price": 0,
          "rate": 0,
          "total_hours": 18,
          "total_weeks": 1,
          "total_cost": 2273.76,
          "total_costperhour": 126.32,
          "total_wage": 1559.7,
          "annual_wage": 180232,
          "benefit_percent": 26,
          "benefit_amount": 405.522,
          "total_millage_cost": 0.02925,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.012115384615384615,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.012461538461538461,
          "annual_phone_cost": 1.44,
          "total_price": 2273.76,
          "applied_price": 126.32
      },
      {
          "ui_selected": false,
          "uid": "3000-3044",
          "role_name": "Sr. Account Director",
          "region": "ANY",
          "price_content": "215.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "0.0",
          "price_xm": "130.06",
          "price_b2b": "130.06",
          "cost_hourly": "63.78",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "16.58",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "8.04",
          "cost_total": "94.62",
          "rate_exists": false,
          "cost": 94.62,
          "price": 0,
          "rate": 0,
          "total_hours": 95,
          "total_weeks": 3,
          "total_cost": 8988.9,
          "total_costperhour": 94.62,
          "total_wage": 6059.1,
          "annual_wage": 132662.4,
          "benefit_percent": 26,
          "benefit_amount": 1575.366,
          "total_millage_cost": 0.154375,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.06394230769230769,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.06576923076923077,
          "annual_phone_cost": 1.44,
          "total_price": 8988.9,
          "applied_price": 94.62,
          "quantity": 1,
          "units": 100
      }
  ],
  "totalRows": 1,
  "currentPage": 1,
  "perPage": 100,
  "pageOptions": [
      5,
      10,
      15
  ],
  "sortBy": null,
  "sortDesc": false,
  "sortDirection": "asc",
  "footClone": true,
  "filter": null,
  "infoModal": {
      "id": "info-modal",
      "title": "",
      "content": ""
  }
}'/>
<br/>
<input id = 'non_pers' type="text" value='{
  "innerItems": [
      {
          "id": "qty",
          "order": 0,
          "label": "Quantity",
          "mapsTo": "quantity",
          "default_value": 1,
          "type": "user_input_number"
      },
      {
          "id": "execution",
          "order": 1,
          "label": "Execution",
          "mapsTo": "units",
          "type": "user_input_number"
      },
      {
          "id": "hours",
          "order": 2,
          "label": "Hours",
          "mapsTo": "total_hours",
          "formula": "(inner.quantity * inner.units)"
      },
      {
          "id": "cost_per_hour",
          "order": 3,
          "label": "Cost/hr",
          "mapsTo": "cost_hourly",
          "type": "static",
          "display_type": "currency"
      },
      {
          "id": "cost_total",
          "order": 3,
          "label": "Cost",
          "mapsTo": "cost_total",
          "formula": "((inner.quantity * inner.units) * item.cost_hourly)",
          "display_type": "currency"
      },
      {
          "id": "margin_percent",
          "order": 4,
          "label": "GM %",
          "mapsTo": "gm",
          "value": 2.0,
          "type": "user_input_number"
      },
      {
          "id": "price_per_hour",
          "order": 5,
          "label": "Price/hr",
          "mapsTo": "price",
          "type": "static",
          "display_type": "currency"
      },
      {
          "id": "price",
          "order": 6,
          "label": "Price",
          "mapsTo": "price",
          "formula": "(inner.quantity * inner.total_hours * inner.units * item.price)",
          "display_type": "currency"
   
      },
      {
          "id": "margin",
          "order": 4,
          "label": "Margin",
          "mapsTo": "margin",
          "value": 2.0
      },
      {
          "id": "vbp",
          "order": 7,
          "label": "VBP",
          "mapsTo": "vbp",
          "value": 2.0
      }
  ],
  "createItems": 1,
  "selectedItems": [],
  "regions": [
      "ANY",
      "IL",
      "ON"
  ],
  "innerFields": [
      {
          "key": "label",
          "label": ""
      }
  ],
  "roles": [
      {
          "uid": "3000-3051",
          "name": "Vice"
      }
  ],
  "items": [
      {
          "ui_selected": false,
          "uid": "3000-3051",
          "role_name": "Vice President Client Service",
          "region": "ANY",
          "price_content": "230.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "225.0",
          "price_xm": "172.98",
          "price_b2b": "172.98",
          "cost_hourly": "86.65",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "22.53",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "10.92",
          "cost_total": "126.32",
          "rate_exists": false,
          "quantity": 1,
          "units": 1,
          "cost": 126.32,
          "price": 172.98,
          "rate": 172.98,
          "total_hours": 18,
          "total_weeks": 1,
          "total_cost": 2273.76,
          "total_costperhour": 126.32,
          "total_wage": 1559.7,
          "annual_wage": 180232,
          "benefit_percent": 26,
          "benefit_amount": 405.522,
          "total_millage_cost": 0.02925,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.012115384615384615,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.012461538461538461,
          "annual_phone_cost": 1.44,
          "total_price": 2273.76,
          "applied_price": 126.32,
          "task":"",
          "customField~1": { "quantity": 1, "units": 1},
          "customField~2": { "quantity": 1, "units": 1}
      },
      {
          "ui_selected": false,
          "uid": "3000-3044",
          "role_name": "Sr. Account Director",
          "region": "ANY",
          "price_content": "215.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "0.0",
          "price_xm": "130.06",
          "price_b2b": "130.06",
          "cost_hourly": "63.78",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "16.58",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "8.04",
          "cost_total": "94.62",
          "rate_exists": false,
          "cost": 94.62,
          "price": 0,
          "rate": 0,
          "total_hours": 95,
          "total_weeks": 3,
          "total_cost": 8988.9,
          "total_costperhour": 94.62,
          "total_wage": 6059.1,
          "annual_wage": 132662.4,
          "benefit_percent": 26,
          "benefit_amount": 1575.366,
          "total_millage_cost": 0.154375,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.06394230769230769,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.06576923076923077,
          "annual_phone_cost": 1.44,
          "total_price": 8988.9,
          "applied_price": 94.62,
          "quantity": 1,
          "units": 100,
          "task":"",
          "customField~1": { "quantity": 1},
          "customField~2": { "quantity": 1}
      }
  ],
  "totals": {},
  "fields": [
      {
          "key": "item_selection",
          "label": "Select"
      },
      {
          "key": "region",
          "label": "Region",
          "sortable": true,
          "sortDirection": "desc"
      },
      {
          "key": "role",
          "label": "Role"
      },
      {
          "key": "uid",
          "label": "UID",
          "sortable": true
      },
      {
          "key": "role_name",
          "label": "Description",
          "sortable": true,
          "class": "text-center"
      },
      {
          "key": "task",
          "label": "Task",
          "class": "text-center"
      },
      {
          "key": "info",
          "label": "Info"
      },
      {
          "key": "customField~1",
          "label": "D 1",
          "type": "custom",
          "edit": false
      },
      {
          "key": "customField~2",
          "label": "D 2",
          "type": "custom",
          "edit": false
      },
      {
          "key": "totals",
          "type": "totals",
          "label": "Totals"
      }
  ],
  "source": [
      {
          "ui_selected": true,
          "uid": "3000-3051",
          "role_name": "Vice President Client Service",
          "region": "ANY",
          "price_content": "230.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "225.0",
          "price_xm": "172.98",
          "price_b2b": "172.98",
          "cost_hourly": "86.65",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "22.53",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "10.92",
          "cost_total": "126.32",
          "rate_exists": false,
          "quantity": 1,
          "units": 1,
          "cost": 126.32,
          "price": 0,
          "rate": 0,
          "total_hours": 18,
          "total_weeks": 1,
          "total_cost": 2273.76,
          "total_costperhour": 126.32,
          "total_wage": 1559.7,
          "annual_wage": 180232,
          "benefit_percent": 26,
          "benefit_amount": 405.522,
          "total_millage_cost": 0.02925,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.012115384615384615,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.012461538461538461,
          "annual_phone_cost": 1.44,
          "total_price": 2273.76,
          "applied_price": 126.32
      },
      {
          "ui_selected": false,
          "uid": "3000-3044",
          "role_name": "Sr. Account Director",
          "region": "ANY",
          "price_content": "215.0",
          "price_instoremedia": "0.0",
          "price_kitsfulfill": "0.0",
          "price_printing": "0.0",
          "price_retail": "0.0",
          "price_shopperdesign": "0.0",
          "price_xm": "130.06",
          "price_b2b": "130.06",
          "cost_hourly": "63.78",
          "cost_benefitpercent": "26.0",
          "cost_benefitamt": "16.58",
          "cost_mileage": "3.38",
          "cost_internal": "1.4",
          "cost_cellphone": "1.44",
          "cost_other": "8.04",
          "cost_total": "94.62",
          "rate_exists": false,
          "cost": 94.62,
          "price": 0,
          "rate": 0,
          "total_hours": 95,
          "total_weeks": 3,
          "total_cost": 8988.9,
          "total_costperhour": 94.62,
          "total_wage": 6059.1,
          "annual_wage": 132662.4,
          "benefit_percent": 26,
          "benefit_amount": 1575.366,
          "total_millage_cost": 0.154375,
          "annual_millage_cost": 3.38,
          "total_internal_cost": 0.06394230769230769,
          "annual_internal_cost": 1.4,
          "total_phone_cost": 0.06576923076923077,
          "annual_phone_cost": 1.44,
          "total_price": 8988.9,
          "applied_price": 94.62,
          "quantity": 1,
          "units": 100
      }
  ],
  "totalRows": 1,
  "currentPage": 1,
  "perPage": 100,
  "pageOptions": [
      5,
      10,
      15
  ],
  "sortBy": null,
  "sortDesc": false,
  "sortDirection": "asc",
  "footClone": true,
  "filter": null,
  "infoModal": {
      "id": "info-modal",
      "title": "",
      "content": ""
  }
}'/>
<br />
<hr>
    </div>
    <router-view />
  </div>
</template>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

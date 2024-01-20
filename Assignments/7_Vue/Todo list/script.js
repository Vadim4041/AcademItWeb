Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: []
            }
        },

        template: `
          <form class="row">
            <label class="col">
              <input class="form-control" type="text">
            </label>
            <div class="col-auto">
              <button class="btn btn-primary">Add</button>
            </div>
          </form>

          <ul>
            <todo-list-item v-for="item in items"
                            :key="item.id"
                            :item="item"></todo-list-item>
          </ul>`
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {};
        },

        template: `
          <li>{{ item.text }}</li>`
    })
    .mount("#app");
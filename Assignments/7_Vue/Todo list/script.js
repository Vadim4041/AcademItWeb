Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1
            }
        },

        methods: {
            addTodoItem() {
                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText.trim()
                };

                const validationElements= document.querySelectorAll('.validation');
                Array.from(validationElements).forEach(e => {e.classList.remove("is-invalid")})

                if (newTodoItem.text.length === 0) {
                    Array.from(validationElements).forEach(e => {e.classList.add("is-invalid")})
                    return;
                }

                this.newTodoItemId++;

                this.items.push(newTodoItem);

                this.newTodoItemText = "";
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row mb-3">

            <label class="col-11 validation" id="label-for-input">
              <input v-model="newTodoItemText" class="form-control validation" type="text">
            </label>
            <div class="col">
              <button class="btn btn-primary">Add</button>
            </div>

            <div class="invalid-feedback">
              Error: Note cannot be empty
            </div>
          </form>

          <ul class="list-unstyled">
            <todo-list-item v-for="item in items"
                            :key="item.id"
                            :item="item"
                            @save-item="item.text = $event"
                            @delete-item="deleteTodoItem(item)"></todo-list-item>
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
            return {
                isEditing: false,
                editingText: this.item.text,
            };
        },

        methods: {
            save() {
                this.isEditing = false;

                if (this.editingText.length === 0){
                    this.$emit("delete-item", this.item);
                }

                this.$emit("save-item", this.editingText);
            },

            cancel() {
                this.isEditing = false;
                this.editingText = this.item.text;
            },
        },

        template: `
          <li class="mb-2">
            <div class="row" v-if="!isEditing">
              <div class="col">
                {{ item.text }}
              </div>

              <div class="col-auto">
                <button @click="$emit('delete-item')" class="btn btn-danger me-2 " type="button">Delete</button>
                <button @click="isEditing = true" class="btn btn-primary " type="button">Edit</button>
              </div>
            </div>

            <div class="row" v-else>
              <div class="col">
                <input v-model="editingText" class="form-control" type="text">
              </div>

              <div class="col-auto">
                <button @click="cancel" class="btn btn-secondary me-2 " type="button">Cancel</button>
                <button @click="save" class="btn btn-primary " type="button">Save</button>
              </div>
            </div>
          </li>`
    })
    .mount("#app");
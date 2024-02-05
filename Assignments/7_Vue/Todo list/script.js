Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1,
                isNewNoteValid: true
            }
        },

        methods: {
            addTodoItem() {
                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText.trim()
                };

                this.isNewNoteValid = true;

                if (newTodoItem.text.length === 0) {
                    this.isNewNoteValid = false

                    return;
                }

                this.items.push(newTodoItem);

                this.newTodoItemId++;
                this.newTodoItemText = "";
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row mb-3 todo_list_form">
            <label class="col-10 add_new_note_input mt-2" :class="{'is-invalid':!isNewNoteValid}" id="label-for-input">
              <input v-model="newTodoItemText" class="form-control add_new_note_input" :class="{'is-invalid':!isNewNoteValid}" type="text">
            </label>
            <div class="col">
              <button class="btn btn-primary mt-2">Add</button>
            </div>

            <div class="col-auto invalid-feedback">
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
                isEditedNoteValid: true
            };
        },

        methods: {
            save() {
                this.isEditing = false;
                this.isEditedNoteValid = true;

                if (this.editingText.trim().length === 0) {
                    this.isEditedNoteValid = false;
                    this.isEditing = true;

                    return;
                }

                this.$emit("save-item", this.editingText);
            },

            cancel() {
                this.isEditing = false;
                this.editingText = this.item.text;
            }
        },

        template: `
          <li class="mb-2">
            <div v-if="!isEditing" class="row">
              <div class="col">
                {{ item.text }}
              </div>

              <div class="col-auto">
                <button @click="$emit('delete-item')" class="btn btn-danger me-2" type="button">Delete</button>
                <button @click="isEditing = true" class="btn btn-primary" type="button">Edit</button>
              </div>
            </div>

            <div v-else class="row">
              <div class="col edit_note_input" :class="{'is-invalid':!isEditedNoteValid}">
                <input v-model="editingText" v-on:keydown.enter="save" class="form-control edit_note_input" :class="{'is-invalid':!isEditedNoteValid}" type="text">
              </div>

              <div class="col-auto">
                <button @click="cancel" class="btn btn-secondary me-2" type="button">Cancel</button>
                <button @click="save" class="btn btn-primary" type="button">Save</button>
              </div>

              <div class="col-auto invalid-feedback">
                Error: Note cannot be empty
              </div>
            </div>


          </li>`
    })
    .mount("#app");
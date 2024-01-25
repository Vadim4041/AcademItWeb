<template>
  <div class="container my-2" id="app">
    <h1 class="mb-3">PhoneBook</h1>

    <form @submit.prevent="createContact" class="mb-3">
      <h2 class="h5">Create contact</h2>

      <div class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <input v-model="name" type="text" class="form-control" placeholder="Name">
        </div>
        <div class="col-12">
          <input v-model="phone" type="text" class="form-control" placeholder="Phone">
        </div>
        <div class="col-12">
          <button class="btn btn-primary">Create</button>
        </div>
      </div>
    </form>

    <form @submit.prevent="loadContacts" class="mb-3">
      <h2 class="h5">Search contacts</h2>

      <div class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <input v-model="term" type="text" class="form-control" placeholder="Search text">
        </div>
        <div class="col-12">
          <button class="btn btn-primary">Search</button>
        </div>
      </div>
    </form>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Phone</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-cloak>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td v-text="index + 1"></td>
          <td v-text="contact.name"></td>
          <td v-text="contact.phone"></td>
          <td>
            <button @click="showEditContactConfirmModal(contact)" class="btn btn-primary me-2" type="button">Edit</button>
            <button @click="showDeleteContactConfirmModal(contact)" class="btn btn-danger" type="button">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <bootstrap-modal ref="deleteConfirmModal" @ok="deleteContact">
      <template v-slot:header>Delete confirmation</template>
      <template v-slot:body>Do you really want to delete this contact?</template>
      <template v-slot:button>Delete</template>
    </bootstrap-modal>

    <bootstrap-modal ref="editConfirmModal" @ok="editContact">
      <template v-slot:header>Edit confirmation</template>
      <template v-slot:body>
        <div class="row">
          <div class="row mt-1 ms-1">
            Name: <input v-model="newName" type="text">
          </div>
          <div class="row mt-1 ms-1">
            Phone: <input v-model="newPhone" type="text">
          </div>
        </div>
      </template>
      <template v-slot:button>Edit</template>
    </bootstrap-modal>
  </div>
</template>

<script>
import PhoneBookService from "./phoneBookService";
import BootstrapModal from "./BootstrapModal.vue";

export default {
  name: "App",

  components: {
    BootstrapModal
  },

  data() {
    return {
      contacts: [],
      term: "",
      name: "",
      phone: "",
      service: new PhoneBookService(),
      contactToDelete: null,
      contactToEdit: null,
      newName: "",
      newPhone: ""
    };
  },

  created() {
    this.loadContacts();
  },

  methods: {
    createContact() {
      const contact = {
        name: this.name,
        phone: this.phone
      };

      this.service.createContact(contact).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.name = "";
        this.phone = "";

        this.loadContacts();
      }).catch(() => alert("Couldn't create contact"));
    },

    showDeleteContactConfirmModal(contact) {
      this.contactToDelete = contact;
      this.$refs.deleteConfirmModal.show();
    },

    showEditContactConfirmModal(contact) {
      this.contactToEdit = contact;
      this.newName = this.contactToEdit.name;
      this.newPhone = this.contactToEdit.phone;
      this.$refs.editConfirmModal.show();
    },

    deleteContact() {
      this.service.deleteContact(this.contactToDelete.id).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.$refs.deleteConfirmModal.hide();
        this.loadContacts();
      }).catch(() => alert("Couldn't delete contact"));
    },

    editContact() {
      const newContact = {
        id: this.contactToEdit.id,
        newName: this.newName,
        newPhone: this.newPhone
      };

      this.service.editContact(newContact).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.$refs.editConfirmModal.hide();
        this.loadContacts();
      }).catch(() => alert("Couldn't edit contact"));
    },

    loadContacts() {
      this.service.getContacts(this.term).then(contacts => {
        this.contacts = contacts;
      }).catch(() => alert("Couldn't load contacts"));
    }
  }
};
</script>

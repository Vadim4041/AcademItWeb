<template>
  <div class="container my-2" id="app">
    <h1 class="mb-3">PhoneBook</h1>

    <form @submit.prevent="createContact" class="mb-3 needs-validation" novalidate>
      <h2 class="h5">Create contact</h2>

      <div class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col" :class="{'is-invalid':!isNameValid}">
          <input v-model.trim="name" type="text" class="form-control" placeholder="Name" :class="{'is-invalid':!isNameValid}">
          <div class="col invalid-feedback">
            Error: Name cannot be empty
          </div>
        </div>

        <div class="col">
          <input v-model.trim="phone" type="text" class="form-control" placeholder="Phone" :class="{'is-invalid':!isPhoneValid}">
          <div class="col invalid-feedback">
            Error: Phone is not valid
          </div>
        </div>
        <div class="col">
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
          <td class="col-2 text-nowrap">
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
      <template v-slot:okButtonContent>Delete</template>
    </bootstrap-modal>

    <bootstrap-modal ref="editConfirmModal" @ok="editContact">
      <template v-slot:header>Edit confirmation</template>
      <template v-slot:body>
        <div class="input-group mb-3">
          <span class="input-group-text">Name:</span>
          <input v-model="newName" type="text" class="form-control" :class="{'is-invalid':!isNewNameValid}">
          <div class="invalid-feedback">
            Error: Name cannot be empty
          </div>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Phone:</span>
          <input v-model="newPhone" type="text" class="form-control" :class="{'is-invalid':!isNewPhoneValid}">
          <div class="invalid-feedback">
            Error: Phone is invalid
          </div>
        </div>
      </template>
      <template v-slot:okButtonContent>Save</template>
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
      isNameValid: true,
      isPhoneValid: true,
      service: new PhoneBookService(),
      contactToDelete: null,
      contactToEdit: null,
      newName: "",
      newPhone: "",
      isNewNameValid: true,
      isNewPhoneValid: true
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

      this.isNameValid = true;
      this.isPhoneValid = true;

      if (contact.name.length === 0) {
        this.isNameValid = false
      }

      if (contact.phone.length === 0 || isNaN(Number(contact.phone))) {
        this.isPhoneValid = false
      }

      if (this.contacts.some(c => c.phone.toUpperCase() === this.phone.toUpperCase())) {
        this.isPhoneValid = false
      }

      if (!this.isNameValid || !this.isPhoneValid) {
        return;
      }

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

      this.isNewNameValid = true;
      this.isNewPhoneValid = true;

      if (newContact.newName.length === 0) {
        this.isNewNameValid = false
      }

      if (newContact.newPhone.length === 0 || isNaN(Number(newContact.newPhone))) {
        this.isNewPhoneValid = false
      }

      if (this.contacts.filter(c => c.id !== newContact.id).some(c => c.phone.toUpperCase() === newContact.newPhone.toUpperCase())) {
        this.isNewPhoneValid = false
      }

      if (!this.isNewNameValid || !this.isNewPhoneValid) {
        return;
      }

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

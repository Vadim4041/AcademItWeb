$(function () {
    const table = $("#phonebook");
    const surnameInput = $("#surname");
    const nameInput = $("#name");
    const telephoneNumberInput = $("#telephone_number");
    const addNewContactButton = $("#add_contact_button");
    const form = $("#form");
    const duplicateTelephoneNumberMessage = $(".duplicate_telephone_number_message");
    const emptySurnameMessage = $(".empty_surname");
    const emptyNameMessage = $(".empty_name");
    const emptyTelephoneNumberMessage = $(".empty_telephone_number");
    const errorMessages = $(".error_message");
    const inputs = $(".input");

    const telephoneNumbers = new Set();

    inputs.focus(function () {
        inputs.removeClass("invalid");
        errorMessages.hide();
    });

    function addNewContact() {
        let surname = surnameInput.val().trim();
        let name = nameInput.val().trim();
        let telephoneNumber = telephoneNumberInput.val().trim();
        let isValid = true;

        inputs.removeClass("invalid");
        errorMessages.hide();

        if (surname.length === 0) {
            emptySurnameMessage.show();
            surnameInput.addClass("invalid");
            isValid = false;
        }

        if (name.length === 0) {
            emptyNameMessage.show();
            nameInput.addClass("invalid");
            isValid = false;
        }

        if (telephoneNumber.length === 0) {
            emptyTelephoneNumberMessage.show();
            telephoneNumberInput.addClass("invalid");
            isValid = false;
        }

        console.log(telephoneNumbers);

        if (telephoneNumbers.has(telephoneNumber) && isValid) {
            duplicateTelephoneNumberMessage.show();
            telephoneNumberInput.addClass("invalid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        telephoneNumbers.add(telephoneNumber);

        const contact = $("<tr>");

        setViewMode();
        table.append(contact);

        updateTableNumeration();

        surnameInput.val("");
        nameInput.val("");
        telephoneNumberInput.val("");

        function setViewMode() {
            contact.html(`<td class="number"></td>
                          <td class="surname"></td>
                          <td class="name"></td>
                          <td class="telephone_number"></td>
                          <td>
                              <div class="button_group">
                                  <button class="edit_button">Edit</button>
                                  <button class="delete_button">Delete</button>                                  
                              </div>
                          </td>`);

            contact.find(".surname").text(surname);
            contact.find(".name").text(name);
            contact.find(".telephone_number").text(telephoneNumber);

            contact.find(".delete_button").click(function () {
                telephoneNumbers.delete(contact.find(".telephone_number").text());
                contact.remove();
                updateTableNumeration();
            });
            contact.find(".edit_button").click(setEditMode);

            updateTableNumeration();
        }

        function setEditMode() {
            contact.html(`<td class="number"></td>
                          <td class="surname">
                              <input class="edit_surname_input input" type="text">
                              <div class="error_message empty_field_message empty_surname_edit" style="display: none;">Error: field is empty</div>
                          </td>
                          <td class="name">
                              <input class="edit_name_input input" type="text">
                              <div class="error_message empty_field_message empty_name_edit" style="display: none;">Error: field is empty</div>
                          </td>
                          <td class="telephone_number">
                              <input class="edit_telephone_number_input input" type="text">
                              <div class="error_message empty_field_message empty_telephone_number_edit" style="display: none;">Error: field is empty</div>
                              <span class="error_message duplicate_telephone_number_message_edit" style="display: none;">Error: This telephone number already exists</span>
                          </td>
                          <td>
                              <div class="button_group">
                                  <button class="save_button">Save</button>
                                  <button class="cancel_button">Cancel</button>                                  
                              </div>
                          </td>`);

            const selectedContactSurnameInput = contact.find(".edit_surname_input");
            selectedContactSurnameInput.val(surname);

            const selectedContactNameInput = contact.find(".edit_name_input");
            selectedContactNameInput.val(name);

            const selectedContactTelephoneNumberInput = contact.find(".edit_telephone_number_input");
            selectedContactTelephoneNumberInput.val(telephoneNumber);

            updateTableNumeration();

            contact.find(".save_button").click(function () {

                // const inputs = $(".input");
                const inputs = $("#phonebook tr.input");
                inputs.removeClass("invalid");

                const errorMessages = $("#phonebook tr.error_message");
                errorMessages.hide();

                isValid = true;

                const nameToValidate = selectedContactNameInput.val().trim();
                const surnameToValidate = selectedContactSurnameInput.val().trim();
                const telephoneNumberToValidate = selectedContactTelephoneNumberInput.val().trim();

                if (surnameToValidate.length === 0) {
                    contact.find(".empty_surname_edit").show();
                    selectedContactSurnameInput.addClass("invalid");
                    isValid = false;
                }

                if (nameToValidate.length === 0) {
                    contact.find(".empty_name_edit").show();
                    selectedContactNameInput.addClass("invalid");
                    isValid = false;
                }

                if (telephoneNumberToValidate.length === 0) {
                    contact.find(".empty_telephone_number_edit").show();
                    selectedContactTelephoneNumberInput.addClass("invalid");
                    isValid = false;
                }

                if (telephoneNumbers.has(telephoneNumberToValidate) && isValid && telephoneNumberToValidate !== telephoneNumber) {
                    contact.find(".duplicate_telephone_number_message_edit").show();
                    selectedContactTelephoneNumberInput.addClass("invalid");
                    isValid = false;
                }

                if (!isValid) {
                    return;
                }

                telephoneNumbers.delete(telephoneNumber);

                surname = surnameToValidate;
                telephoneNumber = telephoneNumberToValidate;
                name = nameToValidate;

                telephoneNumbers.add(telephoneNumberToValidate);
                console.log(telephoneNumbers);

                setViewMode();
            });

            contact.find(".cancel_button").click(function () {
                setViewMode();
            });
        }
    }

    function updateTableNumeration() {
        $("#phonebook tr").each(function (i) {
            $(this).find("td.number").text(i);
        });
    }

    form.keydown(function (event) {
        const keyCode = (event.keyCode || event.which);

        if (keyCode === 13) {
            event.preventDefault();
            addNewContact();
        }
    });

    addNewContactButton.click(addNewContact);
});
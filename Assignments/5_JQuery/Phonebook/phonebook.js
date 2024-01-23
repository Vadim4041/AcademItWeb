$(function () {
    const table = $("#phonebook");
    const surnameInput = $("#surname");
    const nameInput = $("#name");
    const telephoneNumberInput = $("#telephone_number");
    const addNewContactButton = $("#add_contact_button");
    const form = $("#form");
    const emptyFieldMessage = $("span.empty_field_message");
    const invalidTelephoneNumberMessage = $("span.invalid_telephone_number_message");
    const duplicateTelephoneNumberMessage = $(".duplicate_telephone_number_message")
    let inputs = $(".input");

    inputs.focus(function () {
        inputs.removeClass("invalid");
        emptyFieldMessage.hide();
        invalidTelephoneNumberMessage.hide();
        duplicateTelephoneNumberMessage.hide();
    });

    function addNewContact() {
        let surname = surnameInput.val().trim();
        let name = nameInput.val().trim();
        let telephoneNumber = telephoneNumberInput.val().trim();
        let isValid = true;

        if (surname.length === 0) {
            $(".empty_surname").show();
            surnameInput.addClass("invalid");
            isValid = false;
        }

        if (name.length === 0) {
            $(".empty_name").show();
            nameInput.addClass("invalid");
            isValid = false;
        }

        if (telephoneNumber.length === 0) {
            $(".empty_telephone_number").show();
            telephoneNumberInput.addClass("invalid");
            isValid = false;
        }

        if (isNaN(Number(telephoneNumber))) {
            invalidTelephoneNumberMessage.show();
            telephoneNumberInput.addClass("invalid");
            isValid = false;
        }

        let telephoneNumbers = new Set();

        $("#phonebook tr").each(function () {
            telephoneNumbers.add($(this).find("td:nth-child(4)").text());
        });

        telephoneNumbers.delete("");

        console.log(telephoneNumbers);

        if (telephoneNumbers.has(telephoneNumber)) {
            duplicateTelephoneNumberMessage.show();
            telephoneNumberInput.addClass("invalid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const contact = $("<tr>");

        setViewMode();
        table.append(contact);

        updateTableNumeration();

        surnameInput.val("");
        nameInput.val("");
        telephoneNumberInput.val("");


        function setViewMode() {
            contact.html(`<td class="count"></td>
                          <td class="surname"></td>
                          <td class="name"></td>
                          <td class="telephone_number"></td>
                          <td>
                              <div class="button_group">
                                  <button class="edit_button">
                                      <img src="resources/editIcon.png" alt="Edit">
                                  </button>
                                  <button class="delete_button">
                                      <img src="resources/deleteIcon.png" alt="Delete">
                                  </button>                                  
                              </div>
                          </td>`);

            contact.find(".surname").text(surname);
            contact.find(".name").text(name);
            contact.find(".telephone_number").text(telephoneNumber);
            contact.find(".delete_button").click(function () {
                telephoneNumbers.delete(contact.find(".telephone_number").text());
                contact.remove();
            });

            updateTableNumeration();

            contact.find(".edit_button").click(setEditMode);
        }

        function setEditMode() {
            contact.html(`<td class="count"></td>
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
                              <span class="error_message invalid_telephone_number_message_edit" style="display: none;">Error: Telephone number must only contain digits</span>
                              <span class="error_message duplicate_telephone_number_message_edit" style="display: none;">Error: This telephone number already exists</span>
                          </td>
                          <td>
                              <div class="button_group">
                                  <button class="save_button">Save</button>
                                  <button class="cancel_button">Cancel</button>                                  
                              </div>
                          </td>`);

            let selectedContactSurnameInput = contact.find(".edit_surname_input");
            selectedContactSurnameInput.val(surname);

            let selectedContactNameInput = contact.find(".edit_name_input");
            selectedContactNameInput.val(name);

            let selectedContactTelephoneNumberInput = contact.find(".edit_telephone_number_input");
            selectedContactTelephoneNumberInput.val(telephoneNumber);

            updateTableNumeration();

            contact.find(".save_button").click(function () {
                inputs = $(".input");

                inputs.focus(function () {
                    inputs.removeClass("invalid");
                    $(".empty_field_message").hide();
                    $(".invalid_telephone_number_message_edit").hide();
                    $(".duplicate_telephone_number_message_edit").hide();
                });

                isValid = true;

                let validationText = selectedContactSurnameInput.val().trim();

                if (validationText.length === 0) {
                    $(".empty_surname_edit").show();
                    selectedContactSurnameInput.addClass("invalid");
                    isValid = false;
                }

                surname = validationText;

                validationText = selectedContactNameInput.val().trim();

                if (validationText.length === 0) {
                    $(".empty_name_edit").show();
                    selectedContactNameInput.addClass("invalid");
                    isValid = false;
                }

                name = validationText;

                validationText = selectedContactTelephoneNumberInput.val().trim();

                if (validationText.length === 0) {
                    $(".empty_telephone_number_edit").show();
                    selectedContactTelephoneNumberInput.addClass("invalid");
                    isValid = false;
                }

                if (isNaN(Number(validationText))) {
                    $(".invalid_telephone_number_message_edit").show();
                    selectedContactTelephoneNumberInput.addClass("invalid");
                    isValid = false;
                }

                $("#phonebook tr").each(function () {
                    telephoneNumbers.add($(this).find("td:nth-child(4)").text());
                });

                if (telephoneNumbers.has(validationText)) {
                    $(".duplicate_telephone_number_message_edit").show();
                    selectedContactTelephoneNumberInput.addClass("invalid");
                    isValid = false;
                }

                console.log(telephoneNumbers);

                if (!isValid) {
                    return;
                }

                telephoneNumber = validationText;
                setViewMode();
            });

            contact.find(".cancel_button").click(function () {
                setViewMode();
            });
        }
    }

    function updateTableNumeration() {
        $("#phonebook tr").each(function (i) {
            $(this).find("td:first").text(i);
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
})
$(function () {
    const table = $("#phonebook")
    const surnameInput = $("#surname");
    const nameInput = $("#name");
    const telephoneNumberInput = $("#telephone_number");
    const addNewContactButton = $("#add_contact_button")
    const form = $("#form");
    const emptyFieldMessage = $("span.empty_field_message");
    const invalidTelephoneNumberMessage = $("span.invalid_telephone_number_message");
    const input = $(".input")

    input.focus(function () {
        input.removeClass("empty_field");
        telephoneNumberInput.removeClass("invalid_telephone_number")
        emptyFieldMessage.hide();
        invalidTelephoneNumberMessage.hide()
    });

    function addNewContact() {
        let surname = surnameInput.val().trim();
        let name = nameInput.val().trim();
        let telephoneNumber = telephoneNumberInput.val().trim();

        if (surname.length === 0 || name.length === 0 || telephoneNumber.length === 0) {
            emptyFieldMessage.show();
            input.addClass("empty_field");
            return;
        }

        if (isNaN(Number(telephoneNumber))) {
            invalidTelephoneNumberMessage.show();
            telephoneNumberInput.addClass("invalid_telephone_number")
            return;
        }

        const contact = $("<tr>")

        setViewMode();
        table.append(contact);
        updateTableNumeration()

        surnameInput.val("");
        nameInput.val("");
        telephoneNumberInput.val("");

        function setViewMode() {
            contact.html(`<td class='id'></td>
                        <td class='surname'></td>
                        <td class='name'></td>
                        <td class='telephone_number'></td>
                        <td>
                            <button class="delete_button">
                                <img src="resources/deleteIcon.png" alt="Delete">
                            </button>
                        </td>`);

            contact.find(".surname").text(surname);
            contact.find(".name").text(name);
            contact.find(".telephone_number").text(telephoneNumber);
            contact.find(".delete_button").click(function () {
                contact.remove();
                updateTableNumeration();
            });
        }

        function updateTableNumeration() {
            $("#phonebook tr").each(function (i) {
                $(this).find('td:first').text(i);
            });
        }
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
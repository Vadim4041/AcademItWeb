$(function () {
    const todoList = $("#todo_list_content");
    const newNoteInputField = $("#new_note_input");
    const addNewNoteButton = $("#add_new_note_button");
    const errorMessage = $("span.error_message");

    newNoteInputField.focus(function () {
        newNoteInputField.removeClass("invalid_input");
        errorMessage.hide();
    });

    function addNewNote() {
        let text = newNoteInputField.val().trim();

        if (text.length === 0) {
            errorMessage.show();
            newNoteInputField.addClass("invalid_input");
            return;
        }

        const todoNote = $("<li>");

        function setEditMode() {
            todoNote.html(`<div class='note_block'>
                               <input class='edit_note_input' type='text'>
                               <span class='buttons_group'>
                                   <button class='list_button save_button' type='button'>Save</button>
                                   <button class='list_button cancel_button' type='button'>Cancel</button>
                               </span>
                               <div><span class="error_message error_edit" style="display: none;">Error: Note cannot be empty</span></div>   
                           </div>`);

            let selectedNoteInputField = todoNote.find(".edit_note_input");
            selectedNoteInputField.val(text);

            selectedNoteInputField.focus();

            todoNote.find(".save_button").click(function () {
                validateEditing();
            });

            todoNote.keydown(function (event) {
                const keyCode = (event.keyCode || event.which);

                if (keyCode === 13) {
                    validateEditing();
                }
            });

            todoNote.find(".cancel_button").click(setViewMode);

            function validateEditing() {
                const editError = todoNote.find(".error_edit")
                const validationText = selectedNoteInputField.val().trim();

                if (validationText.length === 0) {
                    editError.show();
                    selectedNoteInputField.addClass("invalid_input");
                    return;
                }

                text = validationText;

                setViewMode();
            }
        }

        function setViewMode() {
            todoNote.html(`<div class='note_block'>
                               <span class='todo_note'></span>
                               <span class='buttons_group'>
                                   <button class='list_button edit_button' type='button'>Edit</button>
                                   <button class='list_button delete_button' type='button'>Delete</button>
                               </span>
                           </div>`);

            todoNote.find(".todo_note").text(text);

            todoNote.find(".delete_button").click(function () {
                todoNote.remove();
            });

            todoNote.find(".todo_note").click(setEditMode);
            todoNote.find(".edit_button").click(setEditMode);
        }

        setViewMode();
        todoList.append(todoNote);
        newNoteInputField.val("");
    }

    newNoteInputField.keydown(function (event) {
        const keyCode = (event.keyCode || event.which);

        if (keyCode === 13) {
            addNewNote();
        }
    });

    addNewNoteButton.click(addNewNote);
});
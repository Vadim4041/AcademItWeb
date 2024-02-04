$(function () {
    const todoList = $("#todo_list_content");
    const newNoteInputField = $("#new_note_input");
    const addNewNoteButton = $("#add_new_note_button");
    const errorMessage = $(".error_message");

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
                               <div class='buttons_group'>
                                   <button class='list_button save_button' type='button'>Save</button>
                                   <button class='list_button cancel_button' type='button'>Cancel</button>
                               </div>                                                              
                           </div>
                           <div class="line-break"></div>  
                           <div><span class="error_message edit_error" style="display: none;">Error: Note cannot be empty</span></div>`);

            let noteInputField = todoNote.find(".edit_note_input");
            noteInputField.val(text);

            noteInputField.focus();

            todoNote.find(".save_button").click(function () {
                saveInput();
            });

            noteInputField.keydown(function (event) {
                const keyCode = (event.keyCode || event.which);

                if (keyCode === 13) {
                    saveInput();
                }
            });

            todoNote.find(".cancel_button").click(setViewMode);

            function saveInput() {
                const editError = todoNote.find(".edit_error")
                const validationText = noteInputField.val().trim();

                if (validationText.length === 0) {
                    editError.show();
                    noteInputField.addClass("invalid_input");
                    return;
                }

                text = validationText;

                setViewMode();
            }
        }

        function setViewMode() {
            todoNote.html(`<div class='note_block'>
                               <div class='todo_note'></div>
                               <div class='buttons_group'>
                                   <button class='list_button edit_button' type='button'>Edit</button>
                                   <button class='list_button delete_button' type='button'>Delete</button>
                               </div>
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
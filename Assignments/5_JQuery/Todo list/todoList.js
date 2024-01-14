$(function () {
    const todoList = $("#todo_list_content");
    const newNoteInputField = $("#new_note");
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
                <input class='edit_note' type='text'>
                <span class='buttons_group'>
                    <button class='list_button save_button' type='button'>save</button>
                    <button class='list_button cancel_button' type='button'>cancel</button>
                </span>
                </div>`);

            let selectedNoteInputField = todoNote.find(".edit_note");
            selectedNoteInputField.val(text);

            selectedNoteInputField.focus();

            todoNote.find(".save_button").click(function () {
                text = selectedNoteInputField.val().trim();

                if (text.length === 0) {
                    todoNote.remove()
                    return;
                }

                setViewMode();
            });

            todoNote.keydown(function (event) {
                const keyCode = (event.keyCode || event.which);

                if (keyCode === 13) {
                    text = selectedNoteInputField.val().trim();

                    if (text.length === 0) {
                        todoNote.remove()
                        return;
                    }

                    setViewMode();
                }
            });

            todoNote.find(".cancel_button").click(setViewMode);
        }

        function setViewMode() {
            todoNote.html(`<div class='note_block'>
                <span class='todo_note'></span>
                <span class='buttons_group'>
                    <button class='list_button edit_button' type='button'>edit</button>
                    <button class='list_button delete_button' type='button'>delete</button>
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
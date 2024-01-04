$(function () {
    const todoList = $("#todo_list_content");
    const newTodoNote = $("#new_note");
    const addNewNoteButton = $("#add_new_note_button");

    newTodoNote.focus(function () {
        newTodoNote.removeClass("invalid_input")
        $("span.error_message").hide();
    });

    function addNewNoteHandler() {
        let text = newTodoNote.val().trim();

        if (text.length === 0) {
            $("span.error_message").show();
            newTodoNote.addClass("invalid_input");
            return;
        }

        const todoNote = $("<li>");

        function setEditMode() {
            todoNote.html(`<div class='note_block'>
                <input class='edit_note' type='text'>
                <span class='button_group'>
                <button class='list_button note_button save_button' type='button'>save</button>
                <button class='list_button note_button cancel_button' type='button'>cancel</button>
                </span>
                </div>`);

            let selectedNote = todoNote.find(".edit_note");
            selectedNote.val(text);

            selectedNote.focus();


            todoNote.find(".save_button").click(function () {
                text = selectedNote.val().trim();

                if (text.length === 0) {
                    $("span.error_message").show();
                    selectedNote.addClass("invalid_input");
                    return;
                }

                setViewMode();
            });

            todoNote.keydown(function (event) {
                const keyCode = (event.keyCode ? event.keyCode : event.which);

                if (keyCode === 13) {
                    text = selectedNote.val().trim();

                    if (text.length === 0) {
                        $("span.error_message").show();
                        selectedNote.addClass("invalid_input");
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
                <span class='button_group'>
                <button class='list_button note_button edit_button' type='button'>edit</button>
                <button class='list_button note_button delete_button' type='button'>delete</button>
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
        newTodoNote.val("");
    }

    newTodoNote.keydown(function (event) {
        const keyCode = (event.keyCode ? event.keyCode : event.which);

        if (keyCode === 13) {
            addNewNoteHandler();
        }
    });

    addNewNoteButton.click(addNewNoteHandler);
});
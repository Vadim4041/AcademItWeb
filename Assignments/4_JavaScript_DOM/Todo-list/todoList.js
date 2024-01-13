document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo_list_content");
    const newNoteInputField = document.getElementById("new_note");
    const addNewNoteButton = document.getElementById("add_new_note_button");
    const errorMessage = document.querySelector("span.error_message");

    newNoteInputField.addEventListener("focus", function () {
        newNoteInputField.classList.remove("invalid_input");
        errorMessage.style.display = "none";
    });

    function addNewNote() {
        let text = newNoteInputField.value.trim();

        if (text.length === 0) {
            errorMessage.style.display = "inline";
            newNoteInputField.classList.add("invalid_input");
            setViewMode();
        }

        const todoNote = document.createElement("li");

        function setEditMode() {
            todoNote.innerHTML = `<div class='note_block'>
                <input class='edit_note' type='text'>
                <span class='buttons_group'>
                    <button class='list_button save_button' type='button'>save</button>
                    <button class='list_button cancel_button' type='button'>cancel</button>
                </span>
                </div>`;

            let selectedNoteInputField = todoNote.querySelector(".edit_note");
            selectedNoteInputField.value = text;

            selectedNoteInputField.focus();

            todoNote.querySelector(".save_button").addEventListener("click", function () {
                text = selectedNoteInputField.value.trim();

                if (text.length === 0) {
                    todoNote.remove()
                    return;
                }

                setViewMode();
            });

            selectedNoteInputField.addEventListener("keydown", function (e) {
                if (e.key === "Enter" && selectedNoteInputField === document.activeElement) {
                    text = selectedNoteInputField.value.trim();

                    if (text.length === 0) {
                        todoNote.remove()
                        return;
                    }

                    setViewMode();
                }
            });

            todoNote.querySelector(".cancel_button").addEventListener("click", setViewMode);
        }

        function setViewMode() {
            todoNote.innerHTML = `<div class='note_block'>
                <span class='todo_note'></span>
                <span class='buttons_group'>
                    <button class='list_button edit_button' type='button'>edit</button>
                    <button class='list_button delete_button' type='button'>delete</button>
                </span>
                </div>`;

            todoNote.querySelector(".todo_note").textContent = text;

            todoNote.querySelector(".delete_button").addEventListener("click", function () {
                todoNote.remove();
            });

            todoNote.querySelector(".todo_note").addEventListener("click", setEditMode);
            todoNote.querySelector(".edit_button").addEventListener("click", setEditMode);
        }

        setViewMode();
        todoList.appendChild(todoNote);
        newNoteInputField.value = "";
    }

    newNoteInputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && newNoteInputField === document.activeElement) {
            addNewNote();
        }
    });

    addNewNoteButton.addEventListener("click", addNewNote);

});
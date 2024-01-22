document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo_list_content");
    const newNoteInputField = document.getElementById("new_note_input");
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
                                      <input class='edit_note_input' type='text'>
                                      <span class='buttons_group'>
                                          <button class='list_button save_button' type='button'>Save</button>
                                          <button class='list_button cancel_button' type='button'>Cancel</button>
                                      </span>    
                                      <div><span class="error_message error_edit" style="display: none;">Error: Note cannot be empty</span></div>            
                                  </div>`;

            const selectedNoteInputField = todoNote.querySelector(".edit_note_input");
            selectedNoteInputField.value = text;

            selectedNoteInputField.focus();

            todoNote.querySelector(".save_button").addEventListener("click", function () {
                validateEditing();
            });

            selectedNoteInputField.addEventListener("keydown", function (e) {
                if (e.key === "Enter" && selectedNoteInputField === document.activeElement) {
                    validateEditing();
                }
            });

            todoNote.querySelector(".cancel_button").addEventListener("click", setViewMode);

            function validateEditing() {
                const editError = todoNote.querySelector(".error_edit")
                const validationText = selectedNoteInputField.value.trim();

                if (validationText.length === 0) {
                    editError.style.display = "block";
                    selectedNoteInputField.classList.add("invalid_input");
                    return;
                }

                text = validationText;

                setViewMode();
            }
        }

        function setViewMode() {
            todoNote.innerHTML = `<div class='note_block'>
                                      <span class='todo_note'></span>
                                      <span class='buttons_group'>
                                          <button class='list_button edit_button' type='button'>Edit</button>
                                          <button class='list_button delete_button' type='button'>Delete</button>
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
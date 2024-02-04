document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo_list_content");
    const newNoteInputField = document.getElementById("new_note_input");
    const addNewNoteButton = document.getElementById("add_new_note_button");
    const errorMessage = document.querySelector(".error_message");

    newNoteInputField.addEventListener("focus", function () {
        newNoteInputField.classList.remove("invalid_input");
        errorMessage.style.display = "none";
    });

    function addNewNote() {
        let text = newNoteInputField.value.trim();

        if (text.length === 0) {
            errorMessage.style.display = "block";
            newNoteInputField.classList.add("invalid_input");
            return;
        }

        const todoNote = document.createElement("li");

        function setEditMode() {
            todoNote.innerHTML = `<div class='note_block'>
                                      <input class='edit_note_input' type='text'>
                                      <div class='buttons_group'>
                                          <button class='list_button save_button' type='button'>Save</button>
                                          <button class='list_button cancel_button' type='button'>Cancel</button>
                                      </div>
                                         
                                                  
                                  </div>
                                  <div class="line-break"></div> 
                                  <div><span class="error_message edit_error" style="display: none;">Error: Note cannot be empty</span></div>`;

            const noteInputField = todoNote.querySelector(".edit_note_input");
            noteInputField.value = text;

            noteInputField.focus();

            todoNote.querySelector(".save_button").addEventListener("click", function () {
                saveInput();
            });

            noteInputField.addEventListener("keydown", function (e) {
                if (e.key === "Enter" && noteInputField === document.activeElement) {
                    saveInput();
                }
            });

            todoNote.querySelector(".cancel_button").addEventListener("click", setViewMode);

            function saveInput() {
                const editError = todoNote.querySelector(".edit_error");
                const editText = noteInputField.value.trim();

                if (editText.length === 0) {
                    editError.style.display = "block";
                    noteInputField.classList.add("invalid_input");
                    return;
                }

                text = editText;

                setViewMode();
            }
        }

        function setViewMode() {
            todoNote.innerHTML = `<div class='note_block'>
                                      <div class='todo_note'></div>
                                      <div class='buttons_group'>
                                          <button class='list_button edit_button' type='button'>Edit</button>
                                          <button class='list_button delete_button' type='button'>Delete</button>
                                      </div>                
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
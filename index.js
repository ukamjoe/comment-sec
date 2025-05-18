document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send");
    const mainTextArea = document.getElementById("commenting");
    const commentSection = document.querySelector(".comment");

    // Initialize all interactive elements
    initializeVoteButtons();
    initializeReplyButtons();
    initializeEditDeleteButtons();

    // Handle main comment submission
    sendButton.addEventListener("click", () => {
        const commentText = mainTextArea.value.trim();
        if (!commentText) {
            alert("Please write something before sending.");
            return;
        }

        const newComment = createCommentElement(commentText);
        commentSection.appendChild(newComment);
        mainTextArea.value = "";
    });

    function createCommentElement(text, isReply = false) {
        const div = document.createElement("div");
        div.className = isReply ? "subsident" : "susident";

        div.innerHTML = `
            <div class="amy">
                <div class="crease">
                    <button class="increase"><ion-icon name="add"></ion-icon></button>
                    <div class="number"><em>0</em></div>
                    <button class="decrease"><ion-icon name="remove"></ion-icon></button>
                </div>
                <div class="cotent">
                    <img src="images/avatars/image-juliusomo.png" alt="Your avatar">
                    <h4>juliusomo</h4>
                    <p>Just now</p>
                    <div class="buttons">
                        <button class="delete"><ion-icon name="trash-outline"></ion-icon><span>Delete</span></button>
                        <button class="edit"><ion-icon name="pencil-outline"></ion-icon><span>Edit</span></button>
                        <button class="reply"><ion-icon name="arrow-undo"></ion-icon><span>Reply</span></button>
                    </div>
                </div>
                <p class="comet">${text}</p>
            </div>
            <div class="responce" style="display: none;">
                <textarea rows="4" cols="50" placeholder="Add a reply..."></textarea>
                <button class="reps">Reply</button>
            </div>
        `;

        initializeVoteButtons(div);
        initializeReplyButtons(div);
        initializeEditDeleteButtons(div);

        return div;
    }

    function initializeVoteButtons(container = document) {
        container.querySelectorAll(".increase, .decrease").forEach(button => {
            button.addEventListener("click", () => {
                const numberElement = button.closest(".crease").querySelector(".number em");
                let count = parseInt(numberElement.textContent);

                if (button.classList.contains("increase")) {
                    count++;
                } else if (count > 0) {
                    count--;
                }

                numberElement.textContent = count;
            });
        });
    }

    function initializeReplyButtons(container = document) {
        container.querySelectorAll(".reply, .replys").forEach(button => {
            button.addEventListener("click", () => {
                const responseDiv = button.closest(".susident, .subsident, .bondary").querySelector(".responce, #response");
                responseDiv.style.display = responseDiv.style.display === "none" ? "block" : "none";
            });
        });

        container.querySelectorAll(".reps, .rep").forEach(button => {
            button.addEventListener("click", () => {
                const replyText = button.previousElementSibling.value.trim();
                if (!replyText) {
                    alert("Please write something before replying.");
                    return;
                }

                const newReply = createCommentElement(replyText, true);
                button.closest(".susident, .subsident, .bondary").after(newReply);
                button.previousElementSibling.value = "";
                button.closest(".responce, #response").style.display = "none";
            });
        });
    }

    function initializeEditDeleteButtons(container = document) {
        container.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this comment?")) {
                    button.closest(".susident, .subsident, .bondary").remove();
                }
            });
        });

        container.querySelectorAll(".edit").forEach(button => {
            button.addEventListener("click", () => {
                const commentElement = button.closest(".amy, .ami").querySelector(".comet, .comets");
                const currentText = commentElement.textContent.trim();

                const textarea = document.createElement("textarea");
                textarea.value = currentText;
                textarea.rows = 4;
                textarea.style.width = "100%";
                textarea.style.marginTop = "1rem";

                const updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.className = "reps";
                updateButton.style.marginTop = "1rem";

                commentElement.replaceWith(textarea);
                textarea.after(updateButton);

                updateButton.addEventListener("click", () => {
                    const newText = textarea.value.trim();
                    if (newText) {
                        const newComment = document.createElement("p");
                        newComment.className = "comet";
                        newComment.textContent = newText;
                        textarea.replaceWith(newComment);
                        updateButton.remove();
                    }
                });
            });
        });
    }
});
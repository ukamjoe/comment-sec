document.addEventListener("DOMContentLoaded", () => {
    const increaseButtons = document.querySelectorAll(".increase");
    const decreaseButtons = document.querySelectorAll(".decrease");
    const replyButtons = document.querySelectorAll(".reply, .replys");
    const sendButton = document.querySelector("#send");
    const textArea = document.querySelector("textarea");

    // Utility function to update vote count
    function updateCount(button, operation) {
        try {
            const numberElement = button.closest(".crease, .creases").querySelector(".number em");
            let currentValue = parseInt(numberElement.textContent);
            if (operation === "increase") {
                numberElement.textContent = currentValue + 1;
            } else if (operation === "decrease" && currentValue > 0) {
                numberElement.textContent = currentValue - 1;
            }
        } catch (error) {
            console.error("Error updating count:", error);
        }
    }

    // Handle vote increase and decrease
    increaseButtons.forEach(button => {
        button.addEventListener("click", () => updateCount(button, "increase"));
    });

    decreaseButtons.forEach(button => {
        button.addEventListener("click", () => updateCount(button, "decrease"));
    });

    // Initially hide all divs with class "responce" and id "response"
    const responseDivs = document.querySelectorAll(".responce, #response");
    responseDivs.forEach(field => {
        field.style.display = "none"; // Hide both on page load
    });

    // Handle reply button clicks (toggle for class "responce" and id "response")
    replyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentContainer = button.closest(".susident, .subsident, .bondary, .sub-comment");
            if (parentContainer) {
                const responseDiv = parentContainer.querySelector(".responce, #response");
                if (responseDiv) {
                    responseDiv.style.display = responseDiv.style.display === "none" ? "block" : "none"; // Toggle visibility
                }
            }
        });
    });

    // Handle sending new comments
    sendButton.addEventListener("click", () => {
        const commentText = textArea.value.trim();
        if (commentText !== "") {
            const commentsContainer = document.querySelector(".main-container .comment");
            const newComment = document.createElement("div");
            newComment.classList.add("susident");
            newComment.innerHTML = `
                <div class="amy">
                    <div class="crease">
                        <button class="increase"><ion-icon name="add"></ion-icon></button>
                        <div class="number"><em>0</em></div>
                        <button class="decrease"><ion-icon name="remove"></ion-icon></button>
                    </div>
                    <div class="cotent">
                        <img src="images/avatars/image-juliusomo.png" alt="">
                        <h4>juliusomo</h4>
                        <p>Just now</p>
                        <button class="reply">
                            <ion-icon name="arrow-undo"></ion-icon>
                            <p>Reply</p>
                        </button>
                    </div>
                    <p class="comet">${commentText}</p>
                </div>
            `;
            commentsContainer.appendChild(newComment);
            textArea.value = "";
            textArea.placeholder = "Start typing...";
        } else {
            alert("Please enter a comment before sending.");
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary elements
    const sendButton = document.getElementById('send');
    const mainTextArea = document.querySelector('.new-comment textarea');
    const commentSection = document.querySelector('.comment');
    
    // Initialize vote buttons
    initializeVoteButtons();
    // Initialize reply buttons
    initializeReplyButtons();
    // Initialize edit and delete buttons
    initializeEditDeleteButtons();

    // Handle main comment submission
    sendButton.addEventListener('click', () => {
        const commentText = mainTextArea.value.trim();
        if (!commentText) {
            alert('Please write something before sending.');
            return;
        }

        const newComment = createCommentElement(commentText);
        commentSection.appendChild(newComment);
        mainTextArea.value = '';
    });

    // Function to create a new comment element
    function createCommentElement(text, isReply = false) {
        const div = document.createElement('div');
        div.className = isReply ? 'subsident' : 'susident';
        
        div.innerHTML = `
            <div class="amy">
                <div class="crease">
                    <button class="increase" aria-label="Increase vote count">
                        <ion-icon name="add"></ion-icon>
                    </button>
                    <div class="number"><em>0</em></div>
                    <button class="decrease" aria-label="Decrease vote count">
                        <ion-icon name="remove"></ion-icon>
                    </button>
                </div>
                <div class="cotent">
                    <img src="images/avatars/image-juliusomo.png" alt="Your avatar">
                    <h4>juliusomo</h4>
                    <p>Just now</p>
                    <div class="buttons">
                        <button class="delete">
                            <ion-icon name="trash-outline"></ion-icon>
                            <span>Delete</span>
                        </button>
                        <button class="edit">
                            <ion-icon name="pencil-outline"></ion-icon>
                            <span>Edit</span>
                        </button>
                    </div>
                </div>
                <p class="comet">${text}</p>
            </div>
            <div class="responce" style="display: none;">
                <img src="images/avatars/image-juliusomo.png" alt="Your avatar">
                <textarea rows="4" cols="50" placeholder="Add a reply..."></textarea>
                <button class="reps">Reply</button>
            </div>
        `;

        // Initialize the new comment's functionality
        initializeVoteButtons(div);
        initializeReplyButtons(div);
        initializeEditDeleteButtons(div);

        return div;
    }

    // Function to initialize vote buttons
    function initializeVoteButtons(container = document) {
        const voteButtons = container.querySelectorAll('.increase, .decrease');
        voteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const numberElement = button.closest('.crease').querySelector('.number em');
                let count = parseInt(numberElement.textContent);
                
                if (button.classList.contains('increase')) {
                    count++;
                } else if (count > 0) {
                    count--;
                }
                
                numberElement.textContent = count;
            });
        });
    }

    // Function to initialize reply buttons
    function initializeReplyButtons(container = document) {
        const replyButtons = container.querySelectorAll('.reply, .reps');
        replyButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('reply')) {
                    // Toggle reply form
                    const responseDiv = button.closest('.susident, .subsident').querySelector('.responce');
                    responseDiv.style.display = responseDiv.style.display === 'none' ? 'flex' : 'none';
                } else {
                    // Handle reply submission
                    const replyText = button.previousElementSibling.value.trim();
                    if (!replyText) {
                        alert('Please write something before replying.');
                        return;
                    }

                    const newReply = createCommentElement(replyText, true);
                    button.closest('.susident, .subsident').after(newReply);
                    button.previousElementSibling.value = '';
                    button.closest('.responce').style.display = 'none';
                }
            });
        });
    }

    // Function to initialize edit and delete buttons
    function initializeEditDeleteButtons(container = document) {
        // Delete functionality
        container.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this comment?')) {
                    button.closest('.susident, .subsident').remove();
                }
            });
        });

        // Edit functionality
        container.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', () => {
                const commentElement = button.closest('.amy').querySelector('.comet');
                const currentText = commentElement.textContent.trim();
                
                // Create and show edit textarea
                const textarea = document.createElement('textarea');
                textarea.value = currentText;
                textarea.rows = 4;
                textarea.style.width = '100%';
                textarea.style.marginTop = '1rem';
                
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.className = 'reps';
                updateButton.style.marginTop = '1rem';
                
                commentElement.replaceWith(textarea);
                textarea.after(updateButton);
                
                updateButton.addEventListener('click', () => {
                    const newText = textarea.value.trim();
                    if (newText) {
                        const newComment = document.createElement('p');
                        newComment.className = 'comet';
                        newComment.textContent = newText;
                        textarea.replaceWith(newComment);
                        updateButton.remove();
                    }
                });
            });
        });
    }
});
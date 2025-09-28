document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const inputScreen = document.getElementById('input-screen');
    const mainInterface = document.getElementById('main-interface');
    const revealScreen = document.getElementById('reveal-screen');
    const initiateBtn = document.getElementById('initiate-btn');
    const usernameInput = document.getElementById('username-input');
    const logList = document.getElementById('log-list');
    const targetUsernameDisplay = document.getElementById('target-username-display');
    const prankedByEl = document.getElementById('pranked-by');

    // --- Main Logic ---
    initiateBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username === '') {
            alert('Please enter a target username!');
            return;
        }

        // Switch screens
        inputScreen.classList.add('hidden');
        mainInterface.classList.remove('hidden');
        targetUsernameDisplay.textContent = username;

        // Start the hacking sequence
        runSequence(username);
    });

    // --- Hacking Sequence Definition ---
    const sequence = [
        { text: 'Initializing connection to Meta servers...', delay: 1500 },
        { text: 'Connection established. <span class="success">[SUCCESS]</span>', delay: 1000 },
        { text: 'Bypassing login authentication for target: [USERNAME]...', delay: 1000 },
        { action: 'addProgressBar', duration: 3000, delay: 3000 },
        { text: 'Authentication bypassed. Accessing private data...', delay: 1000 },
        { text: 'Fetching Direct Messages (DMs)...', delay: 2000 },
        { text: '   > User_123: "Hey, are you free?"', delay: 500 },
        { text: '   > Bestie_01: "LOL 😂"', delay: 500 },
        { text: '   > FoodPanda: "Your order is on its way!"', delay: 500 },
        { text: 'Fetching recent followers...', delay: 2000 },
        { text: '   > Found 1,245 followers.', delay: 1000 },
        { text: 'Cracking account password hash...', delay: 1000 },
        { text: '   > HASH: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', delay: 2000},
        { text: 'Password Decrypted: <span class="error">************</span>', delay: 1000 },
        { text: '<span class="success">ACCOUNT BREACH SUCCESSFUL. FULL ACCESS GRANTED.</span>', delay: 3000, action: 'revealPrank' }
    ];

    async function runSequence(username) {
        for (const item of sequence) {
            // Replace placeholder with actual username
            const processedText = item.text ? item.text.replace('[USERNAME]', username) : null;

            if (processedText) {
                await typeLog(processedText);
            }

            if (item.action === 'addProgressBar') {
                await addProgressBar(item.duration);
            }
            
            if (item.action === 'revealPrank') {
                revealPrank();
            }

            await new Promise(resolve => setTimeout(resolve, item.delay));
        }
    }
    
    // --- Helper Functions ---
    function typeLog(text) {
        return new Promise(resolve => {
            const li = document.createElement('li');
            logList.appendChild(li);
            li.innerHTML = text; // For instant display with colors
            logList.scrollTop = logList.scrollHeight; // Auto-scroll
            resolve();
        });
    }

    function addProgressBar(duration) {
        return new Promise(resolve => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
            `;
            logList.appendChild(li);
            logList.scrollTop = logList.scrollHeight;

            const progressBar = li.querySelector('.progress-bar');
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100); // Small delay to ensure CSS transition works

            setTimeout(resolve, duration);
        });
    }
    
    function revealPrank() {
        setTimeout(() => {
            mainInterface.classList.add('hidden');
            revealScreen.classList.remove('hidden');

            const urlParams = new URLSearchParams(window.location.search);
            const prankster = urlParams.get('by');
            if(prankster){
                prankedByEl.textContent = `Yeh prank aap par ${prankster} ne kiya hai.`;
            }
        }, 1000); // 1-second delay before revealing
    }
});

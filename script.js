document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const bootScreen = document.getElementById('boot-screen');
    const mainInterface = document.getElementById('main-interface');
    const revealScreen = document.getElementById('reveal-screen');
    const logList = document.getElementById('log-list');
    const videoElement = document.getElementById('video-element');
    const cameraError = document.getElementById('camera-error');
    const phoneModel = document.getElementById('phone-3d-model');
    const sonicPulseBtn = document.getElementById('sonic-pulse-btn');
    const prankedByEl = document.getElementById('pranked-by');

    // --- Prank Sequence ---
    const sequence = [
        { text: '> Establishing connection with ARGUS satellite network...', delay: 2000 },
        { text: '> Triangulating target\'s IP address...', delay: 1500, action: 'getIP' },
        { text: '> IP Found: [IP_ADDRESS]', delay: 1000 },
        { text: '> Analyzing geo-data...', delay: 2000 },
        { text: '> Target Location: [LOCATION]', delay: 1000 },
        { text: '> TARGET LOCATION PINPOINTED.', delay: 1500 },
        { text: '> Nearby device detected. Attempting to exploit hardware vulnerabilities...', delay: 2500 },
        { text: '> Activating onboard camera and sensors...', delay: 2000, action: 'startSurveillance' },
        { text: '> HARDWARE ACCESS GRANTED.', delay: 1000, action: 'updateSensors' },
        { text: '> Subject identity confirmed. All data captured.', delay: 15000, action: 'stopSurveillance' },
        { text: '> INITIATING SELF-DESTRUCT SEQUENCE IN 10...', delay: 1000 },
        { text: '> 9... 8... 7...', delay: 3000 },
        { text: '> 6... 5... 4...', delay: 3000 },
        { text: '> 3... 2... 1...', delay: 3000 },
        { text: '> MISSION ABORTED.', delay: 1000, action: 'revealPrank' }
    ];

    let surveillanceInterval;

    // --- Main Logic ---
    function typeLog(text, callback) {
        let i = 0;
        const li = document.createElement('li');
        logList.appendChild(li);
        
        function type() {
            if (i < text.length) {
                li.innerHTML += text.charAt(i);
                i++;
                logList.scrollTop = logList.scrollHeight;
                setTimeout(type, 25);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    async function runSequence(index = 0) {
        if (index >= sequence.length) return;

        const item = sequence[index];
        let logText = item.text;

        if (item.action === 'getIP') {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                logText = logText.replace('[IP_ADDRESS]', data.ip);
                sequence[index + 2].text = sequence[index + 2].text.replace('[LOCATION]', `${data.city}, ${data.country_name}`);
            } catch (e) {
                logText = logText.replace('[IP_ADDRESS]', '127.0.0.1');
                sequence[index + 2].text = sequence[index + 2].text.replace('[LOCATION]', 'UNKNOWN');
            }
        }

        typeLog(logText, () => {
            if (item.action === 'startSurveillance') startSurveillance();
            if (item.action === 'updateSensors') surveillanceInterval = setInterval(updateSensorReadings, 200);
            if (item.action === 'stopSurveillance') stopSurveillance();
            if (item.action === 'revealPrank') revealPrank();

            setTimeout(() => runSequence(index + 1), item.delay);
        });
    }

    // --- Hardware Functions ---
    async function startSurveillance() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        } catch (err) {
            cameraError.classList.remove('hidden');
        }
        
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }

    function stopSurveillance() {
        if (videoElement.srcObject) {
            videoElement.srcObject.getTracks().forEach(track => track.stop());
        }
        window.removeEventListener('deviceorientation', handleOrientation);
        clearInterval(surveillanceInterval);
    }
    
    function handleOrientation(event) {
        const { alpha, beta, gamma } = event; // alpha: z, beta: x, gamma: y
        phoneModel.style.transform = `rotateZ(${alpha.toFixed(0)}deg) rotateX(${beta.toFixed(0)}deg) rotateY(${gamma.toFixed(0)}deg)`;
        document.getElementById('heading').textContent = `${Math.floor(alpha)}°`;
    }
    
    function updateSensorReadings() {
        document.getElementById('altitude').textContent = `${(Math.random() * 5 + 20).toFixed(0)} m`;
        document.getElementById('temp').textContent = `${(Math.random() * 3 + 30).toFixed(1)} °C`;
        const emotions = ['CONFUSED', 'SCARED', 'ANXIOUS', 'NEUTRAL'];
        if (Math.random() > 0.95) {
             document.getElementById('emotion').textContent = emotions[Math.floor(Math.random() * emotions.length)];
        }
    }

    function revealPrank() {
        mainInterface.classList.add('hidden');
        revealScreen.classList.remove('hidden');
        
        const urlParams = new URLSearchParams(window.location.search);
        const prankster = urlParams.get('by');
        if(prankster){
            prankedByEl.textContent = `Yeh prank aap par ${prankster} ne kiya hai.`;
        }
    }

    // --- Event Listeners ---
    sonicPulseBtn.addEventListener('click', () => {
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]); // Vibrate for 200ms, pause 100ms, vibrate 200ms
        }
    });

    // --- Start the App ---
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        mainInterface.classList.remove('hidden');
        runSequence();
    }, 4000); // Boot screen duration
});

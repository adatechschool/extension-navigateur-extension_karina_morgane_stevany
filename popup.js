
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();

    // Mettre à jour le compteur toutes les secondes
    setInterval(updateCounter, 1000);
});

function updateCounter() {
    chrome.storage.local.get(['totalTime', 'activityStartTime'], (result) => {
        const totalTime = result.totalTime || 0;
        const activityStartTime = result.activityStartTime;

        if (activityStartTime) {
            const stopTime = 10;
            const currentTime = new Date().getTime();
            const elapsedSeconds = (currentTime - activityStartTime) / 1000;
            const totalSeconds = totalTime + elapsedSeconds;
            console.log("total : ",totalSeconds)
            if (totalSeconds > stopTime) {
                console.log("stop");
                window.open('alert/alert.html')
                // -> inject class dans le DOM
            } else {
                const counterElement = document.getElementById('counter');
                counterElement.textContent = formatTime(totalSeconds);
            }
        }
    });
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes} minutes et ${seconds} secondes`;
}



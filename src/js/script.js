document.addEventListener("DOMContentLoaded", function () {
    
    function flipClock() {

        // Get the current time
        const now = new Date();
        let hours = now.getHours();
        let mins = now.getMinutes();
        let secs = now.getSeconds();
        let amPm = hours >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        hours = hours % 12 || 12;

        const timeValues = {
            hourTens: Math.floor(hours / 10),
            hourOnes: hours % 10,
            minuteTens: Math.floor(mins / 10),
            minuteOnes: mins % 10,
            secondTens: Math.floor(secs / 10),
            secondOnes: secs % 10
        };

        // Update digits with flip animation
        function updateDigit(elementId, newValue) {
            const element = document.getElementById(elementId);
            if (element.textContent !== newValue.toString()) {
                gsap.to(element, {
                    rotationX: -90,
                    duration: 0.3,
                    ease: "power1.in",
                    onComplete: () => {
                        element.textContent = newValue;
                        gsap.to(element, { rotationX: 0, duration: 0.3, ease: "power1.out" });
                    }
                });
            }
        }

        // Updating clock
        for (const [id, value] of Object.entries(timeValues)) {
            updateDigit(id, value);
        }

        document.querySelector(".am-pm").textContent = amPm;
    }

    function flipDate() {

        // Get the current date
        const now = new Date();
        const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
        const formattedDate = now.toLocaleDateString("en-US", options); 
        
        // Update date
        document.querySelector(".date-display").textContent = formattedDate;
    }

    flipClock();
    flipDate();
    setInterval(flipClock, 1000);
})
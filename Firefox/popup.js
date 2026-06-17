document.addEventListener("DOMContentLoaded", () => {

    const countElement = document.getElementById("count");
    const trackersElement = document.getElementById("trackers");
    const domainsElement = document.getElementById("domains");
    const resetButton = document.getElementById("resetButton");


    function createLeaderboard(data) {

        const entries = Object.entries(data);

        if (entries.length === 0) {
            return "No data yet";
        }


        entries.sort((a, b) => b[1] - a[1]);


        const medals = [
            "🥇",
            "🥈",
            "🥉"
        ];


        return entries
            .slice(0, 3)
            .map((entry, index) => {

                const [name, count] = entry;


                return `
                    <div class="item">
                        <span>${medals[index] || "🏅"} ${name}</span>
                        <span>${count}</span>
                    </div>
                `;

            })
            .join("");

    }


    function loadStatistics() {


        chrome.storage.local.get(
            ["stats"],
            (result) => {


                const stats = result.stats || {
                    removedCount: 0,
                    trackers: {},
                    domains: {}
                };


                countElement.textContent =
                    stats.removedCount;


                trackersElement.innerHTML =
                    createLeaderboard(stats.trackers);


                domainsElement.innerHTML =
                    createLeaderboard(stats.domains);


            }
        );

    }


    resetButton.addEventListener("click", () => {


        chrome.runtime.sendMessage({
            type: "RESET_COUNTER"
        });


        countElement.textContent = 0;


        trackersElement.innerHTML =
            "No data yet";


        domainsElement.innerHTML =
            "No data yet";


        console.log(
            "🏆 Hall of Fame wiped clean"
        );

    });


    loadStatistics();


});
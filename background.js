function updateBadge(count) {

    chrome.action.setBadgeText({
        text: count > 0 ? count.toString() : ""
    });


    chrome.action.setBadgeBackgroundColor({
        color: "#22c55e"
    });

}



// Creates our empty trophy room
function createDefaultStats() {

    return {
        removedCount: 0,
        trackers: {},
        domains: {}
    };

}



// Convert subdomains into a single kingdom 😈
function normalizeDomain(domain) {

    const parts = domain.split(".");


    // Simple normalization:
    // www.google.com -> google.com
    // labs.google.com -> google.com
    // myactivity.google.com -> google.com
    if (parts.length >= 2) {

        return parts.slice(-2).join(".");

    }


    return domain;

}



// Add a victory to the archives
function addStatistics(message) {


    chrome.storage.local.get(
        ["stats"],
        (result) => {


            const stats =
                result.stats || createDefaultStats();


            // Total kills
            stats.removedCount += message.amount;



            // Tracker leaderboard
            for (const tracker of message.trackers) {


                if (!stats.trackers[tracker]) {

                    stats.trackers[tracker] = 0;

                }


                stats.trackers[tracker]++;

            }



            // Domain leaderboard
            const domain =
                normalizeDomain(message.domain);


            if (!stats.domains[domain]) {

                stats.domains[domain] = 0;

            }


            stats.domains[domain] += message.amount;



            // Save the trophy room
            chrome.storage.local.set(
                {
                    stats: stats
                },
                () => {


                    updateBadge(
                        stats.removedCount
                    );


                }
            );

        }
    );

}



// Wipe the battlefield clean
function resetStatistics() {


    const emptyStats =
        createDefaultStats();


    chrome.storage.local.set(
        {
            stats: emptyStats
        },
        () => {


            updateBadge(0);


        }
    );

}



// Restore badge when extension starts
function restoreBadge() {


    chrome.storage.local.get(
        ["stats"],
        (result) => {


            const stats =
                result.stats || createDefaultStats();


            updateBadge(
                stats.removedCount
            );

        }
    );

}



// Extension installed/updated
chrome.runtime.onInstalled.addListener(
    restoreBadge
);


// Browser starts again
chrome.runtime.onStartup.addListener(
    restoreBadge
);



// Listen for our warriors returning from battle
chrome.runtime.onMessage.addListener(
    (message) => {


        if (
            message.type ===
            "TRACKERS_REMOVED"
        ) {


            addStatistics(message);

        }



        if (
            message.type ===
            "RESET_COUNTER"
        ) {


            resetStatistics();

        }

    }
);
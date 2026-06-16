(() => {

const rules = {

    universal: [
        "fbclid",
        "gclid",
        "msclkid"
    ],

    universalStartsWith: [
        "utm_"
    ],

    domains: {

        "google.com": [
            "source",
            "sxsrf",
            "sca_esv",
            "ei",
            "iflsig",
            "ved",
            "gs_lp",
            "gs_psrp",
            "sclient",
            "oq",
            "fbs",
            "sa"
        ],

        "youtube.com": [
            "si"
        ]
    }

};



// Decide if a parameter must be destroyed 😈
function shouldRemove(hostname, parameter) {

    if (rules.universal.includes(parameter)) {
        return true;
    }


    for (const prefix of rules.universalStartsWith) {

        if (parameter.startsWith(prefix)) {
            return true;
        }

    }


    for (const domain in rules.domains) {

        if (
            hostname.includes(domain) &&
            rules.domains[domain].includes(parameter)
        ) {

            return true;

        }

    }


    return false;

}



// ⚔️ The Universal Sword
function cleanAnyURL(input) {

    try {

        const url =
            input instanceof URL
            ? new URL(input.toString())
            : new URL(input, window.location.href);


        const removedTrackers = [];


        for (const key of [...url.searchParams.keys()]) {

            if (shouldRemove(url.hostname, key)) {

                url.searchParams.delete(key);

                removedTrackers.push(key);

            }

        }


        return {

            cleanedURL: url.toString(),

            removedTrackers,

            hostname: url.hostname

        };


    }
    catch (error) {

        return null;

    }

}



// 🏆 Report our victories
function reportRemoval(result) {

    if (
        result &&
        result.removedTrackers.length > 0
    ) {


        chrome.runtime.sendMessage({

            type: "TRACKERS_REMOVED",

            amount: result.removedTrackers.length,

            trackers: result.removedTrackers,

            domain: result.hostname

        });

    }

}



// 🔗 Clean a link
function cleanLink(link) {

    if (
        link.dataset.cleanLinks === "done"
    ) {

        return;

    }


    const result =
        cleanAnyURL(link.href);


    if (result) {


        if (
            result.removedTrackers.length > 0
        ) {


            link.href =
                result.cleanedURL;


            reportRemoval(result);


            console.log(
                "🔗 Pre-cleaned:",
                result.removedTrackers
            );

        }


        // Mark as inspected
        link.dataset.cleanLinks = "done";

    }

}



// 🐉 NEW FINAL SHIELD
// Intercept clicks before websites do
function interceptClicks() {

    document.addEventListener(
        "click",
        (event) => {


            const link =
                event.target.closest("a[href]");


            if (!link) {

                return;

            }


            const result =
                cleanAnyURL(link.href);


            if (
                result &&
                result.removedTrackers.length > 0
            ) {


                link.href =
                    result.cleanedURL;


                reportRemoval(result);


                console.log(
                    "🛡️ Captured click:",
                    result.removedTrackers
                );

            }

        },

        true // Capture phase 😈
    );

}

// 🔍 Initial scan of the page
function cleanExistingLinks() {

    document
        .querySelectorAll("a[href]")
        .forEach(cleanLink);

}



// 👁 Watch only newly created links
function watchForNewLinks() {


    const observer = new MutationObserver(
        mutations => {


            for (const mutation of mutations) {


                for (const node of mutation.addedNodes) {


                    // Ignore text nodes and comments
                    if (node.nodeType !== 1) {

                        continue;

                    }


                    // If the node itself is a link
                    if (
                        node.matches &&
                        node.matches("a[href]")
                    ) {


                        cleanLink(node);

                    }


                    // Or if it contains links
                    if (node.querySelectorAll) {


                        node
                            .querySelectorAll("a[href]")
                            .forEach(cleanLink);

                    }

                }

            }

        }
    );


    observer.observe(
        document.documentElement,
        {

            childList: true,

            subtree: true

        }
    );

}



// 🐉 Slay Single Page App dragons
function interceptHistoryNavigation() {


    const originalPushState =
        history.pushState;


    history.pushState = function(
        state,
        title,
        url
    ) {


        const result =
            cleanAnyURL(url);


        if (result) {


            if (
                result.removedTrackers.length > 0
            ) {


                reportRemoval(result);


                console.log(
                    "🐉 Slayed pushState:",
                    result.removedTrackers
                );

            }


            url =
                result.cleanedURL;

        }


        return originalPushState.call(
            this,
            state,
            title,
            url
        );

    };



    const originalReplaceState =
        history.replaceState;


    history.replaceState = function(
        state,
        title,
        url
    ) {


        const result =
            cleanAnyURL(url);


        if (result) {


            if (
                result.removedTrackers.length > 0
            ) {


                reportRemoval(result);


                console.log(
                    "🐉 Slayed replaceState:",
                    result.removedTrackers
                );

            }


            url =
                result.cleanedURL;

        }


        return originalReplaceState.call(
            this,
            state,
            title,
            url
        );

    };

}



// 🧹 Final emergency cleanup
function cleanCurrentPage() {


    const result =
        cleanAnyURL(
            window.location.href
        );


    if (
        result &&
        result.removedTrackers.length > 0
    ) {


        history.replaceState(
            null,
            "",
            result.cleanedURL
        );


        reportRemoval(result);


        console.log(
            "🧹 Current page cleaned:",
            result.removedTrackers
        );

    }

}



// ⚔️ ACTIVATE THE GUARDIAN ⚔️

// First, stand at the gate
interceptClicks();


// Then prepare the dragon slayer
interceptHistoryNavigation();


// Clean the battlefield
cleanCurrentPage();


// Inspect all existing paths
cleanExistingLinks();


// Keep watching for new enemies
watchForNewLinks();



// 🔒 The sacred seal of the ancient scroll
})();
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
            "sourceid",
            "sxsrf",
            "sca_esv",
            "ei",
            "iflsig",
            "ved",
            "gs_lp",
            "gs_psrp",
            "gs_lcrp",
            "sclient",
            "oq",
            "fbs",
            "sa",

            // Google AI Mode
            "mtid",
            "ntc",
            "aep",
            "mstk",
            "csuir",
            "oi",
            "noiga",
            "ct",
            "stick"
        ],

        "youtube.com": [
            "si"
        ],

        "yahoo.com": [
            "fr",
            "fr2",
            "mkr",
            "fp"
        ],

        "amazon.in": [
            "ref",
            "ref_"
        ],

        "flipkart.com": [
            "pid",
            "lid",
            "marketplace"
        ]
    }

};



// 🧬 Decide what survives
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



// ⚔️ The Universal Dragon Slayer Sword
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


    } catch (error) {

        return null;

    }

}



// 🏆 Send victories to the Hall of Fame
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



// 🔗 Clean links before travel
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


        link.dataset.cleanLinks = "done";

    }

}



// 🛡️ Final Guardian: Hear clicks before websites
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

        true

    );

}

// 👁 Scout the existing battlefield
function cleanExistingLinks() {

    document
        .querySelectorAll("a[href]")
        .forEach(cleanLink);

}



// 🕷 Watch for newly spawned links
function watchForNewLinks() {


    const observer = new MutationObserver(
        mutations => {


            for (const mutation of mutations) {


                for (const node of mutation.addedNodes) {


                    if (node.nodeType !== 1) {

                        continue;

                    }


                    // The node itself is a link
                    if (
                        node.matches &&
                        node.matches("a[href]")
                    ) {


                        cleanLink(node);

                    }


                    // The node contains links
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



// 🐉 Slay Single Page Application dragons
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



// 🧹 Emergency purification ritual
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


// First line of defense:
interceptClicks();


// Second line:
interceptHistoryNavigation();


// Clean the current battlefield:
cleanCurrentPage();


// Inspect all existing paths:
cleanExistingLinks();


// Keep watch forever:
watchForNewLinks();



// 🔒 The ancient seal.
// Remove this and chaos will return.
})();
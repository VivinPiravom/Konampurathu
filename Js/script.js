function allDetails() {
    return [...document.querySelectorAll("details")];
}

function expandAll() {
    allDetails().forEach(d => d.open = true);
}

function collapseAll() {
    allDetails().forEach(d => d.open = false);
}

function loadPage(page, menuItem) {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
    });

    if (menuItem) {
        menuItem.classList.add("active");
    }

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error("Page not found");
            }

            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;

            document.querySelectorAll("#content .slide-in").forEach(item => {observer.observe(item);});

            getpeopleCount(document.getElementById("content"));
        })
        .catch(error => {
            console.error(error);
            document.getElementById("content").innerHTML =
                "<p>Unable to load this page.</p>";
        });
}

function getpeopleCount(container=document) 
{
    const maleCount = container.querySelectorAll(".male").length;
    const femaleCount = container.querySelectorAll(".female").length;

    const maleDisplay = document.getElementById("maleCount");
    const femaleDisplay = document.getElementById("femaleCount");

    if (maleDisplay) {
        maleDisplay.textContent = maleCount;
    }

    if (femaleDisplay) {
        femaleDisplay.textContent = femaleCount;
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    // Initial page
    getpeopleCount(document);

    const firstMenuItem = document.querySelector(".menu-item");

    if (firstMenuItem) {
        loadPage("home.html", firstMenuItem);
    }

    // Observe elements already present on the page
    document.querySelectorAll(".slide-in").forEach(item => {
        observer.observe(item);
    });

    // Search
    const search = document.getElementById("search");

    if (search) {
        search.addEventListener("input", () => {
            const q = search.value.trim().toLocaleLowerCase();
            const details = allDetails();

            // Empty search
            if (!q) {
                details.forEach(d => d.classList.remove("hidden"));

                document.querySelectorAll(".person").forEach(p => {
                    p.classList.remove("hidden");
                });

                return;
            }

            // Hide everything initially
            details.forEach(d => d.classList.add("hidden"));

            document.querySelectorAll(".person").forEach(person => {
                const text = person.innerText.toLocaleLowerCase();

                if (text.includes(q)) {
                    person.classList.remove("hidden");

                    let parent = person.closest("details");

                    while (parent) {
                        parent.classList.remove("hidden");
                        parent.open = true;

                        parent = parent.parentElement?.closest("details");
                    }
                } else {
                    person.classList.add("hidden");
                }
            });

            // Search summaries
            document.querySelectorAll("summary").forEach(summary => {
                if (summary.innerText.toLocaleLowerCase().includes(q)) {
                    const detailsElement = summary.parentElement;

                    detailsElement.classList.remove("hidden");
                    detailsElement.open = true;

                    let parent =
                        detailsElement.parentElement?.closest("details");

                    while (parent) {
                        parent.classList.remove("hidden");
                        parent.open = true;

                        parent = parent.parentElement?.closest("details");
                    }
                }
            });
        });
    }
});

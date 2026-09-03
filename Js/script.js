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

            submitMessage(document.getElementById("content"));
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

function submitMessage(container=document) 
{
    const form = container.querySelector("#contactForm");
    if(!form)
    {
        return;
    }
    const sendbutton = form.querySelector("#sendButton");
    const status = form.querySelector("#formStatus");
    form.addEventListener("submit", async function (event) 
    {
        event.preventDefault();
        
        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const subject = form.querySelector("#subject").value.trim();
        const message = form.querySelector("#message").value.trim();
        
        // Check required fields

        if (!name || !email || !subject || !message) 
        {
            alert("Please fill in all fields.");
            status.className = "error";
            return;
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) 
            {
            alert("Please enter a valid email address.");
            status.className = "error";
            return;
        }
        sendbutton.disabled = true;
        sendbutton.textContent = "Sending....";
        // status.textContent = "";
        // status.className = "";
        const formData = new FormData(form);
        try 
        {
            const response = await fetch(form.action, 
                {
                    method: "POST",
                    body: formData,
                    headers: 
                        {
                            "Accept": "application/json"
                        }
                });

            if (response.ok) 
                {
                status.textContent = "Thank you! Your message has been sent successfully.";
                status.className = "success";
                form.reset();
            } else 
                {
                status.textContent =  "Sorry, there was a problem sending your message.";
                status.className = "error";
            }
        } catch (error) 
            {
            status.textContent =  "Unable to send the message. Please try again.";
            status.className = "error";
            }
            finally 
            {
                sendbutton.disabled = false;
                sendbutton.textContent = "Send Message";
            }
    });
    }

        /*
         * Prepare an email using the visitor's
         * default email application.
         *
         * Change this address to your family email.
        
        const familyEmail = "vivincallyou@gmail.com";
        const mailSubject =
            encodeURIComponent(subject);
        const mailBody =
            encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );
        const mailtoLink =
            "mailto:" +
            familyEmail +
            "?subject=" +
            mailSubject +
            "&body=" +
            mailBody;

        // Open email application
        window.location.href = mailtoLink;

        // Show success message
        successMessage.style.display = "block";
        // Clear form
        form.reset();*/


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

    /*// Send Message
    submitMessage(document);*/

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

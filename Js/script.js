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

    document.querySelectorAll(".mobile-toolbar button1").forEach(item => {
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

            showphotos(document.getElementById("content"), "profile");
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
        status.textContent = "";
        status.className = "";
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
});

// Galley category display

    const photos = [
    {
        image: "images/Kathanar Poovathungal.jpg",
        title: "Thomas Kathanar Poovathingal",
        category: "profile"
    },

    {
        image: "images/Chacko Konampurathu.jpg",
        title: "Chacko Konampurathu",
        category: "profile"
    },
     
    {
        image: "images/Pennamma Konampurathu.jpg",
        title: "Pennamma Konampurathu",
        category: "profile"
    },

     {
        image: "images/Eliyamma Konampurathu.jpg",
        title: "Eliyamma Konampurathu",
        category: "profile"
    },

     {
        image: "images/Thomas Konampurathu.jpg",
        title: "M. T. Thomas Konampurathu",
        category: "profile"
    },

    {
        image: "images/Simon Konampurathu.jpg",
        title: "M. T. Simon Konampurathu",
        category: "profile"
    },

     {
        image: "images/Leela Kuriakose.jpg",
        title: "Leela Kuriakose Konampurathu",
        category: "profile"
    },

     {
        image: "images/Baby Pallithazhathu.jpg",
        title: "Baby Pallithazhathu",
        category: "profile"
    },

     {
        image: "images/Markose Thathoth.jpg",
        title: "Markose Thathoth",
        category: "profile"
    },

      {
        image: "images/Shibu Thekkanattu.jpg",
        title: "Shibu Thekkanattu",
        category: "profile"
    },

    
      {
        image: "images/Thanka Thekkanattu.jpg",
        title: "Thanka Thekkanattu",
        category: "profile"
    },

     
      {
        image: "images/Varghese Meppadathu.jpg",
        title: "Varghese Meppadathu",
        category: "profile"
    },

    {
        image: "images/Varghese Kallidukkil.jpg",
        title: "Varghese Kallidukkil",
        category: "profile"
    },

     {
        image: "images/Thomas Elanjimattathil.jpg",
        title: "Thomas Elanjimattathil",
        category: "profile"
    },

    {
        image: "images/Kunju Thekkanattu.jpg",
        title: "Abraham Kunnathu",
        category: "profile"
    },

    {
        image: "images/Mariyakutty Thekkanattu.jpg",
        title: "Mariyakutty & Abraham Thekkanattu",
        category: "familyphotos"
    },

    {
        image: "images/Annakutty Manappattu.jpg",
        title: "Ulahannan & Annakutty Manappattu",
        category: "familyphotos"
    },

     {
        image: "images/Paulose Thekkanattu.jpg",
        title: "Paulose Thekkanattu",
        category: "familyphotos"
    },       
 ];

function showphotos(container=document , category) {

    const grid = container.getElementById("photogrid");

    if (!grid)
    {
        return;
    }
    grid.innerHTML = "";

    const filteredPhotos =
        category === "all"
        ? photos
        : photos.filter(photo => photo.category === category);

    filteredPhotos.forEach(photo => {

        const item = document.createElement("div");

        item.className = "gallery-item slide-in";

        item.innerHTML = `
            <div class="gallery-image">
                <img src="${photo.image}"><span class="label">${photo.title}</span>
            </div>    
        `;
        grid.appendChild(item);
        observer.observe(item);
    });
}


document.addEventListener("DOMContentLoaded", () => {

    // Initial page
    getpeopleCount(document);

    /*// Send Message
    submitMessage(document);*/

    const firstMenuItem = document.querySelector(".menu-item");

    if (firstMenuItem) {
        loadPage("home.html", firstMenuItem);
    }

    const firstMenuItem1 = document.querySelector(".mobile-toolbar button1");

    if (firstMenuItem1) {
        loadPage("home.html", firstMenuItem1);
    }

    // Observe elements already present on the page
    document.querySelectorAll(".slide-in").forEach(item => {
        observer.observe(item);
    });

    showphotos(document, "profile");
    
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

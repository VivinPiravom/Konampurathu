function allDetails(){ return [...document.querySelectorAll("details")]; }
function expandAll(){ allDetails().forEach(d=>d.open=true); }
function collapseAll(){ allDetails().forEach(d=>d.open=false); }
function loadPage(page, menuItem)
 {
  document.querySelectorAll('.menu-item').forEach(item => {item.classList.remove('active');});
  menuItem.classList.add('active');
  fetch(page)
       .then(response => 
          {
         if (!response.ok)
          {
             throw new Error("Page not found");
           }
             return response.text();
          })
        .then(data => {document.getElementById("content").innerHTML = data;})
            .catch(error => {document.getElementById("content").innerHTML ="<p>Unable to load this page.</p>";});
 }

document.addEventListener("DOMContentLoaded", () => {
  const firstMenuItem = document.querySelector('.menu-item');
  loadPage("home.html",firstMenuItem);});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".card").forEach(card => {observer.observe(card);});

const search = document.getElementById("search");
search.addEventListener("input", () => {
  const q = search.value.trim().toLocaleLowerCase();
  const details = allDetails();
  if(!q){ details.forEach(d=>d.classList.remove("hidden")); return; }

  details.forEach(d=>d.classList.add("hidden"));
  document.querySelectorAll(".person").forEach(p=>{
    const text=p.innerText.toLocaleLowerCase();
    if(text.includes(q)){
      p.classList.remove("hidden");
      let parent=p.closest("details");
      while(parent){
        parent.classList.remove("hidden");
        parent.open=true;
        parent=parent.parentElement.closest("details");
      }
    }
  });
  document.querySelectorAll("summary").forEach(s=>{
    if(s.innerText.toLocaleLowerCase().includes(q)){
      const d=s.parentElement; d.classList.remove("hidden"); d.open=true;
      let parent=d.parentElement.closest("details");
      while(parent){ parent.classList.remove("hidden"); parent.open=true; parent=parent.parentElement.closest("details"); }
    }
  });
});

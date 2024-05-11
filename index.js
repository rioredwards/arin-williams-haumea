/* SKILLS */

// List Skills Array
let skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "GitHub",
  "Figma",
  "Product Management",
  "Journalism",
  "Video Production",
];

// Use DOM selection to select HTML page's Skills section by ID
let skillsSection = document.getElementById("Skills");

// Create a variable named skillsList and use "DOM Selection" to query the skillsSection (instead of the entire document) to select the <ul> element
let skillsList = skillsSection.querySelector("ul");

// Iterate over the skills array
for (let i = 0; i < skills.length; i++) {
  // Create a new <li> element for each skill
  let skill = document.createElement("li");

  // Set the text content of <li> element to current array element
  skill.innerText = skills[i];

  // Append the skill element to the skillsList element
  skillsList.appendChild(skill);

  // Inside below loop, access each skill using skills[i]
  console.log("skill" + (i + 1) + ": " + skills[i]);
}

/* FOOTER */

//Create a variable named today and assign it a new date object
const currentDate = new Date();

// Create a variable named thisYear and assign it the current year - use getFullYear
const thisYear = currentDate.getFullYear();

// Create a variable named footer and assign it the footer element by using "DOM Selection" to select the <footer> element from the DOM
let footer = document.querySelector("footer");

// Create a variable named copyright and use it to create a new paragraph (p) element; Use createElement method
let copyright = document.createElement("p");

// Set the inner HTML of copyright element to display my name and the current year
copyright.innerHTML = `\u00A9 Arin Williams, ${thisYear}`;

// Append the footer element to the body
footer.appendChild(copyright);

/* MESSAGE */

//Used DOM selectors to get the form element
const messageForm = document.querySelector("[name='leave_message']");

//Add event listener to form so we can get the user's input values and create new messages using them
messageForm.addEventListener("submit", (event) => {
  //prevent the page from reloading
  event.preventDefault();
  // console.log("Form submitted");

  //getting values users typed into the inputs
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  //select HTML element that contains new messages (ul)
  const messageSection = document.querySelector("#messages");
  const messageList = messageSection.querySelector("ul");

  //begin creating the new message element (li)
  const newMessage = document.createElement("li");
  //adding the content from user inputs into the li
  newMessage.innerHTML = `
<a href=mailto:${usersEmail}>${usersName}</a>
<span>${usersMessage}</span>
`;

  //creating a button to remove the new message
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  //creating an event listener for when user clicks remove button
  removeButton.addEventListener("click", function (event) {
    // using event.target to access parent element of button (newMessage)
    const entry = event.target.parentNode;
    // remove the message from the DOM
    entry.remove();
  });

  // Add removeButton to the newMessage
  newMessage.appendChild(removeButton);

  // Add new message to the DOM/ HTML

  messageList.appendChild(newMessage);

  //reset the form inputs
  messageForm.reset();
});

/* PROJECTS */
const projectsSection = document.querySelector("#Projects");
const projectsList = projectsSection.querySelector("ul");

fetch("projects.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Can't access Projects. Please try again later.");
    }
    return res.json();
  })
  .then((data) => {
    const maxProjects = 3;
    const loopLength = Math.min(data.length, maxProjects);
    for (let i = 0; i < loopLength; i++) {
      const projectContainer = createProject(data[i]);
      projectsList.appendChild(projectContainer);
    }
  })
  .catch((error) => {
    const errorMsg = document.createElement("p");
    errorMsg.innerText = error.message;
    errorMsg.classList.add("error");
    projectsSection.appendChild(errorMsg);
    console.error(error);
  });

function createProject(project) {
  const projectContainer = document.createElement("li");
  projectContainer.classList.add("project");

  const projectLink = document.createElement("a");
  projectLink.target = "_blank";
  projectLink.href = project.html_url;

  const projectHeader = document.createElement("div");
  projectHeader.classList.add("project-header");
  const projectName = document.createElement("h3");
  projectName.innerText = project.name;
  const projectDate = document.createElement("p");
  projectDate.innerText = new Date(project.updated_at).getFullYear();

  projectHeader.appendChild(projectName);
  projectHeader.appendChild(projectDate);
  projectLink.appendChild(projectHeader);

  if (project.description) {
    const projectDescription = document.createElement("p");
    projectDescription.innerText = project.description;
    projectLink.appendChild(projectDescription);
  }

  projectContainer.appendChild(projectLink);
  return projectContainer;
}

/* Hide and Display mobile navbar menu */
const navBar = document.querySelector("#navbar");
const mobileMenuButton = document.querySelector("#mobile-menu-button");
const openMobileMenuIcon = mobileMenuButton.querySelector("#open-mobile-menu-icon");
const closeMobileMenuIcon = mobileMenuButton.querySelector("#close-mobile-menu-icon");
const navLinks = navBar.querySelectorAll("a");

// Hide and display mobile menu when user clicks on the mobile menu button
mobileMenuButton.addEventListener("click", function () {
  if (navBar.classList.contains("hide-mobile")) {
    // Show mobile menu
    navBar.classList.remove("hide-mobile");
    openMobileMenuIcon.classList.add("hidden");
    closeMobileMenuIcon.classList.remove("hidden");
  } else {
    // Hide mobile menu
    navBar.classList.add("hide-mobile");
    openMobileMenuIcon.classList.remove("hidden");
    closeMobileMenuIcon.classList.add("hidden");
  }
});

// Hide mobile menu when user clicks on a link
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navBar.classList.add("hide-mobile");
  });
});

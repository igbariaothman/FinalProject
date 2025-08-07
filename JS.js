"use strict"

let contact = [{ name: "Max", phone: "0501234567", email: "max@gmail.com", address: "Haifa", image: "./images/Max.jpg"},
{ name: "Othman", phone: "0507695517", email: "othman@gmail.com", address: "Um Al Fahm", image : "./images/othman.jpg" },
  { name: "Ahmad", phone: "0529876543", email: "ahmad@gmail.com", address: "Nazareth", image: "./images/Ahmad.jpg" },
  { name: "Younis", phone: "0585555521", email: "younisyounis@gmail.com", address: "Ara", image: "./images/younis.jpg"}
]


let editingIndex = null;


function displayContacts(listToShow = contact) {
  const list = document.getElementById("contactsList");
  const count = document.getElementById("count");

  list.innerHTML = "";
  count.textContent = listToShow.length + " People";

  contact.sort((a, b) => a.name.localeCompare(b.name));


  const noContactsMessage = document.getElementById("noContactsMessage");
  if (listToShow.length === 0) {
    noContactsMessage.classList.remove("hidden");
  } else {
    noContactsMessage.classList.add("hidden");
  }



  for (let i = 0; i < listToShow.length; i++) {
    const person = listToShow[i];

    const contactDiv = document.createElement("div");
    contactDiv.className = "contact";

    contactDiv.innerHTML = `
      <div class="contact-info">
      ${person.image ? `<img src="${person.image}" alt="Profile" class="profile-img" />` : ''}

        <p>
          <strong>Name: ${person.name}</strong><br>
          Phone: ${person.phone}<br>
         
        </p>
      </div>
      <div class="icons">
          <button class="edit-btn" data-index="${i}" title="Edit">✏️</button>
         <button class="show-btn" data-index="${i}" title="Show">🔍</button>
    <button class="delete-btn" data-index="${i}" title="Delete">🗑️</button>
      </div>
    `;

    list.appendChild(contactDiv);
  }
}

document.getElementById("toggleEffect").addEventListener("click", function () {
  document.body.classList.toggle("effect-mode");
});



document.getElementById("contactsList").addEventListener("mouseover", function (e) {
  const contactDiv = e.target.closest(".contact");
  if (contactDiv) {
    contactDiv.classList.add("hovered");
  }
});

document.getElementById("contactsList").addEventListener("mouseout", function (e) {
  const contactDiv = e.target.closest(".contact");
  if (contactDiv) {
    contactDiv.classList.remove("hovered");
  }
});



document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase(); 
  const filtered = contact.filter(person =>
    person.name.toLowerCase().includes(searchTerm) 
  );
  displayContacts(filtered);
});


document.getElementById("add").addEventListener("click", function () {
  document.getElementById("addContactPopup").classList.remove("hidden");
});

document.getElementById("cancelAdd").addEventListener("click", function () {
  document.getElementById("addContactPopup").classList.add("hidden");
});


document.getElementById("saveContact").addEventListener("click", function (e) {
  e.preventDefault(); 

  const name = document.getElementById("newName").value.trim();
  const phone = document.getElementById("newPhone").value.trim();
  const email = document.getElementById("newEmail").value.trim();
  const address = document.getElementById("newAddress").value.trim();
  const imageInput = document.getElementById("newImage");

  if (name && phone) {
    const existingContact = contact.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      alert("This name already exists. Please choose another.");
      return;
    }

    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        contact.push({ name, phone, email, address, image: reader.result });
        displayContacts();
        document.getElementById("addContactPopup").classList.add("hidden");
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      contact.push({ name, phone, email, address, image: "" });
      displayContacts();
      document.getElementById("addContactPopup").classList.add("hidden");
    }

    document.getElementById("newName").value = "";
    document.getElementById("newPhone").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newAddress").value = "";
    imageInput.value = "";
  } else {
    alert("Name and Phone are required!");
  }
});


document.getElementById("contactsList").addEventListener("click", function (e) {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
    deleteContact(Number(index));
  }

  if (e.target.classList.contains("show-btn")) {
    showPopup(Number(index));
  }

  if (e.target.classList.contains("edit-btn")) {
    editingIndex = Number(index);
    const person = contact[editingIndex];

    document.getElementById("editName").value = person.name;
    document.getElementById("editPhone").value = person.phone;
    document.getElementById("editEmail").value = person.email;
    document.getElementById("editAddress").value = person.address;

    document.getElementById("editContactPopup").classList.remove("hidden");
  }
});


document.getElementById("saveEdit").addEventListener("click", function () {
  const name = document.getElementById("editName").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const address = document.getElementById("editAddress").value.trim();

  if (name && phone) {
    contact[editingIndex] = { name, phone, email, address };
    displayContacts();
    document.getElementById("editContactPopup").classList.add("hidden");
  } else {
    alert("Name and Phone are required.");
  }
});

document.getElementById("cancelEdit").addEventListener("click", function () {
  document.getElementById("editContactPopup").classList.add("hidden");
});


//func to show the contact item
function showPopup(index) {
  const person = contact[index];
  document.getElementById("popupName").textContent = "Name :  " + person.name;
  document.getElementById("popupPhone").textContent = "Phone :  " + person.phone;
  document.getElementById("popupEmail").textContent = "Email :  " + (person.email || "");
  document.getElementById("popupAddress").textContent = "Address :  " + (person.address || "");
  document.getElementById("popup").classList.remove("hidden");
}

//if click out the popup return to site 
document.getElementById("popup").addEventListener("click", function (e) {
  if (e.target.id === "popup") {
    this.classList.add("hidden");
  }
});


document.getElementById("deleteAll").addEventListener("click", function () {
  contact = [];
  displayContacts();
});

//delete one concat
function deleteContact(index) {
  contact.splice(index, 1);
  displayContacts();
}

displayContacts();

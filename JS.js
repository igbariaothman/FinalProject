
let contact = [{name : "max" , phone : "0507695517" , email : "max@gmail.com"},
                   { name: "othman", phone: "0507695517", email: "othman@gmail.com" },
                   { name: "ahmad", phone: "0507695517", email: "ahmad@gmail.com" }
                  ]

function displayContacts(){
  const list = document.getElementById("contactsList");
  const count = document.getElementById("count");

  list.innerHTML = "" ;
  count.textContent = contact.length + " people" ;

  for (let i = 0; i < contact.length; i++) {
    const person = contact[i]; 

    const contactDiv = document.createElement("div");
    contactDiv.className = "contact";

    contactDiv.innerHTML = `
    <div class="contact-info">
      <p><strong>${person.name}</strong><br>
      📞 ${person.phone}<br>
      📧 ${person.email}</p>
    </div>
    <div class="icons">
      <button onclick="showInfo(${i})" title="عرض">👁️ show</button>
      <button onclick="deleteContact(${i})" title="احذف">🗑️ delete</button>
    </div>
  `;

    list.appendChild(contactDiv);
  }
}

function deleteallcontact(){
   if (confirm("do you want to delete all ?")){
      contact = [] ;
      displayContacts();
  }
}

displayContacts();

const main=document.createElement("div")
main.className="main"
document.body.append(main)
document.querySelector(".main").innerHTML = `
<h3><center>Mock API Data</center></h3>
<div class="user-form">
<input class="add-user-name"placeholder="Enter your Name">
<input class="add-user-avatar"placeholder="Enter your Profilr-pic url">
<button class="btn btn-success" onclick="adduser()"><i class="fas fa-user-plus"></i> Add User</button>

</div>
<section class="container"></section>`;

async function mock() {
  const data = await fetch("https://6166c53713aa1d00170a6755.mockapi.io/users");
  const user = await data.json();

  const usercontainer = document.querySelector(".container");
  usercontainer.innerHTML = "";
  user.forEach((user) => {
    usercontainer.innerHTML += `
    <div class="data">
    <img src="${user.avatar}" alt="${user.name}"/>
    <div class="details">
    <h4>${user.name}</h4>
    
    <button class="btn btn-danger" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i> Delete</button>
    
    <button class="btn btn-primary" onclick="toggleEdit(${user.id})"><i class="fas fa-user-edit"></i> Edit User</button>
    <div class="edit-user-form edit-${user.id}">
    <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter your Name"/>
     <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter your profile pic url"/>
     <button class="btn btn-success" onclick="saveuser(${user.id})">Save</button>
    </div>
    </div></div>`;
  });
}
mock();
async function deleteUser(userId) {
  console.log("delete user", userId);
  const datadel = await fetch(
    "https://6166c53713aa1d00170a6755.mockapi.io/users/" + userId,
    { method: "DELETE" }
  );
  mock();
}

async function adduser() {
  console.log("Adding...");
  const name = document.querySelector(".add-user-name").value;
  const avatar = document.querySelector(".add-user-avatar").value;
  const dataadd1 = await fetch(
    "https://6166c53713aa1d00170a6755.mockapi.io/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, avatar: avatar })
    }
  );
  mock();
}
function toggleEdit(userId) {
  console.log("Editing...");
  const editUserForm = document.querySelector(`.edit-${userId}`);
  editUserForm.style.display =
    editUserForm.style.display === "block" ? "none" : "block";
}
async function saveuser(userId) {
  console.log("updating.....", userId);
  const userName = document.querySelector(`.edit-${userId}-user-name`).value;
  const userAvatar = document.querySelector(`.edit-${userId}-user-avatar`).value;

  const dataupdate = await fetch(
    "https://6166c53713aa1d00170a6755.mockapi.io/users/" + userId,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, avatar: userAvatar })
    }
  );
  mock();
}


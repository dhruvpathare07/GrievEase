document.addEventListener("DOMContentLoaded", async () => {

const token = localStorage.getItem("token");

if(!token){
window.location.href = "../../index.html";
return;
}

loadProfile();
loadStats();

});


async function loadProfile(){

try{

const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/api/auth/profile",{
headers:{
Authorization: `Bearer ${token}`
}
});

const data = await res.json();

document.getElementById("profile-name").textContent = data.name;
document.getElementById("profile-email").textContent = data.email;

// student ID = Mongo _id (since you don't store separate studentId)
document.getElementById("profile-id").textContent = data._id;

document.getElementById("avatar-letter").textContent =
data.name.charAt(0).toUpperCase();

document.getElementById("student-name").textContent =
"Welcome, " + data.name;

}
catch(err){
console.error("Profile load error:",err);
}

}


async function loadStats(){

try{

const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/api/complaints/my",{
headers:{
Authorization: `Bearer ${token}`
}
});

const data = await res.json();

const complaints = data.complaints;

let resolved = 0;
let rejected = 0;
let pending = 0;

complaints.forEach(c => {

if(c.status === "resolved") resolved++;
else if(c.status === "rejected") rejected++;
else pending++;

});

document.getElementById("totalComplaints").textContent = complaints.length;
document.getElementById("resolvedComplaints").textContent = resolved;
document.getElementById("rejectedComplaints").textContent = rejected;
document.getElementById("pendingComplaints").textContent = pending;

}
catch(err){
console.error(err);
}

}
document.addEventListener("DOMContentLoaded", async () => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if(!token || role !== "admin"){
window.location.href="../../index.html";
return;
}

let complaints = [];

const tbody = document.getElementById("admin-complaints-body");

const searchInput = document.getElementById("searchId");
const categoryFilter = document.getElementById("filterCategory");
const statusFilter = document.getElementById("filterStatus");
const priorityFilter = document.getElementById("filterPriority");
const dateFilter = document.getElementById("filterDate");

document.getElementById("applyFilters").addEventListener("click",applyFilters);

try{

const response = await fetch("http://localhost:5000/api/complaints",{
headers:{
Authorization:"Bearer "+token
}
});

const data = await response.json();
complaints = data.complaints || [];

renderTable(complaints);

}catch(error){
console.error("Error loading complaints:",error);
}

function renderTable(list){

tbody.innerHTML="";

if(list.length===0){
tbody.innerHTML=`
<tr>
<td colspan="7" style="text-align:center;">
No complaints found.
</td>
</tr>`;
return;
}

list.forEach(complaint=>{

const formattedDate = new Date(complaint.createdAt)
.toLocaleDateString("en-GB");

const row=document.createElement("tr");
row.classList.add("clickable-row");

row.addEventListener("click",()=>{
window.location.href=`./admin_complaint_detail.html?id=${complaint._id}`;
});

row.innerHTML=`

<td>${complaint._id.slice(-6).toUpperCase()}</td>
<td>${complaint.category}</td>
<td>${complaint.title}</td>
<td>${complaint.student?.name || "N/A"}</td>
<td>${formattedDate}</td>

<td>
<span class="status-badge ${getStatusClass(complaint.status)}">
${formatStatusText(complaint.status)}
</span>
</td>

<td>
<span class="priority-badge priority-${complaint.priority}">
${complaint.priority}
</span>
</td>

`;

tbody.appendChild(row);

});

}

function applyFilters(){

let filtered=[...complaints];

const search = searchInput.value.trim().toUpperCase();
const category = categoryFilter.value;
const status = statusFilter.value;
const priority = priorityFilter.value;
const date = dateFilter.value;

if(search){
filtered=filtered.filter(c =>
c._id.slice(-6).toUpperCase().includes(search)
);
}

if(category){
filtered=filtered.filter(c => c.category===category);
}

if(status){
filtered=filtered.filter(c => c.status===status);
}

if(priority){
filtered=filtered.filter(c => c.priority===priority);
}

if(date){
filtered=filtered.filter(c =>
new Date(c.createdAt).toISOString().slice(0,10)===date
);
}

renderTable(filtered);

}

});

function formatStatusText(status){
return status
.replace("_"," ")
.replace(/\b\w/g,c=>c.toUpperCase());
}

function getStatusClass(status){

switch(status){

case "submitted":
return "badge-submitted";

case "under_review":
return "badge-review";

case "in_progress":
return "badge-progress";

case "resolved":
return "badge-resolved";

case "rejected":
return "badge-rejected";

default:
return "";
}

}   
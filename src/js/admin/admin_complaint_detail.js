document.addEventListener("DOMContentLoaded", async () => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
window.location.href="../../index.html";
return;
}

const params = new URLSearchParams(window.location.search);
const complaintId = params.get("id");

if (!complaintId) {
alert("No complaint ID provided");
return;
}

let complaintData=null;

try{

const response=await fetch(
`http://localhost:5000/api/complaints/${complaintId}`,
{
headers:{Authorization:"Bearer "+token}
}
);

complaintData=await response.json();

populateComplaint(complaintData);

}catch(error){
console.error("Error loading complaint:",error);
}

const saveBtn=document.querySelector(".save-btn");

saveBtn.addEventListener("click", async ()=>{

const updatedStatus=document.getElementById("status-select").value;
const updatedPriority=document.getElementById("priority-select").value;
const internalRemarks=document.getElementById("internal-remarks").value;
const publicResponse=document.getElementById("public-response").value;

saveBtn.disabled=true;
saveBtn.innerHTML="Saving...";

try{

const response=await fetch(
`http://localhost:5000/api/complaints/${complaintId}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},
body:JSON.stringify({
status:updatedStatus,
priority:updatedPriority,
internalRemarks,
publicResponse
})
}
);

if(response.ok){

alert("Complaint updated successfully");
location.reload();

}else{

alert("Update failed");

}

}catch(err){

console.error(err);
alert("Server error");

}

saveBtn.disabled=false;
saveBtn.innerHTML='<i class="fas fa-save"></i> Save Changes';

});

});


function populateComplaint(data){

document.getElementById("complaint-title").textContent=data.title;

const badge=document.getElementById("status-badge");
badge.textContent=formatStatusText(data.status);
badge.className=`status-badge ${getStatusClass(data.status)}`;

document.getElementById("complaint-id").textContent=
data.complaintId || data._id.slice(-6).toUpperCase();

document.getElementById("complaint-category").textContent=data.category;

document.getElementById("student-name").textContent=
data.student?.name || "N/A";

document.getElementById("created-date").textContent=
new Date(data.createdAt).toLocaleDateString("en-GB");

document.getElementById("complaint-description").textContent=data.description;

const attachmentSection = document.getElementById("attachment-section");

if (!data.image) {
  attachmentSection.style.display = "none";
} else {
  attachmentSection.innerHTML = `
    <img 
      src="http://localhost:5000/uploads/${data.image}" 
      style="max-width:300px; border-radius:10px; margin-top:10px;"
    >
  `;
}

document.getElementById("status-select").value=data.status;
document.getElementById("priority-select").value=data.priority;

document.getElementById("internal-remarks").value=data.internalRemarks || "";
document.getElementById("public-response").value=data.publicResponse || "";

buildTimeline(data.statusHistory);

}


function buildTimeline(history){

const timeline=document.querySelector(".timeline");
timeline.innerHTML="";

if(!history || history.length===0) return;

const finalStatus=history[history.length-1].status;

let stageOrder=[];

if(finalStatus==="rejected"){

stageOrder=[
"submitted",
"under_review",
"rejected"
];

}else{

stageOrder=[
"submitted",
"under_review",
"in_progress",
"resolved"
];

}

stageOrder.forEach(stage=>{

const entry=history.find(h=>h.status===stage);

const li=document.createElement("li");

if(entry){
li.classList.add("completed");
}

if(stage===finalStatus &&
(stage==="under_review" || stage==="in_progress")){
li.classList.remove("completed");
li.classList.add("active");
}

let icon="fa-circle";

if(stage===finalStatus &&
(stage==="under_review" || stage==="in_progress")){
icon="fa-spinner fa-spin";
}
else if(entry){
icon="fa-check-circle";
}

li.innerHTML=`
<i class="fas ${icon}"></i>
<div>
<strong>${formatStatusText(stage)}</strong>
${entry ? `<span>${new Date(entry.changedAt).toLocaleDateString("en-GB")}</span>` : ""}
</div>
`;

timeline.appendChild(li);

});

}


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
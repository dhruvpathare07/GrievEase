document.addEventListener("DOMContentLoaded", async () => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if(!token || role !== "admin"){
window.location.href="../../index.html";
return;
}

try{

const res = await fetch("http://localhost:5000/api/complaints",{
headers:{
Authorization:"Bearer "+token
}
});

const data = await res.json();
const complaints = data.complaints || [];

const tbody=document.getElementById("notes-body");

tbody.innerHTML="";

const notes = complaints.filter(c => c.internalRemarks && c.internalRemarks.trim() !== "");

if(notes.length===0){
tbody.innerHTML=`
<tr>
<td colspan="5" style="text-align:center;">
No internal notes found.
</td>
</tr>
`;
return;
}

notes.forEach(c=>{

const date=new Date(c.updatedAt).toLocaleDateString("en-GB");

const row=document.createElement("tr");

row.innerHTML=`

<td>${c._id.slice(-6).toUpperCase()}</td>
<td>${c.title}</td>
<td>${c.student?.name || "N/A"}</td>

<td class="internal-note">
${c.internalRemarks}
</td>

<td>${date}</td>

`;

row.addEventListener("click",()=>{
window.location.href=`./admin_complaint_detail.html?id=${c._id}`;
});

tbody.appendChild(row);

});

}
catch(err){
console.error("Notes load error:",err);
}

});
function setupVoicePage(voiceType){
    const form=document.getElementById("voiceForm");
    const table=document.getElementById("voiceTable");
    const message=document.getElementById("voiceMessage");
    if(!form || !table) return;

    let members=JSON.parse(localStorage.getItem(`${voiceType}Members`)) || [];
    
    function render(){
        table.innerHTML=`
        <tr>
          <th>#</th>
          <th>Fullname</th>
          <th>Action</th>
        </tr>
        `;

    members.forEach((member, index) => {
        const row =table.insertRow();
        row.insertCell(0).textContent=index+1;
        row.insertCell(1).textContent=member;

        const deleteCell=row.insertCell(2);
        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.style.backgroundColor="red";
        deleteBtn.style.color="white";
        deleteBtn.style.cursor="pointer";

        deleteBtn.addEventListener("click", () => {
            members.splice(index, 1);
            localStorage.setItem(`${voiceType}Members`, JSON.stringify(members));
            render();
        });

        deleteCell.appendChild(deleteBtn);
    });
}
  render();  

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const fullname=document.getElementById("voicefullname").value.trim();

    if(!fullname) {
        message.textContent="Fullname is required!";
        message.style.color="red";
        return;
    }

    members.push(fullname);
    localStorage.setItem(`${voiceType}Members`, JSON.stringify(members));
    message.textContent=`${fullname} added successfully!`;
    message.style.color="green";
    setTimeout(() => {
        message.textContent="";
    }, 3000);
    form.reset();
    render();
});
}

document.addEventListener("DOMContentLoaded", function () {
    const registerform=document.getElementById("registerform");
    if(registerform) {
        registerform.addEventListener("submit", function(e){
            e.preventDefault();
    const fullname=document.getElementById("fullname").value;
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const createpassword=document.getElementById("createpassword").value;
    const confirmpassword=document.getElementById("confirmpassword").value;
    
    const message=document.getElementById("registerMessage");

    if(createpassword !== confirmpassword) {
        message.textContent="Passwords do not match!";
        message.style.color="red";
        return;
    }
        const user={
            fullname: fullname,
            username: username,
            email: email,
            password: createpassword
        };
        localStorage.setItem("registeredUser", JSON.stringify(user));
    
        message.textContent=`Registration successful for ${fullname}!`;
        message.style.color="green";
        document.getElementById("registerform").reset();

    setTimeout(function() {
        window.location.href="login.html";
    }, 2000);
  });
 }
const loginform=document.getElementById("loginform");
if(loginform){
    loginform.addEventListener("submit", function(e){
        e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    const storedUser=JSON.parse(localStorage.getItem("registeredUser"));
    if(!storedUser){
        message.textContent="No user found. PLease register first.";
        message.style.color="red";
        return;
    }
    if(email === storedUser.email && password === storedUser.password){
        message.textContent=`Welcome back, ${storedUser.fullname}!`;
        message.style.color="green";
        document.getElementById("loginform").reset();
        localStorage.setItem("currentUser", JSON.stringify(storedUser));
        setTimeout(function() {
            window.location.href="home.html";
        }, 2000);
    }else{
        message.textContent= "Invalid email or password!";
        message.style.color="red";
        return;
    }
   });
  }
const logoutlink=document.getElementById("logoutlink");
if(logoutlink){
    logoutlink.addEventListener("click", function(e) {
        e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href="login.html";
    });
};
//This will hadle the adding of members
const addMemberform=document.getElementById("addMemberform");
if(addMemberform){
    addMemberform.addEventListener("submit", function(e) {
        e.preventDefault();

        const fullname=document.getElementById("fullname").value;
        const message=document.getElementById("message");
        if(fullname==="") {
            message.textContent="Please enter a name!";
            message.style.color="red";
            return;
        }
// Get old members from localStorage (or create an empty array)
        let members=JSON.parse(localStorage.getItem("members")) || [];
        //add new member to array
        members.push(fullname);
        //save updated list to localstorage
        localStorage.setItem("members", JSON.stringify(members));
        message.textContent=`${fullname} added successfuly!`;
        message.style.color="green";
        addMemberform.reset();
        //redirect to members page after 2 seconds
        setTimeout(() => {
            window.location.href="member.html";
        }, 2000);
    });
}
//This will display the added member in members table
const membersTable=document.getElementById("membersTable");
if(membersTable){
    const members=JSON.parse(localStorage.getItem("members")) || [];
    members.forEach((member, index) => {
        const row=membersTable.insertRow();
        row.insertCell(0).textContent=index+1;
        row.insertCell(1).textContent=member;
    });
}

});

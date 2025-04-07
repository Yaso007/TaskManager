

var globalUser
function logout(){
    $("#logOutBtn").on("click",()=>{
        alert("Are you sure you want to logout?")
        localStorage.removeItem('name')
        localStorage.removeItem(globalUser)
        setTimeout(()=>{
            window.location.href ='./index.html'
           },4000) 
        
    })
}
function getToken(){
    //console.log(globalUser)
    const username = localStorage.getItem(globalUser)
    return username
}
function addSearch(){
    $("#searchBtn").on("click",async ()=>{
        const toSearch = $("#search").val()
        console.log(toSearch)
        const token = getToken()
        try{
            const res = await fetch(`http://localhost:3000/api/search/${toSearch}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              });
            if(res.ok && res.length !=0){
              
                const data = await res.json()
                console.log(data)
                console.log("tasks should be emptied")
                $(".tasks").empty()
                listResponse(data,token)
                
            }
            else{
                $(".tasks").empty()
                $("tasks").append(`<h2>Couldn't find any !</h2>`)
            }
        
        }
        catch(err){
            console.log(err)
        }
    })
}
async function addAll(){
 
    $("#all").on("click",async ()=>{
        $("#all").css("background-color", "#1ecbe1");
        $("#pending").css("background-color", "white");
        $("#completed").css("background-color", "white");
        $(".tasks").empty(); // clear current task list
    
        const token = localStorage.getItem(globalUser);
        try {
            const response = await fetch("http://localhost:3000/api/tasks", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("All Tasks:", data);
              listResponse(data, token);
            }
          } catch (err) {
            console.log(err);
          }
    })
   
  
}
async function addPending(){
    $("#pending").on("click",async ()=>{
        $(this).css("background-color","#1ecbe1")
        $("#all").css("background-color","white")
        $(".tasks").empty()
        try{
            const status = "Pending"
            const token = localStorage.getItem(globalUser)
            const response = await fetch(`http://localhost:3000/api/filter`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    globalUser,status
                })
              })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                listResponse(data,token)
            }
        }
        catch(e){
            console.log(e)
        }
    
    }
)
}
async function addCompleted(){
    $("#completed").on("click",async ()=>{
        $("#completed").css("background-color","#1ecbe1")
        $("#all").css("background-color","white")
        $("#pending").css("background-color","white")
        $(".tasks").empty()
    
        try{
            const status = "Completed"
            const token = localStorage.getItem(globalUser)
            const response = await fetch(`http://localhost:3000/api/filter`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    globalUser,status
                })
              })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                listResponse(data,token)
            }
        }
        catch(e){
            console.log(e)
        }
    
    }
)
}
  

function listResponse(data,token){
    data.forEach((task) => {
    
        $(".tasks").append(`
          <div class="task-card" data-id="${task._id}">
            <h5>Task ID: ${task._id}</h5>
            <p><strong>Task:</strong> ${task.task}</p>
            <p><strong>Status:</strong> <span class="status">${task.stats}</span></p>
            <p><strong>User:</strong> ${task.username}</p>
            <button class="delete-btn">Delete</button>
            <button class="update-btn">Update</button>
            <button class="complete-btn">Complete</button>
          </div>
        `)});

        $(".tasks").on("click", ".delete-btn", async function () {
            const card = $(this).closest(".task-card");
            const taskId = card.data("id");
            //const token = getToken()
            console.log(token)
            try{
                const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    }
                  })
    
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    console.log("Deleting task:", taskId);
                    // send DELETE request here
                    card.remove();
                }
            }
            catch(err){
                console.log(err)
            }
            
           
             // remove from DOM
          });
        
           // Handle Update
     $(".tasks").on("click", ".update-btn", async function () {
        const card = $(this).closest(".task-card");
        const taskId = card.data("id");
        const newTask = prompt("Enter updated task content:");
        const newStatus = "Pending";
        if (newTask && newStatus) {
            console.log("Updating task:", taskId);
            // send PUT request here
            try{
                const token = getToken()
                const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`,{
                    method:"PUT",
                    headers:{
                         "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
    
                    },
                    body:JSON.stringify({
                        task:newTask,
                        stats:newStatus
                    })
                })
                if(response.ok){
                    const data = await response.json
                    console.log(data)
                    location.reload();
                }
              
            }
            catch(err){
                console.log(err)
            }
    
            //card.find(".status").text(newStatus);
        }
        else{
            alert("the fields cannot be empty")
        }
        
       
     });
    
      // Handle Complete
  $(".tasks").on("click", ".complete-btn", async function () {
    const card = $(this).closest(".task-card");
    const taskId = card.data("id");
    console.log("Marking task as complete:", taskId);

    try{
        const token = getToken()
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`,{
            method:"PUT",
            headers:{
                 "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`

            },
            body:JSON.stringify({
                stats:"Completed"
            })
        })
        if(response.ok){
            const data = await response.json
            console.log(data)
            location.reload();
        }
      
    }
    catch(err){
        console.log(err)
    }
    // send PUT request here
    card.find(".status").text("Completed");
  });       
}



window.onload = async function () {
    const username = localStorage.getItem('name');
    //console.log(username)
    globalUser = username
    //console.log(globalUser)
    //console.log(getToken())
    if (username) {
      document.querySelector("h2").innerText = `${username}`;
    }
    $("#create").on("click",async (e)=>{
        e.preventDefault()
        const task = $("#todo").val()
        const token = localStorage.getItem(globalUser)
        try{
            const response = await fetch("http://localhost:3000/api/tasks",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({globalUser,task})
                
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                location.reload()
            }
        }
        catch(err){
            console.log(err)
        }
       
        })

    addAll()
    addPending()
    addCompleted()
    addSearch()
    logout()
    const token = localStorage.getItem(username)
    console.log(token)
    try{
        const response = await fetch("http://localhost:3000/api/tasks",  {method: 'GET', 
            credentials:"include",
            headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
          },
  
          }) 
  
      if(response.ok){
          const data = await response.json()
          console.log(data)
          listResponse(data,token)
         
      }
    }
    catch(err){
        console.log(err)
    }

  };


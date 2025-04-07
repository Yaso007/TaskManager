

var globalUser
function getToken(){
    //console.log(globalUser)
    const username = localStorage.getItem(globalUser)
    return username
}
function listResponse(data,token){
    data.forEach((task) => {
        // const card = $(`
        //   <div class="task-card" data-id="${task._id}">
        //     <h3>Task ID: ${task._id}</h3>
        //     <p><strong>Status:</strong> <span class="status">${task.stats}</span></p>
        //     <p><strong>User:</strong> ${task.username}</p>
        //     <button class="delete-btn">Delete</button>
        //     <button class="update-btn">Update</button>
        //     <button class="complete-btn">Complete</button>
        //   </div>
        // `)});
    
        $(".tasks").append(`
          <div class="task-card" data-id="${task._id}">
            <h3>Task ID: ${task._id}</h3>
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
        const newStatus = prompt("Enter new status:");

        try{
            const response = await fetch("http://localhost:3000/api/tasks")
        }

        if (newTask && newStatus) {
        console.log("Updating task:", taskId);
        // send PUT request here
        card.find(".status").text(newStatus);
        }
     });
    
      // Handle Complete
  $(".tasks").on("click", ".complete-btn", function () {
    const card = $(this).closest(".task-card");
    const taskId = card.data("id");
    console.log("Marking task as complete:", taskId);
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
            }
        }
        catch(err){
            console.log(err)
        }
       
        
    
    })
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


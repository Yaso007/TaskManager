$("#login").on("click", async (e) => {
    e.preventDefault(); // Stop form from submitting

    console.log("hello");
    //alert("hello");
    const username = $("#username").val()
    const password = $("#password").val()

    if(username && password != null){
        try{
            const response = await fetch("http://localhost:3000/api/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,password})
            })
            const data = await response.json()
            const token = data.token
            if(response.ok){
                console.log("Login successful:", data);
                // Redirect, show message, or store token here
                localStorage.setItem(`${username}`,`${token}`)
                console.log(localStorage.getItem(username))
                localStorage.setItem(`name`,`${username}`)
    
               setTimeout(()=>{
                window.location.href ='./tasks.html'
               },500) 
                console.log("#heroH2")
                $("#heroH2").html(`${username}`)
    
            }
            else {
                console.error("Login failed:", data);
                alert("Credentials are wrong");
            }
    
            console.log(username)
        }
        catch(err){
            console.log(err)
        }  
    }
    else{
        alert("Fields cannot be empty")
    }
   
});

$("#register").on("click",async (e)=>{
    e.preventDefault()

    const username = $("#username").val()
    console.log(username)
    const password = $("#password").val()
    if(username && password != null){
        const dataToSend = JSON.stringify({username:username,
            password:password})
        console.log(dataToSend)
        try{
            const response = await fetch("http://localhost:3000/api/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:dataToSend
            })

            const data = await response.json()
            if(response.ok){
                console.log("registration successful")
                console.log(data)
                $("body").append(`<h4>Registration successfull, login with your credentials</h4>`)

                setTimeout(()=>{
                    $("h4").fadeOut(500,()=>{
                        $(this).remove()
                    })
                },2000)
            }
            else{
                console.log("smth wrong with server")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        alert("Fields cannot be empty")
    }
})

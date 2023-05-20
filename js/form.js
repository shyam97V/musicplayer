var regForm  = document.getElementById("register");

const baseUrl = "https://expense-dev-server.temanedtech.com";

regForm.addEventListener("submit",(event)=>{
    console.log(123);
    event.preventDefault();
    const formData = {
        name: regForm.name.value,
        email: regForm.email.value,
        phone: regForm.phone.value,
        password: regForm.password.value,
        access: regForm.access.value
    };

    fetch(baseUrl + "/users/register",{
        method :"POST",

        headers : {
            "content-type" : "application/json"
        },
        body:JSON.stringify(formData)
    })

    .then (res =>res.json())
    .then(data =>console.log(data))
    .catch(err => console.log(err))
    
})


var loginForm=document.getElementById("login");
loginForm.addEventListener("submit",async(event) =>
{
    try{
        event.preventDefault();
        var formData={
            email:loginForm.email.value,
            password:loginForm.password.value
        }
        var res = await fetch(baseUrl + "/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        var data = await res.json();
        ///localstorage.setItem("access", data.access);
        const keys = Object.keys(data);
        keys.forEach((e)=> localStorage.setItem(e,data[e]));
        window.location.assign("/html/expense.html")
        console.log(data);
    } catch(error)
    {
        console.log(error); 
    }
})


window.onload = ()=>
{
    
    const token = localStorage.getItem("token");
    if(token){
        window.location.assign("/html/expense.html")
    }
}





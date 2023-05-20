const baseUrl = "https://expense-dev-server.temanedtech.com";
const token = localStorage.getItem("token");  
const root = document.getElementById("root");
window.onload = () => {

    if (!token) {
        window.location.assign("../html/expense.html");
    }
    fetchData()
}

const logout = () => {
    localStorage.clear();
    window.location.reload();
}


const fetchData = async () => {
    const res = await fetch(baseUrl + "/expenses", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    const data = await res.json();
    console.log(data);
    render(data);
}

const render = (data) => {
    const parentDiv = document.createElement("div")
    data.forEach((e) => {
        const div = document.createElement("div");
        const keys = Object.keys(e);
        for (const key of keys) {
            const para = document.createElement("p");
            para.innerHTML = `
                          <b>${key} </b>:   ${e[key]} 
                          `;
            para.classList.add(key);
            div.appendChild(para);
        }

        //////delete button//      
        var button = document.createElement("button");
        button.innerHTML = "Expense Delete";
        button.setAttribute("class", "btn btn-danger")
        button.backgroundColor = "blue";
        button.dataset.expId = e._id;
        button.addEventListener("click", (event) => (deleteExp(event)))
        div.appendChild(button)

        //////update button////       
        var updatebtn = document.createElement("button");
        updatebtn.innerHTML = " Expense Update";
        div.appendChild(updatebtn)
        updatebtn.setAttribute("type", "button")
        updatebtn.setAttribute("class", "btn btn-success")
        updatebtn.setAttribute("data-toggle", "modal")
        updatebtn.setAttribute("data-target", "#updateExpModal")
        updatebtn.addEventListener("click", () => updateExp(e))
        parentDiv.appendChild(div)
    });
    root.replaceChildren(parentDiv);
}


var expForm = document.getElementById("expform")
expForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
        name: expForm.name.value,
        desc: expForm.desc.value,
        transactionAccount: expForm.transactionAccount.value,
        transactionDetails: expForm.TransactionDetails.value,
        amount: expForm.amount.value,
        type: expForm.type.value
    }

    fetch(`${baseUrl}/expenses/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
        },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchData()
        })

        .catch(err => console.log(err))
})

const deleteExp = ((event) => {

    fetch(baseUrl + "/expenses/delete/" + event.target.dataset.expId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
        }

    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            fetchData()
        })
        .catch((err) => console.log(err))
})



const updateExp = ((e) => {
    var updateForm = document.getElementById("updateform");
    console.log(e)
    updateForm.name.value = e.name;
    updateForm.desc.value = e.desc;
    updateForm.transactionAccount.value = e.transactionAccount;
    updateForm.transactionDetails.value = e.transactionDetails;
    updateForm.amount.value = e.amount;
    updateForm.type.value = e.type;

    updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = {
            name: updateForm.name.value,
            desc: updateForm.description.value,
            transactionAccount: updateForm.transactionAccount.value,
            transactionDetails: updateForm.transactionDetails.value,
            amount: updateForm.amount.value,
            type: updateForm.type.value
        }

        fetch(`${baseUrl}/expenses/update/e._id`, {
            method: "PUT",
            headers: {
                "Content": "application/json",
                Authorization: "bearer " + token
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                fetchData()
                window.location.reload();
            })
            .catch((err) => console.log(err))
    })
})
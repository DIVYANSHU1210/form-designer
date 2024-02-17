const inputBtn = document.querySelector("#add-input");
const selectBtn = document.querySelector("#add-Select");
const txtAreaBtn = document.querySelector("#add-text-area");
const saveBtn = document.querySelector(".save-btn");
let draggedItem = null;



// "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
//         "type": "input",
//         "label": "Sample Label",
//         "placeholder": "Sample placeholder"




const handleSaveEvent = ()=>{
    const formData = [];

    const formItems = document.querySelectorAll(".form-item");
    // console.log(formItems);

    formItems.forEach(formItem=>{ 
        const label = formItem.querySelector(".form-item-label").textContent;
        const id = formItem.id;        
        const formElement = formItem.querySelector(".form-item-element");
        const placeholder = formElement.placeholder;
        const type = formElement.tagName.toLowerCase();
        
        formData.push({id, type, label, placeholder}); 
        
        if (formElement.tagName === "SELECT") {
            options = Array.from(formElement.querySelectorAll("option")).map(option => option.textContent);
            formData.push(options);
        }    
    })

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
}

saveBtn.addEventListener("click", handleSaveEvent);




const handleAddElement = (component)=>{
    const formItems = document.querySelector(".form-items")
    const formItem = document.createElement("li");
    formItem.classList.add("form-item");
    formItem.id = Date.now();  // to provide random unique id to every element;

    const labelDiv = document.createElement("div");
    labelDiv.classList.add("form-item-label-container")

    const formLabel = document.createElement("label");
    formLabel.classList.add("form-item-label");
    formLabel.textContent="Sample Label";

    const delBtn = document.createElement("button");
    delBtn.classList.add("form-item-deleteBtn");
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    delBtn.addEventListener("click", (e)=>{
        if(e.target.tagName === "I"){
             e.target.parentNode.parentNode.parentNode.remove();
        }
    })
    labelDiv.appendChild(formLabel);
    labelDiv.appendChild(delBtn);

    let formElement = null;
    if(component === "input"){
        formElement = document.createElement("input");
        formElement.placeholder = "Sample placeholder";
    }
    else if(component === "select"){
        formElement = document.createElement("select");
        const opt1 = document.createElement("option");
        opt1.textContent = "Sample Option 1";
        const opt2 = document.createElement("option");
        opt2.textContent = "Sample Option 2";

        formElement.appendChild(opt1);
        formElement.appendChild(opt2);
    }
    else{
        formElement = document.createElement("textarea");
        formElement.placeholder = "Sample placeholder";
    }

    formElement.classList.add("form-item-element");

    formItem.appendChild(labelDiv);
    formItem.appendChild(formElement);
    
    formItem.draggable= true;

    
    formItem.addEventListener("dragstart", (e)=>{
        draggedItem = e.target;
        e.target.classList.add("dragging");
        // console.log("drag started with", draggedItem);
    })

    formItem.addEventListener("dragend", (e)=>{
        e.target.classList.remove("dragging");
    })
    formItem.addEventListener("dragover", (e)=>{
        e.preventDefault();
        if(e.target.tagName === "LI"){
            e.target.classList.add("dragOver");
        }   
        // console.log("elemen dragged over");
    })

    formItem.addEventListener("dragleave", (e)=>{
        e.target.classList.remove("dragOver");
    })

    formItem.addEventListener("drop", (e)=>{
        const neighbour = e.target.closest(".form-item");
        draggedItem.classList.remove("dragging");
        const dropTargets = document.querySelectorAll(".form-item");
        dropTargets.forEach((target) => target.classList.remove("dragOver"));
        neighbour.parentNode.insertBefore(draggedItem, neighbour);
    })

    formItems.appendChild(formItem);
    
}



inputBtn.addEventListener("click", ()=>handleAddElement("input"));
selectBtn.addEventListener("click", ()=>handleAddElement("select"));
txtAreaBtn.addEventListener("click", ()=>handleAddElement("text-area"));

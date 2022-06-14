let addBtn = document.querySelector('#add-btn');
let addTitle = document.querySelector("#note-title");
let addTxt = document.querySelector("#note-text");
 let notes = null;    
let notesObj = [];
addBtn.addEventListener('click', addNote);

function addNote(e) {
    if (addTitle.value=="") {
        return alert("Please add the Title");
    }else if (addTxt.value==""){
        return alert('Please add the text');
    } else {
        let myObj = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTitle.value = "";
        addTxt.value = "";
        showNotes();   
    }
}

function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
    }
    
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id = "${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
        <button id = "${index}" onclick="editNote(this.id)" class="note-btn edit-btn" >Edit Note</button>
        </div>
        <hr>
        `;
        
    });

    let noteElm = document.querySelector("#notes")
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "No Notes Yet";
    }
}


function deleteNote(index) {
    let confirmDel = confirm(`You are deleting Note ${index} `)
    if (confirmDel == true) {
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (addTitle.value != "" || addTxt.value != "") {
        return alert("Please clear the form");
    }
    else {
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
    }
    }
    addTitle.value = notesObj[index].title;
    addTxt.value = notesObj[index].text;

    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    
}

showNotes();


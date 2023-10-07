console.log("Starting New Project");
showNotes();
// alert("jdf")
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    console.log(addTxt.value)

    let addTitle = document.getElementById("addTitle")
    console.log(addTitle.value)

    if (addTitle.value == "") {
        alert("Title is Blank, Please write something ")
    }
    else if (addTxt.value == "") {
        alert("Note is Blank, Please write something ")
    }
    else {
        let titles = localStorage.getItem("titles");
        if (titles == null) {
            titlesObj = [];
        } else {
            titlesObj = JSON.parse(titles);
        }
        titlesObj.push(addTitle.value);
        localStorage.setItem("titles", JSON.stringify(titlesObj));
        addTitle.value = "";
        console.log(titlesObj);

        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        showNotes();
    }

})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let titles = localStorage.getItem("titles");
    if (titles == null) {
        titlesObj = [];
    } else {
        titlesObj = JSON.parse(titles);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-3 mx-3" style="width: 24rem;">
            <div class="card-body">
                <h5 class="card-title">${titlesObj[index]}</h5>
                <p class="card-text"> ${notesObj[index]}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `Nothing to show here Please Add Some notes from above Section`
    }
}

function deleteNote(index) {
    // console.log(`I am deleting ${index}`)

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();

}

let search = document.getElementById('searchTxt')
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase()
    // console.log(inputVal)
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let card = element.getElementsByTagName("p")[0].innerText
        let title = element.getElementsByTagName("h5")[0].innerText


        if (title.toLowerCase().includes(inputVal)) {
            element.style.display = "block"
        }
        else if (card.toLowerCase().includes(inputVal)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
})

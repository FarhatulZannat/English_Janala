function loadAllLevels(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data=>displayAllLevels(data.data))
}

function displayAllLevels(buttons){
    const buttonContainer = document.getElementById('button-container')
     
    for(let btn of buttons){
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML=`
         <button class="btn btn-outline btn-primary"><img  src="assets/fa-book-open.png" alt="" srcset="">Lesson -${btn.level_no}</button>
         `

         buttonContainer.append(btnDiv);
    }

}
// click event get start er
document.getElementById('getStarted').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if(name === "" || password === "") {
        alert("Both Name and Password must be filled!");
        return;
    }

   
    if(password !== "123456") {
        alert("Password is incorrect!");
        return;
    }

   
    document.getElementById('learn').classList.remove('hidden');
    document.getElementById('faq').classList.remove('hidden');
    document.getElementById('nav').classList.remove('hidden'); 
    document.getElementById('banner').classList.add('hidden'); 

      // ekhn learn btn load hobe
    loadAllLevels();
});








function loadAllLevels(){


  ///ager shob load howa btn muche felbe new kore show korbe b8 dekhe lagbe  ager gulai ache
  document.getElementById('button-container').innerHTML='';


    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data=>displayAllLevels(data.data))
}

function displayAllLevels(button){
    const buttonContainer = document.getElementById('button-container')
     
    for(let btn of button){
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML=`
         <button id="btn-${btn.level_no}" onclick="loadLessons('${btn.level_no}')" class="category btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${btn.level_no}</button>
         `

         buttonContainer.append(btnDiv);
    }
}




//active class remove korbe
function removeActiveClass(){
  const activebtns = document.getElementsByClassName('category');//category ekta class name disi 19no line e iccha motw.jate ei name ta dhore shob btn k dhorte pari

  for(let btn of activebtns){
    btn.classList.remove('active'); //ekhne oi active class ta k remmove kortesi jeta css dia html e create korsilm  
  }
}






function loadLessons( id){

  

  removeActiveClass();   // 1st e remove hobe active namer class ta
  document.getElementById(`btn-${id}`).classList.add('active'); // tar por 19 no line e id disi (`btn-${id}`) eta dia ekhne call kore oi btn ta kei just active kortesi

  
    // empty msg ta shore jabe btn click korle
  document.getElementById('selectOneLesson').style.display='none';


  //extra div ta hidden korar por loaad hole abr show korbo
  document.getElementById('lesson-cards').classList.remove('hidden');


    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data=>{
      
      displayLessons(data.data)
      console.log(data.data)
    })
}


function displayLessons(cards){



    const lessonCardContainer = document.getElementById('lesson-cards')
    lessonCardContainer.innerHTML = ''

    if(cards.length===0){
      lessonCardContainer.innerHTML =`
     <section class="col-span-full flex flex-col justify-center py-20 mx-18 text-center items-center">
  <img class ="mx-auto block" src="./assets/alert-error.png" alt="">
  
  <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h1 class="font-bold text-xl">নেক্সট Lesson এ যান</h1>
 </section>

 `
    }
    
     for(let card of cards){
        const cardsDiv = document.createElement('div')

      // null hole jana nai dekhabe
      const meaning = card.meaning ? card.meaning : ' জানা নেই';

        cardsDiv.innerHTML=`
        
            <div class="card bg-white content ">
  <div class="card-body items-center text-center">
    <h2 class="card-title">${card.word}</h2>
    <p>Meaning/Pronunciation.</p>
    
    <h2 class="text-base">${meaning}/${card.pronunciation}</h2>

    <div class=" flex justify-center gap-30">
      <button onclick="loadWordDetails('${card.id}')" class="btn w-[8px] h-[26px]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn w-[8px] h-[26px]"><i class="fa-solid fa-circle-play"></i></button>
    </div>
  </div>
  </div>        
        
`
lessonCardContainer.append(cardsDiv);
     }
}




function loadWordDetails(id){
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
  .then(res=>res.json())
  .then(data=>displayWordDetails(data.data))
  console.log(data);
}

function displayWordDetails(detail){
  document.getElementById('word-details').showModal()       //.showmodal

  const detailMeaning = detail.meaning ? detail.meaning : 'অর্থ পাওয়া যায়নি'

  const detailsContainer = document.getElementById('details-container')
  detailsContainer.innerHTML =`
    
    <h1 class="text-lg font-semibold">${detail.word}(<i class="fa-solid fa-microphone"></i>:${detail.pronunciation})</h1>
    <p class="py-4"><span class='font-semibold'>Meaning </span></br>${detailMeaning} </br> </br> <span class='font-semibold'>Example </span></br> ${detail.sentence} </br> </br> <span class='font-semibold'>সমার্থক শব্দ গুলো </span> </br> <button class='bg-[#C6BDBD50] btn'>${detail.synonyms}</button></p> 
    <div class="modal-action">
`
  
}




loadAllLevels();
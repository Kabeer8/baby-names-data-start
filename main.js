//Kabeer's copy
// Baby Names Data (Top 50 Boy/Girl 2022)
// Baby Center (babycenter.com)
// https://www.babycenter.com/baby-names/most-popular/top-baby-names#popularNameList

// Variables for html elements
let goBtn = document.getElementById("go-btn");
let menuSelect = document.getElementById("menu-select");
let container = document.getElementById("container");
let nameCountSpan = document.getElementById("name-count");

// Initialize Array of Character Objects from json file
let babyData = [];
fetch("baby-names-data.json")
  .then((res) => res.json())
  .then((data) => (babyData = data));

// Event Listener on Go Button
goBtn.addEventListener("click", goBtnClicked);

// Process Go Button Click
function goBtnClicked() {
  // Get Menu Selection
  let selection = menuSelect.value;

  // Process Menu Selection
  if (selection === "display-all") {
    displayAll();
  } else if (selection === "gender") {
    searchGender();
  } else if (selection === "rank") {
    searchRank();
  } else if (selection === "starting-letter") {
    searchStartingLetter();
  } else if (selection === "length") {
    searchLength();
  }
}

// Display All Baby Names
function displayAll() {
  nameCountSpan.innerHTML = "";
  let all = "";
  for (let i = 0; i < babyData.length; i++){
    all += babyProfile(babyData[i]);
  }
  container.innerHTML = all;
  nameCountSpan.innerHTML = babyData.length;
}

// Display Names by Gender
function searchGender() {
  nameCountSpan.innerHTML = "";
  console.log("Search By Gender");
  let gender = prompt("Which gender? (enter Boy or Girl)")
  let text = "";
  let counter = 0;
  for (let i = 0; i < babyData.length; i++){
    if(gender == babyData[i].gender){
      text += babyProfile(babyData[i]);
      counter += 1
    }
  }
  container.innerHTML = text;
  nameCountSpan.innerHTML = counter;

}

// Display Names within a Range of Ranks
function searchRank() {
  nameCountSpan.innerHTML = "";
  let counter = 0
  let min = prompt("Please enter a minimum rank:")
  let max = prompt("Please enter a maximum rank:")
  let text =""
  for (let i = 0; i < babyData.length; i++){
    if(babyData[i].rank >= min && babyData[i].rank <= max){
      text += babyProfile(babyData[i]);
      counter += 1
    }
  }
  container.innerHTML = text;
  nameCountSpan.innerHTML = counter;
}

// Display Names with Starting Letter
function searchStartingLetter() {
  let userLetter = prompt("Enter a letter (capitilized):");
  let text = "";
  nameCountSpan.innerHTML = "";
  let counter = 0;
  for (let i = 0; i < babyData.length; i++){
    if(babyData[i].name.startsWith(userLetter)){
      text += babyProfile(babyData[i]);
      counter += 1
    }
  }
  container.innerHTML = text;
  nameCountSpan.innerHTML = counter;
}

// Display Names with a Specific Length
function searchLength() {
  let userLength = prompt("Enter a name length:");
  let text = "";
  nameCountSpan.innerHTML = "";
  let counter = 0;
  for (let i = 0; i < babyData.length; i++){
    if(babyData[i].name.length == userLength){
      text += babyProfile(babyData[i]);
      counter += 1
    }
  }
  container.innerHTML = text;
  nameCountSpan.innerHTML = counter;
}

function babyProfile(baby){
  return `
  <div>
  <span class="bolded">${baby.name}</span> (Rank: ${baby.rank}, Gender: ${baby.gender}) 
  </div>`;
}

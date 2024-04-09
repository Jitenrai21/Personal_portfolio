const skillsData = ["HTML", "CSS", "JavaScript"];
const experienceData = [
    {position: "Manager", company: "Purba Paschim Construction and Suppliers", years: 3}
];
function displaySkills(){
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = "";
    skillsData.forEach(skill => {
        const li =document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
    });
}
function displayExperience(){
    const experienceList = document.getElementById("experience-list");
    experienceList.innerHTML = "";
    experienceData.forEach(exp => {
        const li = document.createElement("li");
        li.textContent = `${exp.position} at ${exp.company} (${exp.years} years)`;
        experienceList.appendChild(li);
    });
}
function addNewSkill(){
    const skillName = document.getElementById('name').value;
    console.log(skillName);
    // if(!skillName){
    //     alert('Enter a skill');
    //     return;
    // }
    document.getElementById('menu').innerHTML += `<li>${skillName}</li>`;
    document.getElementById('name').value = '';
}
document.getElementById('add-new-skill').addEventListener('click', addNewSkill());

const homeBtn = document.getElementById("home-btn");
homeBtn.addEventListener("click", function(){
    window.location.href = "index.html";
});
displaySkills();
displayExperience();
function toggleMenu(){
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

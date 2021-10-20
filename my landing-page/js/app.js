/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections =document.getElementsByTagName('section');
const nav = document.getElementById('navbar__list');
const lists = document.getElementsByTagName('li');
const as = document.getElementsByTagName('a');
const myButton=document.querySelector('button');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Add class 'active' to section in view
function activateSectionInView(active){
    for (section of sections){
        if (active==section.id){
                 section.classList.add('your-active-class');
        } else {    section.classList.remove('your-active-class');}
    }
};
/*
*
*/
//activate navigation bar
function activateActiveNabLi(active){
    for(a of as){
        if(a.getAttribute('href')=='#'+active){
            console.log(active);
            a.classList.add('your-active-class');
        } else {a.classList.remove('your-active-class');}
    }
};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//build the nav
function createNav(){
    for (section of sections){
    const newli= document.createElement('li');
    newli.className='navbar__menu';
    nav.appendChild(newli);
}};
/*
*
*/
//build menu
function addlinks(){    
    for (let x=1 ; x<=sections.length ; x++){        
        let newa = document.createElement('a');
        newa.textContent=sections[x-1].dataset.nav;
        newa.className='menu__link';            
        newa.setAttribute('href' , "#section"+x);
        lists[x-1].appendChild(newa);       
    }
};
/*
*
*
*/
///EVENTS
// Scroll to section on link click
nav.addEventListener('click', function (event){
    event.preventDefault();
    const t = event.target.textContent;
    for(section of sections){
        if(section.getAttribute('data-nav')==t){
        section.scrollIntoView({behavior:"smooth"});
    };
}});
/*
*
*/
//go to top button setting
myButton.addEventListener('click',function(){window.scrollTo({top:0 , left:0 , behavior:'smooth'})});
/*
*
*/
//functionality to distinguish the section in view.
    const myInfo ={
        root:null,
        rootMargin:"0px -45% 0px -45%",
        threshold:0.05
    };
    const observer = new IntersectionObserver(function myObserver(entries , observer){
        for(entry of entries){
            if(entry.isIntersecting){
                let active=entry.target.id;
                activateSectionInView(active);
                activateActiveNabLi(active);
            }
        }
    }
    , myInfo);
    for (section of sections){
    observer.observe(section);
    };
/*
*
*
*
*/
//calling main functions
createNav();
addlinks();
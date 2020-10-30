

  var slider = $id('.slider');
  var WIDTH = slider.offsetWidth;
  var ImgArr = slider.children[0].children[0].children;
  var xbtn = $id('.xbtn')
  var slider_btn = slider.children[1];
  var prev_btn = $id('.prev');
  var next_btn = $id('.next')
  var index = 0;

  for(var i=0 ; i<ImgArr.length ; i++){

      var span = document.createElement('span');
      span.className = "dot";

      span.index = i;
      xbtn.appendChild(span);

      ImgArr[i].style.left = WIDTH + 'px';
  }
  var spanArr = xbtn.children;
  spanArr[index].className = "dot dot_color";

  ImgArr[index].style.left = 0;

  slider_btn.onclick = function(e){
      e = e||window.event;
      var target = e.target||e.srcElement;
      if(target.className=="prev"){
          console.log("你点击了上一张按钮");
          var newIndex = index-1;
          if(newIndex<0){
              newIndex = ImgArr.length-1;
          }
          ImgArr[newIndex].style.left = -WIDTH + "px"
          animate(ImgArr[index],{left:WIDTH})
          animate(ImgArr[newIndex],{left:0});

          index = newIndex;
          light();
      }else if(target.className=="next"){
          console.log("you clicked the next image")
          nextImg();
      }else if(target.className.indexOf("dot")>-1){
          console.log("you clicked the dot, anad dot target is "+target.index);

          var newIndex = target.index;

          if(newIndex>index){

              ImgArr[newIndex].style.left = WIDTH + "px";

              animate(ImgArr[index],{left:-WIDTH})
              animate(ImgArr[newIndex],{left:0})
          }
          else if(newIndex<index){
              ImgArr[newIndex].style.left = -WIDTH + "px"
              animate(ImgArr[index],{left:WIDTH})
              animate(ImgArr[newIndex],{left:0})
          }
          index = newIndex;
          light();
      }
  }

  var timer = setInterval(nextImg,2000);
  document.onvisibilitychange = function(){
      if(document.visibilityState=="hidden"){
          clearInterval(timer)
      }
      if(document.visibilityState=="visible"){
          timer = setInterval(nextImg,2000);
      }
  }
  slider.onmouseenter = function(){
      clearInterval(timer);
  }
  slider.onmouseleave = function(){
      clearInterval(timer);
      timer = setInterval(nextImg,3000)
  }

  function light(){
      for(var i=0 ; i<ImgArr.length ;i++){
          spanArr[i].className = "dot"
      }
      spanArr[index].className = "dot dot_color"
  }
  function nextImg(){
      var newIndex = +index + 1;
      if(newIndex>ImgArr.length-1){
          newIndex = 0;
      }
      ImgArr[newIndex].style.left = WIDTH + "px";
      animate(ImgArr[index],{left:-WIDTH})
      animate(ImgArr[newIndex],{left:0})
      index = newIndex;
      light();
  }

  function $id(id){
  return document.querySelector(id)
}
function $ids(id){
  return document.querySelectorAll(id)
}
function getStyle(dom,attr){
  if(window.getComputedStyle){
      return window.getComputedStyle(dom,null)[attr];
  }else{
      return dom.currentStyle[attr]
  }
}

function animate(dom,json,fn){
  clearInterval(dom.timer)
  dom.timer = setInterval(function(){

      var flag = true;
      for(var attr in json){
          if(attr == "opacity"){
              var current = parseInt(getStyle(dom,attr)*100)
          }else{
              var current = parseInt(getStyle(dom,attr))
          }

          var target = parseInt(json[attr]);
          var speed = target>current?Math.ceil((target-current)/10):Math.floor((target-current)/10)

          if(attr == "zIndex"){
              var next = target;
          }else{
              var next = current + speed;
          }
          if(attr == "opacity"){
              dom.style.opacity = next/100;
              dom.style.filter = "alpha(opacity="+next+")"
          }else if(attr == "zIndex"){
              dom.style.zIndex = next;
          }else{
              dom.style[attr] = next + "px";
          }
          if(next != target){
              flag = false;
          }
      }
      if(flag){
          clearInterval(dom.timer);
          if(fn){
              fn()
          }
      }
  },1000/60)
}
function myFunction(){
  document.getElementById('more').style.display = "block";
}

function myFunction(){
  document.getElementById('more').style.display = "block";
}




//Task 7 funtion 2 by Steve Sun
function myFunction(info) {
  var hiddentext= document.getElementById(info);
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");


  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "view more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "view less";
    moreText.style.display = "inline";
  }

}



//from here is function 1 SearchBar. By Steve
//Web designer can change the contents in this list. this is our product
const Products = [

  {name: 'apple', url:'<a href="fruits.html" target="_blank" >click to view our fruits</a>', image:"images/apples.png"},
  {name: 'banana', url:'<a href="fruits.html" target="_blank" >click to view our fruits</a>', image:"images/banana.jpg"},

  {name: 'cucumber', url:'<a href="vegetables.html" target="_blank" >click to view our vegetables</a>', image:"images/cucumber.jpg"},
  {name: 'cabbage',url:'<a href="vegetables.html" target="_blank" >click to view our vegetables</a>', image:"images/cabbage.jpg"},
  {name: 'carrot',url:'<a href="vegetables.html" target="_blank" >click to view our vegetables</a>', image:"images/carrot.jpg"},
  {name: 'fruits',url:'<a href="fruits.html" target="_blank" >click to view our fruits</a>', image:"images/fruits.jpg"},
  {name: 'vegetables',url:'<a href="vegetables.html" target="_blank" >click to view our vegetables</a>', image:"images/vegetables.jpg"},
  {name: 'orange', url:'<a href="fruits.html" target="_blank" >click to view our fruits</a>', image:"images/orange.jpg"},
];
const searchInput = document.getElementById('search');//this search value entered by user
console.log(searchInput);

function searchBar() {
  var input = searchInput.value;
  console.log(input);
  var content = input.toLowerCase();
  console.log(content);
  // this variable tells if the search item in our list or not.
  let value_in_list = false;
  for (let product of Products) {
    //if content received from user in our product list, then return the link in a new paragraph
    if (product.name == content) {
      value_in_list = true;
      //change the value to display whatever we want to show our customers
      document.getElementById('result').innerHTML = product.url+"<br><br>"+"<img src=\'"+product.image+ "\'width=350px height=250px>";
      console.log(document.getElementById('result').innerHTML);

    }
  }
  if (value_in_list == false) {
    document.getElementById('result').innerHTML = "Product not found.<br>Would you like to:<br><a href='home.html'>Go to Home page</a><br><a href='fruits.html'>See what our fresh fruits</a><br><a href='vegetables.html'>See what our fresh vegetables</a><br>";

  }
}

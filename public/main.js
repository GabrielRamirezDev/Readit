var plusOne = document.getElementsByClassName("fas fa-dice-one");
var plusTwo = document.getElementsByClassName("fas fa-dice-two");
var plusThree = document.getElementsByClassName("fas fa-dice-three");
var plusFour = document.getElementsByClassName("fas fa-dice-four");
var plusFive = document.getElementsByClassName("fas fa-dice-five");
var trash = document.getElementsByClassName("fa-trash");
var comments = document.querySelector(".comments");
var comInput = document.querySelector("#comInput");
var comButton = document.querySelector(".comButton");
const bookmarks = document.getElementsByClassName("fas fa-bookmark");





Array.from(plusOne).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(plusTwo).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('plusTwo', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(plusThree).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('plusThree', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(plusFour).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('plusFour', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(plusFive).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('plusFive', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const title = this.parentNode.parentNode.childNodes[3].innerText
        const msg = this.parentNode.parentNode.childNodes[5].innerText
        const score = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'title': title,
            'msg': msg,
            'score': score
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



// comButton.addEventListener('click', (event) => {
//   event.preventDefault()
//   let comment = comInput.value;
//   let button = comButton.value;
//   console.log(comment)
//   fetch('/comments', {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     'comment': comment,
//     'id': button
//   })
//  })
// })

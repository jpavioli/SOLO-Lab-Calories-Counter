let users = []
const usersURL = 'http://localhost:3000/users'
fetchingUsers()

const divDropDown = document.querySelector('.dropdown')
const divUserInfo = document.querySelector('.userInfo')
const selectTag = document.createElement('select')
const newUserForm = document.querySelector('#newUserForm')

let opTitle = document.createElement('option')
opTitle.innerText = "Select a User"
opTitle.selected = true
opTitle.disabled = true
selectTag.append(opTitle)

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded!')

  selectTag.addEventListener('change', (e) => {
    //find a user and Use userInfo class to show user Info inside 'user-info' div
    let id = e.target.selectedIndex
    let selectedUser = users.find((user) => {return user.id == id})
    selectedUser.renderUserInfo()
  })
  divDropDown.append(selectTag)

  newUserForm.addEventListener('submit',(e) => {
    e.preventDefault()
    let name = e.target.children[0].value
    let image = e.target.children[1].value
    newUser(name,image)
    e.target.reset()
  })


})

//functions

  function fetchingUsers(){
      //request dara from server and call renderUser function for each user
      fetch(usersURL)
        .then((res)=>{return res.json()})
        .then((data)=>{
          data.forEach((user)=>{
            let userObj = new UserInfo(user.id,user.name,user.image,user.calories.total_calories)
            users.push(userObj)
            renderUser(user)
          })
        })
  }

  function renderUser(user){
    // creating and appending options to the selectTag for each User
    let opTitle = document.createElement('option')
    opTitle.innerText = user.name
    selectTag.append(opTitle)
  }

  function editCalories(user,newCal){
    fetch(`${usersURL}/${user.id}`,{
      method: 'PATCH',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify({
        "calories": {
          "total_calories": newCal
        }
      })
      })
      .then((resp)=>{return resp.json()})
      .then((data)=>{
        divUserInfo.children[0].children[2].innerText = data.calories.total_calories
      })
  }

  function newUser(name,image){
    fetch(usersURL,{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "calories": {
          "total_calories": 0
        }
      })
      })
      .then((resp)=>{return resp.json()})
      .then((user)=>{
        let userObj = new UserInfo(user.id,user.name,user.image,user.calories.total_calories)
        users.push(userObj)
        renderUser(user)
        userObj.renderUserInfo()
      })
  }

  function deleteUser(user){
    fetch(`${usersURL}/${user.id}`,{
      method: 'DELETE',
      headers: {
        'content-type':'application/json'
      }
      })
    users = users.filter((obj) => {return obj != user})
    let dropDownItem = document.querySelector('select').children[user.id]
    dropDownItem.remove()
    divUserInfo.innerHTML = ""
  }

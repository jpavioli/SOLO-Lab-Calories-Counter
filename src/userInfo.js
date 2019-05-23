class UserInfo{
  constructor(id,name,image,total_calories=0){
    this._id = id
    this.name = name
    this.image = image
    this.calories = new Calories()
    this.calories.total_calories = total_calories
  }

  get id(){
    return this._id
  }

  renderUserInfo(){
    //clear current content
    divUserInfo.innerHTML = ""
    //create div
    let div = document.createElement('div')
    //create name tag
    let nameTag = document.createElement('p')
    nameTag.innerText = this.name
    //create image tag
    let imgTag = document.createElement('img')
    imgTag.src = this.image
    //create calories tag
    let caloriesTag = document.createElement('h4')
    caloriesTag.innerText = this.calories.total_calories
    //create calories form
    let caloriesForm = document.createElement('form')
    let enterCals = document.createElement('input')
    enterCals.type = "text"
    enterCals.placeholder = "Enter Calories"
    let addCals = document.createElement('input')
    addCals.type = "submit"
    addCals.value = "Add Calories"
    caloriesForm.append(enterCals,addCals)
    caloriesForm.addEventListener('submit',(e) => {
      e.preventDefault()
      let name = e.target.parentElement.children[0].innerText
      let currentCal = e.target.parentElement.children[2].innerText
      let addCal = e.target.children[0].value
      let user = users.find((user)=>{return user.name == name})
      let newCal = parseInt(currentCal) + parseInt(addCal)
      // debugger
      editCalories(user,newCal)
      user.calories.total_calories = newCal
    })
    // create reset button
    let reset = document.createElement('button')
    reset.innerText = "Reset Calories"
    reset.addEventListener('click',(e)=>{
      e.preventDefault
      let name = e.target.parentElement.children[0].innerText
      let user = users.find((user)=>{return user.name == name})
      editCalories(user,0)
      user.calories.total_calories = 0
    })
    let delButton = document.createElement('button')
    delButton.innerText = "Delete User"
    delButton.addEventListener('click', (e)=>{
      let name = e.target.parentElement.children[0].innerText
      let user = users.find((user)=>{return user.name == name})
      deleteUser(user)
    })
    //append div
    div.append(nameTag,imgTag,caloriesTag,caloriesForm,reset,delButton)
    divUserInfo.append(div)
  }

}

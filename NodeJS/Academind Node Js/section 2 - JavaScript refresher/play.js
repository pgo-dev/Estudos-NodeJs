const person = {
  name: 'Paulo',
  age: 31,
  greet(){
    console.log('Hi, I am '+this.name)
  }
}

person.greet()

const hobbies = ['Sports', 'Cooking']

for(let hobby of hobbies){
  console.log(hobby)
}

console.log(hobbies.map(hobby => 'Hobby: ' + hobby))

const copiedArray = [...hobbies]
console.log(copiedArray)

const copiedPerson = {...person}
console.log(copiedPerson.name)

const toArray = (...args) => {
  return args
}
console.log(toArray(1, 2, 3, 4))
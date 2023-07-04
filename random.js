let barbers = { 
    barber1: {
      name: "John",
      price: 25,
      images: [{
        cut1: "img1",
        price: "price1"
      },
      {
        cut1: "img2",
        price: "price2"
      },
      {
        cut1: "img",
        price: "price2"
      }]},
      barber2: {
        name: "John",
        price: 25,
        images: [{
          cut1: "img1",
          price: "price1"
        },
        {
          cut1: "img2",
          price: "price2"
        },
        {
          cut1: "img",
          price: "price2"
        }]}
}
   

      services: "Massage, pedicure, manicure"
    },
    {
      name: "Emily",
      age: 30,
      profession: "Teacher"
    },
    {
      name: "Michael",
      age: 40,
      profession: "Doctor"
    },
    {
      name: "Sophia",
      age: 22,
      profession: "Student"
    },
    {
      name: "David",
      age: 35,
      profession: "Architect"
    }
  ];
  persons[0].name = "mary";
  console.log(persons);

//   let details = persons.map((person)=>{
    
//     return `${person.name} is ${person.age} yo and is a ${profession} by profession`
// } )


myarray = [12,23,45,56]
console.log(myarray.join(" | "));





const oldPersons = persons.find((person) => person.age >70)
console.log(oldPersons)
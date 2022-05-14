const pet = {
  name: "syra",
};
pet.toJSON = function () {
  return "surya";
};
console.log(JSON.stringify(pet));

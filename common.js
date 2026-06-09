const IMG = {
  children: "assets/children.webp",
  girls: "assets/girls.webp",
  team: "assets/team.webp",
  hands: "assets/hands.webp",
  child: "assets/child.webp",
  doctor: "assets/doctor.webp",
  man: "assets/man.webp",
  flower: "assets/flower.webp",
  group: "assets/group.webp",
  field: "assets/field.webp",
  food: "assets/food.webp",
  contact: "assets/contact.webp",
  volunteer: "assets/volunteer.webp",
  portrait1: "assets/portrait1.webp",
  portrait2: "assets/portrait2.webp",
  portrait3: "assets/portrait3.webp",
  portrait4: "assets/portrait4.webp"
};

document.querySelectorAll("[data-img]").forEach((node) => {
  node.src = IMG[node.dataset.img];
});

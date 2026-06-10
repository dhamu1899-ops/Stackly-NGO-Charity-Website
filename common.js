const IMG = {
  children: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1100&q=80",
  girls: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1100&q=80",
  team: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=80",
  hands: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1100&q=80",
  child: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1100&q=80",
  doctor: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=80",
  man: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1100&q=80",
  flower: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1100&q=80",
  group: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1100&q=80",
  field: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1100&q=80",
  food: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1100&q=80",
  contact: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?auto=format&fit=crop&w=1300&q=80",
  volunteer: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  portrait1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  portrait2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  portrait3: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  portrait4: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
};

document.querySelectorAll("[data-img]").forEach((node) => {
  node.src = IMG[node.dataset.img];
});

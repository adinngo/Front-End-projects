const gallery = document.querySelector(".gallery");
const anchor = [
  {
    href: "https://i.redd.it/mi09cbl10tsd1.jpeg",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg",
  },
  {
    href: "https://i.redd.it/vqj7wfc7m10e1.jpeg",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/2.jpg",
  },
  {
    href: "https://preview.redd.it/2016-stephen-curry-v0-yl5vuskr6rzd1.jpeg?auto=webp&s=b3ff81e64dfa5fb9acafbe873032de6c76bcc8c2",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/3.jpg",
  },
  {
    href: "https://www.redgifs.com/watch/spitefulsalmonrasbora",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/4.jpg",
  },
  {
    href: "https://www.redgifs.com/watch/shockedharmlessnorthernhairynosedwombat",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/5.jpg",
  },
  {
    href: "https://preview.redd.it/tckr6b2omwzd1.jpeg?auto=webp&s=45fb868df5a23a4335f1e42caf943526d39e9117",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/6.jpg",
  },
  {
    href: "https://www.redgifs.com/watch/grimyshyguineafowl",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/7.jpg",
  },
  {
    href: "https://www.redgifs.com/watch/comfortablewobblyreptile",
    bgImage: "https://cdn.freecodecamp.org/curriculum/css-photo-gallery/8.jpg",
  },
];
gallery.innerHTML = "";
anchor.forEach((item, index) => {

  gallery.innerHTML += `
    <a href="${item.href}" class="link-${index}" target="_blank">
      <button>View full image</button>
    </a>
  `;
  document.querySelector(`.link-${index}`).style.backgroundImage = `url("${item.bgImage}")`;
})



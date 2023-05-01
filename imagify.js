const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { faker } = require("@faker-js/faker");
const input = "./arts";
const output = "./outputs";

let image_counter = 1;

const imageSize = { width: 500, height: 500 }; // 500px X 500px -> replace with custom values
const desiredExtension = ".webp";
const base_url =
  "https://ipfs.io/ipfs/QmYT9jFFMFgURUZu6QkXnjpmTSTQj2rCGqH65GvZdnC922";
const attributes = {
  weapons: [
    "Stick",
    "Knife",
    "Axe",
    "Sword",
    "Spear",
    "Blade",
    "Club",
    "FlameThrower",
    "Sniper",
    "Gun",
  ],

  environment: [
    "Space",
    "Mountain",
    "Studio",
    "Sky",
    "Desert",
    "Forest",
    "Grassland",
    "Pond",
    "Ocean",
    "Rainforest",
  ],

  rarity: Array.from(Array(10).keys()),
};

fs.readdirSync(input).forEach((file) => {
  const original_ext = path.extname(file);
  const original_file_name = path.basename(file).split(".")[0];

  if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(original_ext)) {
    const id = image_counter;
    const metadata = {
      id,
      name: `Doge NFT #${id}`,
      description:
        "Cool Crypto Doge NFT Collection. Mint and collect the funkiest NFTs around",
      price: 1,
      image: base_url + id + desiredExtension,
      demand: faker.random.numeric({ min: 10, max: 100 }),
      attributes: [
        {
          trait_type: "environment",
          value: attributes.environment.sort(() => 0.5 - Math.random())[0],
        },
        {
          trait_type: "weapons",
          value: attributes.weapons.sort(() => 0.5 - Math.random())[0],
        },
        {
          trait_type: "rarity",
          value: attributes.rarity.sort(() => 0.5 - Math.random())[0],
          max_value: 10,
        },
        {
          display_type: "date",
          trait_type: "Created",
          value: Date.now(),
        },
        {
          display_type: "number",
          trait_type: "generation",
          value: 1,
        },
      ],
    };

    if (fs.existsSync(`${input}/${original_file_name + original_ext}`)) {
      sharp(`${input}/${original_file_name + original_ext}`)
        .resize(imageSize.height, imageSize.width)
        .toFile(`${output}/images/${id + desiredExtension}`, (err, info) =>
          console.log(err)
        );

      fs.writeFileSync(
        `${output}/metadata/${id}.json`,
        JSON.stringify(metadata),
        {
          encoding: "utf-8",
          flag: "w",
        }
      );
    }

    image_counter++;
  }
});

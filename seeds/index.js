const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dotenv = require('dotenv');
const dbUrl = dotenv.config({ path: "./.env"}).parsed.DB_URL;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: '673d10889dc350b1b0100618',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      defaultImage: {
        url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1733416861/cliffside_kvzzpf_xaxwxn.jpg',
        filename: 'cliffside'
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1733416862/rolling_hills_zbaxqh_ghde0u.jpg',
          filename: 'rolling_hills'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1733416861/rocky_outcrop_cv3qkm_nebajr.jpg',
          filename: 'rocky_outcrop'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1733416861/maliaa8yev3mvt1xg32z_osc1tr.jpg',
          filename: 'Surfers_Paradise'
        }
      ],
      description: 'lorem ipsum dolar sit lorem ipsum dolar sit lorem ipsum dolar sit lorem ipsum dolar sit.',
      price: price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
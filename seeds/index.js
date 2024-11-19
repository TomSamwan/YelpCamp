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
      images: [
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1730921320/rolling_hills_zbaxqh.jpg',
          filename: 'rolling_hills_zbaxqh'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1730574022/YELPCAMP/gymcurorp921q6qqh1he.jpg',
          filename: 'gymcurorp921q6qqh1he'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1730921244/cliffside_kvzzpf.jpg',
          filename: 'cliffside_kvzzpf'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1731796575/Jungle_Bridge_lkonbk.jpg',
          filename: 'Jungle_Bridge_lkonbk'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1731796574/Liminal_Football_xfm6bl.jpg',
          filename: 'Liminal_Football_xfm6bl'
        },
        {
          url: 'https://res.cloudinary.com/dmbtvzmaz/image/upload/v1731796574/Murky_Track_kfcuoz.jpg',
          filename: 'Murky_Track_kfcuoz'
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
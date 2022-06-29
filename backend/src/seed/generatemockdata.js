const fsp = require('fs').promises;
const { join } = require('path');
const artists = require('./data/artists.json'); //.slice(0, 5);
const customers = require('./data/customers.json'); //.slice(0, 10);
const paintings = require('./data/paintings.json'); //.slice(0, 20);

const data = {
  artists: [],
  customers: [],
  orders: [],
  paintings: [],
  photos: [],
  users: []
}

const ptypes = ['olaj', 'akvarell', 'rézkarc']
const minCount = [1, 1, 10];
const maxCount = [1, 1, 100];
const rnd = maxExclude => Math.floor(Math.random() * maxExclude);

data.artists = artists
  .map(artist => ({
    ...artist,
    otherInfo: ''
  }))
  .filter((e, idx, array) =>
    !array.slice(0, idx)
    .find(ee => ee.artistName === e.artistName)
  )

data.customers = customers.map(customer => ({
  ...customer,
  password: ''
}))

data.paintings = paintings.map(painting => {
  const pidx = rnd(ptypes.length);
  const mic = minCount[pidx];
  const mac = maxCount[pidx];
  const count = mic + Math.round((mac - mic) / mic * Math.random()) * mic;
  return {
    ...painting,
    artist: rnd(data.artists.length),
    type: ptypes[pidx],
    count,
    stock: count,
    price: 10000 + Math.round(Math.random() * 500) * 1000
  };
})

data.users = [{
    email: 'root@test.hu',
    role: 'root',
    password: 'root'
  },
  {
    email: 'edit@test.hu',
    role: 'edit',
    password: 'edit'
  },
  {
    email: 'read@test.hu',
    role: 'read',
    password: 'read'
  },
  {
    email: 'test@test.hu',
    role: 'none',
    password: 'test'
  },
];

const numberOfPaintings = [...Array(30).fill(1), ...Array(6).fill(2), ...Array(2).fill(3), 4, 5];

const pickPainting = () => {
  const currentPaintings = data.paintings.filter(e => e.stock > 0);
  const p = currentPaintings[rnd(currentPaintings.length)];
  if (p){
    p.stock--;
    return p;
  } else
    throw new Error("No more Painting!");
};

const ordrerStatusArray = ['megrendelve', 'feldolgozva', 'leszállítva'];
const billStatusArray = ['kiállítva', 'kifizetve'];
const billNumStr = '2022/'
let billNum = 1;
//order
const customerIndices = data.customers.map((e, index) => index);
for (let i = 0; i < data.customers.length / 3 + rnd(data.customers.length / 4); i++)
  customerIndices.push(rnd(data.customers.length));
customerIndices.forEach( customerIndex => {
  const np = numberOfPaintings[rnd(numberOfPaintings.length)];
  let cart = [];
  for (let i = 0; i < np; i++)
    cart.push(pickPainting());
  const price = cart.reduce((prev, p) => prev + p.price, 0);
  const statusIndex = rnd(ordrerStatusArray.length);
  let billStatus = '';
  let bill = '';
  if (statusIndex > 0) {
    billStatus = billStatusArray[rnd(billStatusArray.length)]
    bill = billNumStr + String(billNum++).padStart(5, '0');
  }
  const order = {
    customer: customerIndex,
    paintings: cart.map(p => data.paintings.indexOf(p)),
    remark: '',
    status: ordrerStatusArray[statusIndex],
    bill,
    billStatus,
    price,
  }
  data.orders.push(order);
});

fsp.writeFile(join(__dirname, 'generated.json'), JSON.stringify(data), { encoding: 'utf-8'})
  .then(() => console.log('end.'))
  .catch(err => console.error(err));


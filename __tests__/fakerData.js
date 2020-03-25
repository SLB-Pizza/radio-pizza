import faker from "faker";

const fakeData = () => {
  let dataCollection = [];

  for (let i = 0; i < 10; i++) {
    let item = {};

    item.dj = faker.fake("{{hacker.adjective}}{{hacker.phrase}}");
    item.image = faker.image.imageUrl();
    item.twitter = faker.internet.userName();
    item.instagram = item.twitter;

    dataCollection.push(item);
  }
  return dataCollection;
};

export default fakeData;

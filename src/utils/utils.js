import XMLParser from 'react-xml-parser';

const headers = new Headers();
headers.append("Authorization", "Basic ");
// headers.append("Cookie", "dhusAuth=130dc8f0bad262305edbffa2f9d4309d; dhusIntegrity=ff2b0fc07858dbd2bbf3928311760859179fdd19");

const requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

let numberOfImages = 0;
const totalNumberOfImages = 2;

/** fetching data from API and calling prepare data function */
const fetchImage = async () => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`https://scihub.copernicus.eu/dhus/search?q=(platformname:Sentinel-2%20AND%20cloudcoverpercentage:[0%20TO%2030]%20AND%20producttype:S2MSI1C AND footprint:"Intersects(POLYGON((34.393 31.195, 34.385 31.195, 34.385 31.190, 34.393 31.190, 34.393 31.195)))")`, requestOptions)
        .then(res => res.text())
        .then(data => {
          const xml = new XMLParser().parseFromString(data);
          resolve(prepareData(xml.children));
        })
        .catch(err => console.log(err));
    }
    catch (err) {
      console.error(err);
      reject(err);
    }
  })
};

/** running over API response, find data and build new array */
function prepareData(items) {
  const newImages = [];
  for (const item of items) {
    if (item.name === 'entry' && numberOfImages < totalNumberOfImages) {
      const carrentURL = item.children.find(item => item.attributes.rel === 'icon');
      const currentGEOLocation = item.children.find(item => item.attributes.name === 'footprint');
      newImages.push({ itemUrl: carrentURL.attributes.href, coordinates: currentGEOLocation.value.replace('MULTIPOLYGON (((', '').replace(')))', '') });
      numberOfImages++;
    }
  }
  return newImages;
}
export default fetchImage;
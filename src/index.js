import ListItem from './item';

(async () => {
    const res = await fetch('/onate-in-new-mexico/data/data.geojson');
    const data = await res.json();
    for (const feature of data.features) {
        new ListItem(feature);
    }
})().catch(err => {
    console.error(err);
});
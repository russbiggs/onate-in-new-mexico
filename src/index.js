import ListItem from './item';

(async () => {
    const res = await fetch('../data/data.geojson');
    const data = await res.json();
    for (const feature of data.features) {
        new ListItem(feature);
    }
})().catch(err => {
    console.error(err);
});
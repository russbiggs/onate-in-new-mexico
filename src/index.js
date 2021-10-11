import ListItem from './item';
import data from './data';

{
    for (const feature of data.features) {
        new ListItem(feature);
    }
}
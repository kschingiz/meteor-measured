import { Meteor } from 'meteor/meteor';
import createMeteorMetrics from './metrics/meteor';

function measured(registry) {
  Meteor.startup(() => {
    createMeteorMetrics(Meteor, registry);
  });
}

export default measured;

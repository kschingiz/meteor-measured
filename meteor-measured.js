import { Meteor } from 'meteor/meteor';
import createMeteorMetrics from './metrics/meteor';

function measured(registry, customDimensions, reportingIntervalInSeconds) {
  Meteor.startup(() => {
    createMeteorMetrics(Meteor, registry, customDimensions, reportingIntervalInSeconds);
  });
}

export default measured;

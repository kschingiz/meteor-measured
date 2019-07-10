import { Meteor } from 'meteor/meteor';
import createMeteorMetrics, {
  createObserverMetrics,
  createSessionMetrics,
  createSocketMetrics
} from './metrics/meteor';

function measured(registry, customDimensions, reportingIntervalInSeconds) {
  Meteor.startup(() => {
    createMeteorMetrics(Meteor, registry, customDimensions, reportingIntervalInSeconds);
  });
}

export { createObserverMetrics, createSessionMetrics, createSocketMetrics };
export default measured;

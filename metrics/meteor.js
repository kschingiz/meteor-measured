import { Gauge } from 'measured-core';
import reportSessionMetrics from './reportSessionMetrics';
import reportSocketMetrics from './reportSocketMetrics';
import reportObserversMetrics from './reportObserversMetrics';

const meteorMetrics = {
  'sessions.count': (Meteor, registry) => new Gauge(() => reportSessionMetrics(Meteor, registry)),
  'sockets.open': (Meteor, registry) => new Gauge(() => reportSocketMetrics(Meteor, registry)),
  'observers.handles': (Meteor, registry) =>
    new Gauge(() => reportObserversMetrics(MongoInternals, registry))
};

export default function createMeteorMetrics(
  Meteor,
  metricsRegistry,
  customDimensions,
  reportingIntervalInSeconds
) {
  customDimensions = customDimensions || {};

  Object.keys(meteorMetrics).forEach(metricName => {
    metricsRegistry.register(
      metricName,
      meteorMetrics[metricName](Meteor, metricsRegistry),
      customDimensions,
      reportingIntervalInSeconds
    );
  });
}

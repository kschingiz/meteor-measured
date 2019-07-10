import reportSessionMetrics from './reportSessionMetrics';
import reportSocketMetrics from './reportSocketMetrics';
import reportObserversMetrics from './reportObserversMetrics';

export function createSessionMetrics(Meteor, registry, dimensions, reportingIntervalInSeconds) {
  registry.getOrCreateGauge(
    'sessions.count',
    () => reportSessionMetrics(Meteor, registry),
    dimensions,
    reportingIntervalInSeconds
  );
}

export function createSocketMetrics(Meteor, registry, dimensions, reportingIntervalInSeconds) {
  registry.getOrCreateGauge(
    'sockets.count',
    () => reportSocketMetrics(Meteor, registry),
    dimensions,
    reportingIntervalInSeconds
  );
}

export function createObserverMetrics(Meteor, registry, dimensions, reportingIntervalInSeconds) {
  registry.getOrCreateGauge(
    'observers.handles',
    () => reportObserversMetrics(MongoInternals, registry),
    dimensions,
    reportingIntervalInSeconds
  );
}

export default function createMeteorMetrics(
  Meteor,
  metricsRegistry,
  customDimensions,
  reportingIntervalInSeconds
) {
  customDimensions = customDimensions || {};

  createSessionMetrics(Meteor, metricsRegistry, customDimensions, reportingIntervalInSeconds);
  createSocketMetrics(Meteor, metricsRegistry, customDimensions, reportingIntervalInSeconds);
  createObserverMetrics(Meteor, metricsRegistry, customDimensions, reportingIntervalInSeconds);
}

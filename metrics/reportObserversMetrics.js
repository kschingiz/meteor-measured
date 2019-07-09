export default function reportObservers(MongoInternals, registry) {
  const multiplexers = MongoInternals.defaultRemoteCollectionDriver().mongo._observeMultiplexers;

  let handlesCount = 0;

  const observerStats = {};

  const logStat = function(driver, collectionName) {
    const driverType = `observers.${driver}`;

    observerStats[driverType] = observerStats[driverType] || 0;
    observerStats[driverType] += 1;

    const collectionStat = `${driverType}.${collectionName}`;

    observerStats[collectionStat] = observerStats[collectionStat] || 0;
    observerStats[collectionStat] += 1;
  };

  Object.values(multiplexers).forEach(muxer => {
    const handles = muxer._handles;

    Object.values(handles).forEach(handle => {
      handlesCount += 1;

      const driver = handle._observeDriver || muxer._observeDriver;
      const { collectionName } = driver._cursorDescription;
      if (driver._usesOplog) {
        logStat('oplogObserver', collectionName);
      } else {
        logStat('pollingObserver', collectionName);
      }
    });
  });

  Object.keys(observerStats).forEach(statKey => {
    const value = observerStats[statKey];

    registry.getOrCreateSettableGauge(statKey).setValue(value);
  });

  return handlesCount;
}

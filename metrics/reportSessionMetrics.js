import _ from 'underscore';
import { getObject, getArray } from './../util';

export default function reportSessionMetrics(Meteor, registry) {
  const sessionsObject = getObject(Meteor.default_server.sessions);
  const subsCount = {};
  const docsCount = {};

  _.each(sessionsObject, session => {
    const namedSubs = getObject(session._namedSubs);

    _.each(namedSubs, sub => {
      subsCount[sub._name] = subsCount[sub._name] ? subsCount[sub._name] + 1 : 1;
      const subDocs = getObject(sub._documents);

      _.each(subDocs, ([key, docsSet]) => {
        const docsArray = getArray(docsSet);
        if (!docsCount[key]) {
          docsCount[key] = 0;
        }
        docsCount[key] += docsArray.length;
      });
    });
  });

  _.keys(docsCount).forEach(key => {
    const docsValue = docsCount[key];
    registry.getOrCreateSettableGauge(`pubsub.docs.${key}`).setValue(docsValue || 0);
  });

  const publications = Meteor.server.publish_handlers;
  _.keys(publications).forEach(publicationName => {
    registry
      .getOrCreateSettableGauge(`pubsub.${publicationName}`)
      .setValue(subsCount[publicationName] || 0);
  });

  return _.keys(sessionsObject).length;
}

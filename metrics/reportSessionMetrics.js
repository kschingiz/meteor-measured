import { getObject, getArray } from './../util';

export default function reportSessionMetrics(Meteor, registry) {
  const sessionsObject = getObject(Meteor.server.sessions);
  const subsCount = {};
  const docsCount = {};

  Object.keys(sessionsObject).forEach(sessionKey => {
    const session = sessionsObject[sessionKey];

    const namedSubs = getObject(session._namedSubs);

    Object.keys(namedSubs).forEach(namedSubKey => {
      const sub = namedSubs[namedSubKey];
      subsCount[sub._name] = subsCount[sub._name] ? subsCount[sub._name] + 1 : 1;
      const subDocs = getObject(sub._documents);

      Object.keys(subDocs).forEach(key => {
        const docsSet = subDocs[key];
        const docsArray = getArray(docsSet);
        if (!docsCount[key]) {
          docsCount[key] = 0;
        }
        docsCount[key] += docsArray.length;
      });
    });
  });

  Object.keys(docsCount).forEach(key => {
    const docsValue = docsCount[key];
    registry.getOrCreateSettableGauge(`pubsub.docs.${key}`).setValue(docsValue || 0);
  });

  const publications = Meteor.server.publish_handlers;
  Object.keys(publications).forEach(publicationName => {
    registry
      .getOrCreateSettableGauge(`pubsub.${publicationName}`)
      .setValue(subsCount[publicationName] || 0);
  });

  return Object.keys(sessionsObject).length;
}

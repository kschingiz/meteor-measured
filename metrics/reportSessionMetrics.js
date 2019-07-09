export default function reportSessionMetrics(Meteor, registry) {
  const { sessions } = Meteor.default_server;
  const subsCount = {};
  const docsCount = {};

  const sessionsValues = Array.from(sessions.values());

  sessionsValues.forEach(session => {
    const namedSubs = Array.from(session._namedSubs.values());
    namedSubs.forEach(sub => {
      subsCount[sub._name] = subsCount[sub._name] ? subsCount[sub._name] + 1 : 1;

      const subDocs = Array.from(sub._documents.entries());
      subDocs.forEach(([key, docsSet]) => {
        if (!docsCount[key]) {
          docsCount[key] = 0;
        }
        docsCount[key] += docsSet.size;
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

  return sessions.size;
}

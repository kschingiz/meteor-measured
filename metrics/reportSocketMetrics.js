export default function reportSessionMetrics(Meteor, registry) {
  const sockets = Meteor.default_server.stream_server.open_sockets;

  const liveDataSockets = sockets.filter(socket => !!socket._meteorSession).length;
  registry.getOrCreateSettableGauge('sockets.liveData').setValue(liveDataSockets || 0);

  return sockets.length;
}

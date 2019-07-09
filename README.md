# Meteor-measured

The library will collect meteor specific metrics using [node-measured](https://github.com/yaorg/node-measured) library.

It's metrics platform agnostic so you can use it with any metrics software you want: signalfx, graphite, prometheus, etc...

## Install

```bash
meteor npm --save install measured-core
meteor npm --save install measured-reporting

meteor add kschingiz:meteor-measured
```

## Requirements

The library was well tested on Meteor 1.8 version, maybe it will work on older versions.

## Usage

You will need to build measured reporter and pass it to `meteor-measured`:

### Step 1:

```js
import { SelfReportingMetricsRegistry, LoggingReporter } from 'measured-reporting';
const registry = new SelfReportingMetricsRegistry(
  new LoggingReporter({
    defaultDimensions: {
      hostname: os.hostname()
    }
  })
);
```

### Step 2:

```js
import meteorMeasured from 'meteor/kschingiz:meteor-measured';

meteorMeasured(registry);
```

`meteorMeasured` arguments

```js
meteorMeasured(registry, customDimensions, reportingInterval);
```

## Reported metrics

Those metrics collected and reported

Sockets Metrics:

1. Open sockets: 10 sockets open
2. Live data sockets: 8 sockets uses livedata

Session Metrics:

1. Sessions count: 8 meteor sessions

Pub/sub Metrics:

1. Subscriptions count: 100 subscriptions
2. Subscriptions count for each publication: testPub: 20 subs, notTestPub: 80 subs
3. Published documents: 20 docs published
4. Published documents for each collection: 10 docs of TestCollection published, 10 docs of NotTestCollection published

Observer Metrics:

1. Number of observers: 20 observers created
2. Number Observer drivers: Oplog drivers: 10, Polling drivers: 10
3. Number of documents for each driver: TestCollection published by oplog driver: 10

## Not reported metrics

Please note that the library will not collect and report those metrics:

1. Node process metrics: CPU usage, RAM usage, etc...
2. OS metrics: average free memoty, etc...

They are NOT Meteor specific, if you want to collect them, install and use [measured-node-metrics](https://github.com/yaorg/node-measured/tree/master/packages/measured-node-metrics):

```bash
meteor npm i --save measured-node-metrics
```

## Reporters

Those reporters are available for usage:

1. [LoggingReporter](https://yaorg.github.io/node-measured/LoggingReporter.html)
2. [SignalFx Reporter](https://yaorg.github.io/node-measured/packages/measured-signalfx-reporter/)

You will need to develop your own reporter implementation if you want to report to graphite, prometheus, etc...

## TODO

1. Tests

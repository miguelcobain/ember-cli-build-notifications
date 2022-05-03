'use strict';

const nodeNotifier = require('node-notifier');
const path = require('path');
const merge = require('./merge');
const totalTime = require('./total-time');
const notificationGroup = 'ember-cli-build-notifications';

module.exports = {
  buildSuccess(results, options) {
    const notifier = (options && options.notifier) || nodeNotifier;
    let notificationOptions = {
      title: 'Build Succeeded',
      message: 'Build Time: ' + totalTime(results),
      appIcon: path.resolve(__dirname, '..', 'ember-logo.png'),
      group: notificationGroup,
    };

    if (options && options.notificationOptions) {
      notificationOptions = merge(
        notificationOptions,
        options.notificationOptions
      );
    }

    return notifier.notify(notificationOptions);
  },

  buildError(error, options) {
    const notifier = (options && options.notifier) || nodeNotifier;
    let notificationOptions = {
      title: 'Build Failed',
      subtitle: error.file,
      message: error.toString(),
      appIcon: path.resolve(__dirname, '..', 'ember-logo.png'),
      group: notificationGroup,
    };

    if (options && options.notificationOptions) {
      notificationOptions = merge(
        notificationOptions,
        options.notificationOptions
      );
    }

    return notifier.notify(notificationOptions);
  },
};

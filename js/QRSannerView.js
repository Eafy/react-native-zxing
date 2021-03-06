/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  requireNativeComponent,
  View,
  NativeModules,
  Platform,
  DeviceEventEmitter
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ScannerView extends Component {
  static propTypes = {
    ...View.propTypes,
    framingRatioRect: PropTypes.object,
    isStartScan: PropTypes.bool,
    isOpenFlash: PropTypes.bool,
    scanAudioFile:PropTypes.string,
    rereadQR: PropTypes.object,
    onScanResult:PropTypes.func,
    onScanError:PropTypes.func
  };

  static defaultProps = {
    isStartScan: true,
    isOpenFlash: false,
    rereadQR:{
        reread: true,
        time: 1.0
    }
  };

  constructor() {
    super();
  }

  _onChange(event) {
    if (typeof this.props[event.nativeEvent.type] === 'function') {
      this.props[event.nativeEvent.type](event.nativeEvent.params);
    }
  }

  render() {
    return <QRScannerView {...this.props} onChange={this._onChange.bind(this)}/>;
  }
}

const QRScannerView = requireNativeComponent('QRScannerView', ScannerView, {
  nativeOnly: {onChange: true}
});


/**
 * Mageplaza
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Mageplaza.com license that is
 * available through the world-wide-web at this URL:
 * https://www.mageplaza.com/LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Mageplaza
 * @package     Mageplaza_Osc
 * @copyright   Copyright (c) 2016 Mageplaza (http://www.mageplaza.com/)
 * @license     https://www.mageplaza.com/LICENSE.txt
 */

define(['ko', 'uiElement', 'underscore'],
    function (ko, uiElement, _) {
        'use strict';

        var provider = uiElement();

        return function () {
            var model = {
                observables: {},
                initialize: function () {
                    this.getObservable('alreadyAdded')(false);
                    var message = window.checkoutConfig.oscConfig.giftMessageOptions.giftMessage.hasOwnProperty('orderLevel')
                        ? window.checkoutConfig.oscConfig.giftMessageOptions.giftMessage['orderLevel']
                        : null;
                    if (_.isObject(message)) {
                        this.getObservable('recipient')(message.recipient);
                        this.getObservable('sender')(message.sender);
                        this.getObservable('message')(message.message);
                        this.getObservable('alreadyAdded')(true);
                    }
                },
                getObservable: function (key) {
                    this.initObservable('message-orderLevel', key);
                    return provider[this.getUniqueKey('message-orderLevel', key)];
                },
                initObservable: function (node, key) {
                    if (node && !this.observables.hasOwnProperty(node)) {
                        this.observables[node] = [];
                    }
                    if (key && this.observables[node].indexOf(key) == -1) {
                        this.observables[node].push(key);
                        provider.observe(this.getUniqueKey(node, key));
                    }
                },
                getUniqueKey: function (node, key) {
                    return node + '-' + key;
                },
                getConfigValue: function (key) {
                    return window.checkoutConfig.oscConfig.giftMessageOptions.hasOwnProperty(key) ?
                        window.checkoutConfig.oscConfig.giftMessageOptions[key]
                        : null;
                },

                /**
                 * Check if gift message can be displayed
                 *
                 * @returns {Boolean}
                 */
                isGiftMessageAvailable: function () {
                    return this.getConfigValue('isOrderLevelGiftOptionsEnabled');
                }
            };
            model.initialize();
            return model;
        }
    }
);

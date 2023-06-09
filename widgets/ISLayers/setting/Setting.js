///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'jimu/BaseWidgetSetting',
    'dijit/_WidgetsInTemplateMixin', 'dijit/form/CheckBox', "dijit/registry", "dojo/dom-construct",
    'dijit/form/TextBox',
],
        function (
                declare,
                BaseWidgetSetting,
                _WidgetsInTemplateMixin, CheckBox, registry, domConstruct) {
            return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
                baseClass: 'jimu-widget-ImageLayers-setting',
                startup: function () {
                    this.inherited(arguments);
                    this.createConfig();
                    this.setConfig(this.config);
                },
                createConfig: function () {
                    this.inherited(arguments);
                    var mainLayers = this.map.itemInfo.itemData.operationalLayers;
                    registry.byId("primaryLayerSelect").addOption({label: this.nls.selectLayer, value: ""});
                    registry.byId("secondaryLayerSelect").addOption({label: this.nls.selectLayer, value: ""});
                    for (var a in mainLayers) {
                        if ((mainLayers[a].layerObject && mainLayers[a].layerObject.serviceDataType && mainLayers[a].layerObject.serviceDataType.substr(0, 16) === "esriImageService") || (mainLayers[a].layerType && mainLayers[a].layerType === "ArcGISImageServiceLayer")) {
                            if (((mainLayers[a].title).charAt(mainLayers[a].title.length - 1)) !== "_") //if(!(((mainLayers[a].title).toLowerCase()).includes("_result")))
                            registry.byId("primaryLayerSelect").addOption({label: mainLayers[a].title, value: mainLayers[a].id});
                            registry.byId("secondaryLayerSelect").addOption({label: mainLayers[a].title, value: mainLayers[a].id});
                        }
                    }
                },
                setConfig: function (config) {
                    this.config = config;
                    registry.byId("primaryLayerSelect").set("value", config.primaryLayer);
                    registry.byId("secondaryLayerSelect").set("value", config.secondaryLayer);
                },
                getConfig: function () {
                    this.config.primaryLayer = registry.byId("primaryLayerSelect").get("value");
                    this.config.secondaryLayer = registry.byId("secondaryLayerSelect").get("value");
                    var mainLayers = this.map.itemInfo.itemData.operationalLayers;
                    this.map.resultLayer = false;
                    this.map.primaryLayer = this.config.primaryLayer;
                    this.map.secondaryLayer = this.config.secondaryLayer;
                    return this.config;
                }
            });
        });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAdmobNativeAdsGradle = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const path_1 = require("path");
const fs_1 = require("fs");
const withAdmobNativeAdsAppBuildGradle = (config) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'android',
        (cfg) => {
            const { platformProjectRoot } = cfg.modRequest;
            const build = (0, path_1.resolve)(platformProjectRoot, 'app/build.gradle');
            const contents = (0, fs_1.readFileSync)(build, 'utf-8');
            const lines = contents.split('\n');
            const index = lines.findIndex((line) => /dependencies\s{/.test(line));
            (0, fs_1.writeFileSync)(build, [
                ...lines.slice(0, index + 1),
                `    implementation "com.google.android.gms:play-services-ads:21.3.0"`,
                ...lines.slice(index + 1),
            ].join('\n'));
            return cfg;
        }
    ]);
};
const withAdmobNativeAdsGradle = (config) => {
    return (0, config_plugins_1.withPlugins)(config, [
        withAdmobNativeAdsAppBuildGradle,
    ]);
};
exports.withAdmobNativeAdsGradle = withAdmobNativeAdsGradle;

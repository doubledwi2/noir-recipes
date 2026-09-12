// Some third-party native modules (react-native-google-mobile-ads,
// react-native-safe-area-context) read their Kotlin compiler version from
// the classic `rootProject.ext.kotlinVersion` property, not from the
// `android.kotlinVersion` entry that expo-build-properties writes into
// gradle.properties. That mismatch is what causes:
//   "Module was compiled with an incompatible version of Kotlin.
//    The binary version of its metadata is 2.3.0, expected version is 2.1.0."
// This plugin sets that classic ext property directly on the root
// build.gradle, so those modules pick up the same Kotlin version as the
// rest of the project instead of falling back to their own old default.
const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withRootKotlinVersion(config, kotlinVersion = '2.3.0') {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const marker = 'ext.kotlinVersion';
      if (!config.modResults.contents.includes(marker)) {
        config.modResults.contents = config.modResults.contents.replace(
          /buildscript\s*\{/,
          `buildscript {\n    ext.kotlinVersion = "${kotlinVersion}"`
        );
      }
    }
    return config;
  });
};

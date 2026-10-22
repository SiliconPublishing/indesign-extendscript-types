// The package version follows InDesign: major.minor is the InDesign release the declarations are
// measured against, the patch is ours. The snapshot every tool defaults to comes from it.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PACKAGE_VERSION = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
export const INDESIGN_VERSION = PACKAGE_VERSION.split('.').slice(0, 2).join('.');
export const SNAPSHOT = `snapshots/indesign-${INDESIGN_VERSION}`;

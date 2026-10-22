// The package version follows InDesign: major.minor is the InDesign release the declarations are
// measured against, the patch is ours. The snapshot every tool defaults to comes from it.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PACKAGE_VERSION = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
export const INDESIGN_VERSION = PACKAGE_VERSION.split('.').slice(0, 2).join('.');
export const SNAPSHOT = `snapshots/indesign-${INDESIGN_VERSION}`;

// InDesign Server is measured into snapshots/indesign-server-<ver>/. Its releases can lag the
// desktop's, so the same version is preferred and the newest Server snapshot used otherwise.
const serverVersions = readdirSync(join(root, 'snapshots'))
    .map((d) => /^indesign-server-(\d+)\.(\d+)$/.exec(d))
    .filter(Boolean)
    .sort((a, b) => b[1] - a[1] || b[2] - a[2])
    .map((m) => `${m[1]}.${m[2]}`);
export const SERVER_VERSION = serverVersions.includes(INDESIGN_VERSION) ? INDESIGN_VERSION : serverVersions[0];
export const SERVER_SNAPSHOT = SERVER_VERSION && `snapshots/indesign-server-${SERVER_VERSION}`;

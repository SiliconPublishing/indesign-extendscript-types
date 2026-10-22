// Offline test of tools/plugin: a made-up plugin (a class, an enumeration, members on
// Application) is added to a copy of the baseline dictionary dump; the tool must declare it,
// find nothing to complain about, and a consumer script must compile with both trees.
//
//   node test/plugin/synthetic.mjs      (run by test/run.mjs)
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const work = mkdtempSync(join(tmpdir(), 'idx-plugin-test-'));
const raw = join(work, 'raw');
cpSync(join(root, 'snapshots/indesign-21.6/raw'), raw, { recursive: true });

const prop = (name, type, rw, desc, extra = '') =>
    `<property name="${name}" rwaccess="${rw}"><shortdesc>${desc}</shortdesc><datatype><type>${type}</type>${extra}</datatype></property>`;
writeFileSync(
    join(raw, 'classes/FixtureWidget.xml'),
    `<classdef name="FixtureWidget" dynamic="true"><shortdesc>A test plugin's object.</shortdesc>
<elements type="class">${prop('AFTER_WIDGET', 'string', 'readonly', 'Dispatched after widgeting.', '<value>afterWidget</value>')}</elements>
<elements type="instance">
${prop('size', 'number', 'readwrite', 'The size.')}
${prop('mode', 'FixtureMode', 'readwrite', 'The mode.')}
${prop('parent', 'Application', 'readonly', 'The parent of the FixtureWidget (a Application).')}
${prop('isValid', 'bool', 'readonly', 'Valid.')}
${prop('properties', 'Object', 'readwrite', 'A property that allows setting of several properties at the same time.')}
<method name="getElements"><shortdesc>Resolves the object specifier.</shortdesc><datatype><type>FixtureWidget</type><array/></datatype></method>
<method name="toSource"><shortdesc>Generates a string which, if executed, will return the FixtureWidget.</shortdesc><datatype><type>string</type></datatype></method>
<method name="toSpecifier"><shortdesc>Retrieves the object specifier.</shortdesc><datatype><type>string</type></datatype></method>
<method name="spin"><shortdesc>Spins it.</shortdesc><parameters><parameter name="times" optional="true"><shortdesc>How often. (Optional)</shortdesc><datatype><type>number</type></datatype></parameter></parameters><datatype><type>bool</type></datatype></method>
</elements></classdef>`,
);
writeFileSync(
    join(raw, 'classes/FixtureMode.xml'),
    `<classdef name="FixtureMode" enumeration="true"><shortdesc>A test plugin's modes.</shortdesc><elements type="class">
${prop('FAST_MODE', 'number', 'readonly', 'Fast.', '<value>1717662067</value>')}
${prop('SLOW_MODE', 'number', 'readonly', 'Slow.', '<value>1717662068</value>')}
</elements></classdef>`,
);
const appXml = readFileSync(join(raw, 'classes/Application.xml'), 'utf8');
writeFileSync(
    join(raw, 'classes/Application.xml'),
    appXml.replace(
        '<elements type="instance">',
        `<elements type="instance">${prop('fixtureWidget', 'FixtureWidget', 'readonly', 'The test plugin widget.')}${prop('fixtureEnabled', 'bool', 'readwrite', 'Whether the test plugin is on.')}`,
    ),
);
const meta = JSON.parse(readFileSync(join(raw, 'meta.json'), 'utf8'));
meta.suites['Fixture Suite'] = ['FixtureWidget', 'FixtureMode'];
writeFileSync(join(raw, 'meta.json'), JSON.stringify(meta));

const out = join(work, 'fixture-plugin-extendscript-types');
execFileSync('node', [join(root, 'tools/plugin/index.mjs'), '--name', 'fixture-plugin-extendscript-types', '--raw', raw, '--out', out], { stdio: 'pipe' });
const report = readFileSync(join(out, 'REPORT.md'), 'utf8');
if (!/No findings\./.test(report) || !/Typechecks with types\/ and flat\//.test(report)) throw new Error(`plugin tool report:\n${report}`);

// A consumer, with each entry.
const consumer = join(work, 'consumer');
mkdirSync(join(consumer, 'node_modules'), { recursive: true });
mkdirSync(join(consumer, 'src'));
symlinkSync(root, join(consumer, 'node_modules/indesign-extendscript-types'));
symlinkSync(out, join(consumer, 'node_modules/fixture-plugin-extendscript-types'));
writeFileSync(
    join(consumer, 'src/use.ts'),
    `var w = app.fixtureWidget;
var n: number = w.size;
w.mode = FixtureMode.FAST_MODE;
var spun: boolean = w.spin();
app.fixtureEnabled = true;
var evt: 'afterWidget' = FixtureWidget.AFTER_WIDGET;
if (w instanceof FixtureWidget) w.spin(2);
var fast: boolean = w.mode === FixtureMode.FAST_MODE;
// @ts-expect-error not part of the plugin
app.fixtureNothing;
`,
);
for (const entry of ['indesign-extendscript-types', 'indesign-extendscript-types/authored']) {
    writeFileSync(
        join(consumer, 'tsconfig.json'),
        JSON.stringify({ compilerOptions: { noLib: true, types: [entry, 'fixture-plugin-extendscript-types'], target: 'es5', module: 'none', ignoreDeprecations: '5.0', strict: true, noEmit: true }, include: ['src'] }),
    );
    execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', consumer], { stdio: 'pipe' });
}
console.log('ok');

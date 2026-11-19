// Builds the PR title and body from Conventional Commits.
// Used by .github/workflows/pr-description.yml, can also run locally:
//   node scripts/pr-description.mjs <base-ref> [head-ref]
import { execFileSync } from 'node:child_process';

const START = '<!-- auto-pr:start -->';
const END = '<!-- auto-pr:end -->';
const MAX_TITLE = 72;

const TYPES = [
  ['feat', 'Features'],
  ['fix', 'Fixes'],
  ['perf', 'Performance'],
  ['refactor', 'Refactoring'],
  ['style', 'Styling'],
  ['docs', 'Docs'],
  ['ci', 'CI'],
  ['build', 'Build'],
  ['chore', 'Chores'],
];

const PATTERN = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/;

const parseCommit = (subject) => {
  const match = PATTERN.exec(subject.trim());

  if (!match) {
    return { type: 'chore', scope: '', text: subject.trim() };
  }

  const [, type, scope = '', , text] = match;

  return { type: type.toLowerCase(), scope, text };
};

const buildTitle = (commits) => {
  if (commits.length === 0) {
    return '';
  }

  if (commits.length === 1) {
    const [{ type, scope, text }] = commits;

    return `${type}${scope ? `(${scope})` : ''}: ${text}`;
  }

  const main =
    TYPES.map(([type]) => type).find((type) =>
      commits.some((commit) => commit.type === type),
    ) ?? commits[0].type;
  const parts = commits
    .filter((commit) => commit.type === main)
    .map((commit) => commit.text);
  let summary = '';

  for (const part of parts) {
    const next = summary ? `${summary}, ${part}` : part;

    if (`${main}: ${next}`.length > MAX_TITLE && summary) {
      break;
    }

    summary = next;
  }

  const title = `${main}: ${summary}`;

  return title.length > MAX_TITLE ?
      `${title.slice(0, MAX_TITLE - 1).trimEnd()}…`
    : title;
};

const AREAS = [
  ['src/components/', 'Components'],
  ['src/sections/', 'Sections'],
  ['src/i18n/', 'i18n'],
  ['src/styles/', 'Styles'],
  ['src/constants/', 'Content'],
  ['src/hooks/', 'Hooks'],
  ['.github/', 'CI'],
  ['scripts/', 'Scripts'],
];

const analyzeFiles = (files) => {
  const areas = AREAS.filter(([prefix]) =>
    files.some((file) => file.startsWith(prefix)),
  ).map(([, label]) => label);
  const warnings = [];
  const hasEn = files.includes('src/i18n/en.ts');
  const hasUa = files.includes('src/i18n/ua.ts');

  if (hasEn !== hasUa) {
    warnings.push(
      `\`${hasEn ? 'ua.ts' : 'en.ts'}\` was not changed, check that EN and UA stay in sync`,
    );
  }

  return { areas, warnings };
};

const buildBlock = (commits, title, files, stat) => {
  const { areas, warnings } = analyzeFiles(files);
  const sections = TYPES.map(([type, label]) => {
    const items = commits.filter((commit) => commit.type === type);

    if (items.length === 0) {
      return '';
    }

    const lines = items.map(
      ({ scope, text }) => `- ${scope ? `**${scope}:** ` : ''}${text}`,
    );

    return `### ${label}\n\n${lines.join('\n')}`;
  }).filter(Boolean);

  const meta = [
    `**Changed:** ${stat}`,
    areas.length > 0 ? `**Areas:** ${areas.join(', ')}` : '',
    ...warnings.map((warning) => `> ⚠️ ${warning}`),
  ].filter(Boolean);

  return [
    START,
    `<!-- auto-title: ${title} -->`,
    '## Summary',
    '',
    sections.join('\n\n'),
    '',
    meta.join('\n\n'),
    END,
  ].join('\n');
};

const isAutoTitle = (current, body) => {
  const match = /<!-- auto-title: (.*) -->/.exec(body);

  if (match) {
    return current === match[1];
  }

  return !current || !PATTERN.test(current);
};

const mergeBody = (current, block) => {
  const start = current.indexOf(START);
  const end = current.indexOf(END);

  if (start !== -1 && end > start) {
    return `${current.slice(0, start)}${block}${current.slice(end + END.length)}`;
  }

  return current.trim() ? `${block}\n\n${current.trim()}\n` : `${block}\n`;
};

const run = () => {
  const [base, head = 'HEAD'] = process.argv.slice(2);

  if (!base) {
    console.error('Usage: node scripts/pr-description.mjs <base> [head]');
    process.exit(1);
  }

  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
  const log = git(
    'log',
    '--no-merges',
    '--reverse',
    '--format=%s',
    `${base}..${head}`,
  );
  const commits = log.split('\n').filter(Boolean).map(parseCommit);

  if (commits.length === 0) {
    process.stdout.write(JSON.stringify({ skip: true }));

    return;
  }

  const files = git('diff', '--name-only', `${base}...${head}`)
    .split('\n')
    .filter(Boolean);
  const stat = git('diff', '--shortstat', `${base}...${head}`).trim();
  const currentBody = process.env.PR_BODY ?? '';
  const currentTitle = process.env.PR_TITLE ?? '';
  const autoTitle = buildTitle(commits);
  const keepTitle = !isAutoTitle(currentTitle, currentBody);
  const title = keepTitle ? currentTitle : autoTitle;
  const body = mergeBody(
    currentBody,
    buildBlock(commits, keepTitle ? '' : autoTitle, files, stat),
  );

  process.stdout.write(JSON.stringify({ title, body }));
};

run();

const fs = require('fs');
const file = 'codebase/web-demo/src/app/lesson/[day]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add day metadata
const metadataStr = `
const DAY_METADATA: Record<string, { totalSlides: number; title: string }> = {
  "1": { totalSlides: 29, title: "Day 1: AI & Product Thinking" },
  "2": { totalSlides: 29, title: "Day 2: Problem Hunt & Agentic Workflow" },
};
`;
content = content.replace('// ── Sidebar data ─────────────────────────────────────────────', metadataStr + '\n// ── Sidebar data ─────────────────────────────────────────────');

// Replace {page} / 76
content = content.replace(/<span>\{page\} \/ 76<\/span>/g, '<span>{page} / {DAY_METADATA[day as string]?.totalSlides || 29}</span>');
content = content.replace(/Math\.min\(76, p \+ 1\)/g, 'Math.min(DAY_METADATA[day as string]?.totalSlides || 29, p + 1)');

// Add key and overlay to iframe
const iframeRegex = /<iframe[\s\S]*?title="Slide Viewer"[\s\S]*?\/>/;
const newIframe = `<div className="relative w-full h-full">
                    <iframe 
                      key={page}
                      src={\`/slides/day\${day}.pdf#page=\${page}&view=Fit&scrollbar=0&toolbar=0&navpanes=0\`} 
                      className="w-full h-full border-none absolute inset-0 z-10 pointer-events-none"
                      title="Slide Viewer"
                    />
                    {/* Transparent overlay to block native PDF scroll, forcing toolbar usage */}
                    <div className="absolute inset-0 z-20 bg-transparent"></div>
                  </div>`;
content = content.replace(iframeRegex, newIframe);

// Fix title display in Header
content = content.replace(
  /<span className="font-semibold text-\[15px\] text-gray-900">Bài \{day\} · DAY 0\{day\}<\/span>/,
  '<span className="font-semibold text-[15px] text-gray-900">{DAY_METADATA[day as string]?.title || `Bài ${day} · DAY 0${day}`}</span>'
);

fs.writeFileSync(file, content);
console.log("Done");

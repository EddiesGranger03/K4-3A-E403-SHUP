const fs = require('fs');
const file = 'codebase/web-demo/src/app/lesson/[day]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace SLIDE_ITEMS mapping
const slideItemsRegex = /<div className="flex flex-col gap-0\.5">[\s\S]*?\{SLIDE_ITEMS\.map\([\s\S]*?<\/div>/;
const newSlideItems = `<div className="flex flex-col gap-0.5">
              <button
                onClick={() => { setContentView("slide"); setActiveLabId(null); }}
                className={\`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg transition-colors text-left \${contentView === "slide" ? "bg-indigo-50 border-l-[3px] border-indigo-500" : "hover:bg-gray-50"}\`}
              >
                <div className={\`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 \${contentView === "slide" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"}\`}>
                  <File className="w-3 h-3" />
                </div>
                <div className="flex flex-col">
                  <span className={\`text-[12px] leading-snug line-clamp-2 \${contentView === "slide" ? "text-indigo-700 font-semibold" : "text-gray-600 font-medium"}\`}>
                    Slide Bài giảng (PDF)
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">29 trang</span>
                </div>
              </button>
            </div>`;
content = content.replace(slideItemsRegex, newSlideItems);

// Fix "Bai giang" -> "Bài giảng"
content = content.replace(/Bai giang/g, 'Bài giảng');

fs.writeFileSync(file, content);
console.log("Done");

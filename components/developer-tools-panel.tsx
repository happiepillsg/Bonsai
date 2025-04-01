import { useState } from "react";
import { Code, Github, Terminal, Database } from "lucide-react";

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
}

export function DeveloperToolsPanel() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tools = [
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Format and validate JSON data",
      icon: Database,
      action: () => window.open("https://jsonformatter.org", "_blank"),
    },
    {
      id: "color-picker",
      title: "Color Picker",
      description: "Pick and convert colors between formats",
      icon: Terminal,
      action: () => window.open("https://colorhunt.co", "_blank"),
    },
    {
      id: "github",
      title: "GitHub",
      description: "Quick access to your repositories",
      icon: Github,
      action: () => window.open("https://github.com", "_blank"),
    },
  ];

  return (
    <div className="bg-card rounded-lg border p-4">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Developer Tools</h2>
      </header>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={tool.action}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
              >
                <Icon className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Code Snippets</h3>
          {isLoading ? (
            <div className="text-center py-4">Loading snippets...</div>
          ) : snippets.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No code snippets saved
            </div>
          ) : (
            <div className="space-y-2">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4" />
                    <span className="font-medium">{snippet.title}</span>
                  </div>
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    {snippet.code}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
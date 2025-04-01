import { useState } from "react";
import { Settings, Moon, Sun, Bell, Lock } from "lucide-react";

interface Settings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  security: {
    autoLock: boolean;
    lockTimeout: number;
  };
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>({
    theme: "system",
    notifications: true,
    security: {
      autoLock: true,
      lockTimeout: 5,
    },
  });

  const handleThemeChange = (theme: Settings["theme"]) => {
    setSettings((prev) => ({ ...prev, theme }));
    // TODO: Implement theme change logic
  };

  const handleNotificationToggle = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
    // TODO: Implement notification toggle logic
  };

  const handleSecurityChange = (key: keyof Settings["security"], value: boolean | number) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }));
    // TODO: Implement security change logic
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <header className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </header>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Theme</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                settings.theme === "light" ? "bg-accent" : "bg-card"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                settings.theme === "dark" ? "bg-accent" : "bg-card"
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                settings.theme === "system" ? "bg-accent" : "bg-card"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>System</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Notifications</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNotificationToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-muted-foreground">
              {settings.notifications ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Auto-lock</span>
              </div>
              <button
                onClick={() => handleSecurityChange("autoLock", !settings.security.autoLock)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.security.autoLock ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.security.autoLock ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {settings.security.autoLock && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Lock timeout (minutes)</span>
                <select
                  value={settings.security.lockTimeout}
                  onChange={(e) =>
                    handleSecurityChange("lockTimeout", parseInt(e.target.value))
                  }
                  className="bg-card border rounded-lg px-2 py-1 text-sm"
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
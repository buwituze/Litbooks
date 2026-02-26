import { useState } from "react";
import { Bell, Lock, Eye, Moon, Sun, Globe, KeyRound } from "lucide-react";
import { authApi } from "../api/authApi";

/**
 * Settings page component
 */
const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    showEmailPublicly: false,
    darkMode: false,
    language: "en",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      language: e.target.value,
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement settings save API call
    console.log("Saving settings:", settings);
    // Show success message
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    if (!/\d/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one digit");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one special character");
      return;
    }

    try {
      setIsChangingPassword(true);
      await authApi.changePassword({
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.detail || "Failed to change password",
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5" style={{ color: "#7f8f87" }} />
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your account
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={
                    settings.emailNotifications
                      ? { backgroundColor: "#7f8f87" }
                      : {}
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive push notifications in your browser
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={
                    settings.pushNotifications
                      ? { backgroundColor: "#7f8f87" }
                      : {}
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5" style={{ color: "#7f8f87" }} />
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("twoFactorAuth")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={
                    settings.twoFactorAuth ? { backgroundColor: "#7f8f87" } : {}
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Change Password Form */}
              <div className="py-3">
                <div className="flex items-center gap-2 mb-4">
                  <KeyRound className="w-4 h-4" style={{ color: "#7f8f87" }} />
                  <p className="text-gray-900 font-medium">Change Password</p>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          oldPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                      {passwordSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-4 py-2 text-white rounded-lg transition-all hover:opacity-90 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#7f8f87" }}
                  >
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5" style={{ color: "#7f8f87" }} />
              <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Show Email Publicly
                  </p>
                  <p className="text-sm text-gray-500">
                    Make your email visible to other users
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("showEmailPublicly")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showEmailPublicly ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={
                    settings.showEmailPublicly
                      ? { backgroundColor: "#7f8f87" }
                      : {}
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showEmailPublicly
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              {settings.darkMode ? (
                <Moon className="w-5 h-5" style={{ color: "#7f8f87" }} />
              ) : (
                <Sun className="w-5 h-5" style={{ color: "#7f8f87" }} />
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                Appearance
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">
                    Use dark theme across the application
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("darkMode")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={
                    settings.darkMode ? { backgroundColor: "#7f8f87" } : {}
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5" style={{ color: "#7f8f87" }} />
              <h2 className="text-xl font-semibold text-gray-900">Language</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">
                    Preferred Language
                  </p>
                  <p className="text-sm text-gray-500">
                    Choose your preferred language
                  </p>
                </div>
                <select
                  value={settings.language}
                  onChange={handleLanguageChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 text-white rounded-lg transition-all hover:opacity-90 font-medium"
              style={{ backgroundColor: "#7f8f87" }}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

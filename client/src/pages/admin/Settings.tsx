// pages/admin/Settings.tsx or app/admin/settings/page.tsx

import SiteImagesSettings from "@/components/admin/settings/SiteImagesSettings";

export default function SettingsPage() {
    return (
        <div className="space-y-10 p-6">
            <h1 className="text-3xl font-bold">Settings</h1>

            {/* Existing other settings blocks */}

            <SiteImagesSettings />
        </div>
    );
}

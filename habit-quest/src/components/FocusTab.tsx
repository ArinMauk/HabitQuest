import React from "react";
import { CurrencyTracker } from "../components/currency-tracker";
import { SitePanel } from '../components/site-panel';
import { NotificationSettings } from '../components/notification-settings';
import { useAppState } from '../context/AppContext';

interface Site {
    domain: string;
    favicon?: string;
}

export function FocusTab() {
    const { state, updateState } = useAppState();
    const { focus } = state;
    const {
        productiveSites = [],
        distractingSites = [],
        balance = 100,
        notifyOnLoss = true,
        notifyOnGain = true,
        lossThreshold = 10,
        gainThreshold = 20,
    } = focus ?? {};

    const updateFocus = (key: string, value: any) => {
        updateState((prev) => ({ ...prev, focus: { ...prev.focus!, [key]: value } }));
    };

    const handleAddSite = (domain: string, type: "productive" | "distraction") => {
        if (!domain.trim()) return;
        const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
        const site = { domain: cleanDomain, favicon: `https://www.google.com/s2/favicons?sz=64&domain=${cleanDomain}` };

        if (type === "productive") {
            const exists = productiveSites.some((s) => s.domain === cleanDomain);
            if (!exists) {
                updateFocus("productiveSites", [...productiveSites, site]);
            }
        } else {
            const exists = distractingSites.some((s) => s.domain === cleanDomain);
            if (!exists) {
                updateFocus("distractingSites", [...distractingSites, site]);
            }
        }
    };

    const handleRemoveSite = (domain: string, type: "productive" | "distraction") => {
        if (type === "productive") {
            updateFocus("productiveSites", productiveSites.filter((s) => s.domain !== domain));
        } else {
            updateFocus("distractingSites", distractingSites.filter((s) => s.domain !== domain));
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#2a2a2a', border: '1px solid #404040', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#b0b0b0', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Total Balance
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>
                        {balance}
                    </div>
                </div>
                <div style={{ backgroundColor: '#2a2a2a', border: '1px solid #404040', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#b0b0b0', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Productive Sites
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>
                        {productiveSites.length}
                    </div>
                </div>
                <div style={{ backgroundColor: '#2a2a2a', border: '1px solid #404040', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#b0b0b0', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Distracting Sites
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>
                        {distractingSites.length}
                    </div>
                </div>
            </div>

            <CurrencyTracker balance={balance} />

            {/* Site Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <SitePanel
                    title="Productive Sites"
                    type="productive"
                    sites={productiveSites}
                    onAdd={handleAddSite}
                    onRemove={handleRemoveSite}
                />
                <SitePanel
                    title="Distracting Sites"
                    type="distraction"
                    sites={distractingSites}
                    onAdd={handleAddSite}
                    onRemove={handleRemoveSite}
                />
            </div>

            <NotificationSettings
                notifyOnLoss={notifyOnLoss}
                notifyOnGain={notifyOnGain}
                lossThreshold={lossThreshold}
                gainThreshold={gainThreshold}
                onToggleLoss={() => updateFocus("notifyOnLoss", !notifyOnLoss)}
                onToggleGain={() => updateFocus("notifyOnGain", !notifyOnGain)}
                onChangeLossThreshold={(v) => updateFocus("lossThreshold", v)}
                onChangeGainThreshold={(v) => updateFocus("gainThreshold", v)}
            />
        </div>
    );
}

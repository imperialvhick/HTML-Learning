import React, { useState } from "react";
import { Download, Plus, Trash2, Edit2, Check, X } from "lucide-react";

export default function AffiliateRoadmap() {
  const [roadmap, setRoadmap] = useState({
    leadGeneration: {
      channels: [""],
      targetAudience: "",
      contentStrategy: [""],
      tools: [""],
      goals: "",
    },
    leadNurturing: {
      emailSequence: [""],
      contentPlan: [""],
      engagementTactics: [""],
      tools: [""],
      goals: "",
    },
    leadConversion: {
      offers: [""],
      callsToAction: [""],
      conversionTools: [""],
      followUpStrategy: [""],
      goals: "",
    },
  });

  const [editingSection, setEditingSection] = useState(null);

  const addItem = (section, field) => {
    setRoadmap((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ""],
      },
    }));
  };

  const updateItem = (section, field, index, value) => {
    setRoadmap((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const updateField = (section, field, value) => {
    setRoadmap((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const removeItem = (section, field, index) => {
    setRoadmap((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index),
      },
    }));
  };

  const exportRoadmap = () => {
    const content = `
AFFILIATE MARKETING ROADMAP
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════

1. LEAD GENERATION SYSTEM
═══════════════════════════════════════════════════════════

Target Audience:
${roadmap.leadGeneration.targetAudience || "Not specified"}

Marketing Channels:
${
  roadmap.leadGeneration.channels
    .filter((c) => c)
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n") || "None added"
}

Content Strategy:
${
  roadmap.leadGeneration.contentStrategy
    .filter((c) => c)
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n") || "None added"
}

Tools & Platforms:
${
  roadmap.leadGeneration.tools
    .filter((t) => t)
    .map((t, i) => `${i + 1}. ${t}`)
    .join("\n") || "None added"
}

Goals & KPIs:
${roadmap.leadGeneration.goals || "Not specified"}

═══════════════════════════════════════════════════════════

2. LEAD NURTURING SYSTEM
═══════════════════════════════════════════════════════════

Email Sequence:
${
  roadmap.leadNurturing.emailSequence
    .filter((e) => e)
    .map((e, i) => `${i + 1}. ${e}`)
    .join("\n") || "None added"
}

Content Plan:
${
  roadmap.leadNurturing.contentPlan
    .filter((c) => c)
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n") || "None added"
}

Engagement Tactics:
${
  roadmap.leadNurturing.engagementTactics
    .filter((e) => e)
    .map((e, i) => `${i + 1}. ${e}`)
    .join("\n") || "None added"
}

Tools & Platforms:
${
  roadmap.leadNurturing.tools
    .filter((t) => t)
    .map((t, i) => `${i + 1}. ${t}`)
    .join("\n") || "None added"
}

Goals & KPIs:
${roadmap.leadNurturing.goals || "Not specified"}

═══════════════════════════════════════════════════════════

3. LEAD CONVERSION SYSTEM
═══════════════════════════════════════════════════════════

Affiliate Offers:
${
  roadmap.leadConversion.offers
    .filter((o) => o)
    .map((o, i) => `${i + 1}. ${o}`)
    .join("\n") || "None added"
}

Calls to Action:
${
  roadmap.leadConversion.callsToAction
    .filter((c) => c)
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n") || "None added"
}

Conversion Tools:
${
  roadmap.leadConversion.conversionTools
    .filter((t) => t)
    .map((t, i) => `${i + 1}. ${t}`)
    .join("\n") || "None added"
}

Follow-Up Strategy:
${
  roadmap.leadConversion.followUpStrategy
    .filter((f) => f)
    .map((f, i) => `${i + 1}. ${f}`)
    .join("\n") || "None added"
}

Goals & KPIs:
${roadmap.leadConversion.goals || "Not specified"}

═══════════════════════════════════════════════════════════
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "affiliate-roadmap.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const Section = ({ title, section, fields, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {fields.map((field) => (
        <div key={field.key} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={roadmap[section][field.key]}
              onChange={(e) => updateField(section, field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          ) : (
            <div className="space-y-2">
              {roadmap[section][field.key].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateItem(section, field.key, index, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => removeItem(section, field.key, index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addItem(section, field.key)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Plus size={18} />
                Add {field.label}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Affiliate Marketing Roadmap
          </h1>
          <p className="text-gray-600 mb-4">
            Fill in your personalized strategy across the three key systems
          </p>
          <button
            onClick={exportRoadmap}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
          >
            <Download size={20} />
            Export Roadmap
          </button>
        </div>

        <Section
          title="1. Lead Generation System"
          section="leadGeneration"
          icon="🎯"
          fields={[
            {
              key: "targetAudience",
              label: "Target Audience",
              type: "textarea",
              placeholder: "Describe your ideal customer...",
            },
            {
              key: "channels",
              label: "Marketing Channel",
              type: "list",
              placeholder: "e.g., Facebook Ads, SEO, YouTube...",
            },
            {
              key: "contentStrategy",
              label: "Content Strategy Item",
              type: "list",
              placeholder: "e.g., Weekly blog posts, Video tutorials...",
            },
            {
              key: "tools",
              label: "Tool/Platform",
              type: "list",
              placeholder: "e.g., ConvertKit, ClickFunnels...",
            },
            {
              key: "goals",
              label: "Goals & KPIs",
              type: "textarea",
              placeholder: "e.g., Generate 500 leads per month...",
            },
          ]}
        />

        <Section
          title="2. Lead Nurturing System"
          section="leadNurturing"
          icon="💌"
          fields={[
            {
              key: "emailSequence",
              label: "Email Sequence Step",
              type: "list",
              placeholder: "e.g., Welcome email, Day 3 value content...",
            },
            {
              key: "contentPlan",
              label: "Content Plan Item",
              type: "list",
              placeholder: "e.g., Weekly newsletter, Case studies...",
            },
            {
              key: "engagementTactics",
              label: "Engagement Tactic",
              type: "list",
              placeholder: "e.g., Social media interaction, Q&A sessions...",
            },
            {
              key: "tools",
              label: "Tool/Platform",
              type: "list",
              placeholder: "e.g., ActiveCampaign, Kajabi...",
            },
            {
              key: "goals",
              label: "Goals & KPIs",
              type: "textarea",
              placeholder: "e.g., 30% email open rate, 10% click rate...",
            },
          ]}
        />

        <Section
          title="3. Lead Conversion System"
          section="leadConversion"
          icon="💰"
          fields={[
            {
              key: "offers",
              label: "Affiliate Offer",
              type: "list",
              placeholder: "e.g., Product name, commission structure...",
            },
            {
              key: "callsToAction",
              label: "Call to Action",
              type: "list",
              placeholder: "e.g., Limited time bonus, Free trial link...",
            },
            {
              key: "conversionTools",
              label: "Conversion Tool",
              type: "list",
              placeholder: "e.g., Landing page builder, checkout platform...",
            },
            {
              key: "followUpStrategy",
              label: "Follow-Up Strategy",
              type: "list",
              placeholder: "e.g., Post-purchase email sequence...",
            },
            {
              key: "goals",
              label: "Goals & KPIs",
              type: "textarea",
              placeholder: "e.g., 5% conversion rate, $5000 monthly revenue...",
            },
          ]}
        />
      </div>
    </div>
  );
}

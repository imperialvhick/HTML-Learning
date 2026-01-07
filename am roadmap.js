import React, { useState, useMemo } from "react";
import { Download, Plus, Trash2, Lock } from "lucide-react";

// STRICT MODE ROADMAP
// Auto-calculates, enforces minimums, locks dependent fields

export default function AffiliateRoadmap() {
  const [data, setData] = useState({
    overview: {
      targetIncome: "",
      commissionPerSale: "",
      conversionRate: "", // percentage
      product: "",
    },
    leadGeneration: {
      sources: [
        { type: "Primary", name: "" },
        { type: "Supporting", name: "" },
      ],
      organicSystem: {
        dailyVolume: "",
        contentStyle: "",
      },
      paidBudget: {
        total: "",
      },
    },
    leadNurturing: {
      funnel: "",
      thingsInPlace: [""],
      thingsToFix: [""],
      contentMarketing: [
        { platform: "", pillars: "", structure: "", volume: "" },
      ],
    },
    leadConversion: {
      presentation: {
        method: "",
        frequency: "",
      },
      followUpSystem: [
        { platform: "", pillars: "", structure: "", volume: "" },
      ],
      offer: {
        name: "",
        mainProduct: "",
        deliverables: [{ item: "", framework: "BF", value: "" }],
        bonuses: [],
        structure: "",
      },
      closing: {
        method: "",
        thingsInPlace: [""],
        thingsToFix: [""],
      },
    },
  });

  const update = (path, value) => {
    setData((prev) => {
      const copy = structuredClone(prev);
      let ref = copy;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      ref[path[path.length - 1]] = value;
      return copy;
    });
  };

  const addItem = (path, item) => {
    const arr = path.reduce((a, c) => a[c], data);
    update(path, [...arr, item]);
  };

  const removeItem = (path, index, min = 0) => {
    const arr = path.reduce((a, c) => a[c], data);
    if (arr.length <= min) return;
    update(
      path,
      arr.filter((_, i) => i !== index)
    );
  };

  // STRICT CALCULATIONS
  const calculations = useMemo(() => {
    const income = Number(data.overview.targetIncome);
    const commission = Number(data.overview.commissionPerSale);
    const cr = Number(data.overview.conversionRate) / 100;

    if (!income || !commission || !cr) {
      return null;
    }

    const totalSales = Math.ceil(income / commission);
    const totalLeads = Math.ceil(totalSales / cr);

    return {
      totalSales,
      totalLeads,
      monthlySales: Math.ceil(totalSales / 30),
      weeklySales: Math.ceil(totalSales / 7),
      dailySales: Math.ceil(totalSales / 30),
      monthlyLeads: Math.ceil(totalLeads / 30),
      weeklyLeads: Math.ceil(totalLeads / 7),
      dailyLeads: Math.ceil(totalLeads / 30),
    };
  }, [data.overview]);

  const exportRoadmap = () => {
    const blob = new Blob(
      [JSON.stringify({ ...data, calculations }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "strict-affiliate-roadmap.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const Input = ({ label, value, onChange, placeholder, locked }) => (
    <div className="mb-3">
      <label className="text-sm font-semibold flex items-center gap-2">
        {label} {locked && <Lock size={14} />}
      </label>
      <input
        value={value}
        disabled={locked}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white p-6 rounded-xl shadow mb-6">
          <h1 className="text-4xl font-bold">Strict Affiliate Roadmap</h1>
          <p className="text-gray-600">
            Income-driven. System-enforced. No guesswork.
          </p>
          <button
            onClick={exportRoadmap}
            className="mt-4 flex items-center gap-2 bg-black text-white px-5 py-3 rounded"
          >
            <Download size={18} /> Export Roadmap
          </button>
        </header>

        {/* OVERVIEW */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">High-Level Overview</h2>
          <Input
            label="Target Income"
            value={data.overview.targetIncome}
            onChange={(v) => update(["overview", "targetIncome"], v)}
          />
          <Input
            label="Commission Per Sale"
            value={data.overview.commissionPerSale}
            onChange={(v) => update(["overview", "commissionPerSale"], v)}
          />
          <Input
            label="Average Conversion Rate (%)"
            value={data.overview.conversionRate}
            onChange={(v) => update(["overview", "conversionRate"], v)}
          />
          <Input
            label="Digital Product Sold"
            value={data.overview.product}
            onChange={(v) => update(["overview", "product"], v)}
          />

          {calculations && (
            <div className="mt-4 bg-slate-50 p-4 rounded">
              <p>
                <strong>Required Total Sales:</strong> {calculations.totalSales}
              </p>
              <p>
                <strong>Required Total Leads:</strong> {calculations.totalLeads}
              </p>
            </div>
          )}
        </section>

        {/* LEAD GENERATION */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Lead Generation System</h2>

          {calculations && (
            <div className="mb-4 bg-slate-50 p-4 rounded">
              <p>
                <strong>Daily Lead Target:</strong> {calculations.dailyLeads}
              </p>
              <p>
                <strong>Weekly Lead Target:</strong> {calculations.weeklyLeads}
              </p>
              <p>
                <strong>Monthly Lead Target:</strong>{" "}
                {calculations.monthlyLeads}
              </p>
            </div>
          )}

          <h3 className="font-semibold mb-2">Lead Sources (min 2)</h3>
          {data.leadGeneration.sources.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={s.name}
                onChange={(e) =>
                  update(
                    ["leadGeneration", "sources", i, "name"],
                    e.target.value
                  )
                }
                placeholder={`${s.type} Source`}
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                onClick={() => removeItem(["leadGeneration", "sources"], i, 2)}
                className="bg-red-500 text-white px-3 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              addItem(["leadGeneration", "sources"], {
                type: "Supporting",
                name: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Add Source
          </button>

          <h3 className="font-semibold mt-4">Organic Traffic System</h3>
          <Input
            label="Daily Content Volume"
            value={data.leadGeneration.organicSystem.dailyVolume}
            onChange={(v) =>
              update(["leadGeneration", "organicSystem", "dailyVolume"], v)
            }
          />
          <Input
            label="Content Style"
            value={data.leadGeneration.organicSystem.contentStyle}
            onChange={(v) =>
              update(["leadGeneration", "organicSystem", "contentStyle"], v)
            }
          />
        </section>

        {/* LEAD NURTURING */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Lead Nurturing System</h2>
          <Input
            label="Sales Funnel Flow"
            value={data.leadNurturing.funnel}
            onChange={(v) => update(["leadNurturing", "funnel"], v)}
            placeholder="Traffic → DM → Sales"
          />

          <h3 className="font-semibold mt-4">Content Marketing System</h3>
          {data.leadNurturing.contentMarketing.map((c, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 mb-3">
              <input
                value={c.platform}
                onChange={(e) =>
                  update(
                    ["leadNurturing", "contentMarketing", i, "platform"],
                    e.target.value
                  )
                }
                placeholder="Platform"
                className="border rounded px-3 py-2"
              />
              <input
                value={c.pillars}
                onChange={(e) =>
                  update(
                    ["leadNurturing", "contentMarketing", i, "pillars"],
                    e.target.value
                  )
                }
                placeholder="Content Pillars"
                className="border rounded px-3 py-2"
              />
              <input
                value={c.structure}
                onChange={(e) =>
                  update(
                    ["leadNurturing", "contentMarketing", i, "structure"],
                    e.target.value
                  )
                }
                placeholder="Structure"
                className="border rounded px-3 py-2"
              />
              <input
                value={c.volume}
                onChange={(e) =>
                  update(
                    ["leadNurturing", "contentMarketing", i, "volume"],
                    e.target.value
                  )
                }
                placeholder="Volume"
                className="border rounded px-3 py-2"
              />
            </div>
          ))}
          <button
            onClick={() =>
              addItem(["leadNurturing", "contentMarketing"], {
                platform: "",
                pillars: "",
                structure: "",
                volume: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Platform
          </button>
        </section>

        {/* LEAD CONVERSION */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Lead Conversion System</h2>
          {calculations && (
            <div className="mb-4 bg-slate-50 p-4 rounded">
              <p>
                <strong>Daily Sales Target:</strong> {calculations.dailySales}
              </p>
              <p>
                <strong>Weekly Sales Target:</strong> {calculations.weeklySales}
              </p>
              <p>
                <strong>Monthly Sales Target:</strong>{" "}
                {calculations.monthlySales}
              </p>
            </div>
          )}

          <Input
            label="Sales Presentation Method"
            value={data.leadConversion.presentation.method}
            onChange={(v) =>
              update(["leadConversion", "presentation", "method"], v)
            }
          />
          <Input
            label="Frequency / N/A"
            value={data.leadConversion.presentation.frequency}
            onChange={(v) =>
              update(["leadConversion", "presentation", "frequency"], v)
            }
          />

          <h3 className="font-semibold mt-4">Offer Creation System</h3>
          <Input
            label="Offer Name"
            value={data.leadConversion.offer.name}
            onChange={(v) => update(["leadConversion", "offer", "name"], v)}
          />
          <Input
            label="Main Product"
            value={data.leadConversion.offer.mainProduct}
            onChange={(v) =>
              update(["leadConversion", "offer", "mainProduct"], v)
            }
          />

          {data.leadConversion.offer.deliverables.map((d, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                value={d.item}
                onChange={(e) =>
                  update(
                    ["leadConversion", "offer", "deliverables", i, "item"],
                    e.target.value
                  )
                }
                placeholder="Deliverable"
                className="border rounded px-3 py-2"
              />
              <input
                value={d.framework}
                onChange={(e) =>
                  update(
                    ["leadConversion", "offer", "deliverables", i, "framework"],
                    e.target.value
                  )
                }
                placeholder="BF / BBF"
                className="border rounded px-3 py-2"
              />
              <input
                value={d.value}
                onChange={(e) =>
                  update(
                    ["leadConversion", "offer", "deliverables", i, "value"],
                    e.target.value
                  )
                }
                placeholder="Value"
                className="border rounded px-3 py-2"
              />
            </div>
          ))}
          <button
            onClick={() =>
              addItem(["leadConversion", "offer", "deliverables"], {
                item: "",
                framework: "BF",
                value: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Deliverable
          </button>

          <h3 className="font-semibold mt-4">Sales Closing System</h3>
          <Input
            label="Preferred Closing Method"
            value={data.leadConversion.closing.method}
            onChange={(v) => update(["leadConversion", "closing", "method"], v)}
          />
        </section>
      </div>
    </div>
  );
}

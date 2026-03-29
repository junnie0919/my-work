import { motion } from "motion/react";
import { Search, PenTool, Film, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "課題定義",
    desc: "クライアントの目的とターゲットを徹底的に分析し、解決すべき課題を明確にします。",
    label: "01"
  },
  {
    icon: PenTool,
    title: "構成設計",
    desc: "論理的なストーリー構成を設計。視聴者の感情を動かす設計図を作成します。",
    label: "02"
  },
  {
    icon: Film,
    title: "制作・演出",
    desc: "最新の技術を駆使し、高品質な映像を制作。細部までこだわった演出を施します。",
    label: "03"
  },
  {
    icon: RefreshCw,
    title: "改善・納品",
    desc: "フィードバックを反映し、最終的なクオリティを追求。成果に繋がる映像を納品します。",
    label: "04"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Process</h2>
        <p className="text-white/40 uppercase tracking-[0.2em] text-sm">How I deliver results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative p-8 glass rounded-2xl group hover:bg-white/5 transition-colors"
          >
            <span className="absolute top-4 right-6 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
              {step.label}
            </span>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-gold">
              <step.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

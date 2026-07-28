// Drops two faint, slow-drifting blue blobs (the same aurora-float motion
// as the hero's AuroraGrain, minus its grain canvas) into a section's
// background — a light, repeatable way to thread that "blue animation"
// through other sections without each one needing its own canvas/grain
// setup. Host section needs position:relative (and ideally overflow-hidden
// so the blur doesn't bleed into neighbors).
export default function SectionAurora() {
  return (
    <div className="ambient-aurora" aria-hidden>
      <span className="ambient-aurora-blob ambient-aurora-blob-1" />
      <span className="ambient-aurora-blob ambient-aurora-blob-2" />
    </div>
  );
}

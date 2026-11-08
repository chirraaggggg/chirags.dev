const PETALS = [
  { left: "8%", duration: 26, delay: -4, drift: "60px", color: "#e0607f" },
  { left: "21%", duration: 34, delay: -18, drift: "-40px", color: "#f3a83c" },
  { left: "34%", duration: 30, delay: -9, drift: "30px", color: "#f3a83c" },
  { left: "47%", duration: 38, delay: -26, drift: "-60px", color: "#e0607f" },
  { left: "58%", duration: 29, delay: -14, drift: "50px", color: "#e8c98a" },
  { left: "69%", duration: 41, delay: -31, drift: "-30px", color: "#e0607f" },
  { left: "78%", duration: 32, delay: -7, drift: "44px", color: "#f3a83c" },
  { left: "88%", duration: 36, delay: -22, drift: "-52px", color: "#e8c98a" },
  { left: "95%", duration: 28, delay: -12, drift: "24px", color: "#e0607f" },
] as const;

/** A handful of petals drifting down the page, barely there. */
export function Petals() {
  return (
    <div className="deshi-petals" aria-hidden="true">
      {PETALS.map((petal) => (
        <span
          key={`${petal.left}-${petal.delay}`}
          className="deshi-petal"
          style={{
            left: petal.left,
            background: petal.color,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            // @ts-expect-error -- custom property consumed by deshi-drift
            "--drift": petal.drift,
          }}
        />
      ))}
    </div>
  );
}

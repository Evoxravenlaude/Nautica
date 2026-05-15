/** Animated gradient blob for hero backgrounds */
export function GlowBlob({
  color,
  size = 300,
  top,
  left,
  right,
  bottom,
  delay = 0,
  opacity = 0.4,
}: {
  color: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className="naut-blob"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        opacity,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

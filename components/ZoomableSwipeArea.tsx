"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ZoomableSwipeAreaProps {
  /** Changing this resets the zoom (e.g. the current image key). */
  resetKey: string;
  canSwipe: boolean;
  onNext: () => void;
  onPrev: () => void;
  children: ReactNode;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const SWIPE_THRESHOLD = 45;
const DOUBLE_TAP_MS = 300;
const TAP_SLOP = 10;

type Point = { x: number; y: number };

interface Transform {
  scale: number;
  x: number;
  y: number;
}

// Pinch / double-tap zoom with panning, plus horizontal swipe to change
// images while not zoomed. Transforms are written straight to the DOM so
// gestures stay smooth without re-rendering the lightbox.
export default function ZoomableSwipeArea({
  resetKey,
  canSwipe,
  onNext,
  onPrev,
  children,
}: ZoomableSwipeAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transform = useRef<Transform>({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<{
    startTransform: Transform;
    startPoint: Point;
    startDist: number;
    startMid: Point;
    moved: boolean;
    pinched: boolean;
  } | null>(null);
  const lastTap = useRef<{ time: number; point: Point } | null>(null);

  function apply(next: Transform, animate: boolean) {
    const el = containerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    const maxX = ((scale - 1) * el.clientWidth) / 2;
    const maxY = ((scale - 1) * el.clientHeight) / 2;
    const clamped = {
      scale,
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    };
    transform.current = clamped;
    content.style.transition = animate ? "transform 0.25s ease-out" : "none";
    content.style.transform = `translate3d(${clamped.x}px, ${clamped.y}px, 0) scale(${clamped.scale})`;
    el.dataset.zoomed = String(scale > 1.01);
  }

  // Point relative to the container's center (the transform origin).
  function fromCenter(clientX: number, clientY: number): Point {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  }

  // Scale to `scale` while keeping the content under `focus` in place.
  function zoomAround(from: Transform, scale: number, focus: Point, pan: Point = { x: 0, y: 0 }): Transform {
    const ratio = scale / from.scale;
    return {
      scale,
      x: focus.x - ratio * (focus.x - from.x) + pan.x,
      y: focus.y - ratio * (focus.y - from.y) + pan.y,
    };
  }

  useEffect(() => {
    pointers.current.clear();
    gesture.current = null;
    lastTap.current = null;
    apply({ scale: 1, x: 0, y: 0 }, false);
  }, [resetKey]);

  function startGesture() {
    const pts = [...pointers.current.values()];
    const prev = gesture.current;
    gesture.current = {
      startTransform: { ...transform.current },
      startPoint: pts[0],
      startDist: pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0,
      startMid: pts.length > 1 ? { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 } : pts[0],
      moved: prev?.moved ?? false,
      pinched: (prev?.pinched ?? false) || pts.length > 1,
    };
  }

  function handlePointerDown(e: React.PointerEvent) {
    containerRef.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size <= 2) startGesture();
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    const pts = [...pointers.current.values()];

    if (pts.length >= 2 && g.startDist > 0) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, g.startTransform.scale * (dist / g.startDist)));
      const focus = fromCenter(g.startMid.x, g.startMid.y);
      apply(
        zoomAround(g.startTransform, scale, focus, { x: mid.x - g.startMid.x, y: mid.y - g.startMid.y }),
        false
      );
      g.moved = true;
      return;
    }

    const dx = e.clientX - g.startPoint.x;
    const dy = e.clientY - g.startPoint.y;
    if (Math.hypot(dx, dy) > TAP_SLOP) g.moved = true;

    if (transform.current.scale > 1.01) {
      apply({ ...g.startTransform, x: g.startTransform.x + dx, y: g.startTransform.y + dy }, false);
    } else if (canSwipe && contentRef.current) {
      // Follow the finger a little so the swipe feels connected.
      contentRef.current.style.transition = "none";
      contentRef.current.style.transform = `translate3d(${dx * 0.3}px, 0, 0)`;
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    const g = gesture.current;
    pointers.current.delete(e.pointerId);

    if (pointers.current.size > 0) {
      // One finger lifted mid-pinch: continue as a pan from here.
      startGesture();
      return;
    }
    gesture.current = null;
    if (!g) return;

    const dx = e.clientX - g.startPoint.x;
    const dy = e.clientY - g.startPoint.y;
    const isZoomed = transform.current.scale > 1.01;

    if (!g.pinched && !isZoomed) {
      apply({ scale: 1, x: 0, y: 0 }, true);
      if (canSwipe && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onNext();
        else onPrev();
        return;
      }
    }

    if (g.pinched || g.moved) {
      lastTap.current = null;
      if (transform.current.scale < 1.05) apply({ scale: 1, x: 0, y: 0 }, true);
      return;
    }

    // Tap: a second one in quick succession toggles zoom at that point.
    const now = performance.now();
    const tap = { x: e.clientX, y: e.clientY };
    const prevTap = lastTap.current;
    if (
      prevTap &&
      now - prevTap.time < DOUBLE_TAP_MS &&
      Math.hypot(tap.x - prevTap.point.x, tap.y - prevTap.point.y) < 30
    ) {
      lastTap.current = null;
      if (isZoomed) apply({ scale: 1, x: 0, y: 0 }, true);
      else apply(zoomAround(transform.current, DOUBLE_TAP_SCALE, fromCenter(tap.x, tap.y)), true);
    } else {
      lastTap.current = { time: now, point: tap };
    }
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-10 touch-none select-none data-[zoomed=true]:cursor-move ${
        canSwipe ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div ref={contentRef} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}

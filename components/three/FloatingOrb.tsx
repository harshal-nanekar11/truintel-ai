"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // ── Core Icosahedron ──────────────────────────────────────────────────────
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#6366f1"),
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color("#4338ca"),
      emissiveIntensity: 0.4,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ── Wireframe Shell ───────────────────────────────────────────────────────
    const wireGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8b5cf6"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // ── Outer Ring ────────────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.0, 0.02, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#06b6d4"),
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.015, 8, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#6366f1"),
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // ── Orbiting Particles ────────────────────────────────────────────────────
    const orbitGroup = new THREE.Group();
    const orbitColors = ["#6366f1", "#8b5cf6", "#06b6d4", "#818cf8"];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.9 + Math.random() * 0.4;
      const geo = new THREE.SphereGeometry(0.04 + Math.random() * 0.04, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(orbitColors[i % orbitColors.length]),
        transparent: true,
        opacity: 0.8,
      });
      const orb = new THREE.Mesh(geo, mat);
      orb.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.6,
        Math.sin(angle) * radius
      );
      orbitGroup.add(orb);
    }
    scene.add(orbitGroup);

    // ── Lighting ──────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 1.5, 10);
    pointLight3.position.set(0, -3, 3);
    scene.add(pointLight3);

    // ── Mouse Interaction ─────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", handleMouseMove);

    // ── Animation ─────────────────────────────────────────────────────────────
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      core.rotation.y = time * 0.4;
      core.rotation.x = time * 0.15;

      wire.rotation.y = -time * 0.25;
      wire.rotation.z = time * 0.1;

      ring.rotation.z = time * 0.3;
      ring2.rotation.y = -time * 0.2;

      orbitGroup.rotation.y = time * 0.5;
      orbitGroup.rotation.x = Math.sin(time * 0.3) * 0.2;

      // Float and tilt toward mouse
      const targetX = mouseX * 0.15;
      const targetY = mouseY * 0.15 + Math.sin(time * 0.6) * 0.08;
      scene.rotation.y += (targetX - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetY - scene.rotation.x) * 0.05;

      // Pulse emissive
      coreMat.emissiveIntensity = 0.3 + Math.sin(time * 1.2) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousemove", handleMouseMove);
      coreGeo.dispose(); coreMat.dispose();
      wireGeo.dispose(); wireMat.dispose();
      ringGeo.dispose(); ringMat.dispose();
      ringGeo2.dispose(); ringMat2.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}

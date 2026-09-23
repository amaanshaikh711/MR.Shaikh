import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export interface Scene3DProps {
  variant?: 'hero' | 'lusso' | 'trustlock' | 'aicounts' | 'hatesense' | 'network';
  className?: string;
  height?: string | number;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Dynamic Lighting based on Theme
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x222233 : 0xffffff,
      isDark ? 0.9 : 1.2
    );
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(
      isDark ? 0xa855f7 : 0x6366f1,
      isDark ? 4.5 : 3.0,
      20
    );
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(
      isDark ? 0x38bdf8 : 0x0284c7,
      isDark ? 3.5 : 2.5,
      20
    );
    light2.position.set(-3, -2, 2);
    scene.add(light2);

    const animObjects: {
      mesh?: THREE.Object3D;
      rotSpeedX?: number;
      rotSpeedY?: number;
      rotSpeedZ?: number;
      update?: (t: number) => void;
    }[] = [];

    // Construct Variant Specific 3D Geometry
    if (variant === 'hero') {
      // Hero scene intentionally kept minimal; the floating particle orb is removed.
    } else if (variant === 'lusso') {
      // Architectural Room Perspective & Floating Planes
      const boxWire = new THREE.BoxGeometry(2.4, 1.8, 2.4);
      const edges = new THREE.EdgesGeometry(boxWire);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: isDark ? 0xd4a359 : 0xb8843c,
          transparent: true,
          opacity: 0.8,
        })
      );
      group.add(line);
      animObjects.push({ mesh: line, rotSpeedY: 0.004, rotSpeedX: 0.002 });

      // Floating architectural interior floor & console plates
      const plateGeom = new THREE.BoxGeometry(1.6, 0.06, 1.2);
      const plateMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x221c16 : 0xe8dfd5,
        metalness: 0.4,
        roughness: 0.3,
      });
      const plate = new THREE.Mesh(plateGeom, plateMat);
      plate.position.y = -0.4;
      line.add(plate);

      const sphereGeom = new THREE.SphereGeometry(0.3, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xe0ad67 : 0xc59b5f,
        metalness: 0.9,
        roughness: 0.2,
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.set(0.4, 0.1, 0.2);
      line.add(sphere);
    } else if (variant === 'trustlock') {
      // Cryptographic network node graph
      const nodeCount = 18;
      const nodes: THREE.Vector3[] = [];
      const nodeGeom = new THREE.SphereGeometry(0.09, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x10b981 : 0x059669,
      });

      for (let i = 0; i < nodeCount; i++) {
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        );
        nodes.push(pos);
        const node = new THREE.Mesh(nodeGeom, nodeMat);
        node.position.copy(pos);
        group.add(node);
      }

      // Connecting lines
      const linePts: THREE.Vector3[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 1.6) {
            linePts.push(nodes[i], nodes[j]);
          }
        }
      }
      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x34d399 : 0x10b981,
        transparent: true,
        opacity: isDark ? 0.4 : 0.5,
      });
      const connections = new THREE.LineSegments(lineGeom, lineMat);
      group.add(connections);
      animObjects.push({ mesh: group, rotSpeedY: 0.005, rotSpeedX: 0.003 });
    } else if (variant === 'aicounts') {
      // Floating financial analytics cube prism & data columns
      const prismGeom = new THREE.OctahedronGeometry(1.4, 0);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x3b82f6 : 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const prism = new THREE.Mesh(prismGeom, prismMat);
      group.add(prism);

      // Core glowing crystal
      const coreGeom = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const coreMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x60a5fa : 0x1d4ed8,
        metalness: 0.8,
        roughness: 0.2,
      });
      const core = new THREE.Mesh(coreGeom, coreMat);
      group.add(core);

      animObjects.push({ mesh: prism, rotSpeedY: 0.006, rotSpeedZ: 0.003 });
      animObjects.push({ mesh: core, rotSpeedY: -0.008, rotSpeedX: 0.004 });
    } else {
      // hatesense / sentiment vector cluster
      const torusGeom = new THREE.TorusKnotGeometry(0.9, 0.28, 64, 16);
      const torusMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xef4444 : 0xdc2626,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const torus = new THREE.Mesh(torusGeom, torusMat);
      group.add(torus);
      animObjects.push({ mesh: torus, rotSpeedY: 0.006, rotSpeedX: 0.004 });
    }

    // Interactive pointer parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.7;
      targetRotX = y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth pointer damping
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      animObjects.forEach((obj) => {
        if (obj.mesh) {
          if (obj.rotSpeedX) obj.mesh.rotation.x += obj.rotSpeedX;
          if (obj.rotSpeedY) obj.mesh.rotation.y += obj.rotSpeedY;
          if (obj.rotSpeedZ) obj.mesh.rotation.z += obj.rotSpeedZ;
        }
        if (obj.update) obj.update(elapsed);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [variant, isDark]);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
    />
  );
};

export default Scene3D;

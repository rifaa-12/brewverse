import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCoffeeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Groups
    const mainRig = new THREE.Group();
    scene.add(mainRig);

    const cupGroup = new THREE.Group();
    mainRig.add(cupGroup);

    // STUDIO LIGHTING
    const keyLight = new THREE.DirectionalLight(0xffe0b2, 3.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd99b61, 4.5);
    rimLight.position.set(-4.5, 3, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x423832, 1.2);
    fillLight.position.set(2, -3, 2);
    scene.add(fillLight);

    const cremaSpot = new THREE.SpotLight(0xffbe76, 3.5, 8, Math.PI / 5, 0.6, 1.2);
    cremaSpot.position.set(0, 3.5, 0.8);
    cremaSpot.target = cupGroup;
    scene.add(cremaSpot);

    const ambient = new THREE.AmbientLight(0x201815, 1.5);
    scene.add(ambient);

    // 3D COFFEE CUP GEOMETRY & MATERIALS
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x141211,
      roughness: 0.38,
      metalness: 0.12,
    });

    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcaa06d,
      roughness: 0.25,
      metalness: 0.85,
    });

    // Sleek Tumbler / Cup outer body
    const cupBodyGeo = new THREE.CylinderGeometry(1.02, 0.86, 2.05, 64, 1, false);
    const cupBody = new THREE.Mesh(cupBodyGeo, bodyMaterial);
    cupBody.castShadow = true;
    cupBody.receiveShadow = true;
    cupGroup.add(cupBody);

    // Tumbler Bronze Base Ring
    const baseRingGeo = new THREE.CylinderGeometry(0.88, 0.82, 0.45, 64);
    const baseRing = new THREE.Mesh(baseRingGeo, bronzeMaterial);
    baseRing.position.y = -0.95;
    baseRing.castShadow = true;
    cupGroup.add(baseRing);

    // Bronze Top Rim Lip
    const topLipGeo = new THREE.TorusGeometry(1.02, 0.045, 24, 64);
    topLipGeo.rotateX(Math.PI / 2);
    const topLip = new THREE.Mesh(topLipGeo, bronzeMaterial);
    topLip.position.y = 1.02;
    cupGroup.add(topLip);

    // Inner dark ceramic wall
    const innerWallGeo = new THREE.CylinderGeometry(0.97, 0.94, 0.4, 48, 1, true);
    const innerWallMat = new THREE.MeshStandardMaterial({
      color: 0x100d0b,
      roughness: 0.5,
      side: THREE.BackSide,
    });
    const innerWall = new THREE.Mesh(innerWallGeo, innerWallMat);
    innerWall.position.y = 0.85;
    cupGroup.add(innerWall);

    // Liquid Coffee Surface (Crema Texture)
    const cremaCanvas = document.createElement('canvas');
    cremaCanvas.width = 512;
    cremaCanvas.height = 512;
    const ctx = cremaCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
      grad.addColorStop(0, '#e5be85');
      grad.addColorStop(0.35, '#c99355');
      grad.addColorStop(0.7, '#804c23');
      grad.addColorStop(0.92, '#3b2010');
      grad.addColorStop(1, '#1b0c05');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = 'rgba(255, 240, 200, 0.28)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 28; i++) {
        ctx.beginPath();
        const r = 30 + Math.random() * 190;
        const sa = Math.random() * Math.PI * 2;
        ctx.arc(256, 256, r, sa, sa + 1.2 + Math.random());
        ctx.stroke();
      }
      for (let i = 0; i < 180; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(240, 190, 130, 0.4)' : 'rgba(40, 20, 10, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.random() * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const cremaTexture = new THREE.CanvasTexture(cremaCanvas);
    const liquidMat = new THREE.MeshStandardMaterial({
      map: cremaTexture,
      roughness: 0.18,
      metalness: 0.08,
    });
    const liquidGeo = new THREE.CircleGeometry(0.96, 64);
    liquidGeo.rotateX(-Math.PI / 2);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.88;
    cupGroup.add(liquidMesh);

    // Gold 'B.' Insignia on Cup Face
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const lctx = logoCanvas.getContext('2d');
    if (lctx) {
      lctx.clearRect(0, 0, 512, 512);
      lctx.fillStyle = '#dfb582';
      lctx.font = 'italic 700 180px "Playfair Display", Georgia, serif';
      lctx.textAlign = 'center';
      lctx.textBaseline = 'middle';
      lctx.fillText('B.', 256, 256);

      lctx.strokeStyle = 'rgba(223, 181, 130, 0.35)';
      lctx.lineWidth = 4;
      lctx.beginPath();
      lctx.arc(256, 256, 170, 0, Math.PI * 2);
      lctx.stroke();
    }

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.75,
      depthWrite: false,
    });
    const logoGeo = new THREE.PlaneGeometry(0.85, 0.85);
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 0.05, 1.035);
    cupGroup.add(logoMesh);

    // STEAM PARTICLES
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamVelocities: { y: number; x: number; z: number; phase: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3 + 0] = (Math.random() - 0.5) * 0.7;
      steamPositions[i * 3 + 1] = 0.95 + Math.random() * 1.8;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
      steamVelocities.push({
        y: 0.005 + Math.random() * 0.007,
        x: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 128;
    steamCanvas.height = 128;
    const sctx = steamCanvas.getContext('2d');
    if (sctx) {
      const sgrad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      sgrad.addColorStop(0, 'rgba(230, 215, 200, 0.35)');
      sgrad.addColorStop(0.5, 'rgba(210, 190, 175, 0.12)');
      sgrad.addColorStop(1, 'rgba(200, 180, 160, 0)');
      sctx.fillStyle = sgrad;
      sctx.fillRect(0, 0, 128, 128);
    }

    const steamTex = new THREE.CanvasTexture(steamCanvas);
    const steamMat = new THREE.PointsMaterial({
      size: 0.65,
      map: steamTex,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    cupGroup.add(steamParticles);

    // FLOATING 3D COFFEE BEANS
    function createBeanGeometry() {
      const geo = new THREE.SphereGeometry(0.22, 24, 18);
      geo.scale(1.28, 0.78, 0.85);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i);
        let z = pos.getZ(i);
        if (y > 0 && Math.abs(z) < 0.09) {
          pos.setY(i, y * 0.62);
        }
      }
      geo.computeVertexNormals();
      return geo;
    }

    const beanGeo = createBeanGeometry();
    const beanMaterialDark = new THREE.MeshStandardMaterial({
      color: 0x2b1a12,
      roughness: 0.42,
      metalness: 0.15,
    });
    const beanMaterialRoast = new THREE.MeshStandardMaterial({
      color: 0x482b1d,
      roughness: 0.38,
      metalness: 0.12,
    });

    const beans: {
      mesh: THREE.Mesh;
      basePos: number[];
      rotSpeed: number[];
      floatY: number;
      phase: number;
    }[] = [];

    const beanConfig = [
      { pos: [-1.8, 1.1, 0.8], rot: [0.6, 0.4, 0.8], speed: 0.008, floatY: 0.3 },
      { pos: [1.9, 0.9, 0.6], rot: [1.2, 0.8, 0.3], speed: -0.007, floatY: 0.35 },
      { pos: [-2.1, -0.6, 1.2], rot: [0.2, 1.1, 0.4], speed: 0.009, floatY: 0.25 },
      { pos: [2.2, -0.7, 0.9], rot: [0.9, 0.3, 1.4], speed: -0.006, floatY: 0.28 },
      { pos: [-1.4, 1.8, -0.8], rot: [0.4, 0.2, 0.9], speed: 0.005, floatY: 0.2 },
      { pos: [1.5, 1.7, -0.6], rot: [0.7, 0.9, 0.2], speed: -0.008, floatY: 0.22 },
      { pos: [-0.9, -1.6, 1.3], rot: [1.1, 0.5, 0.3], speed: 0.007, floatY: 0.3 },
      { pos: [1.1, -1.5, 1.1], rot: [0.3, 1.3, 0.7], speed: -0.009, floatY: 0.27 },
      { pos: [-2.5, 0.2, -0.5], rot: [0.5, 0.6, 1.1], speed: 0.006, floatY: 0.2 },
      { pos: [2.6, 0.1, -0.4], rot: [1.4, 0.2, 0.5], speed: -0.005, floatY: 0.18 },
      { pos: [-0.4, 2.2, 0.5], rot: [0.8, 0.7, 0.1], speed: 0.007, floatY: 0.25 },
      { pos: [0.6, 2.3, -0.3], rot: [0.2, 0.4, 1.2], speed: -0.006, floatY: 0.24 },
      { pos: [-1.2, -0.1, 2.1], rot: [0.5, 0.8, 0.6], speed: 0.01, floatY: 0.3 },
      { pos: [1.3, -0.2, 2.0], rot: [0.9, 0.5, 0.2], speed: -0.008, floatY: 0.32 },
    ];

    beanConfig.forEach((cfg, idx) => {
      const mat = idx % 2 === 0 ? beanMaterialDark : beanMaterialRoast;
      const beanMesh = new THREE.Mesh(beanGeo, mat);
      beanMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      beanMesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      beanMesh.castShadow = true;
      mainRig.add(beanMesh);

      beans.push({
        mesh: beanMesh,
        basePos: [...cfg.pos],
        rotSpeed: [cfg.speed * 1.5, cfg.speed * 2, cfg.speed],
        floatY: cfg.floatY,
        phase: idx * 0.7,
      });
    });

    // Resting Orientation
    cupGroup.rotation.x = 0.22;
    cupGroup.rotation.y = -0.35;
    cupGroup.rotation.z = -0.04;

    // MOUSE & DRAG & SCROLL REACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let dragRotY = 0;
    let isDragging = false;
    let previousPointerX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        dragRotY += deltaX * 0.01;
        previousPointerX = e.clientX;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', handleResize);
    updateScrollProgress();

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.06;

      const breath = Math.sin(time * 0.9) * 0.08;
      cupGroup.position.y = breath;

      // Base rotation + mouse parallax + drag + scroll reaction
      cupGroup.rotation.y =
        -0.35 +
        Math.sin(time * 0.25) * 0.2 +
        mouseX * 0.45 +
        dragRotY +
        scrollProgress * Math.PI * 1.8;
      cupGroup.rotation.x =
        0.22 + Math.cos(time * 0.3) * 0.05 - mouseY * 0.35 + scrollProgress * 0.4;
      cupGroup.rotation.z =
        -0.04 + mouseX * 0.15 + Math.sin(scrollProgress * Math.PI) * -0.2;

      // Dynamic camera / rig glide
      if (scrollProgress < 0.35) {
        const p = scrollProgress / 0.35;
        mainRig.position.x = 0.95 - p * 2.2;
        mainRig.position.y = 0.05 + p * 0.2;
        mainRig.scale.setScalar(1.0 + p * 0.15);
      } else if (scrollProgress < 0.7) {
        const p = (scrollProgress - 0.35) / 0.35;
        mainRig.position.x = -1.25 + p * 2.4;
        mainRig.position.y = 0.25 - p * 0.3;
        mainRig.scale.setScalar(1.15 - p * 0.1);
      } else {
        const p = (scrollProgress - 0.7) / 0.3;
        mainRig.position.x = 1.15 - p * 1.15;
        mainRig.position.y = -0.05 - p * 0.15;
        mainRig.scale.setScalar(1.05 + p * 0.1);
      }

      // Animate Steam
      const sPos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        sPos[i * 3 + 1] += steamVelocities[i].y;
        sPos[i * 3 + 0] += Math.sin(time * 2 + steamVelocities[i].phase) * 0.0015;
        sPos[i * 3 + 2] += Math.cos(time * 2 + steamVelocities[i].phase) * 0.0015;

        if (sPos[i * 3 + 1] > 2.8) {
          sPos[i * 3 + 1] = 0.95;
          sPos[i * 3 + 0] = (Math.random() - 0.5) * 0.6;
          sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Animate Floating Coffee Beans
      beans.forEach((b, i) => {
        b.mesh.rotation.x += b.rotSpeed[0];
        b.mesh.rotation.y += b.rotSpeed[1];
        b.mesh.rotation.z += b.rotSpeed[2];

        const floatDelta = Math.sin(time * 1.2 + b.phase) * b.floatY;
        b.mesh.position.y = b.basePos[1] + floatDelta + mouseY * -0.2;
        b.mesh.position.x = b.basePos[0] + mouseX * 0.3 + Math.sin(time * 0.5 + i) * 0.08;
        b.mesh.position.z = b.basePos[2] + Math.cos(time * 0.4 + i) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);

      // Cleanup
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cupBodyGeo.dispose();
      baseRingGeo.dispose();
      topLipGeo.dispose();
      innerWallGeo.dispose();
      liquidGeo.dispose();
      logoGeo.dispose();
      steamGeo.dispose();
      beanGeo.dispose();
      bodyMaterial.dispose();
      bronzeMaterial.dispose();
      innerWallMat.dispose();
      liquidMat.dispose();
      logoMat.dispose();
      steamMat.dispose();
      beanMaterialDark.dispose();
      beanMaterialRoast.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 bg-transparent select-none"
      style={{ display: 'block' }}
    />
  );
};

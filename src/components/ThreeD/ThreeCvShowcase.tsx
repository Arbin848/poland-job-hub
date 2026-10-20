import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CVData, LanguageCode } from '../../types/cv';
import { CV_TRANSLATIONS } from '../../data/translations';
import {
  RotateCcw,
  Camera,
  Play,
  Pause,
  Sun,
  Moon,
  Sparkles,
  Maximize2,
  Download,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

interface Props {
  cv: CVData;
  language: LanguageCode;
  onClose?: () => void;
}

type LightingTheme = 'studio' | 'executive' | 'creative';

export const ThreeCvShowcase: React.FC<Props> = ({ cv, language, onClose }) => {
  const isPl = language === 'pl';
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const paperMeshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [theme, setTheme] = useState<LightingTheme>('studio');
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);
  const [webGlError, setWebGlError] = useState<string | null>(null);

  // Helper to render high-res A4 CV onto an HTML5 2D Canvas
  const drawCvToCanvas = (cvData: CVData): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1754; // A4 ratio 1:1.414 @ ~150dpi
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const t = CV_TRANSLATIONS[cvData.language || 'pl'];
    const accent = cvData.accentColor || '#1e3a8a';
    const isDarkTemplate = cvData.templateId === 'dynamic-impact';

    // Base Paper Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle subtle paper grain/gradient
    const paperGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    paperGrad.addColorStop(0, '#ffffff');
    paperGrad.addColorStop(1, '#fcfcfd');
    ctx.fillStyle = paperGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Top Header Banner depending on template
    if (cvData.templateId === 'dynamic-impact') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, 240);
      ctx.fillStyle = accent;
      ctx.fillRect(0, 232, canvas.width, 8);
    } else if (cvData.templateId === 'euro-modern') {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, 220);
      ctx.fillStyle = accent;
      ctx.fillRect(60, 216, canvas.width - 120, 4);
    } else {
      ctx.fillStyle = accent;
      ctx.fillRect(60, 220, canvas.width - 120, 3);
    }

    // Name & Title
    ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDarkTemplate ? '#ffffff' : accent;
    ctx.fillText(cvData.personalInfo.fullName || 'Imię i Nazwisko', 60, 95);

    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDarkTemplate ? '#94a3b8' : '#334155';
    ctx.fillText(cvData.personalInfo.jobTitle || 'Stanowisko / Tytuł Zawodowy', 60, 140);

    // Contact line
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDarkTemplate ? '#cbd5e1' : '#64748b';
    const contactParts = [
      cvData.personalInfo.email,
      cvData.personalInfo.phone,
      cvData.personalInfo.location,
      cvData.personalInfo.drivingLicense
    ].filter(Boolean);
    ctx.fillText(contactParts.join('  •  '), 60, 185);

    // 2-Column Body
    const leftColX = 60;
    const leftColW = 720;
    const rightColX = 820;
    const rightColW = 360;
    let leftY = 270;
    let rightY = 270;

    // Helper: Draw Section Title
    const drawSectionTitle = (title: string, x: number, y: number, w: number) => {
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(title.toUpperCase(), x, y);
      ctx.fillStyle = accent;
      ctx.fillRect(x, y + 8, w, 2);
      return y + 32;
    };

    // Helper: Wrap text
    const wrapText = (text: string, x: number, startY: number, maxW: number, lineHeight: number, maxLines = 5) => {
      const words = text.split(' ');
      let line = '';
      let curY = startY;
      let lineCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          ctx.fillText(line, x, curY);
          line = words[n] + ' ';
          curY += lineHeight;
          lineCount++;
          if (lineCount >= maxLines) break;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, curY);
      return curY + lineHeight;
    };

    // Left Column: Summary
    if (cvData.summary && cvData.sectionVisibility?.summary !== false) {
      leftY = drawSectionTitle(t.professionalSummary, leftColX, leftY, leftColW);
      ctx.font = '400 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#334155';
      leftY = wrapText(cvData.summary, leftColX, leftY, leftColW, 24, 4) + 15;
    }

    // Left Column: Work Experience
    if (cvData.experiences.length > 0 && cvData.sectionVisibility?.experience !== false) {
      leftY = drawSectionTitle(t.experience, leftColX, leftY, leftColW);

      cvData.experiences.slice(0, 3).forEach((exp) => {
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(exp.role, leftColX, leftY);

        ctx.font = '500 14px monospace';
        ctx.fillStyle = '#64748b';
        const dateStr = `${exp.startDate} - ${exp.current ? t.present : exp.endDate || t.present}`;
        ctx.fillText(dateStr, leftColX + leftColW - 180, leftY);
        leftY += 22;

        ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, leftColX, leftY);
        leftY += 22;

        ctx.font = '400 14.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#334155';
        (exp.bullets || []).slice(0, 2).forEach((bullet) => {
          ctx.fillText('•', leftColX + 4, leftY);
          leftY = wrapText(bullet, leftColX + 20, leftY, leftColW - 30, 21, 2);
        });
        leftY += 12;
      });
    }

    // Left Column: Education
    if (cvData.educations.length > 0 && cvData.sectionVisibility?.education !== false) {
      leftY = drawSectionTitle(t.education, leftColX, leftY, leftColW);
      cvData.educations.slice(0, 2).forEach((edu) => {
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(`${edu.degree} — ${edu.fieldOfStudy}`, leftColX, leftY);
        leftY += 20;

        ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`${edu.institution} (${edu.faculty})`, leftColX, leftY);
        leftY += 24;
      });
    }

    // Right Column: Skills
    if (cvData.technicalSkills.length > 0 && cvData.sectionVisibility?.skills !== false) {
      rightY = drawSectionTitle(t.technicalSkills, rightColX, rightY, rightColW);
      ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#1e293b';

      cvData.technicalSkills.slice(0, 8).forEach((skill) => {
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(rightColX, rightY - 14, rightColW - 20, 26);
        ctx.fillStyle = accent;
        ctx.fillRect(rightColX, rightY - 14, 4, 26);
        ctx.fillStyle = '#0f172a';
        ctx.fillText(skill, rightColX + 14, rightY + 4);
        rightY += 32;
      });
      rightY += 15;
    }

    // Right Column: Languages
    if (cvData.languages.length > 0 && cvData.sectionVisibility?.languages !== false) {
      rightY = drawSectionTitle(t.languages, rightColX, rightY, rightColW);
      cvData.languages.slice(0, 4).forEach((lang) => {
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(lang.language, rightColX, rightY);

        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = accent;
        ctx.fillText(lang.level, rightColX + rightColW - 60, rightY);
        rightY += 26;
      });
      rightY += 15;
    }

    // Right Column: Certifications
    if (cvData.certifications.length > 0 && cvData.sectionVisibility?.certifications !== false) {
      rightY = drawSectionTitle(t.certifications, rightColX, rightY, rightColW);
      cvData.certifications.slice(0, 3).forEach((cert) => {
        ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0f172a';
        rightY = wrapText(cert.name, rightColX, rightY, rightColW - 20, 19, 2);
        ctx.font = '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`${cert.issuer} (${cert.date})`, rightColX, rightY);
        rightY += 22;
      });
    }

    // Polish RODO Footer Clause
    if (cvData.rodo && cvData.rodo.enabled && cvData.rodo.text && cvData.sectionVisibility?.rodo !== false) {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(60, 1640, canvas.width - 120, 1);
      ctx.font = '400 10.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#64748b';
      wrapText(cvData.rodo.text, 60, 1660, canvas.width - 120, 14, 4);
    }

    return canvas;
  };

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cleanupFn = () => {};

    try {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 600;

      // 1. Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(38, Math.max(0.1, width / height), 0.1, 100);
      camera.position.set(0, 2.2, 3.8);
      cameraRef.current = camera;

      // 3. Renderer with PBR settings
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Don't flip below desk
    controls.minDistance = 1.8;
    controls.maxDistance = 6.5;
    controls.target.set(0, 0.1, 0);
    controlsRef.current = controls;

    // 5. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Desk Surface
    const deskGeo = new THREE.BoxGeometry(10, 0.2, 8);
    const deskMat = new THREE.MeshStandardMaterial({
      color: theme === 'executive' ? 0x111827 : theme === 'creative' ? 0x292524 : 0xe2e8f0,
      roughness: 0.35,
      metalness: 0.1,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.y = -0.1;
    desk.receiveShadow = true;
    scene.add(desk);

    // 7. A4 Paper Document
    // A4 real world ratio: 2.1 x 2.97 (scale down to 1.6 x 2.26)
    const paperWidth = 1.6;
    const paperHeight = 2.26;
    const paperGeo = new THREE.BoxGeometry(paperWidth, 0.008, paperHeight, 16, 1, 16);

    // Subtle natural bend to paper edges
    const pos = paperGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Gentle subtle curve at corner
      const curve = Math.sin((x / paperWidth) * Math.PI) * 0.012 - (z > 0.8 ? (z - 0.8) * 0.03 : 0);
      pos.setY(i, pos.getY(i) + curve);
    }
    paperGeo.computeVertexNormals();

    const cvCanvas = drawCvToCanvas(cv);
    const cvTexture = new THREE.CanvasTexture(cvCanvas);
    cvTexture.colorSpace = THREE.SRGBColorSpace;
    cvTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    canvasTextureRef.current = cvTexture;

    // Paper materials (top has CV texture, sides/back have clean white paper material)
    const paperBaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.65,
      metalness: 0.02,
    });
    const paperFaceMat = new THREE.MeshStandardMaterial({
      map: cvTexture,
      roughness: 0.55,
      metalness: 0.02,
    });

    // Box faces: [right, left, top, bottom, front, back] -> top is index 2
    const paperMaterials = [
      paperBaseMat,
      paperBaseMat,
      paperFaceMat,
      paperBaseMat,
      paperBaseMat,
      paperBaseMat,
    ];

    const paperMesh = new THREE.Mesh(paperGeo, paperMaterials);
    paperMesh.position.set(0, 0.02, 0);
    paperMesh.castShadow = true;
    paperMesh.receiveShadow = true;
    paperMeshRef.current = paperMesh;
    scene.add(paperMesh);

    // 8. 3D Executive Pen (Metal & Brass composite model)
    const penGroup = new THREE.Group();
    const penBodyGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 24);
    const penBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const penBody = new THREE.Mesh(penBodyGeo, penBodyMat);
    penBody.castShadow = true;

    const penTrimGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.08, 24);
    const penTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Gold trim
      metalness: 0.95,
      roughness: 0.15,
    });
    const penTrim = new THREE.Mesh(penTrimGeo, penTrimMat);
    penTrim.position.y = 0.2;

    const penTipGeo = new THREE.ConeGeometry(0.02, 0.12, 24);
    const penTip = new THREE.Mesh(penTipGeo, penTrimMat);
    penTip.position.y = -0.65;
    penTip.rotation.x = Math.PI;

    penGroup.add(penBody);
    penGroup.add(penTrim);
    penGroup.add(penTip);
    penGroup.rotation.x = Math.PI / 2;
    penGroup.rotation.z = -0.35;
    penGroup.position.set(1.15, 0.02, 0.2);
    scene.add(penGroup);

    // 9. 3D Agency Verification Token / Seal
    const badgeGroup = new THREE.Group();
    const badgeGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.25,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.castShadow = true;
    badgeGroup.add(badgeMesh);
    badgeGroup.position.set(-1.1, 0.02, -0.6);
    scene.add(badgeGroup);

    // 10. Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(2.5, 4.5, 2.5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 10;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6);
    fillLight.position.set(-3, 3, -2);
    scene.add(fillLight);

    // 11. Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && paperMeshRef.current) {
        paperMeshRef.current.rotation.y += delta * 0.18;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    cleanupFn = () => {
        window.removeEventListener('resize', handleResize);
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
        controls.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        paperGeo.dispose();
        cvTexture.dispose();
        deskGeo.dispose();
        deskMat.dispose();
        penBodyGeo.dispose();
        penBodyMat.dispose();
        penTrimGeo.dispose();
        penTrimMat.dispose();
        penTipGeo.dispose();
        badgeGeo.dispose();
        badgeMat.dispose();
      };
    } catch (err: any) {
      console.warn('WebGL init error:', err);
      setWebGlError(err?.message || 'WebGL not supported');
    }

    return () => cleanupFn();
  }, []);

  // Update CV Texture when CV data changes
  useEffect(() => {
    if (canvasTextureRef.current) {
      const newCanvas = drawCvToCanvas(cv);
      canvasTextureRef.current.image = newCanvas;
      canvasTextureRef.current.needsUpdate = true;
    }
  }, [cv]);

  // Handle Theme Change
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    if (theme === 'executive') {
      scene.background = new THREE.Color(0x090d16);
    } else if (theme === 'creative') {
      scene.background = new THREE.Color(0x1c1917);
    } else {
      scene.background = new THREE.Color(0xf1f5f9);
    }
  }, [theme]);

  // Camera Reset to Front Reading View
  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current || !paperMeshRef.current) return;
    paperMeshRef.current.rotation.y = 0;
    cameraRef.current.position.set(0, 2.3, 2.9);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  // Mockup snapshot downloader
  const handleTakeSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${cv.personalInfo.fullName.replace(/\s+/g, '_')}_3D_Showcase_Mockup.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2500);
  };

  if (webGlError) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center space-y-4">
        <Sparkles className="w-10 h-10 text-amber-400" />
        <h3 className="text-base font-bold">Tryb 3D niedostępny na tym urządzeniu</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Twoja przeglądarka lub środowisko nie obsługuje akceleracji WebGL. Wszystkie funkcje edycji i pobierania dokumentów działają w standardowym widoku 2D.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
          >
            Wróć do standardowego widoku 2D A4
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900 overflow-hidden select-none">
      {/* Top 3D Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg text-white text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold">
            {isPl ? 'Studio 3D & Prezentacja Biurkowa' : '3D Desk Studio & Showcase'}
          </span>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            (Three.js PBR)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg text-xs">
          {/* Rotate toggle */}
          <button
            type="button"
            onClick={() => setIsRotating((r) => !r)}
            className={`p-2 rounded-lg transition flex items-center gap-1 font-semibold ${
              isRotating ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
            title={isPl ? 'Włącz/Wyłącz obrót 3D' : 'Toggle 3D Rotation'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isPl ? 'Obrót' : 'Rotate'}</span>
          </button>

          {/* Reset View */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1"
            title={isPl ? 'Widok z góry / Reset kamery' : 'Reset Camera View'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isPl ? 'Centruj' : 'Reset'}</span>
          </button>

          {/* Lighting Theme Picker */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => setTheme('studio')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                theme === 'studio' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setTheme('executive')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                theme === 'executive' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark
            </button>
          </div>

          {/* Download 3D Snapshot */}
          <button
            type="button"
            onClick={handleTakeSnapshot}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition ml-1"
            title={isPl ? 'Pobierz zdjęcie makiety 3D na LinkedIn / Portfolio' : 'Download 3D Mockup Image'}
          >
            {snapshotTaken ? <Check className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
            <span>{snapshotTaken ? (isPl ? 'Zapisano!' : 'Saved!') : (isPl ? 'Mockup PNG' : 'Snapshot')}</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bottom Hint Strip */}
      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between text-[11px] text-slate-400">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 pointer-events-auto">
          {isPl
            ? '💡 Przeciągaj myszką/palcem, aby obracać w 360°. Scrolluj, aby przybliżać detale.'
            : '💡 Click & drag to orbit in 3D. Scroll/pinch to zoom in.'}
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 hidden sm:block pointer-events-auto">
          {isPl
            ? 'Fizyczna makieta dokumentu A4 ze złotym piórem i pieczęcią weryfikacji'
            : 'Tactile A4 paper mockup with executive pen and verification seal'}
        </div>
      </div>
    </div>
  );
};

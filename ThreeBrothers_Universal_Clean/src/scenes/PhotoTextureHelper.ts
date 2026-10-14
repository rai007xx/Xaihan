import * as THREE from 'three';

export function createBrotherPlaceholderTexture(number: string, name: string, role: string, colorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1365;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 1024, 1365);
  grad.addColorStop(0, '#0a0e1a');
  grad.addColorStop(0.5, '#121829');
  grad.addColorStop(1, '#07090e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1365);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 1500; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1365);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(512, 500, 240, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.fill();
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.font = '900 220px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(number, 512, 500);

  const initials = name.split(' ').map((n) => n[0]).join('');
  ctx.fillStyle = colorHex;
  ctx.font = 'bold 90px Inter, sans-serif';
  ctx.fillText(initials, 512, 500);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillText('PORTRAIT PROFILE', 512, 850);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 48px Inter, sans-serif';
  ctx.fillText(name.toUpperCase(), 512, 920);

  ctx.fillStyle = colorHex;
  ctx.font = '500 32px Inter, sans-serif';
  ctx.fillText(role.toUpperCase(), 512, 980);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function loadBrotherPhotoTexture(
  primaryPath: string,
  onSuccess: (tex: THREE.Texture) => void,
  onFallback: () => void
) {
  const loader = new THREE.TextureLoader();

  const cleanPath = primaryPath.replace(/\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/, '');
  const candidates = [
    primaryPath,
    `${cleanPath}.JPG`,
    `${cleanPath}.jpg`,
    `${cleanPath}.jpeg`,
    `${cleanPath}.png`,
    `${cleanPath}.webp`,
    primaryPath.startsWith('/') ? `.${primaryPath}` : `/${primaryPath}`,
    primaryPath.startsWith('/') ? `.${cleanPath}.JPG` : `/${cleanPath}.JPG`,
    primaryPath.startsWith('/') ? `.${cleanPath}.jpg` : `/${cleanPath}.jpg`
  ];

  const uniqueCandidates = Array.from(new Set(candidates));

  function tryNext(index: number) {
    if (index >= uniqueCandidates.length) {
      onFallback();
      return;
    }

    loader.load(
      uniqueCandidates[index],
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.generateMipmaps = true;
        tex.anisotropy = 16;

        // Target plane aspect ratio (3.08 / 3.88 = ~0.793)
        const targetAspect = 3.08 / 3.88;
        const imageAspect = tex.image.width / tex.image.height;

        if (imageAspect > targetAspect) {
          const repeatX = targetAspect / imageAspect;
          tex.repeat.set(repeatX, 1);
          tex.offset.set((1 - repeatX) / 2, 0);
        } else {
          const repeatY = imageAspect / targetAspect;
          tex.repeat.set(1, repeatY);
          tex.offset.set(0, (1 - repeatY) / 2);
        }

        tex.needsUpdate = true;
        onSuccess(tex);
      },
      undefined,
      () => {
        tryNext(index + 1);
      }
    );
  }

  tryNext(0);
}

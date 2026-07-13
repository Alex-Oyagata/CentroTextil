import gsap from 'gsap';

export function initBlackHole() {
  const blobs = document.querySelectorAll('.blob-item');
  const displacementMap = document.querySelector('.gravity-displacement');
  
  if (!blobs.length || !displacementMap) return;

  // We want the gravity effect to happen based on two things:
  // 1. Mouse position (parallax gravity)
  // 2. Proximity to the center of the screen

  let mouseX = window.innerWidth / 2;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
  });

  function updateGravity() {
    const centerX = window.innerWidth / 2;
    
    // Find the blob that is closest to the center
    let maxDistortion = 0;

    blobs.forEach(blob => {
      const rect = blob.getBoundingClientRect();
      const blobCenterX = rect.left + rect.width / 2;
      
      // Calculate distance from screen center
      const distFromCenter = Math.abs(centerX - blobCenterX);
      
      // Calculate normalized influence (0 to 1)
      // 1 means it's exactly at the center, 0 means it's far away
      const influenceRadius = window.innerWidth * 0.4; 
      let influence = 1 - (distFromCenter / influenceRadius);
      influence = Math.max(0, Math.min(1, influence)); // clamp
      
      // Calculate mouse influence
      const distFromMouse = Math.abs(mouseX - blobCenterX);
      let mouseInfluence = 1 - (distFromMouse / influenceRadius);
      mouseInfluence = Math.max(0, Math.min(1, mouseInfluence));

      // Combine influences
      const combinedInfluence = influence * 0.7 + mouseInfluence * 0.3;
      
      if (combinedInfluence > maxDistortion) {
        maxDistortion = combinedInfluence;
      }
    });

    // Animate the scale of the SVG displacement map
    // The scale determines how intensely the pixels are pushed around
    const targetScale = maxDistortion * 150; // max scale
    
    // Lerp for smooth recovery/stretching
    const currentScale = parseFloat(displacementMap.getAttribute('scale')) || 0;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    
    displacementMap.setAttribute('scale', newScale);

    requestAnimationFrame(updateGravity);
  }

  updateGravity();
}

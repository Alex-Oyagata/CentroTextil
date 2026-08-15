// ======================== CONTACTO JS ========================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const telefono = document.getElementById('telefono')?.value.trim() || '';
    const mensaje = document.getElementById('mensaje')?.value.trim() || '';

    // Build WhatsApp message
    let text = `Hola, soy *${nombre}*`;
    if (email) text += ` (${email})`;
    if (telefono) text += ` | Tel: ${telefono}`;
    text += `.\n\n${mensaje || 'Me gustaría obtener más información sobre sus servicios.'}`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/593995202556?text=${encoded}`;
    window.open(waUrl, '_blank');
  });
});

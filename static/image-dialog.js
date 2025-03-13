   document.addEventListener('DOMContentLoaded', function() {
     const images = document.querySelectorAll('img');
     images.forEach(img => {
       img.style.cursor = 'pointer'; // Cursor ändern
       img.addEventListener('click', function() {
         const src = this.getAttribute('src');
         const modal = document.createElement('div');
         modal.style.position = 'fixed';
         modal.style.top = '15%';
         modal.style.left = '15%';
         modal.style.width = '70%';
         modal.style.height = '70%';
         modal.style.backgroundColor = '#ffffff'; // Hintergrund weiß und undurchsichtig
         modal.style.zIndex = '1000'; // Modal im Vordergrund
         modal.style.display = 'flex';
         modal.style.justifyContent = 'center';
         modal.style.alignItems = 'center';
         modal.style.border = '2px solid #000000'; // Rand um das Modal

         // Schließen-Knopf hinzufügen
         const closeButton = document.createElement('span');
         closeButton.innerHTML = '&times;';
         closeButton.style.position = 'absolute';
         closeButton.style.top = '10px';
         closeButton.style.right = '20px';
         closeButton.style.fontSize = '30px';
         closeButton.style.cursor = 'pointer';
         closeButton.addEventListener('click', function() {
           document.body.removeChild(modal);
         });

         modal.innerHTML = `<img src="${src}" style="max-width: 90%; max-height: 90%; background-color: #ffffff;">`; // Bild mit weißem Hintergrund
         modal.appendChild(closeButton); // Schließen-Knopf zum Modal hinzufügen
         modal.addEventListener('click', function() {
           document.body.removeChild(modal);
         });
         document.body.appendChild(modal);
       });
     });
   });

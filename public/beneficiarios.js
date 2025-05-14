document.addEventListener('DOMContentLoaded', function() {
    const numBeneficiariosInput = document.getElementById('numBeneficiarios');
    const generarCamposBtn = document.getElementById('generarCampos');
    const beneficiariosFields = document.getElementById('beneficiariosFields');
    const formulario = document.getElementById('form-cliente');
    
    // Función para generar los campos de beneficiarios
    generarCamposBtn.addEventListener('click', function() {
        const numBeneficiarios = 2*parseInt(numBeneficiariosInput.value);
        
        // Limpiar campos anteriores
        beneficiariosFields.innerHTML = '';
        
        if (numBeneficiarios > 0) {
            // Crear título de sección
            const titulo = document.createElement('h3');
            titulo.textContent = 'Información de beneficiarios';
            beneficiariosFields.appendChild(titulo);
            
            // Generar campos para cada beneficiario
            for (let i = 1; i <= numBeneficiarios; i++) {
                const beneficiariosContainer = document.createElement('div');
                beneficiariosContainer.className = 'beneficiario-container';
                
                const beneficiarioTitle = document.createElement('div');
                beneficiarioTitle.className = 'beneficiario-title';
                beneficiarioTitle.textContent = `beneficiario`;
                beneficiariosContainer.appendChild(beneficiarioTitle);
                
                // Campo para el nombre
                const nombreGroup = document.createElement('div');
                nombreGroup.className = 'form-group';
                
                const nombreLabel = document.createElement('label');
                nombreLabel.setAttribute('for', `nombrebeneficiario${i}`);
                nombreLabel.textContent = 'Beneficiario(y): Nombre - Parentesco:';
                
                const nombreInput = document.createElement('input');
                nombreInput.setAttribute('type', 'text');
                nombreInput.setAttribute('id', `nombreBeneficiario${i}`);
                nombreInput.setAttribute('name', `nombreBeneficiario${i}`);
                nombreInput.setAttribute('required', 'true');
                
                nombreGroup.appendChild(nombreLabel);
                nombreGroup.appendChild(nombreInput);
                beneficiariosContainer.appendChild(nombreGroup);
                
                beneficiariosFields.appendChild(beneficiariosContainer);
            }
        }
    });
});
// Función para convertir **texto** a <strong>texto</strong>
function formatearNegritas(texto) {
    if (!texto) return '';
    // Reemplaza **texto** por <strong>texto</strong>
    return texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function renderizarEstudio(data) {
    const meta = data.meta;
    const parte1 = data.parte_1;
    const parte2 = data.parte_2;
    const parte3 = data.parte_3;
    
    let html = `
        <div class="estudio-titulo">${meta.titulo || ''}</div>
        <div class="estudio-referencia">${meta.referencia || ''}</div>
    `;
    
    // PARTE 1
    if (parte1 && parte1.secciones) {
        html += `<div class="parte"><div class="parte-titulo">${parte1.titulo || 'Parte 1'}</div>`;
        
        // Contextos
        if (parte1.secciones.contextos) {
            const ctx = parte1.secciones.contextos;
            html += `<div class="seccion"><div class="seccion-titulo">📋 Contextos</div>`;
            if (ctx.lugar) html += `<div class="campo"><div class="campo-label">📍 Lugar</div><div class="campo-texto">${formatearNegritas(ctx.lugar)}</div></div>`;
            if (ctx.fecha) html += `<div class="campo"><div class="campo-label">📅 Fecha</div><div class="campo-texto">${formatearNegritas(ctx.fecha)}</div></div>`;
            if (ctx.hora) html += `<div class="campo"><div class="campo-label">⏰ Hora</div><div class="campo-texto">${formatearNegritas(ctx.hora)}</div></div>`;
            if (ctx.historico_politico) html += `<div class="campo"><div class="campo-label">🏛️ Contexto Histórico/Político</div><div class="campo-texto">${formatearNegritas(ctx.historico_politico)}</div></div>`;
            if (ctx.cultural_teologico) html += `<div class="campo"><div class="campo-label">📖 Contexto Cultural/Teológico</div><div class="campo-texto">${formatearNegritas(ctx.cultural_teologico)}</div></div>`;
            
            if (ctx.conexiones_AT && ctx.conexiones_AT.length) {
                html += `<div class="campo"><div class="campo-label">📜 Conexiones AT</div><div class="campo-texto"><ul>${ctx.conexiones_AT.map(c => `<li>${formatearNegritas(c)}</li>`).join('')}</ul></div></div>`;
            }
            if (ctx.conexiones_NT && ctx.conexiones_NT.length) {
                html += `<div class="campo"><div class="campo-label">✝️ Conexiones NT</div><div class="campo-texto"><ul>${ctx.conexiones_NT.map(c => `<li>${formatearNegritas(c)}</li>`).join('')}</ul></div></div>`;
            }
            html += `</div>`;
        }
        
        // Lente del Lector (posturas)
        if (parte1.secciones.lente_lector) {
            const ll = parte1.secciones.lente_lector;
            html += `<div class="seccion"><div class="seccion-titulo">👁️ Lente del Lector</div>`;
            if (ll.error_comun) html += `<div class="campo"><div class="campo-label">⚠️ Error común a evitar</div><div class="campo-texto">${formatearNegritas(ll.error_comun)}</div></div>`;
            
            if (ll.posturas) {
                html += `<div class="campo"><div class="campo-label">🎭 Las 4 posturas hermenéuticas</div><div class="posturas-grid">`;
                if (ll.posturas.preterismo) html += `<div class="postura-item"><div class="postura-nombre">Preterismo</div><div>${formatearNegritas(ll.posturas.preterismo)}</div></div>`;
                if (ll.posturas.historicismo) html += `<div class="postura-item"><div class="postura-nombre">Historicismo</div><div>${formatearNegritas(ll.posturas.historicismo)}</div></div>`;
                if (ll.posturas.futurismo) html += `<div class="postura-item"><div class="postura-nombre">Futurismo</div><div>${formatearNegritas(ll.posturas.futurismo)}</div></div>`;
                if (ll.posturas.idealismo) html += `<div class="postura-item"><div class="postura-nombre">Idealismo</div><div>${formatearNegritas(ll.posturas.idealismo)}</div></div>`;
                html += `</div></div>`;
            }
            
            if (ll.postura_estudio) html += `<div class="campo"><div class="campo-label">📖 Postura de este estudio</div><div class="campo-texto">${formatearNegritas(ll.postura_estudio)}</div></div>`;
            html += `</div>`;
        }
        
        if (parte1.secciones.dato_mentor) {
            html += `<div class="campo"><div class="campo-label">💡 Dato del Mentor</div><div class="campo-texto">${formatearNegritas(parte1.secciones.dato_mentor)}</div></div>`;
        }
        
        html += `</div>`;
    }
    
    // PARTE 2: Exégesis
    if (parte2 && parte2.terminos && parte2.terminos.length) {
        html += `<div class="parte"><div class="parte-titulo">${parte2.titulo || 'Parte 2: Exégesis'}</div>`;
        parte2.terminos.forEach(termino => {
            html += `
                <div class="termino-card">
                    <div class="termino-titulo">${termino.numero}. ${termino.titulo}</div>
                    <div class="campo"><div class="campo-label">📖 Cita bíblica</div><div class="campo-texto">${formatearNegritas(termino.cita_biblica || '')}</div></div>
                    <div class="campo"><div class="campo-label">🔤 Término griego</div><div class="campo-texto">${formatearNegritas(termino.termino_griego || '')}</div></div>
                    <div class="campo"><div class="campo-label">🔍 Análisis</div><div class="campo-texto">${formatearNegritas(termino.analisis || '')}</div></div>
                    <div class="campo"><div class="campo-label">✅ Verdad exegética</div><div class="campo-texto">${formatearNegritas(termino.verdad_exegetica || '')}</div></div>
                </div>
            `;
        });
        if (parte2.dato_mentor) html += `<div class="campo"><div class="campo-label">💡 Dato del Mentor</div><div class="campo-texto">${formatearNegritas(parte2.dato_mentor)}</div></div>`;
        html += `</div>`;
    }
    
    // PARTE 3: Aplicación
    if (parte3) {
        html += `<div class="parte"><div class="parte-titulo">${parte3.titulo || 'Parte 3: Aplicación'}</div>`;
        if (parte3.verdad_central) html += `<div class="campo"><div class="campo-label">✨ Verdad Teológica Central</div><div class="campo-texto">${formatearNegritas(parte3.verdad_central)}</div></div>`;
        if (parte3.punto_tension) html += `<div class="campo"><div class="campo-label">⚡ Punto de Tensión</div><div class="campo-texto">${formatearNegritas(parte3.punto_tension)}</div></div>`;
        if (parte3.devocional) html += `<div class="campo"><div class="campo-label">🙏 Devocional</div><div class="campo-texto">${formatearNegritas(parte3.devocional).replace(/\n/g, '<br>')}</div></div>`;
        
        if (parte3.examen && parte3.examen.length) {
            html += `<div class="campo"><div class="campo-label">❓ Examen del Corazón</div><div class="campo-texto">${parte3.examen.map((p, i) => `<div class="examen-item"><strong>${i+1}.</strong> ${formatearNegritas(p)}</div>`).join('')}</div></div>`;
        }
        
        if (parte3.pasos_practicos && parte3.pasos_practicos.length) {
            html += `<div class="campo"><div class="campo-label">📋 Pasos Prácticos</div><div class="campo-texto">${parte3.pasos_practicos.map((p, i) => `<div class="paso-item"><strong>${i+1}.</strong> ${formatearNegritas(p)}</div>`).join('')}</div></div>`;
        }
        
        if (parte3.oracion) html += `<div class="campo"><div class="campo-label">🙌 Oración Final</div><div class="campo-texto">${formatearNegritas(parte3.oracion).replace(/\n/g, '<br>')}</div></div>`;
        if (parte3.dato_mentor) html += `<div class="campo"><div class="campo-label">💡 Dato del Mentor</div><div class="campo-texto">${formatearNegritas(parte3.dato_mentor)}</div></div>`;
        html += `</div>`;
    }
    
    return html;
}
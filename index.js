const fs = require('fs');
const { performance } = require('perf_hooks');
const start = performance.now();
const csvData = fs.readFileSync('../data/estudiantes.csv', 'utf-8');
const lines = csvData.trim().split('\n');
const headers = lines.shift(); 
let aprobados = 0;
let reprobados = 0;
const resultados = lines.map(line => {
    const [nombre, n1, n2, n3] = line.split(',');
    const promedio = parseFloat(((parseFloat(n1) + parseFloat(n2) + parseFloat(n3)) / 3).toFixed(2));
    const estado = promedio >= 7.0 ? 'Aprobado' : 'Reprobado';
    
    if (estado === 'Aprobado') aprobados++; else reprobados++;
    
    return { nombre, nota1: parseFloat(n1), nota2: parseFloat(n2), nota3: parseFloat(n3), promedio, estado };
});
const end = performance.now();
const tiempoMs = end - start;
const finalJSON = {
    runtime: "node",
    tiempoMs,
    totalEstudiantes: resultados.length,
    aprobados,
    reprobados,
    resultados
};
fs.writeFileSync('../output/resultado-node.json', JSON.stringify(finalJSON, null, 2));
console.log(`Node.js - Tiempo: ${tiempoMs.toFixed(2)}ms | Aprobados: ${aprobados} | Reprobados: ${reprobados}`);
const fs = require('fs');
const csv = require('csv-parser');

const employees = [];

// Leer y cargar el archivo CSV
fs.createReadStream('datos_prueba_tecnica.csv', { encoding: 'utf8' })
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    employees.push(row);
  })
  .on('end', () => {
    // Pregunta 1: Contar hombres y mujeres
    const genderCount = {
      H: 0,
      M: 0,
    };

    // Pregunta 2: Sumar salario bruto anual de Equilibra IT y Alovera
    let totalSalary = 0;

    // Pregunta 3: Filtrar y mostrar empleados
    const filteredEmployees = [];

    employees.forEach((employee) => {
      // Pregunta 1 desarrollo
      genderCount[employee.sexo]++;

      // Pregunta 2 desarrollo
      if (employee['ID Empresa'] === '1' && employee['ID Centro trabajo'] === 'CT2') {
        totalSalary += parseFloat(employee['salario bruto anual']);
      }

      // Pregunta 3 desarrollo
      if (employee['ID Empresa'] === '2' && parseFloat(employee['salario bruto anual']) > 28000) {
        filteredEmployees.push({
          id: employee['id_empleado'],
          nombre: employee.nombre,
          apellidos: `${employee.apellido1} ${employee.apellido2}`,
          salario: employee['salario bruto anual'],
          empresa: employee['Nombre empresa'],
        });
      }
    });

    // Resultados mostrados en consola
    console.log('Pregunta 1:');
    console.log('Hombres:', genderCount.H);
    console.log('Mujeres:', genderCount.M);

    console.log('\nPregunta 2:');
    console.log('Salario total de Equilibra IT en CT2 (Alovera):', totalSalary.toFixed(2));

    console.log('\nPregunta 3:');
    filteredEmployees.forEach((emp) => {
      console.log(`${emp.id} | ${emp.nombre} ${emp.apellidos} | Salario: ${emp.salario} | Empresa: ${emp.empresa}`);
    });
  });
